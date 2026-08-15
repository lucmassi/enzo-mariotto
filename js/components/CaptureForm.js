/* ============================================================
   components/CaptureForm.js — Fallback Lead Capture Form
   ============================================================ */
import { $ } from "../utils/dom.js";

export function initCaptureForm() {
  const form = $(".capture-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = $("#lead-name").value.trim();
    const contact = $("#lead-contact").value.trim();
    const goal = $("#lead-goal").value;

    if (!name || !contact) return;

    // Simulate async submission (or integrate with CRM/Webhook)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "generate_lead",
      lead_goal: goal,
      lead_type: contact.includes("@") ? "email" : "phone"
    });

    if (typeof gtag === "function") {
      gtag("event", "generate_lead", { lead_goal: goal });
    }

    form.classList.add("is-submitted");
  });
}