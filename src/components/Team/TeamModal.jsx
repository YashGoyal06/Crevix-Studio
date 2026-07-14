import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.32 9.32 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92v2.78c0 .27.18.59.69.49A10.15 10.15 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="currentColor" aria-hidden="true">
    <path d="M6.94 8.96H3.77v10.12h3.17V8.96ZM5.35 4a1.84 1.84 0 1 0 0 3.68 1.84 1.84 0 0 0 0-3.68Zm13.88 9.55c0-3.04-1.62-4.86-4.08-4.86a3.5 3.5 0 0 0-3.16 1.73V8.96H8.95v10.12h3.17v-5.02c0-1.33.25-2.61 1.9-2.61 1.62 0 1.64 1.52 1.64 2.69v4.94h3.17l.4-5.53Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

export default function TeamModal({ member, onClose }) {
  const modalRef = useRef(null);
  
  // Set default featured image in state directly
  const [featuredImage, setFeaturedImage] = useState(() => {
    return member ? (member.profileImage || (member.gallery && member.gallery[0]) || member.photo || '') : '';
  });

  // Lock body scroll and trap/restore focus
  useEffect(() => {
    if (!member) return;
    
    const previouslyFocused = document.activeElement;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    // Focus the modal for screen readers / keyboard navigation
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.body.style.overflow = originalStyle;
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [member]);

  // Close on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Focus trap implementation
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      if (!modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  };

  if (!member) return null;

  // Filter gallery items (max 4 images for thumbnail strip)
  const thumbnails = member.gallery ? member.gallery.slice(0, 4) : [];

  // Deduplicate badges helper
  const getSecondaryBadge = () => {
    if (member.level) return member.level;
    if (member.isPoc) return 'POC';
    // Check if department provides non-redundant info
    if (member.department && member.role) {
      const isRedundant = member.role.toLowerCase().includes(member.department.toLowerCase());
      if (!isRedundant) return member.department;
    }
    return '';
  };

  const secondaryBadge = getSecondaryBadge();

  const getBadgeStyles = (type) => {
    if (!type) return '';
    const t = type.toLowerCase();
    if (t === 'poc' || t.includes('year') || t.includes('senior') || t.includes('lead') || t.includes('experience') || (member.level && member.level.toLowerCase() === t)) {
      return 'text-brand-accent bg-brand-accent/10 border-brand-accent/20';
    }
    return 'text-brand-secondary bg-brand-secondary/10 border-brand-secondary/20';
  };

  // Experience text formatter
  const getExperienceText = (exp) => {
    if (!exp || !exp.label) return '';
    const label = exp.label.trim();
    if (label.toLowerCase().includes('experience')) return label;
    return `${label} Experience`;
  };

  const experienceText = getExperienceText(member.experience);

  // Helper to normalize and split skills or tech stack
  const getNormalizedList = (list) => {
    if (!list || !Array.isArray(list)) return [];
    
    const normalizeTechOrSkill = (name) => {
      if (!name) return '';
      const clean = name.trim().toLowerCase().replace(/\s+/g, ' ');
      
      const mapping = {
        'react': 'React.js',
        'reactjs': 'React.js',
        'react js': 'React.js',
        'react.js': 'React.js',
        'next': 'Next.js',
        'nextjs': 'Next.js',
        'next js': 'Next.js',
        'next.js': 'Next.js',
        'typescript': 'TypeScript',
        'ts': 'TypeScript',
        'node': 'Node.js',
        'nodejs': 'Node.js',
        'node js': 'Node.js',
        'node.js': 'Node.js',
        'express': 'Express.js',
        'expressjs': 'Express.js',
        'express js': 'Express.js',
        'postgres': 'PostgreSQL',
        'postgresql': 'PostgreSQL',
        'tailwind': 'Tailwind CSS',
        'tailwindcss': 'Tailwind CSS',
        'tailwind css': 'Tailwind CSS',
        'aws': 'AWS',
        'git': 'Git',
        'github': 'GitHub',
        'cpp': 'C++',
        'c++': 'C++',
        'python': 'Python',
        'java': 'Java',
        'javascript': 'JavaScript',
        'js': 'JavaScript',
        'html': 'HTML',
        'css': 'CSS',
        'figma': 'Figma',
        'seo': 'SEO',
        'pr': 'PR'
      };

      if (mapping[clean]) return mapping[clean];

      return name
        .trim()
        .split(/\s+/)
        .map(word => {
          if (word.toLowerCase() === 'and') return 'and';
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    };

    const items = [];
    list.forEach(item => {
      if (typeof item === 'string') {
        const parts = item.split(',');
        parts.forEach(part => {
          const trimmed = part.trim();
          if (trimmed) items.push(trimmed);
        });
      }
    });

    const normalized = items.map(item => normalizeTechOrSkill(item));
    return [...new Set(normalized)].filter(Boolean);
  };

  const skillsList = getNormalizedList(member.skills);
  const techStackList = getNormalizedList(member.techStack);

  const hasDetailedContent = !!(
    member.bio ||
    member.quote ||
    experienceText ||
    member.funFact ||
    (member.hobbies && member.hobbies.length > 0) ||
    skillsList.length > 0 ||
    techStackList.length > 0
  );

  // Render helpers for Skills and Tech Stack
  const renderSkills = () => {
    if (skillsList.length === 0) return null;
    return (
      <div className="flex flex-col gap-2.5">
        <h3 className="font-syne text-[11px] font-bold uppercase tracking-widest text-brand-accent">
          Key Skills
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {skillsList.map(skill => (
            <span
              key={skill}
              className="font-sans text-[11px] font-medium text-white bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-full transition-colors duration-200 hover:bg-white/[0.06]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderTechStack = () => {
    if (techStackList.length === 0) return null;
    return (
      <div className="flex flex-col gap-2.5">
        <h3 className="font-syne text-[11px] font-bold uppercase tracking-widest text-brand-accent">
          Primary Tech Stack
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {techStackList.map(tech => (
            <span
              key={tech}
              className="font-sans text-[11px] font-semibold text-brand-secondary bg-brand-secondary/40 border border-brand-secondary px-2.5 py-1 rounded-full transition-colors duration-200 hover:bg-brand-secondary/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-member-name"
        onKeyDown={handleKeyDown}
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window Container */}
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={`relative w-full max-w-[920px] bg-[#0A0A0A]/95 border border-white/[0.08] rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden focus:outline-none z-10 ${
            hasDetailedContent
              ? 'max-h-[90vh] md:h-[85vh] min-h-[60vh]'
              : 'max-h-[90vh] md:h-auto md:min-h-0'
          }`}
        >
          {/* Mobile Close Button (Sticky, does not consume vertical space) */}
          <div className="sticky top-0 right-0 z-30 flex justify-end w-full h-0 overflow-visible pointer-events-none md:hidden">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="pointer-events-auto mt-4 mr-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-black/60 text-white/50 transition-all duration-200 hover:border-white/20 hover:text-white hover:scale-105 shadow-lg"
            >
              <X className="h-[18px] w-[18px]" />
            </button>
          </div>

          {/* Desktop Close Button (Absolute) */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="hidden md:flex absolute top-5 right-5 z-30 h-9.5 w-9.5 items-center justify-center rounded-full border border-white/[0.08] bg-black/60 text-white/50 transition-all duration-200 hover:border-white/20 hover:text-white hover:scale-105"
          >
            <X className="h-[16px] w-[16px]" />
          </button>

          {/* DESKTOP LEFT COLUMN: Photo, Gallery, Skills & Tech Stack (40%) - EXACT ORIGINAL LAYOUT */}
          <div className={`hidden md:flex w-full md:w-[40%] bg-[#0B0B0B]/80 p-6 flex-col justify-start border-b md:border-b-0 md:border-r border-white/[0.06] overflow-y-auto gap-6 shrink-0 ${
            hasDetailedContent ? 'md:h-full' : 'md:h-auto'
          }`}>
            <div>
              {/* Featured image display frame */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-900/50 mb-5 border border-white/[0.04]">
                {featuredImage ? (
                  <motion.img
                    key={featuredImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    src={featuredImage}
                    alt={member.name}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${member.gradient} opacity-20`}>
                    <span className="font-syne text-[56px] font-bold text-white">{member.initials}</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Strip (Render only if there are multiple thumbnails) */}
              {thumbnails.length > 1 && (
                <div className="grid grid-cols-4 gap-2.5 w-full">
                  {thumbnails.map((imgUrl, idx) => {
                    const isActive = featuredImage === imgUrl;
                    return (
                      <button
                        key={imgUrl}
                        onClick={() => setFeaturedImage(imgUrl)}
                        aria-label={`View photo ${idx + 1}`}
                        className={`relative aspect-square rounded-xl overflow-hidden bg-neutral-950 transition-all duration-200 border-2 ${
                          isActive
                            ? 'border-brand-accent scale-[1.03] shadow-md shadow-brand-accent/10'
                            : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/15'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${member.name} thumbnail ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Desktop-only: Skills & Tech Stack */}
            {(skillsList.length > 0 || techStackList.length > 0) && (
              <div className="flex flex-col gap-6 pt-2 border-t border-white/[0.05]">
                {renderSkills()}
                {renderTechStack()}
              </div>
            )}
          </div>

          {/* MOBILE LEFT COLUMN: Photo & Gallery (Side-by-Side) */}
          <div className="block md:hidden w-full bg-[#0B0B0B]/80 p-5 border-b border-white/[0.06] shrink-0">
            {thumbnails.length > 1 ? (
              <div className="flex flex-row gap-3 w-full">
                {/* Left Side: Vertical stack of thumbnails */}
                <div className="flex flex-col justify-between gap-1.5 shrink-0 w-[68px]">
                  {thumbnails.map((imgUrl, idx) => {
                    const isActive = featuredImage === imgUrl;
                    return (
                      <button
                        key={`mobile-thumb-${imgUrl}`}
                        onClick={() => setFeaturedImage(imgUrl)}
                        aria-label={`View photo ${idx + 1}`}
                        className={`relative w-[68px] h-[68px] rounded-xl overflow-hidden bg-neutral-950 transition-all duration-200 border-2 ${
                          isActive
                            ? 'border-brand-accent scale-[1.03] shadow-md shadow-brand-accent/10'
                            : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/15'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${member.name} thumbnail ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Right Side: Large primary image */}
                <div className="flex-1 relative aspect-square rounded-2xl overflow-hidden bg-neutral-900/50 border border-white/[0.04]">
                  {featuredImage ? (
                    <motion.img
                      key={`mobile-${featuredImage}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      src={featuredImage}
                      alt={member.name}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${member.gradient} opacity-20`}>
                      <span className="font-syne text-[40px] font-bold text-white">{member.initials}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Member has only one image: Hide thumbnail column, expand primary image to full width */
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-900/50 border border-white/[0.04]">
                {featuredImage ? (
                  <motion.img
                    key={`mobile-single-${featuredImage}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    src={featuredImage}
                    alt={member.name}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${member.gradient} opacity-20`}>
                    <span className="font-syne text-[56px] font-bold text-white">{member.initials}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Details Scroll Box (60%) */}
          <div className={`w-full md:w-[60%] px-5 pb-6 pt-4 sm:p-8 overflow-y-visible md:overflow-y-auto flex flex-col select-text ${
            hasDetailedContent
              ? 'justify-between md:h-full min-h-[320px] sm:min-h-[400px]'
              : 'justify-center md:h-auto md:min-h-0 gap-6'
          }`}>
            
            {/* Profile Info Details Group */}
            <div className="flex flex-col gap-4 md:gap-6 w-full">
              {/* 1. Name */}
              <div>
                <h2 id="modal-member-name" className="font-syne text-[24px] sm:text-[32px] font-bold text-white uppercase tracking-wide leading-tight">
                  {member.name}
                </h2>
              </div>

              {/* 2. Badges (Department & Role/Level) */}
              {member.role && (
                <>
                  {/* Desktop Badges layout */}
                  <div className="hidden md:flex flex-wrap gap-2 items-center -mt-2">
                    <span className="font-sans text-[11px] font-bold text-neutral-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.75 rounded-md uppercase tracking-wider">
                      {member.role}
                    </span>
                    {secondaryBadge && (
                      <span className={`font-sans text-[11px] font-semibold border border-white/[0.08] px-2.5 py-0.75 rounded-md uppercase tracking-wider ${getBadgeStyles(secondaryBadge)}`}>
                        {secondaryBadge}
                      </span>
                    )}
                  </div>

                  {/* Mobile Badges layout (Department first, then Role, then Level/POC) */}
                  <div className="flex md:hidden flex-wrap gap-2 items-center -mt-1.5">
                    <span className="font-sans text-[11px] font-bold text-neutral-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.75 rounded-md uppercase tracking-wider">
                      {member.role}
                    </span>
                    {member.level && (
                      <span className={`font-sans text-[11px] font-semibold border border-brand-accent px-2.5 py-0.75 rounded-md uppercase tracking-wider ${getBadgeStyles(member.level)}`}>
                        {member.level}
                      </span>
                    )}
                    {!member.level && member.isPoc && (
                      <span className={`font-sans text-[11px] font-semibold border border-brand-accent px-2.5 py-0.75 rounded-md uppercase tracking-wider ${getBadgeStyles('POC')}`}>
                        POC
                      </span>
                    )}
                  </div>
                </>
              )}

              {/* 3. Experience */}
              {experienceText && (
                <div className="text-[12.5px] font-sans font-medium text-text-secondary -mt-1 md:-mt-2">
                  {experienceText}
                </div>
              )}

              {/* 4. Professional Tagline */}
              {member.tagline && (
                <p className="font-syne text-[14.5px] italic text-neutral-300 font-medium border-l-2 border-brand-accent/70 pl-3.5 leading-relaxed">
                  "{member.tagline}"
                </p>
              )}

              {/* 5. Biography */}
              {member.bio && (
                <p className="font-sans text-[13.5px] text-text-secondary leading-[1.8] font-normal max-w-[65ch] whitespace-pre-line">
                  {member.bio}
                </p>
              )}

              {/* 6. Quote Block */}
              {member.quote && (
                <blockquote className="relative p-4 py-3 pl-8 pr-3 md:p-5 md:py-4 md:pl-10 md:pr-4 rounded-xl bg-brand-accent/[0.03] border-l-[3px] border-brand-accent/5 italic text-[14.5px] text-neutral-200 leading-relaxed font-sans">
                  <span className="absolute left-3.5 top-1.5 text-[32px] font-serif text-brand-accent/40 select-none">“</span>
                  {member.quote}
                </blockquote>
              )}

              {/* 7. Skills & Tech Stack (Mobile-only - Reordered below Quote) */}
              {(skillsList.length > 0 || techStackList.length > 0) && (
                <div className="flex md:hidden flex-col gap-5 pt-3 border-t border-white/[0.05]">
                  {renderSkills()}
                  {renderTechStack()}
                </div>
              )}

              {/* 8. Fun Fact & Hobbies Panel */}
              {(member.funFact || (member.hobbies && member.hobbies.length > 0)) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {member.funFact && (
                    <div className="p-4 rounded-xl bg-white/[0.015] border border-white/[0.04]">
                      <h4 className="font-syne text-[11px] font-bold uppercase tracking-widest text-brand-accent mb-2">
                        Fun Fact
                      </h4>
                      <p className="font-sans text-[12.5px] text-neutral-300 leading-relaxed">
                        {member.funFact}
                      </p>
                    </div>
                  )}
                  {member.hobbies && member.hobbies.length > 0 && (
                    <div className="p-4 rounded-xl bg-white/[0.015] border border-white/[0.04]">
                      <h4 className="font-syne text-[11px] font-bold uppercase tracking-widest text-brand-accent mb-2.5">
                        Hobbies & Interests
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {member.hobbies.map(hobby => (
                          <span
                            key={hobby}
                            className="font-sans text-[11px] font-medium text-neutral-300 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md"
                          >
                            {hobby}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {((member.socials && (member.socials.github || member.socials.linkedin || member.socials.instagram || member.socials.portfolio)) ||
              (member.github || member.linkedin || member.instagram)) && (
              <div className="pt-4 border-t border-white/[0.05] mt-2 md:mt-0">
                <h3 className="font-syne text-[11px] font-bold uppercase tracking-widest text-brand-accent mb-3">
                  Connect
                </h3>
                <div className="flex items-center gap-3">
                  {/* LinkedIn */}
                  {(member.socials?.linkedin || member.linkedin) && (
                    <a
                      href={member.socials?.linkedin || member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="flex h-11 w-11 md:h-9.5 md:w-9.5 items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.02] text-white/50 transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    >
                      <LinkedinIcon />
                    </a>
                  )}

                  {/* GitHub */}
                  {(member.socials?.github || member.github) && (
                    <a
                      href={member.socials?.github || member.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} GitHub`}
                      className="flex h-11 w-11 md:h-9.5 md:w-9.5 items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.02] text-white/50 transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    >
                      <GithubIcon />
                    </a>
                  )}

                  {/* Instagram */}
                  {(member.socials?.instagram || member.instagram) && (
                    <a
                      href={member.socials?.instagram || member.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} Instagram`}
                      className="flex h-11 w-11 md:h-9.5 md:w-9.5 items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.02] text-white/50 transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    >
                      <InstagramIcon />
                    </a>
                  )}

                  {/* Portfolio */}
                  {member.socials?.portfolio && (
                    <a
                      href={member.socials.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} Portfolio`}
                      className="flex h-11 w-11 md:h-9.5 md:w-9.5 items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.02] text-white/50 transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    >
                      <Globe className="h-[18px] w-[18px] md:h-[16px] md:w-[16px]" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
