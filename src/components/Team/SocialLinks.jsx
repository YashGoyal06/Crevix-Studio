
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.32 9.32 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92v2.78c0 .27.18.59.69.49A10.15 10.15 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
    <path d="M6.94 8.96H3.77v10.12h3.17V8.96ZM5.35 4a1.84 1.84 0 1 0 0 3.68 1.84 1.84 0 0 0 0-3.68Zm13.88 9.55c0-3.04-1.62-4.86-4.08-4.86a3.5 3.5 0 0 0-3.16 1.73V8.96H8.95v10.12h3.17v-5.02c0-1.33.25-2.61 1.9-2.61 1.62 0 1.64 1.52 1.64 2.69v4.94h3.17l.4-5.53Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

export default function SocialLinks({ member }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="mt-4 flex items-center gap-2 pt-3 border-t border-white/[0.04]"
    >
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`${member.name} LinkedIn`}
          className="flex h-7.5 w-7.5 items-center justify-center rounded-full border border-white/[0.05] text-white/45 transition-all duration-300 hover:scale-105 hover:border-white/[0.2] hover:bg-white/[0.06] hover:text-white"
        >
          <LinkedinIcon />
        </a>
      )}
      {member.instagram && (
        <a
          href={member.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label={`${member.name} Instagram`}
          className="flex h-7.5 w-7.5 items-center justify-center rounded-full border border-white/[0.05] text-white/45 transition-all duration-300 hover:scale-105 hover:border-white/[0.2] hover:bg-white/[0.06] hover:text-white"
        >
          <InstagramIcon />
        </a>
      )}
      {member.github && (
        <a
          href={member.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`${member.name} GitHub`}
          className="flex h-7.5 w-7.5 items-center justify-center rounded-full border border-white/[0.05] text-white/45 transition-all duration-300 hover:scale-105 hover:border-white/[0.2] hover:bg-white/[0.06] hover:text-white"
        >
          <GithubIcon />
        </a>
      )}
    </div>
  );
}
