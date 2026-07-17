import { Link } from "react-router-dom";
import { RevealOnScroll } from "../../hooks/useScrollReveal";
import { ProjectCard3D } from "../ui/ProjectCard3D";
import { projects } from "../../data/projects";

export default function FeaturedProjects() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* ================= BACKGROUND ================= */}

      {/* Main Emerald */}
      <div className="absolute inset-0 bg-[#082A22]" />

      {/* Moving Glow Left */}
      <div
        className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(26,88,70,.45), transparent 70%)",
        }}
      />

      {/* Moving Glow Right */}
      <div
        className="absolute right-[-180px] bottom-0 h-[600px] w-[600px] rounded-full blur-[180px]"
        style={{
          background:
            "radial-gradient(circle, rgba(198,154,69,.15), transparent 70%)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
          `,
          backgroundSize: "90px 90px",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(#fff 0.7px, transparent 0.7px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 mx-auto max-w-[1320px] px-6">

        <RevealOnScroll>

          {/* Label */}

          <div className="mb-5 flex items-center gap-4">

            <span className="h-px w-14 bg-[#C69A45]" />

            <p className="uppercase tracking-[0.45em] text-[#C69A45] text-xs font-medium">
               WORK WE'RE PROUD OF 
            </p>

          </div>

          {/* Heading */}

          <div className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <h2
                className="
                text-[#F5F2EA]
                font-black
                leading-none
                tracking-[-0.05em]
                text-[clamp(3rem,6vw,5.5rem)]
                "
              >
                Crafted To
                <br />
                Stand Apart.
              </h2>

            </div>

            <div className="max-w-md">

              <p className="leading-8 text-[#D8D2C4]/75 text-lg">
                Every interface, every interaction and every animation is
                carefully engineered to help ambitious brands leave a lasting
                impression.
              </p>

            </div>

          </div>

        </RevealOnScroll>

        {/* ================= PROJECTS ================= */}

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

          {projects.slice(0, 3).map((project, i) => (
            <RevealOnScroll key={project.id} delay={i * 0.12}>
              <ProjectCard3D project={project} />
            </RevealOnScroll>
          ))}

        </div>

        {/* ================= BUTTON ================= */}

        <RevealOnScroll>

          <div className="mt-24 flex justify-center">

            <Link
              to="/portfolio"
              className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#C69A45]/40
              bg-[#0F3B31]/60
              backdrop-blur-xl
              px-8
              py-4
              text-[#F5F2EA]
              transition-all
              duration-300
              hover:bg-[#C69A45]
              hover:text-[#082A22]
              hover:border-[#C69A45]
              hover:shadow-[0_0_40px_rgba(198,154,69,.25)]
              "
            >
              View Full Portfolio

              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>

            </Link>

          </div>

        </RevealOnScroll>

      </div>

    </section>
  );
}