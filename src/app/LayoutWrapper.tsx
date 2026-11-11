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
// Server-rendered so crawlers see the footer's internal links
import SuperFooterLazy from "@/components/Superfooter";
import CookieBanner from "@/components/CookieBanner";

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
      {/* scaleX instead of width: runs on the compositor, no layout per frame */}
      <div
        className="h-full w-full origin-left bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.8)]"
        style={{
          transform: `scaleX(${width / 100})`,
          transition: width === 100
            ? 'transform 0.25s ease, opacity 0.2s ease 0.1s'
            : 'transform 0.5s cubic-bezier(0.1,0.5,0.2,1)',
          opacity: active || width === 100 ? 1 : 0,
        }}
      />
    </div>
  );
}

// AOS-style entrance animations, IntersectionObserver + CSS only.
// Works on content *blocks* (cards, headings, rows), not whole sections:
// a page whose one big section starts on screen still animates everything
// below the fold, so every page behaves the same.
const REVEAL_MS = 700;
const STAGGER_MS = 80;
const MAX_STAGGER = 4;
const NO_REVEAL = 'nav, header, footer, script, style, [data-no-reveal], [role="dialog"]';
// Treated as one block even when tall — never split these up
const ATOMIC = 'table, form, p, h1, h2, h3, h4, h5, h6, img, picture, video, iframe, svg, a, button, article';

function ScrollReveal() {
  const pathname = usePathname();
  const firstRun = useRef(true);

  useIsomorphicLayoutEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const decided = new Set<HTMLElement>(); // every block already handled
    // Hidden blocks, each held at opacity 0 by a Web Animation. No class or
    // style attribute is touched, so React hydration never sees a mismatch.
    const waiting = new Map<HTMLElement, Animation>();

    const io = new IntersectionObserver(
      (entries) => {
        // threshold 0: reveal as soon as any pixel shows — tall blocks can
        // never get stuck. Blocks already scrolled past show immediately.
        const entering = entries
          .filter((e) => e.isIntersecting || e.boundingClientRect.bottom < 0)
          .sort((a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left
          );
        entering.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          waiting.get(el)?.cancel();
          waiting.delete(el);
          if (!entry.isIntersecting) return;
          // Cards that enter together cascade in reading order
          el.animate(
            [
              { opacity: 0 },
              { opacity: 1 },
            ],
            {
              duration: REVEAL_MS,
              delay: Math.min(i, MAX_STAGGER) * STAGGER_MS,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              fill: 'backwards',
            }
          );
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 }
    );

    // After a route change the window is about to jump to the top, so
    // measure "on screen" against the top of the page, not the old scroll.
    const navigated = !firstRun.current;
    firstRun.current = false;

    const inFlow = (el: HTMLElement) => {
      const pos = getComputedStyle(el).position;
      return pos !== 'absolute' && pos !== 'fixed';
    };

    // Split tall containers into their children until blocks are no
    // taller than ~a screen, then animate each block on its own.
    let splitAt = 0;
    const collect = (el: HTMLElement, out: HTMLElement[], depth: number) => {
      if (decided.has(el) || el.matches(NO_REVEAL)) return;
      const h = el.offsetHeight;
      if (h === 0) return;
      // Only tall containers get split — and only they pay for style reads
      if (h <= splitAt || depth >= 8 || el.matches(ATOMIC) || el.childElementCount > 30) {
        out.push(el);
        return;
      }
      const kids = Array.from(el.children).filter(
        (k): k is HTMLElement => k instanceof HTMLElement && !k.matches(NO_REVEAL) && k.offsetHeight > 0 && inFlow(k)
      );
      if (kids.length) kids.forEach((k) => collect(k, out, depth + 1));
      else out.push(el);
    };

    const scan = () => {
      const vh = window.innerHeight;
      // Phones: animate bigger groups. Every animated block costs a GPU
      // layer + repaint, and a short screen would otherwise split a page
      // into dozens of them (measured: that is what made phone scroll stutter).
      splitAt = vh * (window.innerWidth < 768 ? 1.8 : 0.9);
      const offset = navigated ? window.scrollY : 0;
      const blocks: HTMLElement[] = [];
      Array.from(document.body.children).forEach((root) => {
        if (root instanceof HTMLElement && inFlow(root)) collect(root, blocks, 0);
      });
      blocks.forEach((el) => {
        decided.add(el);
        // Already on screen: leave it alone. Hiding it would flash the
        // first paint and delay the largest contentful paint.
        if (el.getBoundingClientRect().top + offset < vh) return;
        if (typeof el.animate !== 'function') return;
        waiting.set(el, el.animate([{ opacity: 0 }, { opacity: 0 }], { duration: 1, fill: 'forwards' }));
        io.observe(el);
      });
    };

    scan();
    // Catch content that mounts later (lazy sections, API data). Debounced
    // so React updates never trigger a layout read on every frame.
    let timer = 0;
    const mo = new MutationObserver((records) => {
      if (records.every((r) => (r.target as Element).closest?.('[data-no-reveal], nav'))) return;
      clearTimeout(timer);
      timer = window.setTimeout(scan, 120);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      io.disconnect();
      mo.disconnect();
      waiting.forEach((hold) => hold.cancel());
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
      // 'instant' overrides the CSS smooth scroll — a new page should
      // start at the top, not glide up through the old one
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
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
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100000] focus:rounded-lg focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-ink-950"
          >
            Skip to content
          </a>
          <Navbar />
          <ChatBot />
          <main id="main">{children}</main>
          <SuperFooterLazy />
          <CookieBanner />
        </>
      )}
    </ToastProvider>
  );
}
