import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Clock, X } from 'lucide-react';

export default function RateLimitShield() {
  const [activeAlert, setActiveAlert] = useState<{
    actionKey: string;
    retryAfterSeconds: number;
  } | null>(null);

  useEffect(() => {
    const handleRateLimit = (e: Event) => {
      const customEvent = e as CustomEvent<{
        actionKey: string;
        retryAfterSeconds: number;
      }>;
      setActiveAlert(customEvent.detail);
    };

    window.addEventListener('nexus:rate-limited', handleRateLimit);
    return () => window.removeEventListener('nexus:rate-limited', handleRateLimit);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!activeAlert || activeAlert.retryAfterSeconds <= 0) return;

    const timer = setInterval(() => {
      setActiveAlert(prev => {
        if (!prev) return null;
        if (prev.retryAfterSeconds <= 1) return null;
        return { ...prev, retryAfterSeconds: prev.retryAfterSeconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeAlert]);

  return (
    <AnimatePresence>
      {activeAlert && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[10000] max-w-md w-full p-4 rounded-xl border border-red-500/30 bg-black/90 backdrop-blur-xl shadow-[0_0_40px_rgba(239,68,68,0.3)] text-white"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20 text-red-400 shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-red-400 text-sm tracking-wide uppercase font-mono">
                  Rate Limit Shield Active [429]
                </h4>
                <button
                  onClick={() => setActiveAlert(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Excessive actions detected for <span className="font-mono text-white font-bold">{activeAlert.actionKey}</span>. 
                Cooling down security throttles.
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs font-mono bg-red-950/40 border border-red-800/40 px-3 py-1.5 rounded-lg text-red-200">
                <Clock className="w-4 h-4 text-red-400 animate-spin" />
                <span>Throttle cooldown: <strong className="text-white text-sm">{activeAlert.retryAfterSeconds}s</strong> remaining</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
