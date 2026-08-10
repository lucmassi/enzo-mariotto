/* ============================================================
   utils/sanitize.js — XSS Prevention & Sanitization
   ============================================================ */
export function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function sanitizeUrl(url) {
  if (typeof url !== "string") return "#";
  const trimmed = url.trim();
  if (trimmed.startsWith("javascript:") || trimmed.startsWith("data:")) {
    return "#";
  }
  return escapeHtml(trimmed);
}