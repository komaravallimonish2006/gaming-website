import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate the expanding circle mask size
  const maskSize = useTransform(scrollYProgress, [0, 0.8], ["0%", "150%"]);
  // Subtle background zoom
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-background">
      {/* Sticky container that stays in view while we scroll through the 300vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Base Layer: Sketch */}
        <motion.div 
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/hero_city_outline_fzg37d.jpg')`,
            scale 
          }}
        >
          <div className="absolute inset-0 bg-background/60" /> {/* Dark overlay for text readability */}
          <h1 className="relative z-10 text-5xl md:text-7xl lg:text-9xl font-black text-white/90 text-center tracking-tighter text-glow">
            IMAGINE<br />THE FUTURE
          </h1>
        </motion.div>

        {/* Top Layer: Realistic City (Revealed by mask) */}
        <motion.div 
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-cover bg-center z-20"
          style={{ 
            backgroundImage: `url('https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/hero_city_iglhwn.jpg')`,
            clipPath: useTransform(maskSize, v => `circle(${v} at 50% 50%)`),
            scale
          }}
        >
          <div className="absolute inset-0 bg-background/40" />
          <h1 className="relative z-10 text-5xl md:text-7xl lg:text-9xl font-black text-white text-center tracking-tighter text-glow">
            PLAY<br />THE REALITY
          </h1>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-white/50">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-white/50" />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
