import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Shield, User, LogOut, Menu, X, Sparkles, Gamepad2 } from 'lucide-react';
import { useNexusAuth } from '../auth/AuthProvider';
import Auth0Modal from './Auth0Modal';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { isAuthenticated, user, logout, isAuth0Configured } = useNexusAuth();

  // Scroll animations for navbar
  const navBg = useTransform(scrollY, [0, 50], ["rgba(10, 15, 36, 0.7)", "rgba(10, 15, 36, 0.95)"]);
  const navBorder = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0.1)", "rgba(0, 240, 255, 0.25)"]);

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <>
      <motion.header 
        style={{ 
          backgroundColor: navBg, 
          borderColor: navBorder,
          backdropFilter: 'blur(20px)'
        }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl rounded-2xl border transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-between px-5 md:px-7 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 text-lg md:text-xl font-black tracking-tight text-white group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-blue to-purple-600 flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-5 h-5 text-black" />
            </div>
            <span>
              <span className="text-accent-blue tracking-wider">NEXUS</span>
              <span className="text-white font-light tracking-wide">HUB</span>
            </span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-7">
            <a 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-white relative py-1 ${
                currentPath === '/' || currentPath.endsWith('index.html') ? 'text-white' : 'text-gray-300'
              }`}
            >
              Home
              {(currentPath === '/' || currentPath.endsWith('index.html')) && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-blue shadow-[0_0_8px_#00f0ff]" />
              )}
            </a>
            <a 
              href="/dashboard.html" 
              className={`text-sm font-medium transition-colors hover:text-white relative py-1 ${
                currentPath.includes('dashboard') ? 'text-white' : 'text-gray-300'
              }`}
            >
              Games Arena
              {currentPath.includes('dashboard') && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-blue shadow-[0_0_8px_#00f0ff]" />
              )}
            </a>
            <a 
              href="/about.html" 
              className={`text-sm font-medium transition-colors hover:text-white relative py-1 ${
                currentPath.includes('about') ? 'text-white' : 'text-gray-300'
              }`}
            >
              About
              {currentPath.includes('about') && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-blue shadow-[0_0_8px_#00f0ff]" />
              )}
            </a>
            <a 
              href="/contact.html" 
              className={`text-sm font-medium transition-colors hover:text-white relative py-1 ${
                currentPath.includes('contact') ? 'text-white' : 'text-gray-300'
              }`}
            >
              Contact
              {currentPath.includes('contact') && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-blue shadow-[0_0_8px_#00f0ff]" />
              )}
            </a>
          </nav>

          {/* Auth Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-3 pr-1.5 py-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white max-w-[120px] truncate">
                    {user.name || 'Operative'}
                  </span>
                </div>
                <a
                  href="/dashboard.html"
                  className="px-3 py-1 text-xs font-bold bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-blue rounded-full border border-accent-blue/30 transition-colors"
                >
                  Arena
                </a>
                <button
                  onClick={() => logout()}
                  title="Sign Out"
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => openAuth('login')}
                  className="px-4 py-2 text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/5 rounded-full transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-accent-blue" />
                  Log In
                </button>
                <button 
                  onClick={() => openAuth('register')}
                  className="px-5 py-2 text-xs font-black uppercase tracking-wider text-black bg-gradient-to-r from-accent-blue to-cyan-300 rounded-full hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Play Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className="md:hidden p-2 text-white hover:text-accent-blue transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-3 bg-[#0a0f24]/95 rounded-b-2xl"
            >
              <a 
                href="/" 
                className="py-2 text-sm font-medium text-gray-200 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/dashboard.html" 
                className="py-2 text-sm font-medium text-gray-200 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Games Arena
              </a>
              <a 
                href="/about.html" 
                className="py-2 text-sm font-medium text-gray-200 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="/contact.html" 
                className="py-2 text-sm font-medium text-gray-200 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                {isAuthenticated && user ? (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-semibold text-white">{user.name}</span>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => openAuth('login')}
                      className="w-full py-2.5 text-center text-sm font-medium text-white bg-white/10 rounded-xl"
                    >
                      Log In (Auth0)
                    </button>
                    <button 
                      onClick={() => openAuth('register')}
                      className="w-full py-2.5 text-center text-sm font-bold text-black bg-accent-blue rounded-xl"
                    >
                      Play Free
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Auth Modal */}
      <Auth0Modal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </>
  );
}
