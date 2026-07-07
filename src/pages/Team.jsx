import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';

const teamPhoto = (filename) => `/team/${filename}`;

const team = [
  // — Founder —
  {
    name: 'Yash Goyal',
    role: 'Founder/CEO',
    initials: 'YG',
    photo: teamPhoto('yash-goyal.webp'),
    photoPosition: '50% 28%',
    linkedin: 'https://www.linkedin.com/in/yashgoyal06/',
    github: 'https://github.com/YashGoyal06',
    gradient: 'from-[#6D28D9]/70 via-[#BE185D]/60 to-[#EA580C]/70',
  },
  // — Technical —
  {
    name: 'Raj Sachan',
    role: 'Technical Department',
    initials: 'RS',
    photo: teamPhoto('raj-sachan.webp'),
    photoPosition: '50% 24%',
    linkedin: 'https://www.linkedin.com/in/rajsachan/',
    github: 'https://github.com/rawwwj00',
    gradient: 'from-[#0EA5E9]/60 via-[#6D28D9]/55 to-[#14B8A6]/60',
    isPoc: true,
  },
  {
    name: 'Kriti Tripathi',
    role: 'Technical Department',
    initials: 'KT',
    photo: teamPhoto('kriti.webp'),
    photoPosition: '50% 12%',
    linkedin: 'https://www.linkedin.com/in/kriti-tripathi/',
    github: 'https://github.com/kriti2818',
    instagram: 'https://www.instagram.com/_kritayy',
    gradient: 'from-[#0EA5E9]/60 via-[#6D28D9]/55 to-[#14B8A6]/60',
  },
  {
    name: 'Yashi Pandey',
    role: 'Technical Department',
    initials: 'TP',
    photo: teamPhoto('Yashi.webp'),
    photoPosition: '50% 50%',
    linkedin: 'https://www.linkedin.com/in/yashi-pandey-31b659323/',
    github: 'https://github.com/yaship6',
    instagram: 'https://instagram.com/yashi._.6',
    gradient: 'from-[#0EA5E9]/60 via-[#6D28D9]/55 to-[#14B8A6]/60',
    isPoc: true,
  },

  {
    name: 'Rishika Jat',
    role: 'Technical Department',
    initials: 'RJ',
    photo: teamPhoto('rishika.webp'),
    photoPosition: '50% 20%',
    linkedin: 'https://linkedin.com/in/rishika-jat',
    instagram: 'https://www.instagram.com/rishika_tada?igsh=YnEyb3lwNDB5Yzkw&utm_source=qr',
    github: 'https://github.com/Rishika-jat',
    gradient: 'from-[#0EA5E9]/60 via-[#6D28D9]/55 to-[#14B8A6]/60',
  },
  {
    name: 'Farhaan Malik',
    role: 'Technical Department',
    initials: 'FM',
    photo: teamPhoto('farhan.webp'),
    photoPosition: '50% 30%',
    scale: 1.05,
    linkedin: 'https://www.linkedin.com/in/farhaanmalik/',
    instagram: 'https://www.instagram.com/0xfarhaanmalik',
    github: 'https://github.com/farhaandev',
    gradient: 'from-[#0EA5E9]/60 via-[#6D28D9]/55 to-[#14B8A6]/60',
  },
  {
    name: 'Tanisha Mathur',
    role: 'Technical Department',
    initials: 'TM',
    photo: teamPhoto('tanisha.webp'),
    photoPosition: '50% 30%',
    scale: 1.15,
    linkedin: 'https://www.linkedin.com/in/tanisha-mathur-442658280',
    instagram: 'https://www.instagram.com/tanisham._',
    github: 'https://github.com/tanisham2',
    gradient: 'from-[#0EA5E9]/60 via-[#6D28D9]/55 to-[#14B8A6]/60',
  },
  {
    name: 'Alisha Saxena',
    role: 'Technical Department',
    initials: 'AS',
    photo: teamPhoto('alisha.webp'),
    photoPosition: '50% 50%',
    linkedin: 'https://www.linkedin.com/in/alisha09/',
    instagram: 'https://www.instagram.com/Draftsbyalisha',
    github: 'https://github.com/alisha09',
    gradient: 'from-[#0EA5E9]/60 via-[#6D28D9]/55 to-[#14B8A6]/60',
  },
  // — Graphic Designers —
  {
    name: 'Anushka',
    role: 'Graphic Designer',
    initials: 'A',
    photo: teamPhoto('anushka.webp'),
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/anushka-09a694357/',
    github: 'https://github.com/anushkaa-star',
    gradient: 'from-[#6D28D9]/65 via-[#0EA5E9]/45 to-[#BE185D]/60',
  },
  {
    name: 'Archi Israni',
    role: 'Graphic Designer',
    initials: 'AI',
    photo: teamPhoto('archi.webp'),
    photoPosition: '50% 50%',
    linkedin: 'https://www.linkedin.com/in/archi-israni',
    instagram: 'https://www.instagram.com/archiayy/',
    github: 'https://github.com/archiay',
    gradient: 'from-[#6D28D9]/65 via-[#0EA5E9]/45 to-[#BE185D]/60',
    isPoc: false,
  },
  {
    name: 'Pragalbha Padhy',
    role: 'Graphic Designer',
    initials: 'PP',
    photo: teamPhoto('pragalbha-padhy.webp'),
    photoPosition: '50% 34%',
    linkedin: 'https://www.linkedin.com/in/pragalbha-padhy-087bb6364',
    github: 'https://github.com/pragalbha25bai11493-ai',
    instagram: 'https://www.instagram.com/_.pragalbha._/',
    gradient: 'from-[#BE185D]/60 via-[#EA580C]/50 to-[#FACC15]/45',
    isPoc: true,
  },
  {
    name: 'Shweta Gupta',
    role: 'Graphic Designer',
    initials: 'SG',
    photo: teamPhoto('shweta.webp'),
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/shw3tagupta/',
    instagram: 'https://www.instagram.com/shweta.zip/',
    gradient: 'from-[#8B5CF6]/60 via-[#D946EF]/55 to-[#FF007F]/60',
    isPoc: true,
  },
  // — Client Acquisition —
  {
    name: 'Abhimanyu Manojawas',
    role: 'Client Acquisition Team',
    initials: 'AM',
    photo: teamPhoto('Abhimanyu.webp'),
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/abhimanyu-manojawas-50687528b',
    instagram: 'https://www.instagram.com/manyu_elayath_',
    gradient: 'from-[#BE185D]/65 via-[#6D28D9]/55 to-[#F97316]/60',
    isPoc: true,
  },
  {
    name: 'Riddhi Garg',
    role: 'Client Acquisition Team',
    initials: 'RG',
    photo: teamPhoto('riddhi.webp'),
    photoPosition: '50% 50%',
    linkedin: 'https://www.linkedin.com/in/riddhi-garg-997834257',
    instagram: 'https://www.instagram.com/riddhigarg___/',
    gradient: 'from-[#BE185D]/65 via-[#6D28D9]/55 to-[#F97316]/60',
    isPoc: true,
  },
  {
    name: 'Aditi Prakash',
    role: 'Client Acquisition Team',
    initials: 'AP',
    photo: teamPhoto('aditi-prakash.webp'),
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/aditi-prakash-26b4bb33b/',
    github: 'https://github.com/Adi-ti-06',
    gradient: 'from-[#F97316]/60 via-[#BE185D]/55 to-[#6D28D9]/60',
  },
  {
    name: 'Tanishka Singh',
    role: 'Client Acquisition Team',
    initials: 'TS',
    photo: teamPhoto('tanishka-singh.webp'),
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/tanishka-singh-371851377',
    instagram: 'https://www.instagram.com/_.tanishka._.singh',
    gradient: 'from-[#F97316]/60 via-[#BE185D]/55 to-[#6D28D9]/60',
  },
  {
    name: 'Nikita Arora',
    role: 'Client Acquisition Team',
    initials: 'NA',
    photo: teamPhoto('Nikita.webp'),
    photoPosition: '50% 50%',
    scale: 1.05,
    linkedin: 'https://www.linkedin.com/in/nikita-arora-0b18b2385',
    instagram: 'https://www.instagram.com/nikkss__.20',
    gradient: 'from-[#06B6D4]/60 via-[#8B5CF6]/55 to-[#EC4899]/60',
  },
  {
    name: 'Mishti Singh',
    role: 'PR & Client Approach',
    initials: 'MS',
    photo: teamPhoto('mishti.webp'),
    photoPosition: '50% 50%',
    linkedin: 'https://www.linkedin.com/in/mishti-singh-7b3a3b332',
    instagram: 'https://www.instagram.com/mishtiiii_s?igsh=YzVzeXJmY2s2ZXcw',
    github: 'https://github.com/Mishti-source',
    gradient: 'from-[#F97316]/60 via-[#BE185D]/55 to-[#6D28D9]/60',
  },
  // — Social Media —
  {
    name: 'Prashansha Srivastava',
    role: 'Social Media',
    initials: 'PS',
    photo: teamPhoto('prashansha-srivastava.webp'),
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/prashansha-srivastava-442a74379',
    instagram: '#',
    gradient: 'from-[#14B8A6]/60 via-[#0EA5E9]/55 to-[#6D28D9]/60',
    isPoc: true,
  },
  {
    name: 'Divyanshi',
    role: 'Social Media',
    initials: 'D',
    photo: teamPhoto('divyanshi.webp'),
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/divyanshi-gupta-989245359',
    instagram: '#',
    gradient: 'from-[#EA580C]/60 via-[#BE185D]/55 to-[#14B8A6]/50',
  },
  {
    name: 'Ragini Gupta',
    role: 'Social Media',
    initials: 'RG',
    photo: teamPhoto('ragini.webp'),
    photoPosition: '50% 50%',
    linkedin: 'https://www.linkedin.com/in/ragini-gupta-6413253b3/',
    instagram: 'https://www.instagram.com/ig.emorialplayz/',
    gradient: 'from-[#EA580C]/60 via-[#BE185D]/55 to-[#14B8A6]/50',
  },
  {
    name: 'Angel Varman',
    role: 'Social Media',
    initials: 'AV',
    photo: teamPhoto('angel.webp'),
    photoPosition: '50% 50%',
    linkedin: 'https://www.linkedin.com/in/angel-verman-70363a39a?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    instagram: 'https://www.instagram.com/shr3kkiss4ngle/',
    gradient: 'from-[#EA580C]/60 via-[#BE185D]/55 to-[#14B8A6]/50',
  },
];

const teamSections = [
  {
    title: 'Founder',
    members: team.filter((member) => member.role === 'Founder/CEO'),
  },
  {
    title: 'Technical Department',
    members: team
      .filter((member) => member.role === 'Technical Department')
      .sort((a, b) => (b.isPoc ? 1 : 0) - (a.isPoc ? 1 : 0)),
  },
  {
    title: 'Graphic Designers',
    members: team
      .filter((member) => member.role === 'Graphic Designer')
      .sort((a, b) => (b.isPoc ? 1 : 0) - (a.isPoc ? 1 : 0)),
  },
  {
    title: 'Client Acquisition Team',
    members: team
      .filter(
        (member) =>
          member.role === 'Client Acquisition Team' || member.role === 'PR & Client Approach'
      )
      .sort((a, b) => (b.isPoc ? 1 : 0) - (a.isPoc ? 1 : 0)),
  },
  {
    title: 'Social Media',
    members: team
      .filter((member) => member.role === 'Social Media')
      .sort((a, b) => (b.isPoc ? 1 : 0) - (a.isPoc ? 1 : 0)),
  },
];

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

const getPhotoEnhanceClassName = (member) =>
  member.photoEnhance === 'strong'
    ? 'brightness-[1.05] contrast-[1.12] saturate-[1.08]'
    : 'brightness-[1.03] contrast-[1.05] saturate-[1.06]';

const TeamCard = ({ member, index }) => (
  <RevealOnScroll delay={(index % 4) * 0.06} className="group relative flex w-full max-w-[290px]">
    {/* Ambient Glow behind the card on hover */}
    <div className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-br ${member.gradient} opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-30`} />
    
    <article className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#0A0A0A]/90 shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-white/[0.18] hover:shadow-[0_28px_70px_rgba(0,0,0,0.55)]">
      <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br p-5 ${member.gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.24),transparent_32%),radial-gradient(circle_at_62%_46%,rgba(255,255,255,0.1),transparent_28%),linear-gradient(to_top,rgba(8,8,8,0.48),transparent_64%)]" />

        {/* POC Badge */}
        {member.isPoc && (
          <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-white/[0.15] bg-black/60 px-2.5 py-0.75 text-[9px] font-bold uppercase tracking-wider text-[#FFFFFF] backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
            POC
          </div>
        )}

        <div className="relative z-10 rounded-full bg-white/[0.08] p-2 shadow-[0_22px_48px_rgba(0,0,0,0.34)] ring-1 ring-white/[0.2] transition-transform duration-300 group-hover:scale-[1.03]">
          <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-2 border-white/70 bg-black/25 ring-[10px] ring-black/20 backdrop-blur-md">
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                width="640"
                height="640"
                loading={index < 4 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index < 4 ? 'high' : 'auto'}
                className={`h-full w-full object-cover ${getPhotoEnhanceClassName(member)}`}
                style={{
                  objectPosition: member.photoPosition || 'center',
                  transform: member.scale ? `scale(${member.scale})` : 'none',
                }}
              />
            ) : (
              <span className="font-syne text-[42px] font-[800] text-white">
                {member.initials}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-syne text-[18px] font-bold leading-tight text-white transition-colors duration-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80">{member.name}</p>
        <p className="mt-2 min-h-[22px] font-sans text-[13px] text-text-secondary">{member.role}</p>

        <div className="mt-auto flex items-center gap-2.5 pt-5">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} LinkedIn`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-white/55 transition-all duration-155 hover:border-white/[0.25] hover:bg-white/[0.06] hover:text-white"
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-white/55 transition-all duration-155 hover:border-white/[0.25] hover:bg-white/[0.06] hover:text-white"
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-white/55 transition-all duration-155 hover:border-white/[0.25] hover:bg-white/[0.06] hover:text-white"
            >
              <GithubIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  </RevealOnScroll>
);

const getGridClasses = (count) => {
  if (count === 1) {
    return 'flex justify-center';
  }
  if (count === 2) {
    return 'grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center max-w-[640px] mx-auto';
  }
  if (count === 3) {
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-[960px] mx-auto';
  }
  return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center max-w-[1280px] mx-auto';
};

export default function Team() {
  return (
    <Layout>
      <section className="mx-auto max-w-[1280px] px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28">
        <RevealOnScroll>
          <div className="mx-auto mb-12 max-w-[760px] text-center md:mb-20">
            <p className="mb-5 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:mb-6 md:text-[13px]">Our Team</p>
            <h1 className="font-syne text-[40px] font-[800] leading-[1.02] text-white md:text-[64px]">Meet The People Behind Crevix.</h1>
            <p className="mx-auto mt-6 max-w-[620px] font-sans text-[15px] leading-[1.75] text-text-secondary md:text-[17px]">
              A focused studio team across strategy, technology, design, PR, and social media.
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-14 md:space-y-18">
          {teamSections.map((section) => (
            <section key={section.title}>
              <RevealOnScroll>
                <h2 className="mb-8 text-center font-syne text-[24px] font-[800] leading-tight text-white md:text-[32px]">
                  {section.title}
                </h2>
              </RevealOnScroll>

              <div className={getGridClasses(section.members.length)}>
                {section.members.map((member) => (
                  <TeamCard
                    key={member.name}
                    member={member}
                    index={team.findIndex((teamMember) => teamMember.name === member.name)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </Layout>
  );
}
