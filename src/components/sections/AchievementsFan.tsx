import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievementGroups, type AchievementCard } from '../../data/resume';

gsap.registerPlugin(ScrollTrigger);

const ICON_PATHS: Record<AchievementCard['icon'], string[]> = {
  trophy: ['M8 21h8', 'M12 17v4', 'M7 4h10v4a5 5 0 0 1-10 0V4z', 'M17 6h2a2 2 0 0 1 0 4h-1', 'M7 6H5a2 2 0 0 0 0 4h1'],
  certificate: ['M15.477 12.89 17 22l-5-3-5 3 1.523-9.11'],
  users: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  code: ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
  star: [],
  rocket: [],
};

function IconGlyph({ type }: { type: AchievementCard['icon'] }) {
  if (type === 'certificate') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="12" cy="8" r="6" />
        <path d={ICON_PATHS.certificate[0]} />
      </svg>
    );
  }
  if (type === 'users') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        {ICON_PATHS.users.map((d) => (
          <path key={d} d={d} />
        ))}
        <circle cx="9" cy="7" r="4" />
      </svg>
    );
  }
  if (type === 'code') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        {ICON_PATHS.code.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    );
  }
  if (type === 'star') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }
  if (type === 'rocket') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }
  // trophy
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
      {ICON_PATHS.trophy.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const flatCards = achievementGroups.flatMap((group) => group.cards.map((card) => ({ group, card })));

export default function AchievementsFan() {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stripeRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<HTMLElement[]>([]);
  const descRefs = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;
    if (window.innerWidth < 1100) return;

    const stripeEls = stripeRefs.current;
    const cardEls = cardRefs.current;
    const descEls = descRefs.current;

    // Seed text comes from the data array, not the DOM — reading it back from
    // descEls would break under StrictMode's double-invoked effects (the first
    // pass clears the text before the second pass gets a chance to read it).
    const seedTexts = flatCards.map(({ card }) => card.description);
    descEls.forEach((el) => (el.textContent = ''));

    const typedFlags = new Set<number>();
    const typeText = (index: number) => {
      if (typedFlags.has(index)) return;
      typedFlags.add(index);
      const el = descEls[index];
      const seed = seedTexts[index];
      if (!el || !seed) return;
      el.classList.add('typing-cursor');
      let i = 0;
      const id = window.setInterval(() => {
        if (i < seed.length) {
          el.textContent = seed.slice(0, ++i);
          return;
        }
        window.clearInterval(id);
        el.classList.remove('typing-cursor');
      }, 14);
    };

    const getShift = () => Math.max(0, track.scrollWidth - stage.clientWidth);

    const ctx = gsap.context(() => {
      gsap.set(stripeEls, { autoAlpha: 0, y: 20 });
      gsap.set(cardEls, { autoAlpha: 0, y: 40 });

      const entranceTl = gsap.timeline({
        scrollTrigger: { trigger: stage, start: 'top 80%' },
      });

      entranceTl.to(stripeEls, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 }, 0);
      entranceTl.to(cardEls, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 0.15);
      entranceTl.add(() => typeText(0), 0.4);

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top 8%',
          end: () => `+=${Math.max(getShift() * 1.6 + window.innerHeight * 1.1, window.innerHeight * 2.8)}`,
          scrub: 1.15,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      scrollTl.to(track, { x: 0, duration: 0.12, ease: 'none' }, 0);
      scrollTl.to(track, { x: () => -getShift(), duration: 0.76, ease: 'none' }, 0.12);
      scrollTl.to(track, { x: () => -getShift(), duration: 0.12, ease: 'none' }, 0.88);

      descEls.forEach((_, i) => {
        if (i === 0) return;
        ScrollTrigger.create({
          trigger: cardEls[i],
          containerAnimation: scrollTl,
          start: 'left 75%',
          onEnter: () => typeText(i),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" className="scroll-mt-28 py-24 px-6 max-md:px-1 max-md:py-16">
      <div className="container-custom">
        {/* Desktop pinned horizontal scroll */}
        <div ref={stageRef} className="achievements-stage relative desktop-only">
          <h2 className="font-heading text-h2 font-semibold text-text-primary mb-10 flex items-center gap-3">
            <span className="section-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </span>
            Achievements
          </h2>

          <div ref={trackRef} className="achievements-track pb-2">
            <div className="achievements-stripes-row" style={{ gridTemplateColumns: flatCards.map(() => 'minmax(16rem, 1fr)').join(' ') }}>
              {achievementGroups.map((group, gi) => (
                <div
                  key={group.label}
                  ref={(el) => {
                    if (el) stripeRefs.current[gi] = el;
                  }}
                  className="stripe rounded-xl border border-white/8 px-6 py-4"
                  style={{
                    gridColumn: `span ${group.cards.length}`,
                    background: gi % 2 === 0
                      ? 'linear-gradient(135deg, rgba(0, 77, 97, 0.22), rgba(130, 38, 89, 0.14))'
                      : 'linear-gradient(135deg, rgba(130, 38, 89, 0.2), rgba(0, 77, 97, 0.13))',
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-heading text-h4 font-semibold text-text-primary whitespace-nowrap">{group.label}</h3>
                    <span className="stripe-date font-label text-sm font-semibold tracking-wider uppercase shrink-0 px-3 py-1 rounded-md border">
                      {group.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="achievements-cards-row mt-5"
              style={{ gridTemplateColumns: flatCards.map(() => 'minmax(16rem, 1fr)').join(' ') }}
            >
              {flatCards.map(({ card }, i) => (
                <article
                  key={card.title}
                  ref={(el) => {
                    if (el) cardRefs.current[i] = el;
                  }}
                  className="achievement-card relative rounded-xl overflow-hidden border border-white/6 p-6 flex flex-col"
                >
                  <div className="achievement-icon mb-4" style={{ color: 'var(--color-metallic-silver)' }}>
                    <IconGlyph type={card.icon} />
                  </div>
                  <h4 className="font-heading text-h4 font-semibold text-text-primary mb-1">{card.title}</h4>
                  <span className="font-label text-sm text-text-muted block mb-3">{card.subtitle}</span>
                  <p
                    ref={(el) => {
                      if (el) descRefs.current[i] = el;
                    }}
                    className="font-body text-sm text-text-secondary leading-relaxed mb-4 flex-1"
                  >
                    {card.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span key={tag} className="achievement-tag font-label text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-md border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile stacked layout */}
        <div className="mobile-only">
          <h2 className="font-heading text-h2 font-semibold text-text-primary mb-8 flex items-center gap-3">
            <span className="section-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </span>
            Achievements
          </h2>

          {achievementGroups.map((group, gi) => (
            <div key={group.label} className="mb-8">
              <div
                className="rounded-xl border border-white/8 px-5 py-4 mb-4"
                style={{
                  background: gi % 2 === 0
                    ? 'linear-gradient(135deg, rgba(0, 77, 97, 0.22), rgba(130, 38, 89, 0.14))'
                    : 'linear-gradient(135deg, rgba(130, 38, 89, 0.2), rgba(0, 77, 97, 0.13))',
                }}
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h3 className="font-heading text-lg font-semibold text-text-primary">{group.label}</h3>
                  <span className="stripe-date font-label text-xs font-semibold tracking-wider uppercase shrink-0 px-2.5 py-1 rounded-md border">
                    {group.period}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {group.cards.map((card) => (
                  <div key={card.title} className="mobile-achievement-card rounded-xl border border-white/8 p-5">
                    <div className="achievement-icon mb-3" style={{ color: 'var(--color-metallic-silver)' }}>
                      <IconGlyph type={card.icon} />
                    </div>
                    <h4 className="font-heading text-base font-semibold text-text-primary mb-1">{card.title}</h4>
                    <span className="font-label text-sm text-text-muted block mb-2">{card.subtitle}</span>
                    <p className="font-body text-sm text-text-secondary leading-relaxed mb-3">{card.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span key={tag} className="achievement-tag font-label text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-md border">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
