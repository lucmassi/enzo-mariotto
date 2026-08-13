/* ============================================================
   components/SiteChrome.js — Header scroll state + mobile menu
   ============================================================ */
import { $, $$ } from "../utils/dom.js";

const SCROLL_THRESHOLD = 24;

export function initSiteChrome() {
  const header = $("[data-header]");
  if (!header) return;

  const updateScrollState = function () {
    header.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
  };
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  const progress = $("[data-progress]");
  if (progress) {
    let ticking = false;
    const updateProgress = function () {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      progress.style.width = (ratio * 100).toFixed(2) + "%";
    };
    const onProgressScroll = function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };
    updateProgress();
    window.addEventListener("scroll", onProgressScroll, { passive: true });
    window.addEventListener("resize", onProgressScroll, { passive: true });
  }

  const toggle = $("[data-menu-toggle]");
  const nav = $("#site-nav");
  if (!toggle || !nav) return;

  const setMenu = function (open) {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu de navegação" : "Abrir menu de navegação");
    document.body.classList.toggle("no-scroll", open);
    if (progress) progress.style.opacity = open ? "0" : "1";
  };

  toggle.addEventListener("click", function () {
    setMenu(!header.classList.contains("is-open"));
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && header.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  $$("a", nav).forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });
}
