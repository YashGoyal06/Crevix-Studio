import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';

const team = [
  {
    name: 'Yash Goyal',
    role: 'Founder/CEO',
    initials: 'YG',
    photo: '/yash-goyal.jpg',
    photoPosition: '50% 28%',
    linkedin: 'https://www.linkedin.com/in/yashgoyal06/',
    github: 'https://github.com/YashGoyal06',
    gradient: 'from-[#6D28D9]/70 via-[#BE185D]/60 to-[#EA580C]/70',
  },
  {
    name: 'Raj Sachan',
    role: 'Technical Department',
    initials: 'RS',
    photo: '/raj-sachan.jpg',
    photoPosition: '50% 24%',
    linkedin: 'https://www.linkedin.com/in/rajsachan/',
    github: 'https://github.com/rawwwj00',
    gradient: 'from-[#0EA5E9]/60 via-[#6D28D9]/55 to-[#14B8A6]/60',
  },
  {
    name: 'Divyanka',
    role: 'Client Acquisition Team',
    initials: 'D',
    photo: '/divyanka.jpg',
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/divyanka-gupta-1a71a8292/',
    github: 'https://github.com/Divyanka2005',
    gradient: 'from-[#BE185D]/65 via-[#6D28D9]/55 to-[#F97316]/60',
  },
  {
    name: 'Aditi Prakash',
    role: 'Client Acquisition Team',
    initials: 'AP',
    photo: '/aditi-prakash.jpg',
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/aditi-prakash-26b4bb33b/',
    github: 'https://github.com/Adi-ti-06',
    gradient: 'from-[#F97316]/60 via-[#BE185D]/55 to-[#6D28D9]/60',
  },
  {
    name: 'Anshika Sahu',
    role: 'Client Acquisition Team',
    initials: 'AS',
    photo: '/anshika.jpg',
    photoPosition: '50% 24%',
    scale: 1.8,
    linkedin: 'https://www.linkedin.com/in/anshika-sahu-?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    github: 'https://github.com/anshikasahu-lab',
    gradient: 'from-[#06B6D4]/60 via-[#8B5CF6]/55 to-[#EC4899]/60',
  },
  {
    name: 'Prashansha Srivastava',
    role: 'Social Media',
    initials: 'PS',
    photo: '/prashansha-srivastava.jpg',
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/prashansha-srivastava-442a74379',
    instagram: '#',
    gradient: 'from-[#14B8A6]/60 via-[#0EA5E9]/55 to-[#6D28D9]/60',
  },
  {
    name: 'Divyanshi',
    role: 'Social Media',
    initials: 'D',
    photo: '/divyanshi.jpg',
    linkedin: 'https://www.linkedin.com/in/divyanshi-gupta-989245359',
    instagram: '#',
    photoPosition: '50% 35%',
    gradient: 'from-[#EA580C]/60 via-[#BE185D]/55 to-[#14B8A6]/50',
  },
  {
    name: 'Anushka',
    role: 'Design Department',
    initials: 'A',
    photo: '/anushka.jpg',
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/anushka-09a694357/',
    github: 'https://github.com/anushkaa-star',
    gradient: 'from-[#6D28D9]/65 via-[#0EA5E9]/45 to-[#BE185D]/60',
  },
  {
    name: 'Pragalbha Padhy',
    role: 'Design Department',
    initials: 'PP',
    photo: '/pragalbha-padhy.jpg',
    photoPosition: '50% 34%',
    linkedin: 'https://www.linkedin.com/in/pragalbha-padhy-087bb6364',
    github: 'https://github.com/pragalbha25bai11493-ai',
    gradient: 'from-[#BE185D]/60 via-[#EA580C]/50 to-[#FACC15]/45',
  },
  {
    name: 'Shweta Gupta',
    role: 'Graphic Designer',
    initials: 'SG',
    photo: '/shweta.jpg',
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/shw3tagupta/',
    instagram: 'https://www.instagram.com/shweta.zip/',
    gradient: 'from-[#8B5CF6]/60 via-[#D946EF]/55 to-[#FF007F]/60',
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
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const TeamCard = ({ member, index }) => (
  <RevealOnScroll delay={(index % 4) * 0.06}>
    <article className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-white/[0.08] bg-[#0E0E0E]/80 transition-all duration-200 hover:-translate-y-1 hover:border-white/[0.15]">
      <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br ${member.gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_34%),linear-gradient(to_top,rgba(8,8,8,0.42),transparent_62%)]" />

        <div className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-white/[0.18] bg-black/20 shadow-2xl ring-8 ring-black/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-[1.03] sm:h-40 sm:w-40">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="h-full w-full object-cover"
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
