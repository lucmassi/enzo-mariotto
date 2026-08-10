/* ============================================================
   tracking/ctaTracker.js — WhatsApp & CTA Click Tracking
   ============================================================ */
import { CONFIG } from "../config.js";
import { $$ } from "../utils/dom.js";
import { storage } from "../utils/storage.js";

export function initCtaTracker() {
  const links = $$("[data-whatsapp-link]");
  const base = "https://wa.me/" + CONFIG.WHATSAPP_NUMBER;
  const url = CONFIG.WHATSAPP_MESSAGE ? base + "?text=" + encodeURIComponent(CONFIG.WHATSAPP_MESSAGE) : base;

  links.forEach(link => {
    link.setAttribute("href", url);
    link.setAttribute("rel", "noopener noreferrer");
    link.setAttribute("target", "_blank");
  });

  document.addEventListener("click", event => {
    const link = event.target.closest("[data-whatsapp-link]");
    if (!link) return;

    const location = link.getAttribute("data-cta-location") || "unknown";
    const utm = storage.getUTMSession() || {};

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "click_whatsapp",
      cta_location: location,
      whatsapp_url: link.getAttribute("href"),
      ...utm
    });
  });
}