import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiShield, FiSmartphone, FiCpu, FiGlobe, FiClock } from 'react-icons/fi';

const features = [
  { icon: FiZap, title: "Lightning Fast", desc: "Optimized for speed, ensuring your users never have to wait." },
  { icon: FiShield, title: "Bank-Grade Security", desc: "Top-tier data protection and encryption out of the box." },
  { icon: FiSmartphone, title: "Responsive Design", desc: "Flawless aesthetics and functionality across all devices." },
  { icon: FiCpu, title: "Modern Tech Stack", desc: "Built with industry-leading, scalable frameworks." },
  { icon: FiGlobe, title: "Global CDN", desc: "Lightning-fast content delivery anywhere in the world." },
  { icon: FiClock, title: "24/7 Support", desc: "Dedicated maintenance and support around the clock." },
];

const WhyUs = () => {
  // Duplicate the array once so the CSS transform translateX(-50%) loops seamlessly
  const marqueeItems = [...features, ...features];

  return (
    <section id="why-us" className="relative py-16 overflow-hidden bg-transparent">
      {/* Glow removed here to maintain seamless single-page flow */}

      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-syne text-4xl md:text-5xl font-bold mb-4 text-white">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Crevix</span>
          </h2>
          <p className="font-dm-sans text-white/70 max-w-2xl mx-auto text-lg">
            Experience the perfect blend of premium aesthetics, elite performance, and reliable engineering.
          </p>
        </motion.div>
      </div>

      {/* Single Prominent Marquee */}
      <div className="relative w-full overflow-hidden flex py-10 group z-10">
        {/* Pause animation on hover */}
        <div className="flex w-max animate-custom-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((feature, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] md:w-[350px] mx-4 p-8 rounded-2xl glass-surface light-sweep border border-white/5 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 cursor-pointer"
            >
              <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <feature.icon className="text-2xl text-purple-400" />
              </div>

              <h3 className="font-syne text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>

              <p className="font-dm-sans text-sm text-white/60 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Edge Gradients to fade the cards out smoothly */}
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default WhyUs;