import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, KeyRound, UserCheck, X, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { useNexusAuth } from '../auth/AuthProvider';
import { rateLimiter } from '../utils/rateLimiter';

interface Auth0ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export default function Auth0Modal({ isOpen, onClose, defaultMode = 'login' }: Auth0ModalProps) {
  const { isAuth0Configured, login, loginAsGuest } = useNexusAuth();
  const [guestName, setGuestName] = useState('');
  const [activeTab, setActiveTab] = useState<'auth0' | 'guest'>('auth0');

  if (!isOpen) return null;

  const handleAuth0Trigger = async () => {
    // Check rate limiter before initiating auth
    const check = rateLimiter.check('auth_attempt');
    if (!check.allowed) {
      return;
    }

    try {
      await login();
      onClose();
    } catch (err) {
      console.error('Login action error:', err);
    }
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = rateLimiter.check('auth_attempt');
    if (!check.allowed) return;

    loginAsGuest(guestName.trim() || undefined);
    onClose();
    window.location.href = '/dashboard.html';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative max-w-lg w-full bg-[#0a0f24] border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_0_80px_rgba(0,240,255,0.15)] text-white overflow-hidden"
        >
          {/* Cyber ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-blue/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-accent-blue">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                NEXUS IDENTITY ACCESS
              </h3>
              <span className="text-xs font-mono text-accent-blue flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                {isAuth0Configured ? 'Auth0 Enterprise Security Connected' : 'Auth0 Protocol Engine Ready'}
              </span>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5 mb-6">
            <button
              onClick={() => setActiveTab('auth0')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'auth0' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              Auth0 Universal Login
            </button>
            <button
              onClick={() => setActiveTab('guest')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'guest' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Instant Guest Access
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'auth0' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1.5 animate-pulse shrink-0" />
                  <div className="text-xs text-gray-300 leading-relaxed">
                    <p className="font-semibold text-white mb-1">
                      {isAuth0Configured ? 'Direct Auth0 SSO Authentication' : 'Auth0 OAuth2 / OpenID Connect Ready'}
                    </p>
                    {isAuth0Configured ? (
                      <p>
                        Click below to sign in via Auth0 Universal Login supporting Google, GitHub, and passwordless authentication.
                      </p>
                    ) : (
                      <p>
                        Configured with <code className="text-accent-blue bg-black/40 px-1 py-0.5 rounded font-mono">@auth0/auth0-react</code>. 
                        Add your <code className="text-accent-blue bg-black/40 px-1 py-0.5 rounded font-mono">VITE_AUTH0_DOMAIN</code> and <code className="text-accent-blue bg-black/40 px-1 py-0.5 rounded font-mono">VITE_AUTH0_CLIENT_ID</code> in <code className="text-white font-mono">.env</code> to connect your tenant.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleAuth0Trigger}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-accent-blue to-cyan-400 text-black font-extrabold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Continue with Auth0
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-white/5">
                <span>Enterprise grade encryption</span>
                <a
                  href="https://auth0.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-accent-blue hover:underline"
                >
                  Powered by Auth0 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGuestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-2">
                  Callsign / Operative Handle
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. CyberViper99"
                  maxLength={24}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all text-sm font-sans"
                />
              </div>

              {/* Honeypot field for bot protection */}
              <input
                type="text"
                name="nexus_security_trap"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-white text-black font-extrabold text-sm tracking-wide hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Launch Guest Session
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
