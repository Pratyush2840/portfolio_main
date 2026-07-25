import { useEffect, useState } from 'react';
import CodingSkillsModal from './CodingSkillsModal';

type SectionId = 'about' | 'achievements' | 'work' | 'tech' | 'problem-solving' | 'education' | 'contact';

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Featured Work' },
  { id: 'tech', label: 'Tech Stack' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'problem-solving', label: 'Contributions' },
  { id: 'education', label: 'Education' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionId>('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    const ids: SectionId[] = ['about', 'work', 'tech', 'achievements', 'problem-solving', 'education', 'contact'];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar-bg fixed left-0 top-0 z-[1000] w-full${isScrolled ? ' navbar-scrolled' : ''}`}>
      <div className="mx-auto flex h-[58px] md:h-[62px] lg:h-[64px] max-w-[1280px] items-center px-4 lg:pl-2 lg:pr-8">
        <button className="brand-logo shrink-0" onClick={() => scrollToSection('about')} aria-label="Go to top">
          <img src="/assets/favicon.png" alt="Pratyush Singh logo" className="brand-logo-image" />
        </button>

        <nav className="hidden items-center gap-6 lg:flex lg:ml-auto lg:mr-auto">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`nav-link${activeSection === s.id ? ' nav-link-active' : ''}`}
              onClick={() => scrollToSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto hidden lg:flex items-center gap-3">
          <button className="nav-cta nav-cta-outline" onClick={() => setIsSkillsOpen(true)}>
            Coding Skills
          </button>
          <button className="nav-cta" onClick={() => scrollToSection('contact')}>
            Contact
          </button>
        </div>

        <button
          className="ml-auto flex h-9 w-9 items-center justify-center lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
        >
          <div className="relative h-4 w-6">
            <span className={`hamburger-line absolute left-0 top-0 h-px w-full${isMobileMenuOpen ? ' top-1/2 rotate-45' : ''}`} />
            <span className={`hamburger-line absolute left-0 top-1/2 h-px w-full${isMobileMenuOpen ? ' opacity-0' : ''}`} />
            <span className={`hamburger-line absolute left-0 top-full h-px w-full${isMobileMenuOpen ? ' top-1/2 -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      <div className={`mobile-menu absolute inset-x-0 top-full z-40 lg:hidden${isMobileMenuOpen ? ' mobile-menu-open' : ''}`}>
        <nav className="mx-4 mb-4 flex flex-col gap-1 rounded-2xl p-4 mobile-menu-inner">
          {SECTIONS.map((s) => (
            <button key={s.id} className="mobile-link" onClick={() => scrollToSection(s.id)}>
              {s.label}
            </button>
          ))}
          <button
            className="mobile-link"
            onClick={() => {
              setIsSkillsOpen(true);
              setIsMobileMenuOpen(false);
            }}
          >
            Coding Skills
          </button>
          <button className="mobile-link-cta" onClick={() => scrollToSection('contact')}>
            Contact
          </button>
        </nav>
      </div>
      </header>

      <CodingSkillsModal open={isSkillsOpen} onClose={() => setIsSkillsOpen(false)} />
    </>
  );
}
