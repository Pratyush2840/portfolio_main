import { useEffect, useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievementGroups, type AchievementCard } from '../../data/resume';

gsap.registerPlugin(ScrollTrigger);

// Fixed per-card tilt angles, cycled by index — gives the scattered,
// tilted-mockup look instead of a straight grid.
const TILTS = [-6, 5, -4, 6, -5, 4, -3];

function IconGlyph({ type }: { type: AchievementCard['icon'] }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  if (type === 'certificate') {
    return (
      <svg viewBox="0 0 24 24" {...common} className="w-9 h-9">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    );
  }
  if (type === 'users') {
    return (
      <svg viewBox="0 0 24 24" {...common} className="w-9 h-9">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  if (type === 'code') {
    return (
      <svg viewBox="0 0 24 24" {...common} className="w-9 h-9">
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
      </svg>
    );
  }
  if (type === 'star') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }
  if (type === 'rocket') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }
  // trophy
  return (
    <svg viewBox="0 0 24 24" {...common} className="w-9 h-9">
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4z" />
      <path d="M17 6h2a2 2 0 0 1 0 4h-1" />
      <path d="M7 6H5a2 2 0 0 0 0 4h1" />
    </svg>
  );
}

export default function AchievementsFan() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.tilt-card');
      if (!cards || cards.length === 0) return;

      cards.forEach((card, i) => {
        gsap.set(card, { opacity: 0, y: 70, scale: 0.92 });
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: (i % 4) * 0.08,
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" className="scroll-mt-28 py-24 px-6 max-md:px-4 max-md:py-16" ref={sectionRef}>
      <div className="container-custom">
        <h2 className="font-heading text-h2 font-semibold text-text-primary mb-12 flex items-center gap-3">
          <span className="section-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </span>
          Achievements
        </h2>

        {achievementGroups.map((group) => (
          <div key={group.label} className="mb-16 last:mb-0">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <h3 className="font-heading text-h4 font-semibold text-text-primary">{group.label}</h3>
              <span className="stripe-date font-label text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-md border">
                {group.period}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-14 pb-2">
              {group.cards.map((card, i) => (
                <article key={card.title} className="tilt-card">
                  <div className="tilt-card-face" style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` } as CSSProperties}>
                    <div className="tilt-card-icon">
                      <IconGlyph type={card.icon} />
                    </div>
                    <h4 className="font-heading text-lg font-semibold text-text-primary mb-1">{card.title}</h4>
                    <span className="font-label text-sm text-text-muted block mb-3">{card.subtitle}</span>
                    <p className="font-body text-sm text-text-secondary leading-relaxed mb-4">{card.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span key={tag} className="achievement-tag font-label text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-md border">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
