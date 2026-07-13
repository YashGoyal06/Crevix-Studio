import { RevealOnScroll } from '../../hooks/useScrollReveal';
import ImageGallery from './ImageGallery';
import SocialLinks from './SocialLinks';

export default function TeamCard({ member, index }) {
  return (
    <RevealOnScroll delay={(index % 4) * 0.06} className="group relative flex w-full max-w-[290px]">
      {/* Ambient Glow behind the card (subtle on default, intensifies on hover) */}
      <div className={`absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br ${member.gradient} opacity-[0.05] blur-2xl transition-all duration-500 group-hover:opacity-30 group-hover:scale-105`} />
      
      <article className="flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-white/[0.05] bg-[#0A0A0A]/40 backdrop-blur-md p-3 transition-all duration-500 hover:border-white/[0.12] hover:bg-[#0A0A0A]/75">
        
        {/* Inset Photo Frame */}
        <ImageGallery member={member} index={index} />

        {/* Card Details Block */}
        <div className="flex flex-1 flex-col px-2.5 py-4">
          <p className="font-syne text-[16px] font-bold leading-tight text-white transition-colors duration-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80">
            {member.name}
          </p>
          <div className="mt-1 flex items-center gap-1.5 font-sans text-[12px] font-medium text-text-secondary tracking-wide">
            <span>{member.role}</span>
            {member.experience && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="text-[10px] font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-1.5 py-0.25 rounded-md">
                  {member.experience}
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
