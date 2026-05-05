import { ContainerScroll } from '../ui/ContainerScroll';

export default function ScrollShowcase() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle top fade for seamless blending with previous section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void to-transparent z-10" />

      <ContainerScroll
        titleComponent={
          <>
            <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">
              See It in Action
            </p>
            <h2 className="font-syne text-[32px] font-[800] leading-[1.05] text-white sm:text-[42px] md:text-[56px]">
              Websites That
              <br />
              <span className="text-gradient">Convert & Captivate.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] font-sans text-[14px] leading-[1.75] text-text-secondary md:text-[16px]">
              Scroll down to reveal a live prototype — built from scratch, deployed on Vercel, and ready for the real world.
            </p>
          </>
        }
      >
        <img
          src="/Sipscene-ss.png"
          alt="SipScene — Restaurant & Cloud Kitchen Prototype"
          className="mx-auto h-full w-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      {/* Subtle bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent z-10" />
    </section>
  );
}
