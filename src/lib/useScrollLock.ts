import { useEffect } from "react";

/**
 * Freeze page scroll while an overlay (drawer, modal, chat) is open, so the
 * page underneath doesn't drag along with touch/scroll gestures. Pads the
 * body by the scrollbar width so the layout doesn't jump sideways.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [locked]);
}
