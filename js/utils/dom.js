/* ============================================================
   utils/dom.js — DOM Helpers
   ============================================================ */
export function $(selector, scope = document) {
  return scope.querySelector(selector);
}

export function $$(selector, scope = document) {
  return Array.prototype.slice.call(scope.querySelectorAll(selector));
}

export function delegate(element, eventType, selector, callback) {
  element.addEventListener(eventType, function (event) {
    const target = event.target.closest(selector);
    if (target && element.contains(target)) {
      callback.call(target, event, target);
    }
  });
}