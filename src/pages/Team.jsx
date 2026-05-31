import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';

const team = [
  // Founder
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
  // Technical
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
    name: 'Kriti Tripathi',
    role: 'Technical Department',
    initials: 'KT',
    photo: '/kriti.jpeg',
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
    photo: '/Manjiri.jpg',
    photoPosition: '50% 50%',
    linkedin: 'https://www.linkedin.com/in/manjiri-gawali-89556a25b/',
    github: 'https://github.com/ManjirimGawali',
    instagram: 'https://www.instagram.com/manjiri.gawali/',
    gradient: 'from-[#0EA5E9]/60 via-[#6D28D9]/55 to-[#14B8A6]/60',
  },
  {
    name: 'Yashi Pandey',
    role: 'Technical Department',
    initials: 'YP',
    photo: '/Yashi.jpeg',
    photoPosition: '50% 50%',
    linkedin: 'https://www.linkedin.com/in/yashi-pandey-31b659323/',
    github: 'https://github.com/yaship6',
    instagram: 'https://instagram.com/yashi._.6',
    gradient: 'from-[#0EA5E9]/60 via-[#6D28D9]/55 to-[#14B8A6]/60',
  },
  // Graphic Designers
  {
    name: 'Anushka',
    role: 'Graphic Designer',
    initials: 'A',
    photo: '/anushka.jpg',
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/anushka-09a694357/',
    github: 'https://github.com/anushkaa-star',
    gradient: 'from-[#6D28D9]/65 via-[#0EA5E9]/45 to-[#BE185D]/60',
  },
  {
    name: 'Pragalbha Padhy',
    role: 'Graphic Designer',
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
  // Client Acquisition
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
    name: 'Riddhi Garg',
    role: 'Client Acquisition Team',
    initials: 'RG',
    photo: '/riddhi.jpg',
    photoPosition: '50% 50%',
    linkedin: 'https://www.linkedin.com/in/riddhi-garg-997834257',
    instagram: 'https://www.instagram.com/riddhigarg___/',
    gradient: 'from-[#BE185D]/65 via-[#6D28D9]/55 to-[#F97316]/60',
  },
  {
    name: 'Tanishka Pandey',
    role: 'Client Acquisition Team',
    initials: 'TP',
    photo: '/tanishka.webp',
    photoPosition: '50% 50%',
    instagram: 'https://www.instagram.com/tanishkayk',
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
    name: 'Tanishka Singh',
    role: 'Client Acquisition Team',
    initials: 'TS',
    photo: '/Tanishka.jpg',
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/tanishka-singh-371851377',
    instagram: 'https://www.instagram.com/_.tanishka._.singh',
    gradient: 'from-[#F97316]/60 via-[#BE185D]/55 to-[#6D28D9]/60',
  },
  {
    name: 'Bhumi',
    role: 'Client Acquisition Team',
    initials: 'B',
    photo: '/Bhumi.jpeg',
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/bhumi17',
    instagram: 'https://www.instagram.com/bhuuumiiiiiii',
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
  // Social Media
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
    photoPosition: '50% 35%',
    linkedin: 'https://www.linkedin.com/in/divyanshi-gupta-989245359',
    instagram: '#',
    gradient: 'from-[#EA580C]/60 via-[#BE185D]/55 to-[#14B8A6]/50',
  },
];

const departmentOrder = [
  'Founder/CEO',
  'Technical Department',
  'Graphic Designer',
  'Client Acquisition Team',
  'Social Media',
];

const departmentDetails = {
  'Founder/CEO': {
    title: 'Founder',
    label: 'Vision and direction',
    accent: 'from-[#F97316] via-[#BE185D] to-[#6D28D9]',
  },
  'Technical Department': {
    title: 'Technology',
    label: 'Engineering and product systems',
    accent: 'from-[#0EA5E9] via-[#14B8A6] to-[#6D28D9]',
  },
  'Graphic Designer': {
    title: 'Design',
    label: 'Visual identity and creative direction',
    accent: 'from-[#FACC15] via-[#EA580C] to-[#BE185D]',
  },
  'Client Acquisition Team': {
    title: 'Client Growth',
    label: 'Partnerships and acquisition',
    accent: 'from-[#F97316] via-[#BE185D] to-[#8B5CF6]',
  },
  'Social Media': {
    title: 'Social Media',
    label: 'Community and content',
    accent: 'from-[#14B8A6] via-[#0EA5E9] to-[#BE185D]',
  },
};

const teamByDepartment = departmentOrder
  .map((department) => ({
    department,
    ...departmentDetails[department],
    members: team.filter((member) => member.role === department),
  }))
  .filter((group) => group.members.length);

const hasSocialLink = (href) => href && href !== '#';

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

const SocialLink = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-black/25 text-white/65 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.28] hover:bg-white hover:text-black"
  >
    {children}
  </a>
);

const IntroFrame = () => (
  <div className="pointer-events-none absolute -inset-x-5 -inset-y-4 md:-inset-x-20 md:-inset-y-10">
    {[
      { side: 'left-[4%]', delay: 0 },
      { side: 'right-[4%]', delay: 0.18 },
    ].map((line) => (
      <motion.span
        key={line.side}
        className={`absolute ${line.side} top-0 h-28 w-[3px] rounded-full bg-gradient-to-b from-transparent via-[#FACC15] to-transparent shadow-[0_0_14px_rgba(250,204,21,0.65),0_0_34px_rgba(14,165,233,0.42),0_0_52px_rgba(190,24,93,0.32)]`}
        initial={{ y: '-130%', opacity: 0 }}
        animate={{
          y: ['-130%', '360%'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.35,
          ease: 'linear',
          delay: line.delay,
          repeat: Infinity,
          repeatType: 'loop',
          opacity: {
            duration: 2.35,
            ease: 'easeInOut',
            times: [0, 0.14, 0.82, 1],
            repeat: Infinity,
            repeatType: 'loop',
            delay: line.delay,
          },
        }}
      />
    ))}
  </div>
);

const DepartmentShortcut = ({ group, className = '' }) => (
  <a
    href={`#${group.department.toLowerCase().replaceAll(' ', '-')}`}
    className={`group rounded-[16px] border border-white/[0.08] bg-white/[0.035] p-4 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-white/[0.06] ${className}`}
  >
    <span className={`mx-auto mb-4 block h-1.5 w-12 rounded-full bg-gradient-to-r ${group.accent} transition-all duration-300 group-hover:w-16`} />
    <span className="block font-syne text-[18px] font-bold leading-tight text-white">{group.title}</span>
    <span className="mt-1 block font-sans text-[12px] text-white/42">
      {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
    </span>
  </a>
);

const TeamCard = ({ member, index, accent }) => (
  <RevealOnScroll delay={(index % 4) * 0.06}>
    <article className="group flex h-full min-h-[430px] w-full flex-col overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#101010]/90 shadow-[0_20px_70px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-white/[0.22] hover:shadow-[0_28px_90px_rgba(0,0,0,0.48)]">
      <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${member.gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_18%,rgba(255,255,255,0.24),transparent_32%),linear-gradient(to_top,rgba(8,8,8,0.86),rgba(8,8,8,0.12)_54%,rgba(8,8,8,0.08))]" />

        <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between gap-3">
          <span className={`rounded-full bg-gradient-to-r ${accent} px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-black/20`}>
            {member.role.replace(' Department', '').replace(' Team', '')}
          </span>
          <span className="rounded-full border border-white/[0.16] bg-black/25 px-2.5 py-1 font-mono text-[10px] text-white/70 backdrop-blur-md">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-8 pt-10">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="h-full w-full rounded-[14px] object-cover shadow-2xl ring-1 ring-white/[0.12] transition duration-500 ease-out group-hover:scale-[1.055]"
              style={{
                objectPosition: member.photoPosition || 'center',
                ...(member.scale ? { transform: `scale(${member.scale})` } : {}),
              }}
            />
          ) : (
            <span className="flex h-36 w-36 items-center justify-center rounded-full border border-white/[0.18] bg-black/20 font-syne text-[42px] font-[800] text-white shadow-2xl backdrop-blur-md sm:text-[48px]">
              {member.initials}
            </span>
          )}
        </div>

      </div>

      <div className="px-5 pt-5 text-center">
        <p className="font-syne text-[22px] font-bold leading-tight text-white">{member.name.trim()}</p>
        <p className="mx-auto mt-2 font-sans text-[13px] text-white/62">{member.role}</p>
      </div>

      <div className="mt-auto flex flex-col items-center justify-center gap-3 p-5">
        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-white/36">Connect</p>
        <div className="flex translate-y-1 items-center justify-center gap-2 opacity-80 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {hasSocialLink(member.linkedin) && (
            <SocialLink href={member.linkedin} label={`${member.name} LinkedIn`}>
              <LinkedinIcon />
            </SocialLink>
          )}
          {hasSocialLink(member.instagram) && (
            <SocialLink href={member.instagram} label={`${member.name} Instagram`}>
              <InstagramIcon />
            </SocialLink>
          )}
          {hasSocialLink(member.github) && (
            <SocialLink href={member.github} label={`${member.name} GitHub`}>
              <GithubIcon />
            </SocialLink>
          )}
        </div>
      </div>
    </article>
  </RevealOnScroll>
);

export default function Team() {
  const founderGroup = teamByDepartment.find((group) => group.department === 'Founder/CEO');
  const leftHeroGroups = teamByDepartment.filter((group) =>
    ['Technical Department', 'Graphic Designer'].includes(group.department)
  );
  const rightHeroGroups = teamByDepartment.filter((group) =>
    ['Client Acquisition Team', 'Social Media'].includes(group.department)
  );

  return (
    <Layout>
      <section className="relative mx-auto max-w-[1320px] overflow-visible px-4 pb-20 pt-0 sm:px-6 md:pb-28 md:pt-0">
        <div className="pointer-events-none absolute left-1/2 top-16 h-[340px] w-[620px] -translate-x-1/2 rounded-full bg-[#BE185D]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-24 top-[460px] h-[300px] w-[300px] rounded-full bg-[#0EA5E9]/10 blur-[100px]" />

        <div className="relative mx-auto mb-12 max-w-[1240px] px-5 pb-10 pt-2 text-center md:mb-20 md:px-8 md:pb-14 md:pt-2">
          <IntroFrame />
          {founderGroup && (
            <RevealOnScroll delay={0.04}>
              <DepartmentShortcut group={founderGroup} className="mx-auto mb-8 block max-w-[220px]" />
            </RevealOnScroll>
          )}

          <div className="grid items-center gap-5 lg:grid-cols-[220px_minmax(0,1fr)_220px]">
            <RevealOnScroll delay={0.1} className="order-2 grid grid-cols-2 gap-3 lg:order-1 lg:grid-cols-1">
              {leftHeroGroups.map((group) => (
                <DepartmentShortcut key={group.department} group={group} />
              ))}
            </RevealOnScroll>

            <motion.div
              className="order-1 lg:order-2"
            initial={{ opacity: 0, scale: 1.22, rotate: -1.5, filter: 'blur(12px)' }}
            animate={{
              opacity: [0, 1, 1],
              scale: [1.22, 0.94, 1],
              rotate: [-1.5, 0.35, 0],
              filter: ['blur(12px)', 'blur(0px)', 'blur(0px)'],
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.62, 1],
            }}
          >
            <p className="mb-5 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:mb-6 md:text-[13px]">Our Team</p>
            <motion.h1
              className="font-syne text-[40px] font-[800] leading-[1.02] text-white md:text-[64px]"
              animate={{
                textShadow: [
                  '0 0 0 rgba(255,255,255,0)',
                  '0 0 34px rgba(255,255,255,0.38)',
                  '0 0 0 rgba(255,255,255,0)',
                ],
              }}
              transition={{ duration: 0.9, ease: 'easeOut', times: [0, 0.48, 1] }}
            >
              Meet The People Behind Crevix.
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-[620px] font-sans text-[15px] leading-[1.75] text-text-secondary md:text-[17px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.42 }}
            >
              A focused studio team arranged by craft, with every pin showing the person behind the work.
            </motion.p>
            </motion.div>

            <RevealOnScroll delay={0.16} className="order-3 grid grid-cols-2 gap-3 lg:grid-cols-1">
              {rightHeroGroups.map((group) => (
                <DepartmentShortcut key={group.department} group={group} />
              ))}
            </RevealOnScroll>
          </div>
        </div>

        <div className="space-y-20">
          {teamByDepartment.map((group, groupIndex) => (
            <section
              key={group.department}
              id={group.department.toLowerCase().replaceAll(' ', '-')}
              className="scroll-mt-24"
            >
              <RevealOnScroll delay={groupIndex * 0.04}>
                <div className="mx-auto mb-7 flex max-w-[760px] flex-col items-center justify-center gap-4 border-t border-white/[0.08] pt-8 text-center">
                  <div>
                    <span className={`mx-auto mb-4 block h-1.5 w-16 rounded-full bg-gradient-to-r ${group.accent}`} />
                    <h2 className="font-syne text-[30px] font-[800] leading-tight text-white md:text-[44px]">{group.title}</h2>
                    <p className="mt-2 font-sans text-[14px] text-text-secondary md:text-[15px]">{group.label}</p>
                  </div>
                  <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-white/35">
                    {group.members.length} {group.members.length === 1 ? 'person' : 'people'}
                  </p>
                </div>
              </RevealOnScroll>

              <div className="mx-auto flex max-w-[1180px] flex-wrap justify-center gap-5">
                {group.members.map((member, index) => (
                  <div
                    key={member.name}
                    className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
                  >
                    <TeamCard
                      member={member}
                      index={index + groupIndex}
                      accent={group.accent}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </Layout>
  );
}
