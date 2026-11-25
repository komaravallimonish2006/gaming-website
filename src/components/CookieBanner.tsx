import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('nexus_cookie_consent');
    if (!consent) {
      // Short delay before showing banner for seamless feel
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('nexus_cookie_consent', 'all');
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('nexus_cookie_consent', 'essential');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 left-6 z-[9999] max-w-md w-[calc(100%-3rem)] md:w-full bg-[#0c1128]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-white"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent-blue/10 rounded-xl border border-accent-blue/20 text-accent-blue shrink-0">
              <Cookie className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-sm tracking-wide flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Privacy & Cookie Protocol
                </h4>
                <button
                  onClick={acceptEssential}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Dismiss cookie notice"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                We use privacy-friendly telemetry and Auth0 security tokens to maintain your session and game progress. 
                Zero third-party advertising trackers. Read our{' '}
                <a href="/privacy.html" className="text-accent-blue underline hover:text-white transition-colors">
                  Privacy Policy
                </a>.
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 bg-white text-black font-bold text-xs rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  Accept All
                </button>
                <button
                  onClick={acceptEssential}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-200 font-medium text-xs rounded-full transition-all border border-white/10"
                >
                  Essential Only
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
