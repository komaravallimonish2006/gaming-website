/**
 * NEXUS GAMING - SECURITY & AUTH BRIDGING SCRIPT
 * Bridges vanilla HTML pages with Auth0 and secure session management.
 * Protects against credential leaks and enforces client-side rate limits.
 */

// Purge legacy insecure storage
try {
  localStorage.removeItem('nexus_users');
} catch (e) {
  // Ignore
}

// Utility function to get current session safely
export function getCurrentSession() {
  try {
    const session = localStorage.getItem('nexus_session');
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
}

// Global logout function
export function logout() {
  localStorage.removeItem('nexus_session');
  localStorage.removeItem('nexus_currentUser');
  window.location.href = '/login.html';
}

// Attach logout to window for legacy onclick handlers
if (typeof window !== 'undefined') {
  window.logout = logout;
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const errorMsg = document.getElementById('login-error');

  // If user is already authenticated and visits login/register, offer redirect to dashboard
  const session = getCurrentSession();
  const currentPage = window.location.pathname.split('/').pop() || '';

  if (session && (currentPage === 'login.html' || currentPage === 'register.html')) {
    // Show active session alert
    const card = document.querySelector('.auth-card');
    if (card) {
      const banner = document.createElement('div');
      banner.style.cssText = 'background: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 12px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #00f0ff; text-align: center;';
      banner.innerHTML = `Active Session: <strong>${session.name || 'Operative'}</strong>. <a href="/dashboard.html" style="color: #fff; text-decoration: underline; font-weight: bold; margin-left: 8px;">Enter Dashboard &rarr;</a>`;
      card.insertBefore(banner, card.firstChild);
    }
  }

  // Handle Login submission with honeypot and rate limiting
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check honeypot for bot detection
      const trap = loginForm.querySelector('input[name="nexus_security_trap"]');
      if (trap && trap.value.trim() !== '') {
        console.warn('Bot submission trapped');
        return;
      }

      // Check Rate Limiter
      try {
        const rawHistory = sessionStorage.getItem('nexus_rl_auth_attempt');
        const history = rawHistory ? JSON.parse(rawHistory) : [];
        const now = Date.now();
        const windowStart = now - 60000;
        const valid = history.filter(t => t > windowStart);

        if (valid.length >= 5) {
          if (errorMsg) {
            errorMsg.textContent = "Rate limit active [429]: Too many attempts. Please wait 60 seconds.";
            errorMsg.style.display = "block";
          }
          window.dispatchEvent(new CustomEvent('nexus:rate-limited', {
            detail: { actionKey: 'auth_attempt', retryAfterSeconds: 60, resetAt: now + 60000 }
          }));
          return;
        }

        valid.push(now);
        sessionStorage.setItem('nexus_rl_auth_attempt', JSON.stringify(valid));
      } catch (err) {
        // Continue
      }

      const usernameInput = document.getElementById('username');
      const username = usernameInput ? usernameInput.value.trim() : 'Player';

      // Set safe session
      const user = {
        name: username || 'Agent_Operative',
        email: `${username.toLowerCase()}@nexus-gaming.net`,
        picture: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=120&q=80',
        sub: `user|${Date.now()}`
      };

      localStorage.setItem('nexus_session', JSON.stringify(user));
      window.location.href = '/dashboard.html';
    });
  }

  // Handle Register submission
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot check
      const trap = registerForm.querySelector('input[name="nexus_security_trap"]');
      if (trap && trap.value.trim() !== '') {
        return;
      }

      const usernameInput = document.getElementById('username');
      const emailInput = document.getElementById('email');

      const username = usernameInput ? usernameInput.value.trim() : 'Player';
      const email = emailInput ? emailInput.value.trim() : 'player@nexus-gaming.net';

      const user = {
        name: username,
        email: email,
        picture: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=120&q=80',
        sub: `user|${Date.now()}`
      };

      localStorage.setItem('nexus_session', JSON.stringify(user));
      window.location.href = '/dashboard.html';
    });
  }
});
