import { RevealOnScroll } from "../../hooks/useScrollReveal";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Crevix rebuilt our entire digital presence. What they delivered was miles beyond what we imagined possible.",
    name: "Aryan Mehta",
    role: "CEO at Luminary Co.",
    initials: "AM",
  },
  {
    quote:
      "The team understood our vision instantly. Delivered ahead of schedule with insane quality. Recommend 100%.",
    name: "Sofia Reyes",
    role: "Head of Product, Vault",
    initials: "SR",
  },
  {
    quote:
      "We went from invisible to industry-recognized in 90 days. Crevix is genuinely in a different league.",
    name: "James Okafor",
    role: "Founder, Orion Architecture",
    initials: "JO",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-[#0D3B2E]">

      {/* Ambient background glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(184,140,58,.16), transparent 70%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6">

        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="uppercase tracking-[0.4em] text-[#B88C3A] text-xs font-semibold mb-4">
              WHAT CLIENTS SAY
            </p>

            <h2 className="font-syne text-5xl md:text-7xl font-bold leading-[1.05] text-[#F4EFE5]">
              Words From{" "}
              <span className="bg-gradient-to-r from-[#D8D2C4] via-[#D2BC7A] to-[#B88C3A] bg-clip-text text-transparent">
                Real Clients.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-[#D8D2C4]/70">
              Discover how our bespoke engineering and design elevate ambitious brands worldwide.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-8 md:grid-cols-3 items-stretch">

          {testimonials.map((t, i) => (
            <RevealOnScroll key={i} delay={i * 0.12}>

              <div
                className="
                  group relative flex flex-col justify-between h-full
                  rounded-3xl border border-[#B88C3A]/30
                  bg-[#071D18]/70 backdrop-blur-xl
                  p-8 md:p-10
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:border-[#B88C3A]/70
                  hover:bg-[#071D18]/90
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(184,140,58,0.18)]
                "
              >
                {/* Decorative watermarked quote icon */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-[#B88C3A]/10 transition-colors duration-500 group-hover:text-[#B88C3A]/20 pointer-events-none" />

                <div>
                  {/* Glowing 5 Stars */}
                  <div className="flex items-center gap-1.5 mb-8">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-[#B88C3A] text-[#B88C3A] drop-shadow-[0_0_6px_rgba(184,140,58,0.5)]"
                      />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-[#D8D2C4] text-lg leading-relaxed font-sans mb-10 flex-1">
                    "{t.quote}"
                  </p>
                </div>

                <div>
                  {/* Divider line */}
                  <div className="mb-6 h-px w-14 bg-gradient-to-r from-[#B88C3A]/60 to-transparent" />

                  {/* Author Meta */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#B88C3A]/30 to-[#0D3B2E] border border-[#B88C3A]/40 flex items-center justify-center text-[#F4EFE5] font-syne font-bold text-sm shadow-md">
                      {t.initials}
                    </div>

                    <div>
                      <h3 className="text-[#F4EFE5] font-syne font-bold text-lg leading-tight">
                        {t.name}
                      </h3>
                      <p className="mt-0.5 text-[#B88C3A] text-sm font-medium">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </RevealOnScroll>
          ))}

        </div>

      </div>
    </section>
  );
}