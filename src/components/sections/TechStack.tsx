import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { techStack } from '../../data/resume';

gsap.registerPlugin(ScrollTrigger);

const featured = techStack.filter((t) => t.featured);

export default function TechStack() {
  const fanRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fanned card deck — cards start stacked, spread into an arc on scroll
      const fanCards = fanRef.current?.querySelectorAll<HTMLElement>('.fan-card');
      if (fanCards && fanCards.length > 0) {
        const count = fanCards.length;
        const spread = 10; // degrees between each card
        const startRotation = -((count - 1) * spread) / 2;

        gsap.set(fanCards, { x: 0, y: 40, rotation: 0, opacity: 0, scale: 0.85 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: fanRef.current, start: 'top 78%' },
        });

        fanCards.forEach((card, i) => {
          const offsetFromCenter = i - (count - 1) / 2;
          tl.to(
            card,
            {
              x: offsetFromCenter * 68,
              y: Math.abs(offsetFromCenter) * 14,
              rotation: startRotation + i * spread,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
            },
            i * 0.08,
          );
        });
      }

      // Full grid — staggered fade/slide entrance
      const gridCards = gridRef.current?.querySelectorAll<HTMLElement>('.tech-card');
      if (gridCards && gridCards.length > 0) {
        gsap.set(gridCards, { autoAlpha: 0, y: 40 });
        gsap.to(gridCards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.04,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="tech" className="scroll-mt-28 py-24 px-6 max-md:px-4 max-md:py-16">
      <div className="container-custom">
        <h2 className="font-heading text-h2 font-semibold text-text-primary mb-4 flex items-center gap-3">
          <span className="section-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </span>
          Tech Stack
        </h2>

        {/* Fanned featured deck */}
        <div ref={fanRef} className="fan-deck flex items-center justify-center mb-16 max-md:mb-10">
          {featured.map((tech) => (
            <div key={tech.name} className="fan-card">
              <img src={tech.icon} alt={`${tech.name} logo`} className="w-10 h-10 object-contain" loading="lazy" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Full grid */}
        <div ref={gridRef} className="flex flex-wrap justify-center gap-4 md:gap-6">
          {techStack.map((tech) => (
            <div key={tech.name} className="tech-card py-3 px-5 rounded-xl flex items-center cursor-pointer md:w-48 w-40 border">
              <img src={tech.icon} alt={`${tech.name} logo`} className="w-10 h-10 object-contain" loading="lazy" />
              <h4 className="tech-name text-sm ml-4 font-medium">{tech.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
