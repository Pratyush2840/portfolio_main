import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education } from '../../data/resume';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll<HTMLElement>('.edu-card');
      if (!cards || cards.length === 0) return;
      gsap.set(cards, { autoAlpha: 0, y: 30 });
      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="scroll-mt-28 py-24 px-6 max-md:px-1 max-md:py-16">
      <div className="container-custom">
        <h2 className="font-heading text-h2 font-semibold text-text-primary mb-10 flex items-center gap-3">
          <span className="section-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </span>
          Education
        </h2>

        <div ref={gridRef} className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
          {education.map((entry, i) => (
            <div key={entry.title} className="edu-card relative rounded-xl border border-white/4 overflow-hidden">
              <div className="edu-accent-line" />
              <div className="p-6 max-md:p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="edu-step">{'0' + (i + 1)}</div>
                </div>
                <div>
                  <span className="font-label text-xs font-medium tracking-wider uppercase mb-1.5 block" style={{ color: 'var(--color-accent-teal-light)' }}>
                    {entry.period}
                  </span>
                  <h4 className="font-heading text-h4 font-semibold text-text-primary mb-1">{entry.title}</h4>
                  <span className="font-label text-sm text-text-muted block">{entry.subtitle}</span>
                  {entry.description && (
                    <p className="font-body text-sm text-text-secondary leading-relaxed mt-2">{entry.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
