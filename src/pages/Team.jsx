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
  },
  {
    name: 'Kriti Tripathi',
    role: 'Technical Department',
    initials: 'KT',
    photo: teamPhoto('kriti.webp'),
    photoPosition: '50% 50%',
    linkedin: 'https://www.linkedin.com/in/kriti-tripathi/',
    github: 'https://github.com/kriti2818',
    instagram: 'https://www.instagram.com/_kritayy',
    gradient: 'from-[#0EA5E9]/60 via-[#6D28D9]/55 to-[#14B8A6]/60',
  },
  {
    name: 'Manjiri  Gawali ',
    role: 'Technical Department',
    initials: 'MG',
    photo: teamPhoto('Manjiri.webp'),
    photoPosition: '50% 50%',
    linkedin: 'https://www.linkedin.com/in/manjiri-gawali-89556a25b/',
    github: 'https://github.com/ManjirimGawali',
    instagram: 'https://www.instagram.com/manjiri.gawali/',
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
  },
  {
    name: 'Pranathi T R',
    role: 'Technical Department',
    initials: 'PTR',
    photo: teamPhoto('pranathi.webp'),
    photoPosition: '50% 50%',
    linkedin: 'https://www.linkedin.com/in/pranathi-tr-152547278',
    github: 'https://github.com/ptr25',
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
    name: 'Pragalbha Padhy',
    role: 'Graphic Designer',
    initials: 'PP',
    photo: teamPhoto('pragalbha-padhy.webp'),
    photoPosition: '50% 34%',
    linkedin: 'https://www.linkedin.com/in/pragalbha-padhy-087bb6364',
    github: 'https://github.com/pragalbha25bai11493-ai',
    gradient: 'from-[#BE185D]/60 via-[#EA580C]/50 to-[#FACC15]/45',
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
  },
  {
    name: 'Trisha Kapoor',
    role: 'Client Acquisition Team',
    initials: 'TK',
    photo: teamPhoto('Trisha.webp'),
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/trisha-kapoor2412',
    instagram: 'https://www.instagram.com/ttriishhaaa',
    gradient: 'from-[#BE185D]/65 via-[#6D28D9]/55 to-[#F97316]/60',
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
  },
  {
    name: 'Tanishka Pandey',
    role: 'Client Acquisition Team',
    initials: 'TP',
    photo: teamPhoto('tanishka-pandey.webp'),
    photoPosition: '50% 50%',
    instagram: 'https://www.instagram.com/tanishkayk',
    gradient: 'from-[#BE185D]/65 via-[#6D28D9]/55 to-[#F97316]/60',
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
    name: 'Bhumi',
    role: 'Client Acquisition Team',
    initials: 'B',
    photo: teamPhoto('Bhumi.webp'),
    photoPosition: '50% 62%',
    scale: 1.35,
    photoEnhance: 'strong',
    linkedin: 'https://www.linkedin.com/in/bhumi17',
    instagram: 'https://www.instagram.com/bhuuumiiiiiii',
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
];

const teamSections = [
  {
    title: 'Founder',
    members: team.filter((member) => member.role === 'Founder/CEO'),
  },
  {
    title: 'Technical Department',
    members: team.filter((member) => member.role === 'Technical Department'),
  },
  {
    title: 'Graphic Designers',
    members: team.filter((member) => member.role === 'Graphic Designer'),
  },
  {
    title: 'Client Acquisition Team',
    members: team.filter((member) => member.role === 'Client Acquisition Team'),
  },
  {
    title: 'Social Media',
    members: team.filter((member) => member.role === 'Social Media'),
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
  <RevealOnScroll delay={(index % 4) * 0.06}>
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-[#0E0E0E]/85 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition-all duration-200 hover:-translate-y-1 hover:border-white/[0.16]">
      <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br p-5 ${member.gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.24),transparent_32%),radial-gradient(circle_at_62%_46%,rgba(255,255,255,0.1),transparent_28%),linear-gradient(to_top,rgba(8,8,8,0.48),transparent_64%)]" />

        <div className="relative z-10 rounded-full bg-white/[0.08] p-2 shadow-[0_22px_48px_rgba(0,0,0,0.34)] ring-1 ring-white/[0.2] transition-transform duration-300 group-hover:scale-[1.03]">
          <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-white/70 bg-black/25 ring-[10px] ring-black/20 backdrop-blur-md sm:h-44 sm:w-44">
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
              <span className="font-syne text-[42px] font-[800] text-white sm:text-[48px]">
                {member.initials}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-syne text-[20px] font-bold leading-tight text-white">{member.name}</p>
        <p className="mt-2 min-h-[22px] font-sans text-[14px] text-text-secondary">{member.role}</p>

        <div className="mt-auto flex items-center gap-3 pt-6">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} LinkedIn`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] text-white/55 transition-colors duration-150 hover:border-white/[0.22] hover:text-white"
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] text-white/55 transition-colors duration-150 hover:border-white/[0.22] hover:text-white"
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] text-white/55 transition-colors duration-150 hover:border-white/[0.22] hover:text-white"
            >
              <GithubIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  </RevealOnScroll>
);

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
                <h2 className="mb-6 font-syne text-[24px] font-[800] leading-tight text-white md:text-[32px]">
                  {section.title}
                </h2>
              </RevealOnScroll>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
