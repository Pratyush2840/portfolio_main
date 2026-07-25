import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { projects, type Project } from '../../data/projects';

const GITHUB_ICON =
  'M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.6-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.5-5.5 5.8.4.3.8 1 .8 2.1v3.2c0 .4.2.7.8.6A12 12 0 0 0 12 .5Z';

/**
 * Each card's whole animation is one continuous function of overall scroll
 * progress — no per-card state, no manual scroll listeners. `unit` is how
 * much of the 0-1 scroll range one card "owns"; `stops` places that card's
 * six keyframes (entering → current → 1st/2nd/3rd previous → gone) at its
 * own position along the shared timeline, so cards before/after it are just
 * shifted copies of the same curve.
 */
function StackCard({
  project,
  index,
  count,
  progress,
}: {
  project: Project;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const unit = 1 / Math.max(count - 1, 1);
  const stops = [-1, 0, 1, 2, 3, 4].map((step) => (index + step) * unit);

  const y = useTransform(progress, stops, [420, 0, -80, -160, -240, -240]);
  const scale = useTransform(progress, stops, [0.95, 1, 0.95, 0.9, 0.85, 0.85]);
  const opacity = useTransform(progress, stops, [0, 1, 0.65, 0.35, 0.15, 0]);
  const blurPx = useTransform(progress, stops, [0, 0, 2, 5, 8, 8]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);
  const zIndex = useTransform(progress, stops, [10, 50, 40, 30, 20, 10]);

  return (
    <motion.article className="work-stack-card" style={{ y, scale, opacity, filter, zIndex }}>
      <div className="work-stack-image-wrap">
        <img src={project.imageUrl} alt={project.imageAlt} className="work-stack-image" loading="lazy" />
        <div className="work-stack-image-gradient" />
      </div>

      <div className="work-stack-body">
        <h3 className="font-heading text-h2 font-bold text-text-primary mb-3">{project.title}</h3>
        <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed mb-5 max-w-xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 6).map((tech) => (
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
    </motion.article>
  );
}

export default function FeaturedWork() {
  const containerRef = useRef<HTMLElement>(null);

  // scrollYProgress runs 0 -> 1 for exactly as long as the section is pinned
  // (sticky), i.e. across the full `count * 100vh` scroll container below.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.6 });

  return (
    <section
      id="work"
      ref={containerRef}
      className="work-scroll-container"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="work-sticky-viewport">
        <h2 className="work-stack-heading font-heading font-bold text-text-primary flex items-center gap-3">
          <span className="section-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              <line x1="12" y1="11" x2="12" y2="17" />
              <line x1="9" y1="14" x2="15" y2="14" />
            </svg>
          </span>
          Featured Work
        </h2>

        <div className="work-stack-frame">
          {projects.map((project, i) => (
            <StackCard key={project.title} project={project} index={i} count={projects.length} progress={smoothProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
