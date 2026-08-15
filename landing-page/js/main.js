/* ============================================================
   Enzo Mariotto — Landing Page
   Conversão: clique no WhatsApp (evento `click_whatsapp`)
   Base: 06-mensuracao/measurement-plan.md
   ============================================================ */
(function () {
  "use strict";

  /* ============================================================
     CONFIG — ÚNICO LUGAR PARA PREENCHER DADOS PENDENTES
     ============================================================ */
  var CONFIG = {
    // >>> TROCAR <<<  Número comercial (apenas dígitos, DDI+DDD+número, sem + e sem espaços)
    WHATSAPP_NUMBER: "55XXXXXXXXXX",
    // Mensagem pré-preenchida (pré-qualificação)
    WHATSAPP_MESSAGE: "Olá! Quero agendar uma avaliação. Meu objetivo é: ______",
    // >>> A CONFIRMAR <<<  domínio canônico da LP em produção
    SITE_URL: "https://www.enzo-mariotto.com.br/"
  };

  var SESSION_KEY = "enm_utm_session";

  /* ---------- helpers ---------- */
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function buildWaUrl() {
    var base = "https://wa.me/" + CONFIG.WHATSAPP_NUMBER;
    if (CONFIG.WHATSAPP_MESSAGE) {
      base += "?text=" + encodeURIComponent(CONFIG.WHATSAPP_MESSAGE);
    }
    return base;
  }

  /* ---------- dataLayer: UTMs da URL ---------- */
  function pushUtmToDataLayer() {
    window.dataLayer = window.dataLayer || [];
    var utm = {
      utm_source: getParam("utm_source") || "(direct)",
      utm_medium: getParam("utm_medium") || "(none)",
      utm_campaign: getParam("utm_campaign") || "(none)",
      utm_content: getParam("utm_content") || "(none)",
      utm_term: getParam("utm_term") || "(none)"
    };
    window.dataLayer.push(utm);
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(utm)); } catch (e) {}
  }

  /* ---------- monta links wa.me em todos os botões WhatsApp ---------- */
  function initWaLinks() {
    var links = document.querySelectorAll("[data-whatsapp-link]");
    var url = buildWaUrl();
    Array.prototype.forEach.call(links, function (link) {
      link.setAttribute("href", url);
      link.setAttribute("rel", "noopener noreferrer");
      link.setAttribute("target", "_blank");
    });
  }

  /* ---------- dispara evento click_whatsapp (GTM/GA4) ---------- */
  function initTracking() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest("[data-whatsapp-link]");
      if (!link) return;
      var location = link.getAttribute("data-cta-location") || "unknown";
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "click_whatsapp",
        cta_location: location,
        whatsapp_url: link.getAttribute("href")
      });
      // GA4 gtag direto (fallback sem GTM)
      if (typeof gtag === "function") {
        gtag("event", "click_whatsapp", {
          cta_location: location,
          page_location: window.location.href
        });
      }
    });
  }

  /* ---------- ano automático no rodapé ---------- */
  function initYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- reveal on scroll (fade-up com stagger) ---------- */
  function initReveal() {
    var selectors = [
      ".card", ".stepper__step", ".faq__item", ".comparison__col",
      ".authority__visual", ".authority__content", ".authority-stack__item",
      ".cta-band", ".testimonial", ".section__eyebrow", ".section__lead",
      ".section__cta-wrap"
    ];
    var els = document.querySelectorAll(selectors.join(","));
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(els, function (el) { el.classList.add("reveal", "is-in-view"); });
      return;
    }
    Array.prototype.forEach.call(els, function (el, i) {
      el.classList.add("reveal");
      var siblings = el.parentElement ? el.parentElement.children.length : 1;
      el.style.animationDelay = Math.min((i % Math.max(siblings, 1)) * 100, 400) + "ms";
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- mobile menu toggle ---------- */
  function initMenuToggle() {
    var menuToggle = document.querySelector(".menu-toggle");
    if (!menuToggle) return;
    menuToggle.addEventListener("click", function () {
      document.body.classList.toggle("mobile-menu-open");
    });
    // Close menu when clicking a WhatsApp link
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-whatsapp-link]") && document.body.classList.contains("mobile-menu-open")) {
        document.body.classList.remove("mobile-menu-open");
      }
    });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    pushUtmToDataLayer();
    initWaLinks();
    initTracking();
    initYear();
    initReveal();
    initMenuToggle();
  });
})();
