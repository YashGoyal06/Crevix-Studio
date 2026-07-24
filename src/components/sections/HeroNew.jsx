import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { Link } from "react-router-dom";

const title = "CREVIX";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const letter = {
  hidden: {
    opacity: 0,
    x: 120,
    rotate: 8,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroNew() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const glowX = useTransform(mouseX, [0, 1], ["30%", "70%"]);
  const glowY = useTransform(mouseY, [0, 1], ["18%", "55%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#082A22]"
    >
      {/* ========================================================= */}
      {/* CURSOR SPOTLIGHT */}
      {/* ========================================================= */}

      <motion.div
        className="pointer-events-none absolute h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: glowX,
          top: glowY,
          background:
            "radial-gradient(circle, rgba(198,154,69,.20), transparent 70%)",
        }}
      />

      {/* ========================================================= */}
      {/* FLOATING GOLD BLOB */}
      {/* ========================================================= */}

      <motion.div
        animate={{
          x: [0, 60, -20, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-44 top-10 h-[520px] w-[520px] rounded-full blur-[180px]"
        style={{
          background: "rgba(198,154,69,.12)",
        }}
      />

      {/* ========================================================= */}
      {/* GREEN BLOB */}
      {/* ========================================================= */}

      <motion.div
        animate={{
          x: [0, -70, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-44 bottom-0 h-[700px] w-[700px] rounded-full blur-[220px]"
        style={{
          background: "rgba(22,80,65,.45)",
        }}
      />

      {/* ========================================================= */}
      {/* VIGNETTE */}
      {/* ========================================================= */}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,.55) 100%)",
        }}
      />

      {/* ========================================================= */}
      {/* GRID */}
      {/* ========================================================= */}

      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
              linear-gradient(rgba(255,255,255,.10) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.10) 1px, transparent 1px)
            `,
          backgroundSize: "90px 90px",
        }}
      />

      {/* ========================================================= */}
      {/* GRAIN */}
      {/* ========================================================= */}

      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.6) .6px, transparent .6px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* ========================================================= */}
      {/* OUTLINE CREVIX */}
      {/* ========================================================= */}

      <motion.h1
        initial={{
          opacity: 0,
          scale: 1.1,
        }}
        animate={{
          opacity: 0.04,
          scale: 1,
        }}
        transition={{
          duration: 2,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          text-[22vw]
          font-black
          uppercase
          tracking-[-0.08em]
          text-transparent
          [-webkit-text-stroke:1px_rgba(255,255,255,.18)]
          "
      >
        CREVIX
      </motion.h1>

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">

        {/* ROTATING RINGS */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-[620px] w-[620px] rounded-full border border-[#C69A45]/10"
        />

        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-[760px] w-[760px] rounded-full border border-white/[0.03]"
        />

        {/* STUDIO LABEL */}

        <motion.p
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mb-8 uppercase tracking-[0.7em] text-xs text-[#C69A45]"
        >
          STUDIO
        </motion.p>

        {/* CREVIX TITLE */}

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative flex overflow-hidden"
        >
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letter}
              whileHover={{
                y: -8,
                color: "#C69A45",
                transition: { duration: 0.25 },
              }}
              className="
      font-black
      uppercase
      leading-none
      tracking-[-0.06em]
      text-[#F5F2EA]
      text-[clamp(5rem,14vw,11rem)]
      cursor-default
      select-none
    "
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* GOLD DIVIDER */}

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 90, opacity: 1 }}
          transition={{
            delay: 1.0,
            duration: 0.8,
          }}
          className="mt-10 flex items-center justify-center"
        >
          <div className="h-px w-8 bg-[#C69A45]/35" />

          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="mx-3 h-2 w-2 rounded-full bg-[#C69A45]"
          />

          <div className="h-px w-8 bg-[#C69A45]/35" />
        </motion.div>

        {/* TAGLINE */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.2,
            duration: 0.8,
          }}
          className="
    mt-10
    max-w-2xl
    text-lg
    italic
    leading-relaxed
    text-[#D8D2C4]/75
    md:text-2xl
  "
        >
          Engineering premium digital experiences
          <br />
          for ambitious brands.
        </motion.p>

        {/* CTA */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.45,
            duration: 0.8,
          }}
          className="mt-16 flex flex-col items-center gap-6 sm:flex-row"
        >
          <Link to="/contact">
            <motion.button
              whileHover={{
                y: -4,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
        rounded-full
        bg-[#C69A45]
        px-10
        py-4
        text-sm
        font-semibold
        uppercase
        tracking-[0.08em]
        text-[#082A22]
        shadow-[0_15px_50px_rgba(198,154,69,.25)]
      "
            >
              Start Your Project
            </motion.button>
          </Link>

          <Link
            to="/portfolio"
            className="
      group
      flex
      items-center
      gap-3
      uppercase
      tracking-[0.08em]
      text-[#F5F2EA]
      text-sm
    "
          >
            View Our Work

            <motion.span
              animate={{
                x: [0, 6, 0],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
              }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>

        {/* SCROLL INDICATOR */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 2,
          }}
          className="
    absolute
    bottom-10
    left-1/2
    -translate-x-1/2
    flex
    flex-col
    items-center
  "
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
            }}
            className="text-[#C69A45] text-xl"
          >
            ↓
          </motion.div>

          <p className="mt-2 text-[10px] uppercase tracking-[0.45em] text-[#D8D2C4]/45">

          </p>
        </motion.div>

        {/* BOTTOM MARQUEE */}

        <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/5 py-5">
          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex whitespace-nowrap text-[#C69A45]/80 text-sm uppercase tracking-[0.35em]"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex">
                <span className="mx-8">Web Development</span>
                <span className="mx-8">•</span>

                <span className="mx-8">UI / UX</span>
                <span className="mx-8">•</span>

                <span className="mx-8">Brand Identity</span>
                <span className="mx-8">•</span>

                <span className="mx-8">Digital Strategy</span>
                <span className="mx-8">•</span>

                <span className="mx-8">Creative Technology</span>
                <span className="mx-8">•</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

    </section>
  );
}