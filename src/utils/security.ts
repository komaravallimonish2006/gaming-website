/**
 * NEXUS CYBER-SECURITY SHIELD
 * Client-side sanitization, XSS mitigation, secure session management,
 * and secret leakage prevention.
 */

// Simple XSS sanitizer for user inputs and rendered content
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Ensure no secrets or plain passwords are saved in localStorage
export function purgeInsecureStorage(): void {
  try {
    // Remove legacy insecure storage keys
    localStorage.removeItem('nexus_users');
    
    // Check if any secret token pattern is lingering in storage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('password') || key.includes('secret') || key.includes('private_key'))) {
        localStorage.removeItem(key);
      }
    }
  } catch (e) {
    console.warn('Storage purge warning:', e);
  }
}

// Generate CSRF token for forms
export function generateCsrfToken(): string {
  const array = new Uint8Array(16);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Email format validator
export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}
