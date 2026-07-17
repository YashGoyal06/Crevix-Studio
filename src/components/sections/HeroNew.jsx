import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const title = "CREVIX";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const letter = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroNew() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const glowX = useTransform(mouseX, [0, 1], ["30%", "70%"]);
  const glowY = useTransform(mouseY, [0, 1], ["15%", "45%"]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#082A22]"
    >
      {/* SINGLE LIGHT SOURCE — follows cursor, subtle */}
      <motion.div
        className="pointer-events-none absolute h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
        style={{
          left: glowX,
          top: glowY,
          background:
            "radial-gradient(circle, rgba(198,154,69,.16), transparent 70%)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 40 }}
      />

      {/* Vignette to ground the page */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(4,20,16,.6) 100%)",
        }}
      />

      {/* Faint structural grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,242,234,.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,242,234,.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(circle at center, black 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 55%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* EYEBROW */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 font-light uppercase tracking-[0.5em] text-[#C69A45]/80 text-xs md:text-sm"
        >
          Studio
        </motion.p>

        {/* MAIN TITLE */}
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
              className="font-black uppercase leading-none tracking-[-0.05em] text-[#F5F2EA] text-[clamp(4.5rem,13vw,11rem)]"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* DIVIDER */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 56 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 h-px bg-[#C69A45]/50"
        />

        {/* TAGLINE — lighter, serif companion voice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.8 }}
          className="mt-8 max-w-lg font-serif text-lg italic leading-relaxed text-[#D8D2C4]/75 md:text-xl"
        >
          Design and engineering, held to one standard.
        </motion.p>

        {/* CTAs — asymmetric: one solid, one text-link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.7 }}
          className="mt-14 flex flex-col items-center gap-6 sm:flex-row"
        >
          <Link to="/contact">
            <button className="rounded-full bg-[#C69A45] px-9 py-4 text-sm font-semibold uppercase tracking-wide text-[#082A22] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(198,154,69,.35)]">
              Start Your Project
            </button>
          </Link>

          <Link
            to="/portfolio"
            className="group relative flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-[#F5F2EA]"
          >
            View Our Work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#F5F2EA] transition-all duration-300 group-hover:w-full" />
          </Link>
        </motion.div>

        {/* TRUST STRIP */}
        
      </div>
    </section>
  );
}