/* ============================================================
   tracking/scrollTracker.js — Scroll Depth Tracking (25, 50, 75, 90)
   ============================================================ */
export function initScrollTracker() {
  const milestones = [25, 50, 75, 90];
  const reached = {};

  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight <= 0) return;

    const percent = Math.round((scrollTop / scrollHeight) * 100);

    milestones.forEach(m => {
      if (!reached[m] && percent >= m) {
        reached[m] = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "scroll_depth",
          depth_percentage: m
        });
        if (typeof gtag === "function") {
          gtag("event", "scroll_depth", { depth_percentage: m });
        }
      }
    });
  }, { passive: true });
}