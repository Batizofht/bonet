"use client";

import dynamic from 'next/dynamic';
import Navbar from "@/components/navbar";
import { ToastProvider, ToastBridge } from "@/components/ui/toast";
import PageLoader from "@/components/PageLoader";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import i18n from "../../i18n";

// SSR-safe: never runs useLayoutEffect during prerender (no React warning)
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const ChatBot = dynamic(() => import("@/components/bot"), { ssr: false });
const SuperFooterLazy = dynamic(() => import("@/components/Superfooter"), { ssr: false });

function i18nReady() {
  if (!i18n.isInitialized) return false;
  const lng = i18n.language || 'en';
  return i18n.hasResourceBundle(lng, 'translation') || i18n.hasResourceBundle('en', 'translation');
}

function TopLoader() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(0);
  const first = useRef(true);

  // Finish the bar when navigation lands
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setWidth(100);
    const t = setTimeout(() => {
      setActive(false);
      setWidth(0);
    }, 300);
    return () => clearTimeout(t);
  }, [pathname]);

  // Start the bar when an internal link is clicked
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a');
      if (!a || !a.href || !a.href.startsWith(window.location.origin)) return;
      if (new URL(a.href).pathname !== pathname) {
        setActive(true);
        setWidth(0);
        requestAnimationFrame(() => requestAnimationFrame(() => setWidth(80)));
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [pathname]);

  if (!active && width === 0) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.8)]"
        style={{
          width: `${width}%`,
          transition: width === 100 ? 'width 0.25s ease' : 'width 0.5s cubic-bezier(0.1,0.5,0.2,1)',
          opacity: active || width === 100 ? 1 : 0,
        }}
      />
    </div>
  );
}

// AOS-style section entrance animations (reference-site smoothness),
// IntersectionObserver + CSS only — no animation library.
function ScrollReveal() {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const processed = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 }
    );

    const scan = () => {
      document.querySelectorAll('section').forEach((el) => {
        if (processed.has(el)) return;
        // Never touch nav/header chrome, hidden menus, or opt-outs
        if (el.closest('nav, header, [data-no-reveal]')) return;
        processed.add(el);
        el.classList.add('js-reveal');
        io.observe(el);
      });
    };

    scan();
    // Catch sections that mount later (lazy tabs, suspense, chat…)
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
      processed.forEach((el) => {
        el.classList.remove('js-reveal');
        el.classList.remove('is-revealed');
      });
    };
  }, [pathname]);

  return null;
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  // Never paint raw translation keys: hold a branded splash until the
  // active language bundle is actually loaded. (English is bundled +
  // initImmediate:false, so this never shows for the default language.)
  const [ready, setReady] = useState(i18nReady);

  useEffect(() => {
    if (i18nReady()) {
      setReady(true);
      return;
    }
    const check = () => {
      if (i18nReady()) setReady(true);
    };
    i18n.on('initialized', check);
    i18n.on('loaded', check);
    i18n.on('failedLoading', check);
    i18n.on('languageChanged', check);
    // Safety net: never trap the user on the splash.
    const t = setTimeout(() => setReady(true), 4000);
    return () => {
      clearTimeout(t);
      i18n.off('initialized', check);
      i18n.off('loaded', check);
      i18n.off('failedLoading', check);
      i18n.off('languageChanged', check);
    };
  }, []);

  // Only on real navigation — never on initial mount, so a slow page load
  // can't yank the user back to the top while they're already scrolling
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <ToastProvider>
      <ToastBridge />
      <TopLoader />
      <ScrollReveal />
      {!ready ? (
        <PageLoader />
      ) : (
        <>
          <Navbar />
          <ChatBot />
          {children}
          <SuperFooterLazy />
        </>
      )}
    </ToastProvider>
  );
}
