import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingDock, { type DockItem } from '../FloatingDock';
import { hero, contact } from '../../data/resume';

gsap.registerPlugin(ScrollTrigger);

const GITHUB_ICON =
  'M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.6-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.5-5.5 5.8.4.3.8 1 .8 2.1v3.2c0 .4.2.7.8.6A12 12 0 0 0 12 .5Z';
const LINKEDIN_ICON =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';
const MAIL_ICON = 'M2 4h20v16H2V4zm2 2v.01L12 12l8-5.99V6H4zm16 2.238-7.386 5.54a1 1 0 0 1-1.228 0L4 8.238V18h16V8.238z';
const INSTAGRAM_ICON =
  'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z';

const socialLinks: DockItem[] = [
  { title: 'GitHub', icon: GITHUB_ICON, href: contact.github },
  { title: 'LinkedIn', icon: LINKEDIN_ICON, href: contact.linkedin },
  { title: 'Instagram', icon: INSTAGRAM_ICON, href: contact.instagram },
  { title: 'Email', icon: MAIL_ICON, href: `mailto:${contact.email}` },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const photo = photoRef.current;
      const items = sectionRef.current?.querySelectorAll<HTMLElement>('.hero-anim-item');
      if (!photo || !items) return;

      gsap.set(photo, { autoAlpha: 0, y: 30, scale: 0.94 });
      gsap.set(items, { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });

      tl.to(photo, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }, 0);
      tl.to(items, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 0.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-16 min-h-dvh flex items-center justify-center px-6 py-10 max-md:px-4 max-md:py-5"
    >
      <div className="container-custom flex items-center gap-16 max-md:flex-col max-md:gap-12 max-md:text-center max-md:items-center">
        {/* Photo */}
        <div className="shrink-0 max-md:w-full max-md:flex max-md:justify-center" ref={photoRef}>
          <div className="group relative">
            <div
              className="relative overflow-hidden rounded-2xl p-3 border border-white/10 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 77, 97, 0.12), rgba(130, 38, 89, 0.08))',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.03) inset',
              }}
            >
              <img
                src={hero.photoUrl}
                alt={hero.name}
                width={800}
                height={800}
                loading="eager"
                className="block rounded-xl object-cover shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                style={{ width: 'clamp(256px, 28vw, 384px)', height: 'clamp(256px, 28vw, 384px)' }}
              />
              <div
                className="absolute inset-3 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"
                style={{ background: 'linear-gradient(to top, rgba(0, 77, 97, 0.15), transparent)' }}
              />
            </div>

            <div className="floating-chip floating-chip-top">
              <span className="font-mono text-xs font-medium tracking-wide" style={{ color: 'var(--color-accent-teal-light)' }}>
                &gt; npm run dev
              </span>
            </div>
            <div className="floating-chip floating-chip-bottom">
              <span className="font-mono text-xs font-medium tracking-wide" style={{ color: 'var(--color-accent-teal-light)' }}>
                &gt; const dev = true
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col min-w-0">
          <span className="hero-anim-item font-label text-sm font-medium tracking-wider mb-4" style={{ color: 'var(--color-accent-teal-light)' }}>
            {hero.greeting}
          </span>

          <h1 className="hero-anim-item name-reveal font-heading text-display font-bold leading-[1.1] -tracking-[0.03em] mb-3">{hero.name}</h1>

          <h2 className="hero-anim-item font-heading text-h3 font-medium mb-8" style={{ color: 'var(--color-metallic-silver)' }}>
            {hero.role}
          </h2>

          {hero.bio.map((paragraph, i) => (
            <p key={i} className="hero-anim-item font-body text-base font-normal leading-loose text-text-secondary max-w-[520px] max-md:max-w-full mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}

          <p className="hero-anim-item font-body text-sm font-normal text-text-muted italic mt-6 max-w-[520px] max-md:max-w-full">
            {hero.tagline}
          </p>

          <div className="hero-anim-item flex items-center gap-6 mt-10 flex-wrap max-md:flex-col max-md:items-center max-md:gap-5">
            <a
              href={hero.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn inline-flex items-center gap-2.5 px-7 py-3 font-label text-sm font-semibold tracking-wider uppercase text-text-primary rounded-xl no-underline cursor-pointer w-fit shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>

            <div className="h-[70px] flex items-center">
              <FloatingDock items={socialLinks} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
