"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return null;
}