/* ============================================================
   components/Parallax.js — Subtle parallax on [data-parallax]
   Disabled under prefers-reduced-motion and small viewports.
   ============================================================ */

export function initParallax() {
  const els = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  if (!els.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const smallViewport = window.matchMedia("(max-width: 767px)").matches;
  if (reduceMotion || smallViewport || !("requestAnimationFrame" in window)) return;

  let ticking = false;

  function update() {
    ticking = false;
    const vh = window.innerHeight;
    els.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;

      const speed = parseFloat(el.dataset.parallaxSpeed || "0.12") || 0.12;
      const center = rect.top + rect.height / 2;
      const offset = (vh / 2 - center) * speed;
      const maxOffset = rect.height * 0.05;
      const clamped = Math.max(-maxOffset, Math.min(maxOffset, offset));

      el.style.transform = "translate3d(0," + clamped.toFixed(1) + "px,0) scale(1.12)";
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}
