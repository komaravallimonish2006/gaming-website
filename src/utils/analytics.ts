import { inject } from '@vercel/analytics';

let isInitialized = false;

export function initAnalytics() {
  if (isInitialized) return;
  try {
    if (typeof window !== 'undefined') {
      inject();
      isInitialized = true;
    }
  } catch (err) {
    // Graceful fallback if offline or adblocker enabled
    console.debug('Analytics initialization notice:', err);
  }
}

// Track custom game event (privacy-respecting, zero personal data)
export function trackGameEvent(eventName: string, properties?: Record<string, string | number | boolean>) {
  try {
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('event', { name: eventName, data: properties });
    }
  } catch {
    // Non-blocking
  }
}
