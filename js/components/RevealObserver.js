/* ============================================================
   components/RevealObserver.js — Scroll Animation Observer
   ============================================================ */
import { $$ } from "../utils/dom.js";

export function initReveal() {
  const selectors = [
    ".card", ".stepper__step", ".faq__item", ".comparison__col",
    ".authority__visual", ".authority__content", ".authority-stack__item",
    ".cta-band", ".testimonial", ".section__eyebrow", ".section__lead",
    ".section__cta-wrap"
  ];
  const els = $$(selectors.join(","));

  if (!("IntersectionObserver" in window)) {
    els.forEach(el => { el.classList.add("reveal", "is-in-view"); });
    return;
  }

  els.forEach(el => {
    el.classList.add("reveal");
    const group = el.parentElement;
    const index = group ? Array.prototype.indexOf.call(group.children, el) : 0;
    el.style.animationDelay = Math.min(index * 100, 400) + "ms";
  });

  const io = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  els.forEach(el => io.observe(el));
}