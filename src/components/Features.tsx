import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, Trophy, Cloud } from 'lucide-react';

const features = [
  {
    title: 'Retro Classics',
    desc: 'Play hand-crafted, beautifully modernized versions of the games you grew up with.',
    icon: Gamepad2,
    color: 'from-blue-400 to-purple-500'
  },
  {
    title: 'Zero Latency',
    desc: 'Built on raw HTML5 Canvas and React for 60FPS buttery smooth performance.',
    icon: Zap,
    color: 'from-accent-blue to-blue-500'
  },
  {
    title: 'High Scores',
    desc: 'Compete globally and track your personal bests across the entire library.',
    icon: Trophy,
    color: 'from-accent-purple to-pink-500'
  },
  {
    title: 'Cloud Saves',
    desc: 'Never lose your progress. Instant synchronization across all your devices.',
    icon: Cloud,
    color: 'from-purple-400 to-accent-blue'
  }
];

export default function Features() {
  return (
    <section className="py-32 bg-background relative px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white max-w-2xl">
            Features Built Specifically for Gamers.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="glass-card rounded-3xl p-10 relative overflow-hidden group hover:bg-white/10 transition-colors duration-500"
            >
              {/* Corner Icon Background */}
              <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${feature.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
              
              <feature.icon className="w-12 h-12 text-white mb-8 relative z-10" />
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{feature.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed relative z-10">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
