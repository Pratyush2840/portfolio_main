import { useEffect, useMemo, useState } from 'react';
import { cpProfiles, githubUsername } from '../../data/resume';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubContributions {
  total: { [year: string]: number };
  contributions: ContributionDay[];
}

interface LeetCodeData {
  username: string;
  ranking: number;
  streak: number;
  totalActiveDays: number;
  submissions: { difficulty: string; count: number }[];
  calendar: { [timestamp: string]: number };
}

type Platform = 'github' | 'leetcode';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function generateWeeks(days: ContributionDay[]): ContributionDay[][] {
  if (days.length === 0) return [];
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  days.forEach((day, index) => {
    const dayOfWeek = new Date(day.date).getDay();
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
    if (index === days.length - 1) weeks.push(currentWeek);
  });
  return weeks;
}

function monthLabelForWeek(weeks: ContributionDay[][], weekIndex: number): string {
  const week = weeks[weekIndex];
  if (!week || week.length === 0) return '';
  const currentMonth = new Date(week[0].date).getMonth();
  const prevWeek = weekIndex > 0 ? weeks[weekIndex - 1] : null;
  const prevMonth = prevWeek && prevWeek.length > 0 ? new Date(prevWeek[0].date).getMonth() : -1;
  return currentMonth !== prevMonth ? MONTH_NAMES[currentMonth] : '';
}

function githubLevelColor(level: number): string {
  return ['#1a1625', '#222351', '#2b4580', '#3d3fe5', '#4673ff'][level] ?? '#1a1625';
}

function leetcodeLevelColor(level: number): string {
  return ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'][level] ?? '#161b22';
}

function leetcodeLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

export default function Contributions() {
  const [platform, setPlatform] = useState<Platform>('github');

  const [githubDays, setGithubDays] = useState<ContributionDay[]>([]);
  const [githubLoading, setGithubLoading] = useState(true);
  const [githubError, setGithubError] = useState(false);

  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const [leetcodeError, setLeetcodeError] = useState(false);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}`)
      .then((res) => res.json())
      .then((data: GitHubContributions) => {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        const filtered = data.contributions
          .filter((d) => new Date(d.date) >= oneYearAgo && new Date(d.date) <= today)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setGithubDays(filtered);
        setGithubLoading(false);
      })
      .catch(() => {
        setGithubError(true);
        setGithubLoading(false);
      });

    fetch('/data/leetcode.json')
      .then((res) => res.json())
      .then((data: LeetCodeData) => {
        setLeetcode(data);
        setLeetcodeLoading(false);
      })
      .catch(() => {
        setLeetcodeError(true);
        setLeetcodeLoading(false);
      });
  }, []);

  const githubTotal = useMemo(() => githubDays.reduce((sum, d) => sum + d.count, 0), [githubDays]);
  const githubWeeks = useMemo(() => generateWeeks(githubDays), [githubDays]);

  const leetcodeDays = useMemo<ContributionDay[]>(() => {
    if (!leetcode) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(today);
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setDate(startDate.getDate() + 1);

    const map = new Map<string, number>();
    Object.entries(leetcode.calendar).forEach(([timestamp, count]) => {
      const date = new Date(parseInt(timestamp) * 1000);
      map.set(date.toISOString().split('T')[0], count);
    });

    const result: ContributionDay[] = [];
    const current = new Date(startDate);
    while (current <= today) {
      const dateStr = current.toISOString().split('T')[0];
      const count = map.get(dateStr) ?? 0;
      result.push({ date: dateStr, count, level: leetcodeLevel(count) });
      current.setDate(current.getDate() + 1);
    }
    return result;
  }, [leetcode]);

  const leetcodeTotal = useMemo(() => leetcodeDays.reduce((sum, d) => sum + d.count, 0), [leetcodeDays]);
  const leetcodeWeeks = useMemo(() => generateWeeks(leetcodeDays), [leetcodeDays]);

  const activeWeeks = platform === 'github' ? githubWeeks : leetcodeWeeks;
  const activeLoading = platform === 'github' ? githubLoading : leetcodeLoading;
  const activeError = platform === 'github' ? githubError : leetcodeError;
  const activeTotal = platform === 'github' ? githubTotal : leetcodeTotal;
  const levelColor = platform === 'github' ? githubLevelColor : leetcodeLevelColor;

  return (
    <section id="problem-solving" className="scroll-mt-28 py-24 px-6 max-md:px-4 max-md:py-16">
      <div className="container-custom">
        <h2 className="font-heading text-h2 font-semibold text-text-primary mb-6 flex items-center gap-3">
          <span className="section-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          Contribution Graph
        </h2>

        {/* Competitive programming stats strip */}
        <div className="flex flex-wrap gap-4 mb-8">
          {cpProfiles.map((profile) => (
            <a key={profile.platform} href={profile.url} target="_blank" rel="noopener noreferrer" className="cp-chip">
              <span className="cp-chip-platform">{profile.platform}</span>
              <span className="cp-chip-rating">{profile.rating}</span>
            </a>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={() => setPlatform('github')} className={`platform-button${platform === 'github' ? ' active' : ''}`}>
            GitHub
          </button>
          <button onClick={() => setPlatform('leetcode')} className={`platform-button${platform === 'leetcode' ? ' active' : ''}`}>
            LeetCode
          </button>
        </div>

        <div className="calendar-container p-4 md:p-6 rounded-xl overflow-x-auto">
          {activeLoading ? (
            <div className="flex items-center justify-center h-[200px]">
              <div className="loading-spinner" />
            </div>
          ) : activeError ? (
            <div className="flex items-center justify-center h-[200px] text-metallic-silver/60">Failed to load contributions</div>
          ) : (
            <>
              <div className="month-label-track relative h-5 mb-2 min-w-max">
                {activeWeeks.map((_, i) => {
                  const label = monthLabelForWeek(activeWeeks, i);
                  return label ? (
                    <span key={i} className="month-label" style={{ left: `calc(${i} * 14px)` }}>
                      {label}
                    </span>
                  ) : null;
                })}
              </div>
              <div className="flex gap-[3px] min-w-max">
                {activeWeeks.map((week, wi) => (
                  <div key={wi} className="grid grid-rows-7 gap-[3px]">
                    {week.map((day) => (
                      <div
                        key={day.date}
                        className="contribution-cell"
                        style={{ backgroundColor: levelColor(day.level) }}
                        title={`${day.count} on ${day.date}`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <footer className="calendar-footer mt-4 flex flex-wrap justify-between items-center gap-4">
                <div className="text-metallic-silver/80 text-sm">
                  {activeTotal} {platform === 'github' ? 'contributions' : 'submissions'} in last year
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-metallic-silver/60 text-xs mr-1">Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div key={level} className="legend-cell" style={{ backgroundColor: levelColor(level) }} />
                  ))}
                  <span className="text-metallic-silver/60 text-xs ml-1">More</span>
                </div>
              </footer>
            </>
          )}
        </div>

        {platform === 'leetcode' && leetcode && (
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="stats-card flex items-center gap-4 px-5 py-4 rounded-xl">
              <div>
                <span className="stat-number font-heading text-3xl font-bold">{leetcode.streak}</span>
                <span className="block text-sm stat-label mt-0.5">day streak</span>
              </div>
            </div>
            <div className="stats-card flex items-center gap-4 px-5 py-4 rounded-xl">
              <div>
                <span className="stat-number font-heading text-3xl font-bold">#{leetcode.ranking.toLocaleString()}</span>
                <span className="block text-sm stat-label mt-0.5">global rank</span>
              </div>
            </div>
            <div className="stats-card flex items-center gap-4 px-5 py-4 rounded-xl">
              <div>
                <span className="stat-number font-heading text-3xl font-bold">
                  {leetcode.submissions.find((s) => s.difficulty === 'All')?.count ?? '—'}
                </span>
                <span className="block text-sm stat-label mt-0.5">questions solved</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
