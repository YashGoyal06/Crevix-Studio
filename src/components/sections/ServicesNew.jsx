import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Layers3,
} from "lucide-react";

const services = [
  {
    icon: <Code2 size={26} strokeWidth={1.8} />,
    ghostIcon: <Code2 size={170} strokeWidth={0.6} />,
    number: "01",
    title: "Website Development",
    desc:
      "Blazing-fast, responsive websites engineered for performance, scalability and conversions.",
  },
  {
    icon: <Palette size={26} strokeWidth={1.8} />,
    ghostIcon: <Palette size={170} strokeWidth={0.6} />,
    number: "02",
    title: "UI / UX Design",
    desc:
      "Research-driven interfaces that create memorable experiences while increasing engagement.",
  },
  {
    icon: <Layers3 size={26} strokeWidth={1.8} />,
    ghostIcon: <Layers3 size={170} strokeWidth={0.6} />,
    number: "03",
    title: "Brand Identity",
    desc:
      "Modern visual systems helping ambitious brands establish authority and recognition.",
  },
];

export default function ServicesNew() {
  return (
    <section className="relative overflow-hidden bg-[#0D3B2E] py-36">

      {/* ================================= */}
      {/* BACKGROUND GLOW */}
      {/* ================================= */}

      <motion.div
        animate={{
          x: [0, 90, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -left-44
        top-10
        h-[650px]
        w-[650px]
        rounded-full
        blur-[190px]"
        style={{
          background: "rgba(200,154,66,.16)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      <motion.div
        animate={{
          x: [0, -70, 20, 0],
          y: [0, 50, -30, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -right-56
        bottom-0
        h-[720px]
        w-[720px]
        rounded-full
        blur-[180px]
        pointer-events-none"
        style={{
          background: "rgba(25,92,70,.42)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* ================================= */}
      {/* GRID */}
      {/* ================================= */}

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "95px 95px",
        }}
      />

      {/* ================================= */}
      {/* GRAIN */}
      {/* ================================= */}

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>

        <rect
          width="100%"
          height="100%"
          filter="url(#grain)"
        />
      </svg>

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-8">

        {/* TOP LABEL */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: .7,
          }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-12 bg-[#C89A42]/70" />

          <p
            className="
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.45em]
            text-[#C89A42]"
          >
            OUR SERVICES
          </p>
        </motion.div>

        {/* HEADING */}

        <motion.h2
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: .1,
            duration: .7,
          }}
          className="
          mt-8
          max-w-5xl
          font-black
          uppercase
          tracking-[-0.05em]
          leading-[0.92]
          text-[#F5F2EA]
          text-5xl
          md:text-7xl
          lg:text-8xl"
        >
          DIGITAL PRODUCTS
          <br />
          BUILT TO DOMINATE.
        </motion.h2>

        {/* SUBTEXT */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: .25,
          }}
          className="
          mt-8
          max-w-2xl
          text-lg
          leading-8
          text-[#D8D2C4]/72"
        >
          We combine strategy, design and engineering to build
          digital experiences that look exceptional and perform
          even better.
        </motion.p>

        {/* CARDS */}

        <div className="mt-24 grid gap-8 lg:grid-cols-3 items-start">

          {services.map((service, index) => (

            <motion.div
              key={service.title}
              initial={{
                opacity:0,
                y:60,
              }}
              whileInView={{
                opacity:1,
                y:0,
              }}
              viewport={{
                once:true,
              }}
              transition={{
                delay:index*.15,
                duration:.65,
              }}
              whileHover={{
                y:-10,
              }}
              className="
              group
              relative
              overflow-hidden
              rounded-[34px]
              border
              border-white/5
              bg-gradient-to-b
              from-[#184A39]
              to-[#12372C]
              p-10
              transition-all
              duration-500
              hover:border-[#C89A42]/40
              hover:shadow-[0_25px_70px_rgba(0,0,0,.35)]
              "
              
            >
                {/* Hover Glow */}

<div
  className="
  absolute
  inset-0
  opacity-0
  transition-opacity
  duration-700
  group-hover:opacity-100"
  style={{
    background:
      "radial-gradient(circle at top right, rgba(200,154,66,.12), transparent 55%)",
  }}
/>

{/* Animated Top Border */}

<span
  className="
  absolute
  left-0
  top-0
  h-px
  w-full
  origin-left
  scale-x-0
  bg-gradient-to-r
  from-transparent
  via-[#C89A42]
  to-transparent
  transition-transform
  duration-700
  group-hover:scale-x-100"
/>

{/* Background Number */}

<div
  className="
  absolute
  right-8
  top-6
  text-[90px]
  font-black
  leading-none
  tracking-[-0.08em]
  text-[#C89A42]/6
  transition-all
  duration-500
  group-hover:text-[#C89A42]/10"
>
  {service.number}
</div>

{/* Ghost Icon */}

<div
  className="
  pointer-events-none
  absolute
  -right-6
  -bottom-6
  text-[#C89A42]
  opacity-[0.05]
  transition-all
  duration-500
  group-hover:scale-110
  group-hover:opacity-[0.09]"
>
  {service.ghostIcon}
</div>

{/* Icon */}

<div
  className="
  relative
  flex
  h-14
  w-14
  items-center
  justify-center
  rounded-full
  border
  border-[#C89A42]/25
  text-[#C89A42]
  backdrop-blur-md
  transition-all
  duration-500
  group-hover:rotate-6
  group-hover:border-[#C89A42]/50"
>
  {service.icon}
</div>

{/* Title */}

<h3
  className="
  relative
  mt-10
  text-[30px]
  font-bold
  uppercase
  tracking-[-0.03em]
  text-[#F5F2EA]"
>
  {service.title}
</h3>

{/* Description */}

<p
  className="
  relative
  mt-6
  text-[15px]
  leading-8
  text-[#D8D2C4]/72"
>
  {service.desc}
</p>

{/* Divider */}

<div className="relative mt-10 h-px w-full bg-white/5">

  <motion.div
    whileInView={{ width: "100%" }}
    viewport={{ once: true }}
    transition={{
      delay: .3,
      duration: .8,
    }}
    className="h-full bg-[#C89A42]/30"
    style={{ width: 0 }}
  />

</div>

{/* Footer */}

<div
  className="
  relative
  mt-8
  flex
  items-center
  justify-between"
>

  <span
    className="
    text-[11px]
    uppercase
    tracking-[0.35em]
    text-[#C89A42]"
  >
    Explore
  </span>

  <motion.div
    whileHover={{ x: 6 }}
    transition={{
      duration: .25,
    }}
    className="
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-full
    border
    border-[#C89A42]/20
    text-[#C89A42]"
  >
    →
  </motion.div>

</div>

</motion.div>

))}

</div>

</div>

</section>

);
}