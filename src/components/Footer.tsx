import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Shield, Heart, MessageSquare, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="pt-28 pb-12 bg-[#050814] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Massive High-Impact CTA (Item #20: One clear CTA) */}
        <div className="flex flex-col items-center justify-center text-center mb-24 relative">
          <div className="absolute w-[500px] h-[300px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-xs font-mono mb-6"
          >
            <Shield className="w-3.5 h-3.5" />
            ENTER THE NEXT GENERATION WEB ARENA
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-10"
          >
            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-cyan-300 to-purple-400">PLAY?</span>
          </motion.h2>
          
          <a 
            href="/dashboard.html" 
            className="px-10 py-5 bg-white text-black text-base md:text-lg font-black tracking-wider uppercase rounded-full hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(0,240,255,0.4)] transition-all flex items-center gap-3 group"
          >
            <Gamepad2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Launch Game Catalog
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 text-xl font-black text-white mb-4">
              <span className="text-accent-blue">NEXUS</span> HUB
            </a>
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-4">
              The premium destination for beautifully engineered web games. Zero latency, retro classics, and modern web security.
            </p>
            <div className="flex items-center gap-3 text-gray-400">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors" aria-label="GitHub">
                <i class="fa-brands fa-github text-sm"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors" aria-label="Twitter">
                <i class="fa-brands fa-x-twitter text-sm"></i>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors" aria-label="Discord">
                <i class="fa-brands fa-discord text-sm"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Arcade Games</h4>
            <ul className="flex flex-col gap-3 text-gray-400 text-sm">
              <li><a href="/snake.html" className="hover:text-accent-blue transition-colors">Retro Snake</a></li>
              <li><a href="/2048.html" className="hover:text-accent-blue transition-colors">2048 Logic</a></li>
              <li><a href="/chess.html" className="hover:text-accent-blue transition-colors">Grandmaster Chess</a></li>
              <li><a href="/tictactoe.html" className="hover:text-accent-blue transition-colors">Neon Tic-Tac-Toe</a></li>
              <li><a href="/flappy.html" className="hover:text-accent-blue transition-colors">Flappy Bird</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Navigation</h4>
            <ul className="flex flex-col gap-3 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-accent-blue transition-colors">Home</a></li>
              <li><a href="/dashboard.html" className="hover:text-accent-blue transition-colors">Games Arena</a></li>
              <li><a href="/about.html" className="hover:text-accent-blue transition-colors">About Us</a></li>
              <li><a href="/contact.html" className="hover:text-accent-blue transition-colors">Contact Support</a></li>
              <li><a href="/dashboard.html" className="hover:text-accent-blue transition-colors">Operative Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Security & Compliance</h4>
            <ul className="flex flex-col gap-3 text-gray-400 text-sm">
              <li><a href="/privacy.html" className="hover:text-accent-blue transition-colors">Privacy Policy</a></li>
              <li><a href="/terms.html" className="hover:text-accent-blue transition-colors">Terms of Service</a></li>
              <li><span className="text-emerald-400 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Auth0 Verified</span></li>
              <li><span className="text-cyan-400 font-mono text-xs flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> Rate Shield 429 Active</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 mt-16 pt-8 text-xs text-gray-500">
          <p className="flex items-center gap-1">
            &copy; {new Date().getFullYear()} Nexus Gaming. Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for web gamers.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy.html" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms.html" className="hover:text-white transition-colors">Terms</a>
            <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
