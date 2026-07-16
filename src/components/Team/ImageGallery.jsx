
const getPhotoEnhanceClassName = (member) =>
  member.photoEnhance === 'strong'
    ? 'brightness-[1.05] contrast-[1.12] saturate-[1.08]'
    : 'brightness-[1.03] contrast-[1.05] saturate-[1.06]';

export default function ImageGallery({ member, index }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-neutral-900/50">
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          width="640"
          height="640"
          loading={index < 4 ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={index < 4 ? 'high' : 'auto'}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${getPhotoEnhanceClassName(member)}`}
          style={{
            objectPosition: member.photoPosition || 'center',
            transform: member.scale ? `scale(${member.scale})` : undefined,
          }}
        />
      ) : (
        <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${member.gradient} opacity-30`}>
          <span className="font-syne text-[48px] font-extrabold text-white tracking-tight">
            {member.initials}
          </span>
        </div>
      )}
      
      {/* Subtle overlay gradient over the bottom of the photo */}
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent" />
      
      {/* POC Badge */}
      {member.isPoc && (
        <div className="absolute right-2.5 top-2.5 z-20 flex items-center gap-1.5 rounded-full border border-white/[0.15] bg-black/70 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-lg ring-1 ring-white/10">
          <span className="h-1.2 w-1.2 rounded-full bg-brand-accent shadow-[0_0_8px_var(--color-accent)] animate-pulse" />
          POC
        </div>
      )}
    </div>
  );
}
