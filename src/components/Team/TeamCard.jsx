import { RevealOnScroll } from '../../hooks/useScrollReveal';
import ImageGallery from './ImageGallery';
import SocialLinks from './SocialLinks';

export default function TeamCard({ member, index, onOpenModal }) {
  const handleKeyDown = (e) => {
    if (e.target !== e.currentTarget && (e.target.tagName === 'A' || e.target.closest('a') || e.target.closest('button'))) {
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenModal?.(member);
    }
  };

  return (
    <RevealOnScroll delay={(index % 4) * 0.06} className="group relative flex w-full max-w-[290px]">
      {/* Ambient Glow behind the card (subtle on default, intensifies on hover) */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-brand-secondary via-brand-accent to-brand-stone opacity-[0.05] blur-2xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-105" />

      <article
        onClick={() => onOpenModal?.(member)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label={`View profile of ${member.name}, ${member.role}`}
        className="team-card flex h-full w-full flex-col overflow-hidden rounded-[24px] border p-3 cursor-pointer"
      >

        {/* Inset Photo Frame */}
        <ImageGallery member={member} index={index} />

        {/* Card Details Block */}
        <div className="flex flex-1 flex-col px-2.5 py-4">
          <p className="font-syne text-[16px] font-bold leading-tight text-white transition-colors duration-200 group-hover:text-brand-accent">
            {member.name}
          </p>
          <div className="mt-1 flex items-center gap-1.5 font-sans text-[12px] font-medium text-brand-secondary tracking-wide">
            <span>{member.role}</span>
            {member.level && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="text-[10px] font-semibold text-brand-accent bg-brand-accent/10 border border-brand-accent px-1.5 py-0.25 rounded-md">
                  {member.level}
                </span>
              </>
            )}
          </div>

          <SocialLinks member={member} />
        </div>
      </article>
    </RevealOnScroll>
  );
}
