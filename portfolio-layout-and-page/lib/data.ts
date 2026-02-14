/**
 * Portfolio Data Configuration
 * 
 * This file contains all dynamic content for the portfolio.
 * Update the commented placeholders with real data as it becomes available.
 */

// ============================================================================
// PERSONAL INFORMATION
// ============================================================================

export const PERSONAL_INFO = {
  name: "Salugu Harshita Bhanu",
  heroTitle: "Salugu Harshita Bhanu",
  role: "Full-Stack Developer",
  tagline: "Full-Stack Developer & Problem Solver",
  bio: "I craft elegant, performant web applications with meticulous attention to detail. Specialized in modern frontend architectures and scalable backend systems that deliver measurable impact and exceptional user experiences.",
  location: "Jabalpur, India",
  availability: "Available immediately for 3-month internship with flexible work hours",
  
  // Contact Information
  email: "shiki2hustle@gmail.com",
  phone: "+91-9000229595",
  
  // Social Links (legacy - keeping for backward compatibility)
  github: "https://github.com/Git-brintsi20",
  linkedin: "https://www.linkedin.com/in/salugu-harshita-bhanu-b447b1274/",
  medium: "https://medium.com/@shiki2hustle",
  leetcode: "https://leetcode.com/u/hac_brintsi20/",
  // codeforces: "https://codeforces.com/profile/shiki_20", // Stats only, no live link
  // codechef: "https://www.codechef.com/users/shiki_20", // Stats only, no live link
  
  // Profiles (grouped for components)
  profiles: {
    github: "https://github.com/Git-brintsi20",
    linkedin: "https://www.linkedin.com/in/salugu-harshita-bhanu-b447b1274/",
    medium: "https://medium.com/@shiki2hustle",
    leetcode: "https://leetcode.com/u/hac_brintsi20/",
    // codeforces: "https://codeforces.com/profile/shiki_20", // Stats only
    // codechef: "https://www.codechef.com/users/shiki_20", // Stats only
    // geeksforgeeks: N/A - no account
  },
  
  // Professional Photo
  // Place your professional photo at: /public/images/profile/professional-photo.jpg
  profileImage: "/images/profile/professional-photo.jpg",
  // TODO: Move "professional photo/ProfessionalPhoto.jpeg" to "portfolio-layout-and-page/public/images/profile/professional-photo.jpg"
  
  // Resume Link
  // resumeUrl: "/resume.pdf", // TODO: Add resume PDF to public folder when ready
}

// ============================================================================
// STATS / METRICS
// ============================================================================

export const STATS = [
  { 
    label: "Years Experience", 
    value: "2+",
    description: "Building production-ready web applications"
  },
  { 
    label: "Projects Completed", 
    value: "15+",
    description: "Live SaaS platforms and full-stack applications"
  },
  { 
    label: "Technologies", 
    value: "20+",
    description: "Modern web development tools and frameworks"
  },
  { 
    label: "Performance Gains", 
    value: "40%",
    description: "Average optimization improvement across projects"
  },
]

// ============================================================================
// PROJECTS
// ============================================================================

export interface Project {
  id: string
  title: string
  subtitle?: string
  description: string
  longDescription?: string
  tags: string[]
  category: string[]
  images: string[]
  demoUrl?: string
  repoUrl?: string
  featured: boolean
  achievements?: string[]
  metrics?: { label: string; value: string }[]
  techDetails?: {
    frontend?: string[]
    backend?: string[]
    database?: string[]
    devops?: string[]
  }
}

export const PROJECTS: Project[] = [
  {
    id: "bug-tracker-saas",
    title: "Bug Tracker SaaS",
    subtitle: "Multi-tenant Web Application Platform",
    description: "Production-ready bug tracking platform with real-time collaboration, optimized through Redis caching to reduce load times by 40%. Features multi-tenant architecture and WebSocket-powered live updates.",
    longDescription: "A comprehensive multi-tenant SaaS platform designed for efficient bug tracking and team collaboration. Features include real-time notifications via WebSocket, role-based access control, advanced filtering and search capabilities, and detailed analytics dashboards.",
    tags: ["Next.js 14", "TypeScript", "PostgreSQL", "Redis", "WebSocket", "Bootstrap"],
    category: ["Full-Stack", "SaaS"],
    
    // TODO: DEPLOYMENT IN PROGRESS - Uncomment when deployed
    // demoUrl: "https://your-bug-tracker-url.vercel.app/",
    
    // TODO: Add GitHub repo URL when ready to share
    // repoUrl: "https://github.com/Git-brintsi20/bug-tracker-saas",
    
    // TODO: Bug Tracker photos not available yet
    // Once you have screenshots, add them to: /public/images/projects/bug-tracker/
    // Example images to capture: dashboard.png, bug-detail.png, analytics.png, team-view.png
    images: [
      // "/images/projects/bug-tracker/dashboard.png",
      // "/images/projects/bug-tracker/bug-detail.png",
      // "/images/projects/bug-tracker/analytics.png",
    ],
    
    featured: true,
    
    achievements: [
      "Designed responsive UI with Bootstrap and custom CSS",
      "Built 15+ REST API endpoints for auth and bug management",
      "Reduced page load times by 40% through Redis caching",
      "Implemented real-time WebSocket notifications",
      "Deployed with CI/CD pipeline automation",
      "Scalable multi-tenant architecture with PostgreSQL"
    ],
    
    metrics: [
      { label: "Performance Boost", value: "40%" },
      { label: "API Endpoints", value: "15+" },
      { label: "Real-time Updates", value: "WebSocket" }
    ],
    
    techDetails: {
      frontend: ["Next.js 14", "TypeScript", "Bootstrap", "HTML/CSS"],
      backend: ["Node.js", "Express.js", "WebSocket", "REST API"],
      database: ["PostgreSQL", "Prisma ORM", "Redis"],
      devops: ["CI/CD", "Docker", "Vercel"]
    }
  },
  
  {
    id: "ciphersuite",
    title: "CipherSuite",
    subtitle: "Full-Stack Security Web Platform",
    description: "Enterprise-grade security platform with encrypted password vault, 2FA authentication, and real-time monitoring. Optimized API response times to sub-100ms through efficient MongoDB indexing and caching strategies.",
    longDescription: "A comprehensive security toolkit featuring password management, file encryption, network scanning, and cybersecurity education modules. Built with the MERN stack for scalability and performance.",
    tags: ["React", "Node.js", "MongoDB", "Python", "Flask", "Bootstrap"],
    category: ["Full-Stack", "Security", "Education"],
    
    demoUrl: "https://cyber-suite.vercel.app/",
    repoUrl: "https://github.com/Git-brintsi20/CipherSuite",
    
    // Project images moved to: /public/images/projects/ciphersuite/
    images: [
      "/images/projects/ciphersuite/dashboard-dark.png",
      "/images/projects/ciphersuite/password-manager-dark.png",
      "/images/projects/ciphersuite/2fa-scanner-view.png",
      "/images/projects/ciphersuite/network-scanner-dark.png",
      "/images/projects/ciphersuite/education-dashboard-dark.png",
      "/images/projects/ciphersuite/file-vault-light.png",
    ],
    
    featured: true,
    
    achievements: [
      "Developed 20+ REST API endpoints for encrypted vault and file management",
      "Implemented secure JWT authentication with bcrypt password hashing",
      "Created real-time monitoring dashboard with WebSocket connections",
      "Optimized API response times to sub-100ms",
      "Built responsive design with Bootstrap and modern CSS3",
      "Integrated educational cybersecurity modules"
    ],
    
    metrics: [
      { label: "API Response Time", value: "<100ms" },
      { label: "REST Endpoints", value: "20+" },
      { label: "Security Features", value: "10+" }
    ],
    
    techDetails: {
      frontend: ["React.js", "Next.js 15", "Bootstrap", "jQuery", "HTML5", "CSS3"],
      backend: ["Node.js", "Express.js", "Python", "Flask", "REST API"],
      database: ["MongoDB", "Mongoose"],
      devops: ["Vercel", "JWT", "bcrypt"]
    }
  },
  
  {
    id: "healthyme-pwa",
    title: "HealthyME",
    subtitle: "Progressive Web Application (PWA)",
    description: "AI-powered nutrition analysis PWA with offline-first architecture, achieving 95+ Lighthouse scores. Reduced API costs by 40% through optimized query processing and Firebase Firestore integration.",
    longDescription: "A comprehensive health and nutrition platform featuring AI-powered food analysis, myth verification, personalized recommendations, and detailed nutritional tracking with offline capabilities.",
    tags: ["Next.js 14", "TypeScript", "Firebase", "PWA", "Bootstrap"],
    category: ["Full-Stack", "AI/ML", "Health Tech"],
    
    demoUrl: "https://healthy-me-roan.vercel.app/",
    repoUrl: "https://github.com/Git-brintsi20/HealthyME",
    
    // Project images moved to: /public/images/projects/healthyme/
    images: [
      "/images/projects/healthyme/HomePage.png",
      "/images/projects/healthyme/nutrition_analysis_result_1.png",
      "/images/projects/healthyme/dashboard_upperhalf_darkmode.png",
      "/images/projects/healthyme/mythverificationPage.png",
      "/images/projects/healthyme/HistoryPage.png",
      "/images/projects/healthyme/FirebaseAnalyticsDashboard.png",
    ],
    
    featured: true,
    
    achievements: [
      "Engineered Progressive Web App with offline-first architecture",
      "Built custom API integration with Google Gemini AI",
      "Reduced API costs by 40% through optimized caching",
      "Achieved 95+ Lighthouse performance scores",
      "Designed scalable Firebase Firestore data structure",
      "Implemented real-time data synchronization"
    ],
    
    metrics: [
      { label: "Lighthouse Score", value: "95+" },
      { label: "API Cost Reduction", value: "40%" },
      { label: "Offline Support", value: "Full PWA" }
    ],
    
    techDetails: {
      frontend: ["Next.js 14", "TypeScript", "Bootstrap", "PWA", "HTML/CSS"],
      backend: ["Node.js", "Firebase Functions", "Google Gemini API"],
      database: ["Firebase Firestore", "Firebase Analytics"],
      devops: ["Vercel", "Service Workers", "Jest Testing"]
    }
  },
  
  {
    id: "plantz",
    title: "PlantZ",
    subtitle: "AI-Powered Plant Healthcare Platform",
    description: "Award-winning plant care application with AI disease detection, multilingual support, and animated avatar system. Top 8 finalist at HackByte 3.0 among 126 teams, featuring 30+ responsive React components.",
    longDescription: "An interactive gardening companion featuring AI-powered plant disease detection, personalized care recommendations, community features, and engaging avatar animations. Built collaboratively during a 36-hour hackathon sprint.",
    tags: ["React", "Node.js", "MongoDB", "AI/ML", "Bootstrap"],
    category: ["Full-Stack", "AI/ML", "Community"],
    
    demoUrl: "https://hack-byte.vercel.app/",
    repoUrl: "https://github.com/Git-brintsi20/PlantZ",
    
    // Project images moved to: /public/images/projects/plantz/
    images: [
      "/images/projects/plantz/PlantHealthDashboard.png",
      "/images/projects/plantz/AvatarGallery.png",
      "/images/projects/plantz/ChatAssistant.png",
      "/images/projects/plantz/CommunityPage.png",
      "/images/projects/plantz/My_PlantsSectiondashboard.png",
      "/images/projects/plantz/HomePageShowingMultilingualFeature.png",
    ],
    
    featured: true,
    
    achievements: [
      "Top 8 Finalist at HackByte 3.0 (126 teams)",
      "Developed 30+ responsive React components in 36 hours",
      "Built 12+ RESTful API endpoints with Express.js",
      "Implemented secure JWT-based authentication",
      "Optimized MongoDB queries with strategic indexing",
      "Integrated third-party ML services for disease detection"
    ],
    
    metrics: [
      { label: "Hackathon Rank", value: "Top 8" },
      { label: "React Components", value: "30+" },
      { label: "API Endpoints", value: "12+" }
    ],
    
    techDetails: {
      frontend: ["React.js", "Bootstrap", "HTML/CSS", "JavaScript"],
      backend: ["Node.js", "Express.js", "REST API", "JWT"],
      database: ["MongoDB", "Mongoose"],
      devops: ["Vercel", "ML Model Integration"]
    }
  },
]

// ============================================================================
// SKILLS & TECHNOLOGIES
// ============================================================================

export interface SkillCategory {
  frontend: string[]
  backend: string[]
  database: string[]
  devops: string[]
  other?: string[]
}

export const SKILLS: SkillCategory = {
  frontend: [
    "React.js",
    "Next.js 14/15",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Bootstrap",
    "jQuery",
    "Responsive Design",
    "PWA Development",
    "WordPress",
  ],
  
  backend: [
    "Node.js",
    "Express.js",
    "Python",
    "Django",
    "Flask",
    "PHP",
    "Laravel",
    "REST API",
    "GraphQL",
    "WebSocket",
    "JWT Authentication",
  ],
  
  database: [
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Firebase",
    "Firestore",
    "Redis",
    "Prisma ORM",
    "Database Design",
    "Query Optimization",
  ],
  
  devops: [
    "Git/GitHub",
    "Docker",
    "CI/CD",
    "Vercel",
    "GCP",
    "Firebase Hosting",
    "cPanel",
    "Linux",
    "VS Code",
    "Postman",
  ],
  
  other: [
    "C++",
    "Java",
    ".NET",
    "Shopify",
    "SEO",
    "Agile Development",
    "Chrome DevTools",
    "Performance Optimization",
    "Cross-browser Testing",
  ]
}

// ============================================================================
// EXPERIENCE & TIMELINE
// ============================================================================

export interface Experience {
  year: string
  role: string
  company: string
  location?: string
  description: string
  achievements?: string[]
  type: "work" | "project" | "achievement"
}

export const EXPERIENCE: Experience[] = [
  {
    year: "2024-Present",
    role: "Full-Stack Developer",
    company: "Independent Projects",
    description: "Building production-ready web applications including Bug Tracker SaaS, CipherSuite, and HealthyME PWA",
    achievements: [
      "Reduced page load times by 40% through Redis caching",
      "Achieved 95+ Lighthouse scores on PWA projects",
      "Deployed 15+ REST API endpoints across projects",
    ],
    type: "work"
  },
  {
    year: "April 2025",
    role: "Top 8 Finalist - Team Pixel Pirates",
    company: "HackByte 3.0, IIIT Jabalpur",
    description: "Secured Top 8 ranking among 126 teams developing full-stack PlantZ application in 36-hour sprint",
    achievements: [
      "Built 30+ responsive React components",
      "Implemented real-time collaboration features",
      "Integrated ML-based plant disease detection",
    ],
    type: "achievement"
  },
  {
    year: "April 2024",
    role: "PR Team Member & Event Anchor",
    company: "HackByte 2.0, IIIT Jabalpur",
    description: "Collaborated on digital marketing campaigns and event coordination for national hackathon",
    type: "work"
  },
]

// ============================================================================
// EDUCATION
// ============================================================================

export interface Education {
  degree: string
  institution: string
  location: string
  period: string
  grade?: string
  highlights?: string[]
}

export const EDUCATION: Education[] = [
  {
    degree: "Bachelor of Technology - Computer Science and Engineering",
    institution: "Indian Institute of Information Technology, Jabalpur",
    location: "Madhya Pradesh, India",
    period: "August 2023 - May 2027",
    grade: "CGPA: 8.1",
    highlights: [
      "Member of Samvaad Literary and Quizzing Society",
      "Event coordinator for 10+ literary events",
      "Active blogger on Medium as 'Shiki'",
    ]
  },
  {
    degree: "Class XII (Intermediate)",
    institution: "Sri Venkateswara Junior College",
    location: "Visakhapatnam, India",
    period: "June 2021 - May 2023",
    grade: "97.1%"
  },
  {
    degree: "ICSE Class X",
    institution: "St. Joseph's Girls' High School",
    location: "Visakhapatnam, India",
    period: "June 2020 - May 2021",
    grade: "96%",
    highlights: [
      "School Captain (Class X)",
      "Vice Captain (Class IX)",
      "Led 1,000-student organization"
    ]
  },
]

// ============================================================================
// CERTIFICATES & ACHIEVEMENTS
// ============================================================================

export interface Certificate {
  title: string
  issuer: string
  year: string
  link?: string
}

export const CERTIFICATES: Certificate[] = [
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Coursera",
    year: "2024",
  },
  {
    title: "Teachnook Cybersecurity & Internship Program",
    issuer: "Teachnook",
    year: "2024",
  },
  {
    title: "Complete Certificate Portfolio",
    issuer: "Various Providers",
    year: "2024",
    link: "https://drive.google.com/drive/folders/1WGkWlSbHIOQCgheOpMAFOlB_sdEelRuA?usp=drive_link"
  }
]

// ============================================================================
// ACHIEVEMENTS & HIGHLIGHTS
// ============================================================================

export const ACHIEVEMENTS = [
  {
    title: "HackByte 3.0 - Top 8 Finalist",
    description: "Ranked among top 8 teams out of 126 participating teams",
    year: "2025",
    icon: "🏆"
  },
  {
    title: "95+ Lighthouse Score",
    description: "Achieved excellent performance scores across all PWA metrics",
    year: "2024",
    icon: "⚡"
  },
  {
    title: "40% Performance Optimization",
    description: "Reduced page load times through strategic caching implementation",
    year: "2024",
    icon: "🚀"
  },
  {
    title: "15+ Production Projects",
    description: "Successfully deployed and maintained multiple live web applications",
    year: "2024",
    icon: "💻"
  },
]

// ============================================================================
// EXPORT ALL
// ============================================================================

export default {
  PERSONAL_INFO,
  STATS,
  PROJECTS,
  SKILLS,
  EXPERIENCE,
  EDUCATION,
  CERTIFICATES,
  ACHIEVEMENTS,
}
