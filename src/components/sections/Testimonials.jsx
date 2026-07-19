import { RevealOnScroll } from "../../hooks/useScrollReveal";

const testimonials = [
  {
    quote:
      "Crevix rebuilt our entire digital presence. What they delivered was miles beyond what we imagined possible.",
    name: "Aryan Mehta",
    role: "CEO at Luminary Co.",
  },
  {
    quote:
      "The team understood our vision instantly. Delivered ahead of schedule with insane quality. Recommend 100%.",
    name: "Sofia Reyes",
    role: "Head of Product, Vault",
  },
  {
    quote:
      "We went from invisible to industry-recognized in 90 days. Crevix is genuinely in a different league.",
    name: "James Okafor",
    role: "Founder, Orion Architecture",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden bg-transparent">

      {/* subtle background glow */}

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(184,140,58,.08), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6">

        <RevealOnScroll>

          <p
            className="
            mb-4
            uppercase
            tracking-[0.35em]
            text-[13px]
            text-[#B88C3A]"
          >
            WHAT CLIENTS SAY
          </p>

          <h2
            className="
            mb-16
            text-5xl
            md:text-6xl
            font-black
            leading-none
            text-[#F5F1E8]"
          >
            Words From
            <br />
            Real Clients.
          </h2>

        </RevealOnScroll>

        <div className="grid gap-8 md:grid-cols-3">

          {testimonials.map((t, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>

              <div
                className="
                h-full
                rounded-[28px]
                border
                border-[#B88C3A]/20
                bg-[#12382F]/55
                backdrop-blur-xl
                p-10

                transition-all
                duration-500

                hover:-translate-y-2
                hover:border-[#B88C3A]/50
                hover:shadow-[0_0_60px_rgba(184,140,58,.12)]
                "
              >

                {/* stars */}

                <div
                  className="
                  mb-8
                  text-[#B88C3A]
                  tracking-[6px]
                  text-sm"
                >
                  ★★★★★
                </div>

                {/* quote */}

                <p
                  className="
                  text-[#D8D2C4]
                  text-lg
                  leading-9
                  flex-1
                  mb-10"
                >
                  {t.quote}
                </p>

                {/* divider */}

                <div className="mb-6 h-px w-16 bg-[#B88C3A]/40" />

                {/* author */}

                <h3
                  className="
                  text-[#F5F1E8]
                  font-semibold
                  text-lg"
                >
                  {t.name}
                </h3>

                <p
                  className="
                  mt-2
                  text-[#D8D2C4]/60
                  text-sm"
                >
                  {t.role}
                </p>

              </div>

            </RevealOnScroll>
          ))}

        </div>

      </div>
    </section>
  );
}