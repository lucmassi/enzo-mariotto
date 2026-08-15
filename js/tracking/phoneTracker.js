/* ============================================================
   tracking/phoneTracker.js — Tel Click Tracking
   ============================================================ */
export function initPhoneTracker() {
  document.addEventListener("click", function (e) {
    const link = e.target.closest("a[href^='tel:']");
    if (!link) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "click_phone",
      phone_number: link.getAttribute("href")
    });
    if (typeof gtag === "function") {
      gtag("event", "click_phone", { phone_number: link.getAttribute("href") });
    }
  });
}