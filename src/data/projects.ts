export interface Project {
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  /** Placeholder until real screenshots are supplied — swap for a real image path in /public/assets/projects/ */
  imageUrl: string;
  imageAlt: string;
}

export const projects: Project[] = [
  {
    title: 'College Bazar',
    description:
      'Full-stack peer-to-peer marketplace for college students to list, browse, and bid on products.',
    features: [
      'React 19 + Vite frontend with a REST API on Node.js/Express 5',
      'PostgreSQL schema with SSL-secured connections for listings, bidding history, and user/admin data',
      'JWT sessions combined with Google OAuth 2.0 for one-click sign-in',
      'Real-time bidding system with dedicated /api/bid endpoints',
      'Cloudinary + Multer image upload for product photos',
      'Automated listing expiry/cleanup via node-cron and transactional emails via Nodemailer',
      'Admin panel for moderating listings, users, and support queries',
    ],
    techStack: ['React 19', 'Vite', 'Node.js', 'Express 5', 'PostgreSQL', 'JWT', 'Google OAuth', 'GSAP'],
    githubUrl: 'https://github.com/Pratyush2840/CollegeBazar',
    liveUrl: 'https://college-bazar-seven.vercel.app/',
    imageUrl: 'https://picsum.photos/seed/college-bazar/1200/800',
    imageAlt: 'College Bazar marketplace platform',
  },
  {
    title: 'Expense Splitter (Expenso)',
    description:
      'Full-stack group expense-splitting app with a graph-based debt-simplification engine.',
    features: [
      'Splitwise-style platform (Django REST Framework + React/TypeScript SPA) with JWT auth and Google Sign-In',
      'Graph-based debt-simplification algorithm (O(n log n) greedy creditor/debtor matching)',
      '275 backend tests at 99% coverage and 117 frontend tests, with CI enforcing lint, tests, and vulnerability scans',
      'Integer-cents arithmetic and row-level locking to prevent race conditions on concurrent settlements',
      'Stripe payment verification, Claude API expense categorization, and Redis caching for balance computation',
      'Architected to run on free-tier hosting by replacing WebSockets with polling',
      'GDPR-style data export/anonymization, read-only API keys, and append-only audit logging',
    ],
    techStack: ['Django REST Framework', 'PostgreSQL', 'Redis', 'Celery', 'React 19', 'TypeScript', 'Stripe API', 'Claude API', 'Docker'],
    githubUrl: 'https://github.com/Pratyush2840/Expeneso',
    imageUrl: 'https://picsum.photos/seed/expenso/1200/800',
    imageAlt: 'Expenso expense-splitting application',
  },
  {
    title: 'DevHire AI',
    description:
      'AI-powered resume analysis tool for job seekers navigating the ATS black box.',
    features: [
      'AI-powered ATS analysis (Google Gemini) returning a structured score, keyword gaps, and skill gaps',
      'AI-generated cover letters tailored to a specific resume and job description',
      'Resume upload & parsing, including graceful handling of scanned/image-based PDFs',
      'Email/password auth with OTP verification (Brevo) and a token-based forgot-password flow',
      'PDF export of the full analysis report, including the cover letter',
      'Analysis history dashboard to view, revisit, and delete past analyses',
      'Fully deployed: frontend on Vercel, backend on Render, MongoDB Atlas for data',
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Google Gemini API', 'JWT'],
    githubUrl: 'https://github.com/Pratyush2840/devhire',
    liveUrl: 'https://devhire-ai-kohl.vercel.app',
    imageUrl: 'https://picsum.photos/seed/devhire-ai/1200/800',
    imageAlt: 'DevHire AI resume analysis tool',
  },
  {
    title: 'Voice AI Finance Agent',
    description:
      'Production-oriented, multi-agent voice AI system for personal finance management, supporting voice and text.',
    features: [
      'Orchestrator agent routing requests to specialized Finance, Research, and Action agents',
      'RAG pipeline (FAISS + Sentence-Transformers) for context-aware responses',
      'Core finance operations: invoicing, transactions, reminders, and budget-goal tracking with spending alerts',
      'Receipt/PDF ingestion pipeline using OCR + LLM extraction to auto-generate expense entries',
      'Whisper speech-to-text and gTTS text-to-speech for voice interaction',
      'Auth, rate limiting, structured logging, and request tracing for production readiness',
      'Deployed to Render with PostgreSQL for persistence',
    ],
    techStack: ['Python', 'FastAPI', 'WebSockets', 'SQLAlchemy', 'OpenAI API', 'FAISS', 'Whisper', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/Pratyush2840/Voice-AI-Finance-Agent',
    imageUrl: 'https://picsum.photos/seed/voice-ai-finance/1200/800',
    imageAlt: 'Voice AI Finance Agent application',
  },
  {
    title: 'Personal Portfolio',
    description:
      'This site — a React + GSAP portfolio built to showcase projects, skills, and coding activity.',
    features: [
      'Scroll-triggered card animations built with GSAP ScrollTrigger',
      'Live GitHub and LeetCode contribution graphs',
      'Animated letter-reveal loading sequence and custom cursor',
      'Dark, jewel-toned design system built with Tailwind CSS v4',
      'Contact form wired to FormSubmit for direct email delivery',
    ],
    techStack: ['React', 'Vite', 'TypeScript', 'GSAP', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Pratyush2840/portfolio_main',
    liveUrl: 'https://portfolio-main-six-sooty.vercel.app/',
    imageUrl: 'https://picsum.photos/seed/pratyush-portfolio/1200/800',
    imageAlt: 'Personal portfolio website',
  },
];
