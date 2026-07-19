import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Layers3,
} from "lucide-react";

const services = [
  {
    icon: <Code2 size={26} strokeWidth={1.6} />,
    ghostIcon: <Code2 size={140} strokeWidth={0.8} />,
    title: "Website Development",
    desc: "Blazing-fast, responsive websites engineered for performance, scalability, and conversions."
  },
  {
    icon: <Palette size={26} strokeWidth={1.6} />,
    ghostIcon: <Palette size={140} strokeWidth={0.8} />,
    title: "UI / UX Design",
    desc: "Research-driven interfaces that feel effortless while creating memorable digital experiences."
  },
  {
    icon: <Layers3 size={26} strokeWidth={1.6} />,
    ghostIcon: <Layers3 size={140} strokeWidth={0.8} />,
    title: "Brand Identity",
    desc: "Modern visual systems that help ambitious brands stand apart in competitive markets."
  }
];

export default function ServicesNew() {
  return (
    <section className="relative overflow-hidden bg-[#0D3B2E] py-32">

      {/* Background Glow */}

      <div
        className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full blur-[180px] opacity-20"
        style={{ background: "#C89A42" }}
      />
      <div
        className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full blur-[160px] opacity-[0.12]"
        style={{ background: "#3A7A5E" }}
      />

      {/* Grain */}

      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "90px 90px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-8">

        {/* Top Label */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-10 bg-[#C89A42]/60" />
          <p
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="uppercase tracking-[0.35em] text-xs font-medium text-[#C89A42]"
          >
            What We Do
          </p>
        </motion.div>

        {/* Heading */}

        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: .1 }}
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="mt-8 max-w-4xl bg-gradient-to-b from-[#F2EDE1] to-[#C9C1AE] bg-clip-text font-semibold italic leading-[0.98] text-transparent
          text-5xl
          md:text-7xl"
        >
          Digital products,
          <br />
          built to dominate.
        </motion.h2>

        {/* Cards */}

        <div className="mt-24 grid gap-8 lg:grid-cols-3">

          {services.map((service, index) => (

            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * .15,
                duration: .6,
              }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[30px]
              border
              border-white/5
              bg-[#154735]
              p-10
              transition-all
              duration-500
              hover:border-[#C89A42]/40
              hover:bg-[#184D3B]
              hover:shadow-[0_25px_70px_rgba(0,0,0,.28)]"
            >

              {/* Drawing-in top border on hover */}

              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#C89A42] to-transparent transition-transform duration-700 group-hover:scale-x-100" />

              {/* Ghost watermark icon */}

              <div className="pointer-events-none absolute -right-6 -top-6 text-[#C89A42] opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.1]">
                {service.ghostIcon}
              </div>

              {/* Icon badge */}

              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#C89A42]/25 text-[#C89A42] transition-colors duration-500 group-hover:border-[#C89A42]/50">
                {service.icon}
              </div>

              {/* Title */}

              <h3
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="relative mt-10 text-3xl font-semibold text-[#E8E2D6]"
              >
                {service.title}
              </h3>

              {/* Description */}

              <p className="relative mt-6 leading-8 text-[#D8D2C4]/70">
                {service.desc}
              </p>

              {/* Hover Link */}

              <div
                className="
                relative
                mt-12
                flex
                items-center
                justify-between
                text-[#C89A42]
                opacity-0
                translate-y-3
                transition-all
                duration-500
                group-hover:opacity-100
                group-hover:translate-y-0
              "
              >
                <span
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                  className="tracking-widest uppercase text-xs font-medium"
                >
                  Explore
                </span>

                <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}