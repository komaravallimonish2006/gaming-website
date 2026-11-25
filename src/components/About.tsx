import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Absolute blurred background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]">
              Gaming is not just what it looks like. It's how it feels.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <p className="text-lg font-light text-gray-300 leading-relaxed">
              We built Nexus Hub because we believe web games deserve to feel as premium and responsive as native applications. Every classic arcade game and modern logic puzzle in our library has been rebuilt from the ground up for zero-latency gameplay.
            </p>
            
            <div className="flex gap-12 border-t border-white/10 pt-8 mt-4">
              <div>
                <h4 className="text-4xl font-black text-white tracking-tighter">10+</h4>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2 block">Games Available</span>
              </div>
              <div>
                <h4 className="text-4xl font-black text-white tracking-tighter">60</h4>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2 block">Frames per sec</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
