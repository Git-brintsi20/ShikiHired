%------------------------
% Resume Template - Optimized for CloudZapier Web Development Internship
% Author: Salugu Harshita Bhanu
% Github: https://github.com/Git-brintsi20
% License: MIT
%------------------------

\documentclass[a4paper,20pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage{hyperref}
\usepackage{fancyhdr}

\pagestyle{fancy}
\fancyhf{} % clear all header and footer fields
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.530in}
\addtolength{\evensidemargin}{-0.375in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.45in}
\addtolength{\textheight}{1in}

\urlstyle{rm}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Set link colors
\usepackage{hyperref}
\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    urlcolor=blue
}

% Sections formatting
\titleformat{\section}{
  \vspace{-10pt}\bfseries\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-4pt}]

% Custom commands
\newcommand{\resumeItem}[2]{
  \item\small{
    \textbf{#1}{: #2 \vspace{-3pt}}
  }
}

\newcommand{\resumeItemWithoutTitle}[1]{
  \item\small{
    {#1 \vspace{-3pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
    \item
    \textbf{#1} \hfill \textbf{#2} \\
    \textit{#3} \hfill \textbf{#4}
}

\newcommand{\resumeSubItem}[2]{\resumeItem{#1}{#2}\vspace{-3pt}}

\newcommand{\resumeCertificate}[3]{
  \item\small{
    \textbf{#1} \hfill \textbf{#3} \\
    \textit{#2} \vspace{-3pt}
  }
}

\renewcommand{\labelitemii}{$\circ$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.2in, labelsep=0.2in, itemsep=0.055in]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

% Adjust spacing globally
\setlength{\parskip}{0pt}
\setlength{\itemsep}{6pt}
\setlength{\parsep}{7pt}
\setlength{\topsep}{8pt}

% CV starts here
\begin{document}
\setlength{\baselineskip}{14pt}

% Heading
\begin{tabular*}{\textwidth}{l@{\extracolsep{\fill}}r}
  \textbf{{\LARGE Salugu Harshita Bhanu}}\\ Mobile:~+91-9000229595 &Github:
  \href{https://github.com/Git-brintsi20}{github.com/Git-brintsi20} \\ Email: \href{mailto:shiki2hustle@gmail.com}{shiki2hustle@gmail.com} & LinkedIn: \href{https://www.linkedin.com/in/salugu-harshita-bhanu-b447b1274/}{Salugu Harshita Bhanu}\\
\end{tabular*}

% Profile Summary - OPTIMIZED FOR CLOUDZAPIER
\section{Profile Summary}
\vspace{-5pt}
\small{Full-stack web developer with hands-on experience building scalable web applications using PHP, MySQL, HTML, CSS, JavaScript, jQuery, WordPress, Bootstrap, Node.js, and React. Proven track record of website design, development, feature implementation, and performance optimization across multiple live SaaS platforms. Available immediately for 3-month internship with flexible work hours and strong collaboration skills for remote teamwork.}
\vspace{3pt}

% Technical Skills - REORGANIZED FOR CLOUDZAPIER JOB
\section{Technical Skills}
\resumeSubHeadingListStart
    \resumeSubItem{Core Web Technologies}{HTML, CSS, JavaScript, jQuery, Bootstrap, Responsive Web Design, Cross-browser Compatibility}
    \resumeSubItem{Backend Development}{PHP, MySQL, Node.js, Express.js, Django, Python, Flask, REST API Development, Database Design}
    \resumeSubItem{Frameworks}{React.js, Next.js 14/15, WordPress Theme Development, WordPress Plugin Integration, Shopify, PWA Development, Laravel}
    \resumeSubItem{Database Management}{MySQL, PostgreSQL, MongoDB, Firebase Firestore, Database Optimization, Query Performance Tuning}
    \resumeSubItem{Web Development Tools}{VS Code, Git/GitHub, Postman, Chrome DevTools, npm, Composer, WordPress Dashboard, .NET,  cPanel}
    \resumeSubItem{Performance \& Optimization}{Website Performance Optimization, Caching Strategies (Redis), Load Time Reduction, SEO Best Practices}
    \resumeSubItem{Cloud \& Deployment}{Google Cloud Platform (GCP), Firebase, Docker, CI/CD Pipelines, Web Hosting, Domain Management}
    \resumeSubItem{Additional Skills}{TypeScript, Java, C++, WebSocket, GraphQL, JWT Authentication, API Integration, Agile Development}
\resumeSubHeadingListEnd
       
% Coding Profiles
\section{Coding \& Security Profiles}
\resumeSubHeadingListStart
    \resumeSubItem{Leetcode}{\url{https://leetcode.com/u/hac_brintsi20/}}
      \vspace{2.5pt}
    \resumeSubItem{CodeForces}{\href{https://codeforces.com/profile/shiki_20}{https://codeforces.com/profile/shiki_20}}
      \vspace{2.5pt}
\resumeSubHeadingListEnd

% Education
\section{Education}
\resumeSubHeadingListStart
    \resumeSubheading {Indian Institute Of Information Technology, Jabalpur}{Madhya Pradesh, India}
      {Bachelor of Technology - Computer Science and Engineering | CGPA: 8.1}{August 2023 - May 2027}
       \vspace{-3pt} 
    \resumeSubheading
      {Sri Venkateswara Junior College}{Visakhapatnam, India}
      {Class XII : 97.1\%}{June 2021 - May 2023}
       \vspace{-3pt} 
    \resumeSubheading
      {St. Joseph's Girls' High School}{Visakhapatnam, India}
      {ICSE Class X : 96\%}{June 2020 - May 2021}
       \vspace{3pt} 
\resumeSubHeadingListEnd

% Projects - OPTIMIZED FOR CLOUDZAPIER WEB DEVELOPMENT
\section{Projects}
\resumeSubHeadingListStart
    \resumeSubItem{Bug Tracker SaaS - Multi-tenant Web Application Platform}{[Solo Project - Live Production]}{}{}
    \vspace{30pt}
     \resumeItemListStart
      \vspace{-29pt}
    \item \textbf{Tech Stack}: Next.js 14, TypeScript, Node.js, PostgreSQL, Prisma ORM, Redis, WebSocket, Bootstrap, HTML/CSS.
    \vspace{-2pt}
    \item Designed and developed production-ready web application with responsive UI using Bootstrap and custom CSS, implementing 15+ REST API endpoints for authentication, bug management, and real-time notifications.
    \vspace{-2pt}
    \item Optimized website performance through Redis caching implementation, reducing page load times by 40\% and improving overall user experience across web application.
    \vspace{-2pt}
    \item Built scalable backend architecture with Node.js and PostgreSQL, handling complex database queries and implementing efficient data management for multi-tenant SaaS platform.
    \vspace{-2pt}
    \item Integrated WebSocket technology for real-time collaborative features, troubleshooting and resolving cross-browser compatibility issues and performance bottlenecks independently.
    \vspace{-2pt}
    \item Deployed to live production environment with CI/CD pipeline automation, demonstrating full-cycle web development from design to deployment and maintenance.
    \vspace{-2pt}
    \resumeItemListEnd       
\resumeSubHeadingListEnd

\resumeSubHeadingListStart
    \resumeSubItem{CipherSuite - Full-Stack Security Web Platform}{[Solo Project - Production Deployment]}{}{}
    \vspace{30pt}
     \resumeItemListStart
      \vspace{-29pt}
    \item \textbf{Tech Stack}: MERN Stack (MongoDB, Express.js, React.js, Node.js), Next.js 15, Python/Flask, HTML, CSS, JavaScript, jQuery, Bootstrap.
    \vspace{-2pt}
    \item Developed scalable full-stack web application with responsive design using Bootstrap, HTML5, and CSS3, featuring 20+ REST API endpoints for encrypted password vault and file management.
    \vspace{-2pt}
    \item Implemented secure user authentication system with JWT tokens, bcrypt password hashing, and session management across web application using Node.js and Express.js backend.
    \vspace{-2pt}
    \item Created real-time monitoring dashboard with WebSocket connections and jQuery for dynamic content updates, enabling instant security event tracking and data visualization.
    \vspace{-2pt}
    \item Optimized website performance through efficient database indexing with MongoDB and implemented caching strategies, reducing API response times to sub-100ms.
    \vspace{-2pt}
    \item Troubleshot and resolved complex integration issues between frontend React components and backend APIs, demonstrating strong debugging and problem-solving skills.
    \vspace{-2pt}
    \resumeItemListEnd       
\resumeSubHeadingListEnd
 \vspace{2pt}
\resumeSubHeadingListStart
    \resumeSubItem{HealthyME - Progressive Web Application (PWA)}{[Solo Project - Live SaaS Platform]}{}{}
    \vspace{30pt}
     \resumeItemListStart
      \vspace{-29pt}
    \item \textbf{Tech Stack}: Next.js 14, TypeScript, Node.js, Firebase, Firestore, HTML, CSS, JavaScript, Bootstrap, PWA Technologies.
    \vspace{-2pt}
    \item Engineered production-ready Progressive Web App with offline-first architecture, responsive design using Bootstrap and custom CSS for optimal mobile and desktop user experience.
    \vspace{-2pt}
    \item Built custom API integration layer with Node.js backend connecting Google Gemini API, implementing optimized query processing and caching to reduce API costs by 40\%.
    \vspace{-2pt}
    \item Designed and implemented scalable cloud-based storage solution using Firebase Firestore with efficient data indexing and query optimization for real-time data synchronization.
    \vspace{-2pt}
    \item Optimized website performance through lazy loading, code splitting, and asset optimization, achieving 95+ Lighthouse performance scores across all metrics.
    \vspace{-2pt}
    \item Managed complete web development lifecycle from initial design mockups to production deployment, with ongoing feature implementation and website maintenance.
    \vspace{-2pt}
    \resumeItemListEnd       
\resumeSubHeadingListEnd

\resumeSubHeadingListStart
    \resumeSubItem{PlantZ - AI-Powered Plant Healthcare Web Platform}{[Team Project - Full-Stack Lead]}{}{}
    \vspace{30pt}
     \resumeItemListStart
      \vspace{-29pt}
    \item \textbf{Tech Stack}: React.js, Node.js, Express.js, MongoDB, HTML, CSS, JavaScript, Bootstrap, REST APIs, JWT Authentication.
    \vspace{-2pt}
    \item Collaborated with cross-functional team to design and develop scalable web application, creating 30+ responsive React components using Bootstrap and custom CSS styling.
    \vspace{-2pt}
    \item Developed 12+ RESTful API endpoints with Express.js and Node.js backend, implementing secure authentication, database management, and API integration for disease detection features.
    \vspace{-2pt}
    \item Architected secure web application authentication system with JWT-based session management, implementing comprehensive input validation and error handling across 15+ protected endpoints.
    \vspace{-2pt}
    \item Optimized website performance through efficient MongoDB database queries, implementing indexing strategies and caching to improve page load times and overall responsiveness.
    \vspace{-2pt}
    \item Troubleshot complex integration issues between frontend React components, backend Node.js APIs, and third-party ML services using Chrome DevTools and systematic debugging approaches.
    \vspace{-2pt}
    \resumeItemListEnd       
\resumeSubHeadingListEnd

%-----------HACKATHONS & ACHIEVEMENTS-----------
\section{Hackathons \& Achievements}
\resumeSubHeadingListStart
    \resumeSubheading
      {HackByte 3.0}{April 2025}
      {Top 8 Finalist - Team Pixel Pirates}{IIIT Jabalpur}
    \resumeItemListStart
      \item Secured Top 8 ranking among 126 teams developing full-stack web application "PlantZ" in 36-hour sprint, demonstrating rapid prototyping, feature implementation, and delivery under tight deadlines.
    \resumeItemListEnd
\resumeSubHeadingListEnd

%-----------LEADERSHIP & VOLUNTEER EXPERIENCE-----------
\section{Leadership \& Experience}
\resumeSubHeadingListStart
    \resumeSubheading
      {PR Team Member \& Event Anchor}{April 2024}
      {HackByte 2.0, Student-led National Hackathon}{IIIT Jabalpur}
    \resumeItemListStart
      \item Collaborated with cross-functional teams on digital marketing campaigns and event coordination, demonstrating strong communication and teamwork skills for remote collaboration environments.
    \resumeItemListEnd
\resumeSubHeadingListEnd

\resumeSubHeadingListStart
    \resumeSubheading
      {Student Leadership Roles}{2019 - 2021}
      {School Captain (Class X) \& Vice Captain (Class IX)}{St. Joseph's Girls' High School}
    \resumeItemListStart
      \item Led 1,000-student organization and coordinated annual events, demonstrating project management, team collaboration, and organizational skills valuable for web development workflows.
    \resumeItemListEnd       
\resumeSubHeadingListEnd

% Extracurriculars 
\section{Extracurricular Activities}
\resumeSubHeadingListStart
    \resumeSubItem{Samvaad Literary and Quizzing Society}{}{}{}
    \vspace{30pt} 
    \resumeItemListStart
      \vspace{-28pt}
    \item Coordinated 10+ literary events with 200+ participant attendance, demonstrating strong organizational and collaborative skills applicable to web development team environments.
      \item Wrote Blogs through active Blogging on Medium as an English Poet under the pen name Shiki proving Written efficiency.
      \item Hosted various college events as an anchor and public speaker proven Spoken efficiency .
    \vspace{-2pt}
    \resumeItemListEnd       
\resumeSubHeadingListEnd

% Certificates
\section{Certificates}
\resumeSubHeadingListStart
    \resumeCertificate{Google Cybersecurity Professional Certificate}{Coursera}{2024}
    \resumeCertificate{Teachnook Cybersecurity \& Internship Program}{Teachnook}{2024}
    \resumeCertificate{Complete Certificate Portfolio}{\href{https://drive.google.com/drive/folders/1WGkWlSbHIOQCgheOpMAFOlB_sdEelRuA?usp=drive_link}{\underline{View All Certificates}}}{Available Online}
\resumeSubHeadingListEnd

% Availability
\section{Availability}
\resumeSubHeadingListStart
    \resumeItemWithoutTitle{Available to join immediately for 3-month internship with flexible work hours and commitment to remote collaboration.}
\resumeSubHeadingListEnd

\end{document}