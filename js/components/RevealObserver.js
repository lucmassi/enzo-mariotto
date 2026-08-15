/* ============================================================
   components/RevealObserver.js — Scroll Animation Observer
   Supports [data-reveal="up|blur|scale"] and staggered
   [data-reveal-group] + [data-reveal-item] pairs.
   ============================================================ */
import { $$ } from "../utils/dom.js";

const FALLBACK_SELECTORS = [
  ".authority-stack__item"
];

export function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = $$("[data-reveal]");
  FALLBACK_SELECTORS.forEach(function (selector) {
    $$(selector).forEach(function (el) {
      if (!el.hasAttribute("data-reveal")) targets.push(el);
    });
  });

  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) return; // sem animação, conteúdo visível

  // Stagger dentro de grupos
  $$("[data-reveal-group]").forEach(function (group) {
    $$("[data-reveal-item]", group).forEach(function (el, index) {
      el.style.setProperty("--reveal-index", String(index));
    });
  });

  // Stagger de irmãos isolados (mesma variante no mesmo parent)
  targets.forEach(function (el) {
    if (el.hasAttribute("data-reveal-item")) return;
    const parent = el.parentElement;
    if (!parent) return;
    let index = 0;
    $$("[data-reveal]", parent).forEach(function (sibling, i) {
      if (sibling === el) index = i;
    });
    el.style.setProperty("--reveal-index", String(index));
  });

  targets.forEach(function (el) {
    const variant = el.getAttribute("data-reveal") || "up";
    el.classList.add("reveal", "reveal--" + variant);
  });

  const io = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("is-in-view");
      observer.unobserve(el);
      // Após a transição, remove .reveal para devolver o controle
      // dos transições/hover às regras de componente (cards, FAQ etc.)
      const delay = parseInt(el.style.getPropertyValue("--reveal-index") || "0", 10) * 90;
      window.setTimeout(function () {
        el.classList.remove("reveal");
        // remove a variante (reveal--up/blur/scale) para não deixar
        // transform/filter residuais aplicados permanentemente
        [].slice.call(el.classList).forEach(function (name) {
          if (name.indexOf("reveal--") === 0) el.classList.remove(name);
        });
      }, delay + 850);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(function (el) { io.observe(el); });
}
