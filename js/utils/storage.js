/* ============================================================
   utils/storage.js — Safe SessionStorage Wrapper
   ============================================================ */
import { CONFIG } from "../config.js";

export const storage = {
  getUTMSession() {
    try {
      const data = sessionStorage.getItem(CONFIG.SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },
  setUTMSession(utmObj) {
    try {
      sessionStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(utmObj));
    } catch (e) {}
  }
};