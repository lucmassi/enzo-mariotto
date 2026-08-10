/* ============================================================
   main.js — Entry Point (Boot Modules)
   ============================================================ */
import { initCtaTracker } from "./tracking/ctaTracker.js";
import { initScrollTracker } from "./tracking/scrollTracker.js";
import { initPhoneTracker } from "./tracking/phoneTracker.js";
import { initReveal } from "./components/RevealObserver.js";
// ExitIntent removed — replaced with floating WhatsApp button
import { storage } from "./utils/storage.js";

(function () {
  "use strict";

  function initUTMs() {
    const params = new URLSearchParams(window.location.search);
    const utm = {
      utm_source: params.get("utm_source") || "(direct)",
      utm_medium: params.get("utm_medium") || "(none)",
      utm_campaign: params.get("utm_campaign") || "(none)",
      utm_content: params.get("utm_content") || "(none)",
      utm_term: params.get("utm_term") || "(none)"
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(utm);
    storage.setUTMSession(utm);
  }

  function initYear() {
    const el = document.querySelector("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", function () {
    initUTMs();
    initCtaTracker();
    initScrollTracker();
    initPhoneTracker();
    initYear();
    initReveal();
  });
})();