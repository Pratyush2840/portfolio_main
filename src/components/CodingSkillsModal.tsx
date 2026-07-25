import { useEffect, useState } from 'react';
import { cpProfiles } from '../data/resume';

interface PlatformStats {
  rating: string;
  solved: string;
  extra?: string;
  loading: boolean;
  error: boolean;
}

const codechefProfile = cpProfiles.find((p) => p.platform === 'CodeChef')!;
const codeforcesProfile = cpProfiles.find((p) => p.platform === 'Codeforces')!;
const leetcodeProfile = cpProfiles.find((p) => p.platform === 'LeetCode')!;

const EMPTY: PlatformStats = { rating: '—', solved: '—', loading: true, error: false };

export default function CodingSkillsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [codechef, setCodechef] = useState<PlatformStats>(EMPTY);
  const [codeforces, setCodeforces] = useState<PlatformStats>(EMPTY);
  const [leetcode, setLeetcode] = useState<PlatformStats>(EMPTY);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    setCodechef(EMPTY);
    setCodeforces(EMPTY);
    setLeetcode(EMPTY);

    // LeetCode — try the live CORS-enabled mirror first; it runs on a free
    // tier with a low per-IP rate limit, so fall back to the pre-fetched
    // snapshot instead of showing an error whenever it's rate-limited/asleep.
    const fetchJson = async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${url} -> ${res.status}`);
      return res.json();
    };

    (async () => {
      try {
        const [profile, solved, contest] = await Promise.all([
          fetchJson(`https://alfa-leetcode-api.onrender.com/${leetcodeProfile.handle}`),
          fetchJson(`https://alfa-leetcode-api.onrender.com/${leetcodeProfile.handle}/solved`),
          fetchJson(`https://alfa-leetcode-api.onrender.com/${leetcodeProfile.handle}/contest`),
        ]);
        setLeetcode({
          rating: contest.contestRating ? `Rating ${Math.round(contest.contestRating)}` : leetcodeProfile.rating,
          solved: solved.solvedProblem != null ? `${solved.solvedProblem} solved` : '—',
          extra: `#${Number(profile.ranking).toLocaleString()} rank`,
          loading: false,
          error: false,
        });
      } catch {
        try {
          const data = await fetchJson('/data/leetcode.json');
          const allSolved = data.submissions?.find((s: { difficulty: string }) => s.difficulty === 'All')?.count;
          setLeetcode({
            rating: leetcodeProfile.rating,
            solved: allSolved != null ? `${allSolved} solved` : '—',
            extra: `#${Number(data.ranking).toLocaleString()} rank`,
            loading: false,
            error: false,
          });
        } catch {
          setLeetcode({ ...EMPTY, loading: false, error: true });
        }
      }
    })();

    // Codeforces — live public API, fetched directly from the browser
    Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${codeforcesProfile.handle}`).then((r) => r.json()),
      fetch(`https://codeforces.com/api/user.status?handle=${codeforcesProfile.handle}`).then((r) => r.json()),
    ])
      .then(([info, status]) => {
        const user = info.result?.[0];
        const solvedSet = new Set<string>();
        (status.result ?? []).forEach((sub: { verdict: string; problem: { contestId: number; index: string } }) => {
          if (sub.verdict === 'OK') solvedSet.add(`${sub.problem.contestId}${sub.problem.index}`);
        });
        setCodeforces({
          rating: user ? `${user.rating} (${user.rank})` : codeforcesProfile.rating,
          solved: `${solvedSet.size} solved`,
          extra: user ? `highest ${user.maxRating}` : undefined,
          loading: false,
          error: !user,
        });
      })
      .catch(() => setCodeforces({ ...EMPTY, loading: false, error: true }));

    // CodeChef — live, CORS-enabled public mirror of the unofficial CodeChef API.
    fetch(`https://codechefapi.vercel.app/handle/${codechefProfile.handle}`)
      .then((res) => {
        if (!res.ok) throw new Error('unavailable');
        return res.json();
      })
      .then((data) => {
        if (!data.success) throw new Error('unavailable');
        setCodechef({
          rating: `${data.currentRating ?? '—'} (${data.stars ?? ''})`.trim(),
          solved: data.numberOfProblemsSolved != null ? `${data.numberOfProblemsSolved} solved` : '—',
          extra: data.highestRating ? `highest ${data.highestRating}` : undefined,
          loading: false,
          error: false,
        });
      })
      .catch(() => setCodechef({ ...EMPTY, loading: false, error: true }));

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const cards: { platform: string; handle: string; url: string; stats: PlatformStats }[] = [
    { platform: 'CodeChef', handle: codechefProfile.handle, url: codechefProfile.url, stats: codechef },
    { platform: 'Codeforces', handle: codeforcesProfile.handle, url: codeforcesProfile.url, stats: codeforces },
    { platform: 'LeetCode', handle: leetcodeProfile.handle, url: leetcodeProfile.url, stats: leetcode },
  ];

  return (
    <div className="skills-modal-backdrop" onClick={onClose}>
      <div className="skills-modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-h3 font-semibold text-text-primary">Coding Skills</h3>
          <button className="skills-modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {cards.map(({ platform, handle, url, stats }) => (
            <div key={platform} className="skills-card">
              <span className="skills-card-platform">{platform}</span>
              <span className="skills-card-handle">@{handle}</span>
              {stats.loading ? (
                <div className="skills-card-loading">
                  <div className="loading-spinner" />
                </div>
              ) : (
                <>
                  <span className="skills-card-rating">{stats.rating}</span>
                  <span className="skills-card-solved">{stats.solved}</span>
                  {stats.extra && <span className="skills-card-extra">{stats.extra}</span>}
                </>
              )}
              <a href={url} target="_blank" rel="noopener noreferrer" className="skills-card-link">
                View profile
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                  <path d="M7 17L17 7M17 7H8M17 7V16" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
