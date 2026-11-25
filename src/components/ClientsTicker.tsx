import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Zap, Globe, Layers, Gamepad2 } from 'lucide-react';

const techStack = [
  { icon: ShieldCheck, name: 'Auth0 Security', detail: 'Zero-Trust Auth' },
  { icon: Cpu, name: 'WebAssembly', detail: 'Near-Native Speed' },
  { icon: Zap, name: 'HTML5 Canvas', detail: '60 FPS Direct Draw' },
  { icon: Globe, name: 'Vercel Edge', detail: 'Sub-5ms Latency' },
  { icon: Layers, name: 'WebGL 2.0', detail: 'Hardware Accel' },
  { icon: Gamepad2, name: 'Nexus Core', detail: 'Modern Retro' },
];

export default function ClientsTicker() {
  return (
    <section className="py-20 bg-background relative overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col items-center">
        <span className="px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-accent-blue/10 border border-accent-blue/20 text-accent-blue mb-4">
          ENGINE ARCHITECTURE
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-center text-white tracking-tight">
          Powered by Industry-Leading Modern Web Tech
        </h2>
      </div>

      <div className="relative w-full overflow-hidden flex">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Ticker Container */}
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {[...techStack, ...techStack, ...techStack].map((tech, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3.5 mx-8 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-accent-blue/30 transition-all hover:bg-white/[0.06] group cursor-default"
            >
              <tech.icon className="w-5 h-5 text-accent-blue group-hover:scale-110 transition-transform" />
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold tracking-tight text-white">{tech.name}</span>
                <span className="text-[10px] font-mono text-gray-400">{tech.detail}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
