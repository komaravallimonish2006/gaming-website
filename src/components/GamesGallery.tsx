import React, { useState } from 'react';
import { motion } from 'framer-motion';

const games = [
  {
    title: 'Snake',
    category: 'Retro Arcade',
    url: '/snake.html',
    bg: '/images/snake.png'
  },
  {
    title: '2048',
    category: 'Logic Puzzle',
    url: '/2048.html',
    bg: '/images/2048.png'
  },
  {
    title: 'Flappy Bird',
    category: 'Action',
    url: '/flappy.html',
    bg: '/images/flappy.png'
  },
  {
    title: 'Dino Runner',
    category: 'Endless Runner',
    url: '/dino.html',
    bg: '/images/dino.png'
  },
  {
    title: 'Pong',
    category: 'Classic Multiplayer',
    url: '/pong.html',
    bg: '/images/pong.png'
  }
];

export default function GamesGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-background relative">
      <div className="max-w-[1400px] mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-end mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            Our Games
          </h2>
          <a href="/dashboard.html" className="text-accent-blue font-medium hover:text-white transition-colors">
            View All Games &rarr;
          </a>
        </motion.div>

        {/* Expanding Flex Gallery */}
        <div className="flex flex-col md:flex-row h-[600px] md:h-[500px] gap-2 w-full">
          {games.map((game, i) => {
            const isActive = hoveredIndex === i;
            
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  flex: isActive ? 4 : 0.8,
                }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                style={{ flexBasis: '10%' }}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${game.bg})` }}
                />
                
                {/* Overlay Mask */}
                <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? 'bg-black/40' : 'bg-black/70'}`} />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-2"
                  >
                    <span className="text-xs font-bold text-accent-blue uppercase tracking-widest">{game.category}</span>
                    <h3 className="text-3xl font-black text-white tracking-tighter">{game.title}</h3>
                    <a 
                      href={game.url}
                      className="mt-4 px-6 py-2 bg-white text-black text-sm font-bold rounded-full w-max hover:scale-105 active:scale-95 transition-transform"
                    >
                      Play Now
                    </a>
                  </motion.div>
                </div>
                
                {/* Vertical Title (when collapsed) */}
                <motion.div
                  animate={{ opacity: isActive ? 0 : 1 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 md:-rotate-90 md:origin-bottom-left md:left-6 whitespace-nowrap text-white/50 font-bold tracking-widest uppercase"
                >
                  {game.title}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
