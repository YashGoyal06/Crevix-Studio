import React from "react";
import { motion } from "framer-motion";
import {
  FiZap,
  FiShield,
  FiSmartphone,
  FiCpu,
  FiGlobe,
  FiClock,
} from "react-icons/fi";

const features = [
  {
    icon: FiZap,
    title: "Lightning Fast",
    desc: "Optimized for speed, ensuring your users never have to wait.",
  },
  {
    icon: FiShield,
    title: "Bank-Grade Security",
    desc: "Enterprise-grade security with encrypted infrastructure.",
  },
  {
    icon: FiSmartphone,
    title: "Responsive Design",
    desc: "Flawless experiences across every screen and device.",
  },
  {
    icon: FiCpu,
    title: "Modern Tech Stack",
    desc: "Built with scalable technologies for long-term growth.",
  },
  {
    icon: FiGlobe,
    title: "Global CDN",
    desc: "Worldwide delivery for blazing-fast performance.",
  },
  {
    icon: FiClock,
    title: "24/7 Support",
    desc: "Dedicated maintenance and rapid assistance whenever needed.",
  },
];

export default function WhyUsNew() {
  const marqueeItems = [...features, ...features];

  return (
    <section
      id="why-us"
      className="relative overflow-hidden py-28 bg-[#071D18]"
    >
      {/* Background Glow */}

      <div
        className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(184,140,58,.10), transparent 72%)",
        }}
      />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
        `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Header */}

      <div className="relative z-10 container mx-auto px-6 mb-20">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="uppercase tracking-[0.4em] text-[#B88C3A] text-xs mb-5">
            WHY CREVIX
          </p>

          <h2 className="font-syne text-5xl md:text-7xl font-bold leading-[1] text-[#F4EFE5]">
            Built for{" "}
            <span className="bg-gradient-to-r from-[#D8D2C4] via-[#D2BC7A] to-[#B88C3A] bg-clip-text text-transparent">
              ambitious
            </span>{" "}
            brands.
          </h2>

          <p className="mt-8 text-lg leading-8 text-[#D8D2C4]/70 max-w-2xl mx-auto">
            Every website we build combines premium design,
            performance engineering, and scalable architecture
            to help brands grow with confidence.
          </p>
        </motion.div>
      </div>

      {/* Marquee */}

      <div className="relative overflow-hidden group z-10">

        <div className="flex w-max animate-custom-marquee hover:[animation-play-state:paused]">

          {marqueeItems.map((feature, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{ duration: .35 }}
              className="flex-shrink-0
              w-[320px]
              md:w-[360px]
              mx-5
              rounded-[28px]
              border
              border-[#D8D2C4]/10
              bg-gradient-to-br
              from-[#0E2B23]
              to-[#081814]
              p-9
              backdrop-blur-xl"
            >

              <div className="flex items-center justify-between mb-10">

                <div className="h-14 w-14 rounded-full border border-[#B88C3A]/20 bg-[#173B31] flex items-center justify-center">

                  <feature.icon
                    className="text-[#B88C3A]"
                    size={25}
                  />

                </div>

                <span className="text-[#B88C3A] text-xl">
                  →
                </span>

              </div>

              <h3 className="font-syne text-2xl font-bold text-[#F4EFE5] mb-5">
                {feature.title}
              </h3>

              <p className="text-[#D8D2C4]/65 leading-8">
                {feature.desc}
              </p>

            </motion.div>

          ))}

        </div>

        {/* Left Fade */}

        <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-[#071D18] to-transparent pointer-events-none" />

        {/* Right Fade */}

        <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-[#071D18] to-transparent pointer-events-none" />

      </div>
    </section>
  );
}