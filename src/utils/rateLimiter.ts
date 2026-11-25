/**
 * NEXUS RATE LIMITER & BOT SHIELD
 * Token-bucket sliding window rate limiter for client actions,
 * form submissions, API requests, and game score reporting.
 */

export interface RateLimitConfig {
  maxRequests: number; // Maximum allowed requests
  windowMs: number;    // Time window in milliseconds
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
  resetAt: number;
}

const DEFAULT_CONFIGS: Record<string, RateLimitConfig> = {
  auth_attempt: { maxRequests: 5, windowMs: 60 * 1000 },       // 5 per min
  contact_form: { maxRequests: 3, windowMs: 5 * 60 * 1000 },   // 3 per 5 min
  score_submit: { maxRequests: 20, windowMs: 60 * 1000 },      // 20 per min
  general_action: { maxRequests: 30, windowMs: 60 * 1000 }     // 30 per min
};

class RateLimiter {
  private storageKeyPrefix = 'nexus_rl_';

  private getHistory(key: string): number[] {
    try {
      const raw = sessionStorage.getItem(this.storageKeyPrefix + key);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private saveHistory(key: string, timestamps: number[]): void {
    try {
      sessionStorage.setItem(this.storageKeyPrefix + key, JSON.stringify(timestamps));
    } catch {
      // Ignore sessionStorage quotas
    }
  }

  /**
   * Check and record a rate limited action
   */
  public check(actionKey: string, customConfig?: RateLimitConfig): RateLimitResult {
    const config = customConfig || DEFAULT_CONFIGS[actionKey] || DEFAULT_CONFIGS.general_action;
    const now = Date.now();
    const windowStart = now - config.windowMs;

    // Filter out timestamps older than current window
    const history = this.getHistory(actionKey).filter(ts => ts > windowStart);

    if (history.length >= config.maxRequests) {
      const oldestTimestamp = history[0];
      const resetAt = oldestTimestamp + config.windowMs;
      const retryAfterSeconds = Math.max(1, Math.ceil((resetAt - now) / 1000));

      // Trigger custom window event for UI listeners (e.g., error banners)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('nexus:rate-limited', {
          detail: {
            actionKey,
            retryAfterSeconds,
            resetAt
          }
        }));
      }

      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds,
        resetAt
      };
    }

    // Record this attempt
    history.push(now);
    this.saveHistory(actionKey, history);

    return {
      allowed: true,
      remaining: config.maxRequests - history.length,
      retryAfterSeconds: 0,
      resetAt: now + config.windowMs
    };
  }

  /**
   * Reset rate limit bucket manually (e.g., on successful captcha or admin action)
   */
  public reset(actionKey: string): void {
    try {
      sessionStorage.removeItem(this.storageKeyPrefix + actionKey);
    } catch {
      // Ignore
    }
  }
}

export const rateLimiter = new RateLimiter();

/**
 * Honeypot bot detection check
 * Real humans won't see or fill this hidden input field.
 */
export function isBotSubmission(formData: FormData | Record<string, any>): boolean {
  if (formData instanceof FormData) {
    const trap = formData.get('nexus_security_trap');
    return Boolean(trap && trap.toString().trim() !== '');
  }
  return Boolean(formData.nexus_security_trap && String(formData.nexus_security_trap).trim() !== '');
}
