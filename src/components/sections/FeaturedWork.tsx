import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

const GITHUB_ICON =
  'M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.6-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.5-5.5 5.8.4.3.8 1 .8 2.1v3.2c0 .4.2.7.8.6A12 12 0 0 0 12 .5Z';

export default function FeaturedWork() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(!window.matchMedia('(hover: hover)').matches);

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll<HTMLElement>('.project-card');
      if (!cards || cards.length === 0) return;

      gsap.set(cards, { autoAlpha: 0, y: 60, scale: 0.95 });
      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      });
    });

    return () => ctx.revert();
  }, []);

  const toggleFlip = (index: number) => {
    if (!isTouchDevice) return;
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  return (
    <section id="work" className="scroll-mt-28 py-24 px-6 max-md:px-1 max-md:py-16">
      <div className="container-custom">
        <h2 className="font-heading text-h2 font-semibold text-text-primary mb-12 flex items-center gap-3">
          <span className="section-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              <line x1="12" y1="11" x2="12" y2="17" />
              <line x1="9" y1="14" x2="15" y2="14" />
            </svg>
          </span>
          Featured Work
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <article key={project.title} className="project-card rounded-3xl border border-border-default overflow-hidden">
              <div className="flip-card" onClick={() => toggleFlip(idx)}>
                <div className={`flip-card-inner${flipped.has(idx) ? ' flipped' : ''}`}>
                  <div className="flip-card-front">
                    <div className="relative w-full h-full">
                      <img src={project.imageUrl} alt={project.imageAlt} className="w-full h-full object-cover" loading="lazy" />
                      <div className="flip-front-gradient absolute inset-0 pointer-events-none" />
                      <div className="absolute bottom-5 left-5 right-5 z-10">
                        <h3 className="font-heading text-h3 font-semibold text-text-primary drop-shadow-lg">{project.title}</h3>
                      </div>
                      <div className="hover-hint absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-label">
                        <span>{isTouchDevice ? 'Tap' : 'Hover'}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                          <path d="M17 8l4 4-4 4" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flip-card-back">
                    <h4 className="font-label text-xs font-semibold tracking-wider uppercase mb-4 flex items-center gap-2" style={{ color: 'var(--color-accent-teal-light)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                      Key Features
                    </h4>
                    <ul className="space-y-2.5">
                      {project.features.map((feature) => (
                        <li key={feature} className="feature-item">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card-content">
                <div className="tech-stack-row flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-tag font-label">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d={GITHUB_ICON} />
                    </svg>
                    GitHub
                  </a>

                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
