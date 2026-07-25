export const hero = {
  name: 'Pratyush Singh',
  role: 'Full Stack Developer',
  greeting: 'Good evening,',
  bio: [
    "B.Tech Computer Science student at IIITDM Jabalpur. I build full-stack web apps end to end: frontend, backend, database, and deployment. I also solve competitive programming problems on the side.",
  ],
  tagline: 'Clean code. Full-stack builds. Fewer pain points.',
  resumeUrl: '/assets/PratyushSingh_Resume.pdf',
  photoUrl: '/assets/profile-photo.jpg',
};

export const contact = {
  email: 'psingh080604@gmail.com',
  formEndpoint: 'psingh08iph@gmail.com',
  phone: '+91 74659 87557',
  github: 'https://github.com/Pratyush2840',
  linkedin: 'https://www.linkedin.com/in/pratyush-singh-44162228b/',
  instagram: 'https://www.instagram.com/pratyush_singh08?igsh=YnFyd28ycDE3OW14&utm_source=qr',
};

export interface TechItem {
  name: string;
  icon: string;
  featured?: boolean;
}

export const techStack: TechItem[] = [
  { name: 'React', icon: 'https://skillicons.dev/icons?i=react', featured: true },
  { name: 'TypeScript', icon: 'https://skillicons.dev/icons?i=ts', featured: true },
  { name: 'Node.js', icon: 'https://skillicons.dev/icons?i=nodejs', featured: true },
  { name: 'Express', icon: 'https://skillicons.dev/icons?i=express', featured: true },
  { name: 'MongoDB', icon: 'https://skillicons.dev/icons?i=mongodb', featured: true },
  { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql', featured: true },
  { name: 'Python', icon: 'https://skillicons.dev/icons?i=python', featured: true },
  { name: 'C++', icon: 'https://skillicons.dev/icons?i=cpp' },
  { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=js' },
  { name: 'Java', icon: 'https://skillicons.dev/icons?i=java' },
  { name: 'PHP', icon: 'https://skillicons.dev/icons?i=php' },
  { name: 'SQL', icon: 'https://skillicons.dev/icons?i=mysql' },
  { name: 'Bootstrap', icon: 'https://skillicons.dev/icons?i=bootstrap' },
  { name: 'Tailwind CSS', icon: 'https://skillicons.dev/icons?i=tailwind' },
  { name: 'NumPy', icon: 'https://skillicons.dev/icons?i=numpy' },
  { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  { name: 'TensorFlow', icon: 'https://skillicons.dev/icons?i=tensorflow' },
  { name: 'Docker', icon: 'https://skillicons.dev/icons?i=docker' },
  { name: 'Git', icon: 'https://skillicons.dev/icons?i=git' },
  { name: 'GitHub', icon: 'https://skillicons.dev/icons?i=github' },
  { name: 'VS Code', icon: 'https://skillicons.dev/icons?i=vscode' },
  { name: 'Postman', icon: 'https://skillicons.dev/icons?i=postman' },
];

export interface EducationEntry {
  period: string;
  title: string;
  subtitle: string;
  description?: string;
}

export const education: EducationEntry[] = [
  {
    period: 'Aug 2023 — May 2027',
    title: 'IIITDM Jabalpur',
    subtitle: 'B.Tech, Computer Science Engineering — CGPA 7.5/10.0',
  },
  {
    period: '2022',
    title: 'Bhartiyam International School',
    subtitle: 'Higher Secondary Certificate, CBSE — 89.45%',
    description: 'Rudrapur, Uttarakhand',
  },
];

export interface AchievementCard {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: 'trophy' | 'certificate' | 'users' | 'code' | 'star' | 'rocket';
}

export interface AchievementGroup {
  label: string;
  period: string;
  cards: AchievementCard[];
}

export const achievementGroups: AchievementGroup[] = [
  {
    label: 'Competitions & Certifications',
    period: '2024 — 2025',
    cards: [
      {
        title: 'Newbie Programming Contest',
        subtitle: '12th place',
        description:
          'Placed 12th out of 200+ participants in a competitive programming contest, sharpening algorithmic problem-solving under time pressure.',
        tags: ['200+ Participants', 'Competitive Programming'],
        icon: 'trophy',
      },
      {
        title: 'NPTEL Elite Certification',
        subtitle: '"Joy of Computing Using Python" — 82%',
        description:
          'Earned an NPTEL Elite certification, scoring in the top 5% nationwide among all enrolled learners.',
        tags: ['Top 5% Nationwide', 'NPTEL'],
        icon: 'certificate',
      },
    ],
  },
  {
    label: 'Leadership & Organizing',
    period: '2023 — Present',
    cards: [
      {
        title: 'HackByte 2.0 — Event Coordinator',
        subtitle: 'IIITDM Jabalpur',
        description:
          "Led a 15-member organizing committee for Central India's largest hackathon, managing a ₹5,00,000+ budget and 20+ sponsor partnerships across 800+ participants.",
        tags: ['800+ Participants', '15-Member Team', '₹5L+ Budget'],
        icon: 'users',
      },
      {
        title: 'Fusion Project — Project Lead',
        subtitle: "IIITDM Jabalpur's Official Website",
        description:
          "Leading development and year-round maintenance of the institute's official website, serving 2000+ students and faculty.",
        tags: ['2000+ Users', 'Ongoing'],
        icon: 'code',
      },
      {
        title: 'Sports Committee — "Enthuse" Fest',
        subtitle: 'Lawn Tennis Club Representative',
        description:
          'Organized the institute sports fest "Enthuse" with 500+ participants competing across 12 categories.',
        tags: ['500+ Participants', '12 Categories'],
        icon: 'rocket',
      },
    ],
  },
  {
    label: 'Academic Wins',
    period: '2019 — 2024',
    cards: [
      {
        title: 'School Science Exhibition',
        subtitle: '1st Place — Team Lead',
        description:
          'Led a 4-member team to first place, designing and building an autonomous drone for the exhibition.',
        tags: ['1st Place', 'Team of 4'],
        icon: 'star',
      },
      {
        title: 'Inter-Branch English Vocabulary Competition',
        subtitle: '2nd Place, IIITDM Jabalpur',
        description:
          'Secured second place in an institute-wide vocabulary competition against participants from every branch.',
        tags: ['2nd Place'],
        icon: 'star',
      },
    ],
  },
];

export interface CpProfile {
  platform: string;
  handle: string;
  rating: string;
  url: string;
}

export const cpProfiles: CpProfile[] = [
  { platform: 'CodeChef', handle: 'pratyush400', rating: '3★ · highest 1622', url: 'https://www.codechef.com/users/pratyush400' },
  { platform: 'Codeforces', handle: 'pratyush40', rating: 'Pupil · highest 1289', url: 'https://codeforces.com/profile/pratyush40' },
  { platform: 'LeetCode', handle: 'pratyush4000', rating: 'Rating 1704', url: 'https://leetcode.com/u/pratyush4000/' },
];

export const githubUsername = 'Pratyush2840';
export const leetcodeUsername = 'pratyush4000';
