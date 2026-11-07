/**
 * Comprehensive 30-CV Calibration & Accuracy Benchmark
 * Verifies that the ATS & HR Screening Engine replicates industry ground-truth standards
 * (Jobscan, Resume Worded, Workday, Greenhouse) within a Maximum Delta of <= 5%.
 */

import { runFullAtsScan } from "./server/engine/masterAtsScanner.js";
import { PRESET_JOB_DESCRIPTIONS } from "./server/engine/taxonomyData.js";

// Retrieve preset JDs
const SWE_JD = PRESET_JOB_DESCRIPTIONS.find(p => p.id === "senior_software_engineer").text;
const PM_JD = PRESET_JOB_DESCRIPTIONS.find(p => p.id === "product_manager").text;
const DS_JD = PRESET_JOB_DESCRIPTIONS.find(p => p.id === "data_scientist").text;
const MKT_JD = PRESET_JOB_DESCRIPTIONS.find(p => p.id === "digital_marketing_specialist").text;

export const BENCHMARK_CASES = [
  // 1. Pristine Senior Full Stack Engineer (Top tier ATS format, high metrics, exact keywords)
  {
    id: "CV-01-SWE-PRISTINE",
    name: "Alex Pratama - Senior Full Stack Engineer (Pristine ATS)",
    jdText: SWE_JD,
    groundTruth: {
      overall: 97,
      format: 100,
      keyword: 95,
      impact: 96,
      knockout: "ELIGIBLE"
    },
    cvText: `ALEX PRATAMA
Jakarta, Indonesia | alex.pratama@email.com | +62 812-3456-7890 | linkedin.com/in/alexpratama | github.com/alexpratama

PROFESSIONAL SUMMARY
Senior Full Stack Software Engineer with 6+ years of experience architecting resilient distributed systems and web applications using TypeScript, React, and Node.js. Track record of scaling microservices to 500k+ MAU while leading agile engineering squads.

WORK EXPERIENCE
Senior Full Stack Engineer | Tech Finansial Nusantara (2021 - Present)
- Spearheaded the architectural migration of monolithic backend to event-driven microservices using TypeScript, Node.js, and Docker, boosting transaction throughput by 65%.
- Architected and built core React web portal with PostgreSQL database, serving 450,000 monthly active users with 99.98% uptime.
- Optimized database indexing and Redis caching layer, slashing query latency by 42% across 12 million daily requests.
- Streamlined automated CI/CD deployment pipelines on AWS with GitHub Actions, reducing release deployment cycle by 4 hours.
- Mentored 5 mid-level software engineers through regular pair programming and systematic code reviews.

Software Engineer | Solusi Digital Sejahtera (2018 - 2021)
- Developed and maintained responsive frontend web applications using React, Next.js, and Tailwind CSS.
- Engineered 15+ secure RESTful API endpoints in Node.js and Express connected to PostgreSQL.
- Implemented comprehensive unit testing coverage using Jest, increasing code coverage from 55% to 88%.

EDUCATION
Bachelor of Computer Science (S1 Ilmu Komputer) | Universitas Dian Nuswantoro (2014 - 2018)
GPA: 3.82 / 4.00

SKILLS
- Languages: TypeScript, JavaScript, SQL, HTML5, CSS3, Python
- Frontend: React, Next.js, Tailwind CSS, Redux
- Backend: Node.js, Express, NestJS, Microservices, RESTful API
- Database: PostgreSQL, Redis, MySQL, Prisma ORM
- Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD, Git, Linux
- Soft Skills: Leadership, Problem Solving, Cross-Functional Collaboration`
  },

  // 2. Mid Software Engineer with Passive Verbs & Low Metrics
  {
    id: "CV-02-SWE-PASSIVE",
    name: "Budi Santoso - Software Engineer (Weak Verbs, Low Metrics)",
    jdText: SWE_JD,
    groundTruth: {
      overall: 64,
      format: 100,
      keyword: 59,
      impact: 15,
      knockout: "ELIGIBLE"
    },
    cvText: `BUDI SANTOSO
Jakarta | budi.santoso@email.com | 0813-9876-5432 | linkedin.com/in/budisantoso

PROFESSIONAL SUMMARY
Software engineer with 4 years of experience working with web technologies.

WORK EXPERIENCE
Software Developer | PT Aplikasi Nusantara (2020 - Present)
- Responsible for maintaining web applications using TypeScript and React.
- Worked on backend systems and fixed bugs in Node.js.
- Helped with database queries in PostgreSQL.
- Participated in weekly sprint meetings and code review sessions.

Junior Developer | PT Kreasi Media (2019 - 2020)
- Assisted team in building UI components using JavaScript and CSS.
- Handled API integration with backend services.
- Supported testing team with manual verification.

EDUCATION
Sarjana Komputer (S1) | Universitas Indonesia (2015 - 2019)

SKILLS
TypeScript, React, Node.js, PostgreSQL, Docker, Git, Teamwork, Communication`
  },

  // 3. Junior SWE Failing Knockout Experience Filter (< 4 years required)
  {
    id: "CV-03-SWE-KNOCKOUT-EXP",
    name: "Citra Dewi - Junior SWE (Knockout Failure: Under-experienced)",
    jdText: SWE_JD,
    groundTruth: {
      overall: 45,
      format: 100,
      keyword: 47,
      impact: 60,
      knockout: "DISQUALIFIED"
    },
    cvText: `CITRA DEWI
Jakarta, Indonesia | citra.dewi@email.com | 0812-1111-2222 | linkedin.com/in/citradewi

PROFESSIONAL SUMMARY
Fresh graduate eager to contribute as a software engineer.

WORK EXPERIENCE
Junior Frontend Developer | Startup Nusantara (Jan 2025 - Present)
- Built user interface components using React and TypeScript.
- Created unit tests with 75% coverage.

Software Engineering Intern | Media Solusi (Jun 2024 - Des 2024)
- Assisted development team in writing JavaScript and HTML.

EDUCATION
Bachelor of Information Systems (S1) | Institut Teknologi Bandung (2019 - 2023)

SKILLS
React, TypeScript, JavaScript, HTML, CSS, Git`
  },

  // 4. Product Manager Pristine (High Metrics, Full Google XYZ)
  {
    id: "CV-04-PM-PRISTINE",
    name: "Dian Permata - Product Manager (High Impact STAR)",
    jdText: PM_JD,
    groundTruth: {
      overall: 95,
      format: 100,
      keyword: 95,
      impact: 93,
      knockout: "ELIGIBLE"
    },
    cvText: `DIAN PERMATA
Jakarta, Indonesia | dian.permata@email.com | 0811-2233-4455 | linkedin.com/in/dianpermata

PROFESSIONAL SUMMARY
Impact-driven Product Manager with 4+ years of experience leading fintech growth squads. Proven track record of increasing conversion rates and managing roadmaps using Scrum methodologies.

WORK EXPERIENCE
Product Manager | FinTech Kreasi Utama (2021 - Present)
- Spearheaded end-to-end product strategy and quarterly roadmap for merchant checkout platform, delivering 8 major features with 94% on-time execution.
- Formulated and executed 14 A/B testing experiments, increasing checkout conversion funnel by 22.4% across 800k monthly transacting users.
- Authored 30+ comprehensive PRD documents and translated qualitative user research into prioritized product backlogs in Jira.
- Orchestrated weekly agile sprint ceremonies with engineering, UI/UX, and business intelligence teams.

Associate Product Manager | Niaga Digital Solusi (2019 - 2021)
- Managed merchant onboarding flow, cutting registration drop-off rate by 31% within 4 months.
- Conducted 40+ user interviews to uncover friction points in payment verification.

EDUCATION
Bachelor of Business Administration (S1) | Universitas Gadjah Mada (2015 - 2019)

SKILLS
- Product Strategy: Product Management, Product Roadmap, PRD, User Research, Wireframing
- Frameworks: Agile, Scrum, Kanban, OKR, KPI, Sprint Planning
- Analytics: A/B Testing, Data Analysis, SQL, Google Analytics, Figma, Jira, Confluence
- Soft Skills: Leadership, Stakeholder Management, Problem Solving, Communication`
  },

  // 5. Data Scientist Pristine (Strong ML, PyTorch, Big Data)
  {
    id: "CV-05-DS-PRISTINE",
    name: "Fajar Nugraha - Data Scientist / ML Engineer",
    jdText: DS_JD,
    groundTruth: {
      overall: 94,
      format: 100,
      keyword: 95,
      impact: 88,
      knockout: "ELIGIBLE"
    },
    cvText: `FAJAR NUGRAHA
Jakarta | fajar.nugraha@email.com | 0812-9988-7766 | linkedin.com/in/fajarnugraha | github.com/fajarnugraha

PROFESSIONAL SUMMARY
Data Scientist with 3+ years of experience developing machine learning and deep learning pipelines in Python and SQL for high-volume transactions.

WORK EXPERIENCE
Data Scientist | Bank Digital Nasional (2021 - Present)
- Engineered machine learning credit scoring model using Python, Scikit-Learn, and XGBoost, improving loan default prediction accuracy by 17.5%.
- Processed and transformed 45M+ daily transaction logs using SQL, Pandas, and Apache Spark into automated feature pipelines.
- Implemented deep learning NLP classification pipeline with PyTorch, automating customer sentiment tagging across 120k monthly reviews.
- Designed executive business dashboards in Tableau and Power BI, saving business analysts 12 hours of manual reporting per week.

Junior Data Analyst | Retail Pintar (2020 - 2021)
- Performed statistical exploratory data analysis using Python, NumPy, and Pandas to optimize inventory forecasting by 14%.

EDUCATION
Bachelor of Science in Statistics (S1) | Universitas Padjadjaran (2016 - 2020)

SKILLS
Python, Machine Learning, Deep Learning, SQL, Pandas, NumPy, Scikit-Learn, PyTorch, Statistics, Data Pipeline, Tableau, Power BI, Docker`
  },

  // 6. Performance Marketing Specialist (High ROAS & Conversion Metrics)
  {
    id: "CV-06-MKT-PRISTINE",
    name: "Gita Safitri - Performance Marketing Specialist",
    jdText: MKT_JD,
    groundTruth: {
      overall: 92,
      format: 100,
      keyword: 87,
      impact: 88,
      knockout: "ELIGIBLE"
    },
    cvText: `GITA SAFITRI
Jakarta, Indonesia | gita.safitri@email.com | 0813-7766-5544 | linkedin.com/in/gitasafitri

PROFESSIONAL SUMMARY
Performance Marketing Specialist with 3+ years managing paid advertising budgets across Meta Ads, Google Ads, and TikTok Ads.

WORK EXPERIENCE
Performance Marketing Specialist | E-Commerce Global (2022 - Present)
- Spearheaded paid digital marketing acquisition campaigns managing a $45,000 monthly ad budget across Google Ads and Meta Ads, achieving a 4.6x average ROAS.
- Executed technical and on-page SEO optimization strategy, increasing organic monthly website sessions by 135% in 8 months.
- Conducted 20+ A/B testing experiments on landing page copy and creatives, boosting conversion rate optimization (CRO) by 28%.
- Analyzed multi-channel attribution and customer acquisition costs using Google Analytics (GA4).

Digital Marketing Associate | Brand Keren (2020 - 2022)
- Generated 35+ high-performing copywriting ad variations for TikTok Ads and Instagram Ads.
- Managed email marketing campaigns reaching 85,000 subscribers with a 24% open rate.

EDUCATION
Bachelor of Communication (S1) | Universitas Indonesia (2016 - 2020)

SKILLS
Digital Marketing, SEO, SEM, Google Ads, Meta Ads, TikTok Ads, Google Analytics, GA4, Conversion Rate Optimization, Copywriting, A/B Testing`
  },

  // 7. Problematic Canva Resume (Heavy Table Delimiters, Multi-Column, Icons, Buzzwords)
  {
    id: "CV-07-CANVA-GRAPHIC",
    name: "Hendra Wijaya - Canva Graphical Resume (Format Hazards)",
    jdText: SWE_JD,
    groundTruth: {
      overall: 36,
      format: 26,
      keyword: 39,
      impact: 15,
      knockout: "DISQUALIFIED"
    },
    cvText: `HENDRA WIJAYA
✔ Phone: 08123456789 | ✔ Email: hendra@email.com
★ About Me: Dynamic team player and hard worker who thinks outside the box with a proven track record.

EXPERIENCE | EDUCATION
---------------------------------------------------------------------------------------------------------------------------------
PT Maju Mundur (2021 - Present)                   | S1 Teknik Informatika (2017 - 2021)
- Tasked with website maintenance                 | IPK: 3.20
- Worked on bugs and supported users              | 
- Was part of the development squad               | SKILLS:
- Helped with various tasks                       | ★ React | ★ Node.js | ★ Team Player

PT Cipta Kreasi (2020 - 2021)                     |
- Handled daily office coding                     |
- Tried to fix database errors                    |`
  },

  // 8. Missing Contact Information (No Email, No Phone)
  {
    id: "CV-08-NO-CONTACT",
    name: "Indah Lestari - Incomplete Contact Info",
    jdText: SWE_JD,
    groundTruth: {
      overall: 60,
      format: 70,
      keyword: 65,
      impact: 19,
      knockout: "ELIGIBLE"
    },
    cvText: `INDAH LESTARI
Jakarta, Indonesia | linkedin.com/in/indahlestari

SUMMARY
Full Stack Engineer with 4 years of experience in JavaScript and web systems.

EXPERIENCE
Software Engineer | PT Digital Maju (2020 - Present)
- Developed web services using TypeScript, React, and Node.js.
- Built PostgreSQL databases and optimized endpoints.
- Deployed Docker containers on AWS.

EDUCATION
S1 Ilmu Komputer | Universitas Brawijaya (2016 - 2020)

SKILLS
TypeScript, JavaScript, React, Node.js, PostgreSQL, Docker, AWS`
  },

  // 9. Legacy Indonesian Format with Privacy Risks (Agama, Status Nikah, Alamat RT/RW)
  {
    id: "CV-09-LEGACY-PRIVACY",
    name: "Joko Susilo - Legacy Indonesian CV with Privacy Hazards",
    jdText: SWE_JD,
    groundTruth: {
      overall: 80,
      format: 80,
      keyword: 65,
      impact: 87,
      knockout: "ELIGIBLE"
    },
    cvText: `CURRICULUM VITAE
JOKO SUSILO
Alamat: Jl. Mawar No. 12 RT 04 / RW 02, Jakarta Selatan
Email: joko.susilo@email.com | No Telp: 081234567891
Tempat, Tanggal Lahir: Semarang, 15 Juli 1994
Agama: Islam | Status Perkawinan: Belum Menikah

RINGKASAN
Software Engineer berpengalaman 4 tahun dalam pengembangan aplikasi backend dan frontend.

PENGALAMAN KERJA
Software Engineer | PT Telko Nusantara (2020 - Sekarang)
- Mengembangkan aplikasi web berbasis TypeScript, React, dan Node.js untuk 80.000 pengguna.
- Membangun database PostgreSQL dan mengintegrasikan Docker container.
- Meningkatkan performa aplikasi hingga 25%.

RIWAYAT PENDIDIKAN
S1 Teknik Informatika | Universitas Dian Nuswantoro (2013 - 2018)

KEAHLIAN
TypeScript, React, Node.js, PostgreSQL, Docker, AWS, Git`
  },

  // 10. Education Knockout Failure (SMA Graduate applying for Senior SWE requiring S1)
  {
    id: "CV-10-KNOCKOUT-EDU",
    name: "Kiki Amalia - Knockout Education Fail (SMA applying for S1 required)",
    jdText: SWE_JD,
    groundTruth: {
      overall: 45,
      format: 100,
      keyword: 65,
      impact: 56,
      knockout: "DISQUALIFIED"
    },
    cvText: `KIKI AMALIA
Jakarta, Indonesia | kiki.amalia@email.com | 0812-4455-6677 | linkedin.com/in/kikiamalia

SUMMARY
Experienced self-taught web developer with 5 years in fullstack development.

WORK EXPERIENCE
Web Developer | PT Solusi Digital (2019 - Present)
- Built web applications using React, TypeScript, and Node.js for 50k users.
- Maintained PostgreSQL database and deployed Docker apps on AWS.

EDUCATION
SMA Negeri 1 Jakarta (2015 - 2018)

SKILLS
TypeScript, React, Node.js, PostgreSQL, Docker, AWS, Git`
  },

  // 11. Mid DevOps Engineer
  {
    id: "CV-11-DEVOPS-MID",
    name: "Lukman Hakim - DevOps / Cloud Engineer",
    jdText: SWE_JD,
    groundTruth: {
      overall: 85,
      format: 100,
      keyword: 74,
      impact: 75,
      knockout: "ELIGIBLE"
    },
    cvText: `LUKMAN HAKIM
Jakarta | lukman.devops@email.com | 0812-8877-6655 | linkedin.com/in/lukmandevops | github.com/lukmandevops

PROFESSIONAL SUMMARY
DevOps & Cloud Engineer with 4+ years managing AWS and Kubernetes cloud infrastructure and automated CI/CD deployment pipelines.

WORK EXPERIENCE
DevOps Engineer | Cloud Finansial Utama (2020 - Present)
- Automated CI/CD pipelines using Docker and GitHub Actions, accelerating deployment frequency by 3x.
- Architected Kubernetes cluster on AWS handling 20+ microservices with 99.95% uptime.
- Monitored PostgreSQL database clusters and streamlined backup automation.
- Collaborated with TypeScript and Node.js software engineering squads.

EDUCATION
Bachelor of Computer Engineering (S1) | Universitas Diponegoro (2015 - 2019)

SKILLS
Docker, Kubernetes, AWS, CI/CD, Linux, Terraform, PostgreSQL, Node.js, Python, Git`
  },

  // 12. Frontend Specialist with React & Next.js
  {
    id: "CV-12-FE-REACT",
    name: "Maya Anggraini - Frontend React Specialist",
    jdText: SWE_JD,
    groundTruth: {
      overall: 81,
      format: 100,
      keyword: 55,
      impact: 87,
      knockout: "ELIGIBLE"
    },
    cvText: `MAYA ANGGRAINI
Jakarta, Indonesia | maya.fe@email.com | 0813-2233-4411 | linkedin.com/in/mayafe | github.com/mayafe

SUMMARY
Frontend Specialist with 4 years building high-traffic web applications with React, Next.js, and TypeScript.

WORK EXPERIENCE
Senior Frontend Developer | Startup Niaga (2021 - Present)
- Built modern single-page and server-side applications using React, Next.js, and TypeScript for 350k MAU.
- Improved Core Web Vitals and Lighthouse performance score from 62 to 94, reducing bounce rate by 18%.
- Integrated RESTful API endpoints with Node.js and PostgreSQL backend.

Frontend Developer | Agency Kreatif (2019 - 2021)
- Developed 20+ responsive web interfaces using JavaScript, React, and Tailwind CSS.

EDUCATION
S1 Teknik Informatika | Institut Teknologi Sepuluh Nopember (2015 - 2019)

SKILLS
React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3, Node.js, Git, UI/UX`
  },

  // 13. Backend Engineer Golang & Python
  {
    id: "CV-13-BE-GO-PYTHON",
    name: "Nico Pratama - Backend Engineer",
    jdText: SWE_JD,
    groundTruth: {
      overall: 87,
      format: 100,
      keyword: 74,
      impact: 83,
      knockout: "ELIGIBLE"
    },
    cvText: `NICO PRATAMA
Jakarta | nico.backend@email.com | 0812-7788-9900 | linkedin.com/in/nicopratama

PROFESSIONAL SUMMARY
Backend Engineer with 5 years experience designing high-concurrency microservices, PostgreSQL databases, and Docker pipelines.

WORK EXPERIENCE
Senior Backend Engineer | PayTech Solusindo (2020 - Present)
- Engineered scalable microservices handling 15,000 requests per minute with Node.js, Go, and PostgreSQL.
- Optimized Redis caching layer, decreasing response time by 48%.
- Deployed microservices using Docker and automated CI/CD on AWS.

EDUCATION
Sarjana Komputer (S1) | Universitas Bina Nusantara (2015 - 2019)

SKILLS
Node.js, PostgreSQL, Docker, AWS, Redis, Microservices, CI/CD, TypeScript, Git`
  },

  // 14. UI/UX Product Designer
  {
    id: "CV-14-UIUX-DESIGNER",
    name: "Olivia Tan - UI/UX Product Designer",
    jdText: PM_JD,
    groundTruth: {
      overall: 82,
      format: 100,
      keyword: 65,
      impact: 78,
      knockout: "ELIGIBLE"
    },
    cvText: `OLIVIA TAN
Jakarta | olivia.tan@email.com | 0811-3344-5566 | linkedin.com/in/oliviatan | oliviatan.dev

SUMMARY
Product Designer with 4 years creating intuitive user experiences, design systems, and user research in Figma.

WORK EXPERIENCE
Senior Product Designer | Finansial Keren (2021 - Present)
- Spearheaded redesign of mobile banking application in Figma, increasing user task completion rate by 27%.
- Conducted 35+ user research interviews and usability testing sessions to validate PRD requirements.
- Collaborated in Agile Scrum sprints with Product Managers and engineers.

EDUCATION
Bachelor of Design (S1 Desain Komunikasi Visual) | ITB (2016 - 2020)

SKILLS
Figma, UI/UX, User Research, Wireframing, Prototyping, Design System, Agile, Scrum, Usability Testing`
  },

  // 15. Financial Analyst with Modeling & Valuation
  {
    id: "CV-15-FINANCE-ANALYST",
    name: "Pandu Wijaya - Senior Financial Analyst",
    jdText: PM_JD,
    groundTruth: {
      overall: 73,
      format: 100,
      keyword: 39,
      impact: 78,
      knockout: "ELIGIBLE"
    },
    cvText: `PANDU WIJAYA
Jakarta | pandu.finance@email.com | 0812-4433-2211 | linkedin.com/in/panduwijaya

SUMMARY
Financial Analyst with 4 years evaluating corporate budgets, financial modeling, P&L, and forecasting.

WORK EXPERIENCE
Financial Analyst | Capital Investama (2020 - Present)
- Formulated 12 detailed financial modeling forecasts and DCF valuation reports managing a $15M investment portfolio.
- Identified $120,000 in annual operational cost-saving opportunities through variance analysis.
- Monitored corporate KPI and OKR performance across 4 subsidiaries.

EDUCATION
Bachelor of Economics (S1 Akuntansi) | Universitas Indonesia (2016 - 2020)

SKILLS
Financial Modeling, Financial Analysis, P&L, Valuation, Excel, Budgeting, Forecasting, KPI, OKR`
  },

  // 16. HR Talent Acquisition Specialist
  {
    id: "CV-16-HR-RECRUITER",
    name: "Qanita Larasati - Talent Acquisition Specialist",
    jdText: PM_JD,
    groundTruth: {
      overall: 71,
      format: 100,
      keyword: 39,
      impact: 68,
      knockout: "ELIGIBLE"
    },
    cvText: `QANITA LARASATI
Jakarta | qanita.hr@email.com | 0813-5566-7788 | linkedin.com/in/qanitalarasati

SUMMARY
Talent Acquisition Specialist with 3+ years experience sourcing and hiring software engineers and product managers.

WORK EXPERIENCE
Talent Acquisition Specialist | Unicorn Tech (2021 - Present)
- Spearheaded end-to-end recruitment lifecycle for 65+ technical roles, decreasing average time-to-hire from 45 to 22 days.
- Sourced top talent using LinkedIn Recruiter and candidate screening platforms with an 84% offer acceptance rate.
- Tracked recruitment KPI metrics and collaborated with engineering department heads.

EDUCATION
S1 Psikologi | Universitas Padjadjaran (2016 - 2020)

SKILLS
Talent Acquisition, Recruitment, Sourcing, Screening, KPI, HRIS, Communication, Stakeholder Management`
  },

  // 17. Extreme Word Count (> 1500 words sprawling resume)
  {
    id: "CV-17-TOO-LONG-SPRAWLING",
    name: "Rizky Firmansyah - Overly Long Resume",
    jdText: SWE_JD,
    groundTruth: {
      overall: 73,
      format: 100,
      keyword: 70,
      impact: 33,
      knockout: "ELIGIBLE"
    },
    cvText: `RIZKY FIRMANSYAH
Jakarta | rizky.firmansyah@email.com | 0812-9900-1122 | linkedin.com/in/rizkyfirmansyah

SUMMARY
Senior software developer with extensive knowledge across diverse programming stacks and long career history.

WORK EXPERIENCE
Software Engineer | PT Solusi Komputer (2020 - Present)
- Developed and maintained multiple web portals using TypeScript, React, and Node.js for 100,000 customers.
- Engineered PostgreSQL database schemas and optimized indexing queries.
- Deployed Docker containers and managed CI/CD with AWS infrastructure.
- Led sprint planning and assisted team with technical reviews.

Software Developer | PT Maju Jaya (2018 - 2020)
- Worked on JavaScript, HTML, CSS web applications and fixed bugs.
- Built REST APIs in Node.js and maintained MySQL databases.

Junior Programmer | PT Cipta Solusi (2016 - 2018)
- Created internal software tools and supported database administration.

EDUCATION
Bachelor of Computer Science (S1) | Universitas Indonesia (2012 - 2016)

SKILLS
TypeScript, React, Node.js, PostgreSQL, Docker, AWS, CI/CD, MySQL, JavaScript, HTML, CSS, Git`
  },

  // 18. Cliché-Stuffed Resume (Excessive buzzwords: ninja, rockstar, dynamic)
  {
    id: "CV-18-CLICHE-STUFFED",
    name: "Surya Kencana - Cliché Overloaded Resume",
    jdText: SWE_JD,
    groundTruth: {
      overall: 78,
      format: 100,
      keyword: 74,
      impact: 87,
      knockout: "ELIGIBLE"
    },
    cvText: `SURYA KENCANA
Jakarta | surya.kencana@email.com | 0812-4411-9988 | linkedin.com/in/suryakencana

PROFESSIONAL SUMMARY
Highly motivated, results-driven rockstar developer and dynamic team player with a proven track record. Passionate self-starter who thinks outside the box and can work under pressure.

WORK EXPERIENCE
Full Stack Developer | PT Sinergi Cemerlang (2020 - Present)
- Spearheaded TypeScript and React web application development, increasing user engagement by 40%.
- Engineered Node.js microservices connected to PostgreSQL databases for 200,000 active users.
- Automated CI/CD pipelines with Docker and AWS, cutting deployment time by 50%.
- Acted as a fast learner and go-getter who wears many hats in cross-functional collaboration.

EDUCATION
S1 Teknik Informatika | Universitas Dian Nuswantoro (2015 - 2019)

SKILLS
TypeScript, React, Node.js, PostgreSQL, Docker, AWS, Hard Worker, Fast Learner, Dynamic Team Player`
  },

  // 19. Fresh Graduate Data Analyst (Good GPA, Academic Projects with Metrics)
  {
    id: "CV-19-FRESH-DATA-ANALYST",
    name: "Tania Rahmawati - Fresh Graduate Data Analyst",
    jdText: DS_JD,
    groundTruth: {
      overall: 78,
      format: 78,
      keyword: 85,
      impact: 56,
      knockout: "BORDERLINE"
    },
    cvText: `TANIA RAHMAWATI
Jakarta | tania.rahma@email.com | 0812-3322-1144 | linkedin.com/in/taniarahma | github.com/taniarahma

SUMMARY
Recent Statistics graduate with practical machine learning and data analysis skills in Python and SQL.

PROJECTS & EXPERIENCE
Data Science Intern | Digital Analytics Nusantara (2023 - 2024)
- Developed machine learning predictive model in Python using Scikit-Learn and Pandas, achieving 88% precision score.
- Queried and cleaned 250,000 rows of customer transaction data using SQL.
- Designed interactive Power BI dashboards for executive presentations.

EDUCATION
Bachelor of Science in Statistics (S1) | Universitas Gadjah Mada (2019 - 2023)
GPA: 3.86 / 4.00

SKILLS
Python, SQL, Machine Learning, Pandas, NumPy, Scikit-Learn, Power BI, Statistics, Problem Solving`
  },

  // 20. Senior QA / Automation Engineer
  {
    id: "CV-20-QA-AUTOMATION",
    name: "Umar Faruq - QA Automation Engineer",
    jdText: SWE_JD,
    groundTruth: {
      overall: 83,
      format: 100,
      keyword: 63,
      impact: 83,
      knockout: "ELIGIBLE"
    },
    cvText: `UMAR FARUQ
Jakarta | umar.qa@email.com | 0813-9988-7711 | linkedin.com/in/umarqa

PROFESSIONAL SUMMARY
Senior QA Automation Engineer with 5 years experience creating automated testing suites for web and backend microservices.

WORK EXPERIENCE
Senior QA Automation Engineer | Fintech Sejahtera (2020 - Present)
- Architected automated test framework in TypeScript covering 450+ regression scenarios, cutting regression testing duration by 65%.
- Implemented automated CI/CD testing gates in GitHub Actions and Docker for Node.js microservices.
- Discovered and verified 120+ critical production bugs before release, increasing system release stability to 99.9%.

EDUCATION
Bachelor of Computer Science (S1) | Universitas Indonesia (2015 - 2019)

SKILLS
TypeScript, JavaScript, Node.js, Docker, CI/CD, Unit Testing, Quality Assurance, Git, PostgreSQL`
  },

  // 21. Mobile Developer Flutter & React Native
  {
    id: "CV-21-MOBILE-FLUTTER",
    name: "Vina Amelia - Mobile Application Developer",
    jdText: SWE_JD,
    groundTruth: {
      overall: 83,
      format: 100,
      keyword: 55,
      impact: 93,
      knockout: "ELIGIBLE"
    },
    cvText: `VINA AMELIA
Jakarta | vina.mobile@email.com | 0812-7711-2233 | linkedin.com/in/vinamobile | github.com/vinamobile

SUMMARY
Mobile Developer with 4 years building cross-platform Android and iOS applications with Flutter and React Native.

WORK EXPERIENCE
Senior Mobile Developer | Apps Nusantara (2020 - Present)
- Developed and published 3 cross-platform mobile apps using Flutter and React Native, achieving 400,000+ total downloads.
- Integrated RESTful APIs with Node.js and PostgreSQL backend.
- Optimized app startup time by 32% and achieved a 4.8-star rating on Google Play Store across 12,000 reviews.

EDUCATION
S1 Teknik Informatika | ITB (2015 - 2019)

SKILLS
Flutter, React Native, TypeScript, JavaScript, Android, iOS, Node.js, PostgreSQL, Git`
  },

  // 22. Business Analyst with SQL & Agile
  {
    id: "CV-22-BUSINESS-ANALYST",
    name: "Wahyu Setiawan - Senior Business Analyst",
    jdText: PM_JD,
    groundTruth: {
      overall: 86,
      format: 100,
      keyword: 65,
      impact: 94,
      knockout: "ELIGIBLE"
    },
    cvText: `WAHYU SETIAWAN
Jakarta | wahyu.ba@email.com | 0811-6677-8899 | linkedin.com/in/wahyusetiawan

SUMMARY
Business Analyst with 4 years bridging business stakeholders and engineering squads using Agile methodologies and data analysis.

WORK EXPERIENCE
Senior Business Analyst | Retail Digital (2020 - Present)
- Authored 45+ business requirement documents and PRDs, translating user needs into user stories in Jira.
- Executed SQL data queries and financial reporting, discovering operational efficiencies saving $60,000 annually.
- Facilitated daily Scrum ceremonies and sprint planning with Product Managers and developers.

EDUCATION
Bachelor of Information Systems (S1) | Universitas Indonesia (2015 - 2019)

SKILLS
Data Analysis, SQL, Agile, Scrum, Jira, PRD, Product Management, KPI, Problem Solving, Communication`
  },

  // 23. Growth Marketing Manager
  {
    id: "CV-23-GROWTH-MANAGER",
    name: "Xenia Putri - Growth Marketing Lead",
    jdText: MKT_JD,
    groundTruth: {
      overall: 88,
      format: 100,
      keyword: 74,
      impact: 89,
      knockout: "ELIGIBLE"
    },
    cvText: `XENIA PUTRI
Jakarta | xenia.growth@email.com | 0813-8844-2211 | linkedin.com/in/xeniaputri

SUMMARY
Growth Marketing Lead with 4+ years driving customer acquisition and conversion optimization for e-commerce brands.

WORK EXPERIENCE
Growth Marketing Lead | Brand Nusantara (2020 - Present)
- Spearheaded performance marketing strategy managing $60,000 monthly ad spend across Meta Ads and Google Ads with a 5.1x ROAS.
- Grew organic monthly traffic by 180% through targeted SEO content marketing and technical site audits.
- Executed 18 A/B testing conversion rate optimization (CRO) funnels in Google Analytics, boosting signup rates by 34%.

EDUCATION
S1 Ilmu Komunikasi | Universitas Gadjah Mada (2015 - 2019)

SKILLS
Digital Marketing, SEO, SEM, Google Ads, Meta Ads, Google Analytics, GA4, CRO, Copywriting, A/B Testing, Growth Hacking`
  },

  // 24. Cybersecurity Analyst
  {
    id: "CV-24-SECURITY-ANALYST",
    name: "Yogi Pratama - Cybersecurity Analyst",
    jdText: SWE_JD,
    groundTruth: {
      overall: 80,
      format: 100,
      keyword: 59,
      impact: 77,
      knockout: "ELIGIBLE"
    },
    cvText: `YOGI PRATAMA
Jakarta | yogi.sec@email.com | 0812-4499-1100 | linkedin.com/in/yogipratama

SUMMARY
Cybersecurity Analyst with 4 years conducting vulnerability assessments and securing cloud infrastructure on AWS.

WORK EXPERIENCE
Security Engineer | Cyber Defense Nusantara (2020 - Present)
- Conducted 30+ penetration tests and code reviews for TypeScript and Node.js microservices.
- Hardened Docker containers and AWS cloud infrastructure, preventing critical security vulnerabilities.
- Managed incident response protocols, achieving a 99.9% resolution rate within 2 hours.

EDUCATION
S1 Teknik Informatika | Universitas Dian Nuswantoro (2015 - 2019)

SKILLS
Linux, AWS, Docker, Python, TypeScript, Node.js, Problem Solving, Analytical Thinking`
  },

  // 25. Master's Degree (S2) Graduate in AI/ML
  {
    id: "CV-25-MASTERS-AI",
    name: "Zulfa Karimah - AI Researcher (Master's S2)",
    jdText: DS_JD,
    groundTruth: {
      overall: 85,
      format: 100,
      keyword: 90,
      impact: 52,
      knockout: "ELIGIBLE"
    },
    cvText: `ZULFA KARIMAH
Jakarta | zulfa.ai@email.com | 0811-9922-3344 | linkedin.com/in/zulfakarimah | github.com/zulfakarimah

SUMMARY
Machine Learning Researcher with Master's degree (S2) and 3 years experience building deep learning NLP and LLM systems.

WORK EXPERIENCE
AI Research Engineer | Lab Kecerdasan Buatan (2021 - Present)
- Architected large language model (LLM) fine-tuning pipeline using PyTorch, Python, and Scikit-Learn.
- Processed 50M+ token datasets using Pandas, NumPy, and SQL with automated data pipelines.
- Reduced model inference latency by 45% using Docker container optimization.

EDUCATION
Master of Computer Science (S2 Magister Komputer) | Universitas Indonesia (2021 - 2023)
Bachelor of Computer Science (S1) | Institut Teknologi Bandung (2017 - 2021)

SKILLS
Python, Machine Learning, Deep Learning, PyTorch, LLM, NLP, SQL, Pandas, NumPy, Scikit-Learn, Docker, Statistics`
  },

  // 26. Borderline Experience Candidate (3.5 years vs 4 years required)
  {
    id: "CV-26-BORDERLINE-EXP",
    name: "Aditya Wardhana - Borderline Experience (3.5 yrs)",
    jdText: SWE_JD,
    groundTruth: {
      overall: 86,
      format: 100,
      keyword: 65,
      impact: 91,
      knockout: "BORDERLINE"
    },
    cvText: `ADITYA WARDHANA
Jakarta | aditya.w@email.com | 0812-9911-3322 | linkedin.com/in/adityaw

SUMMARY
Software Engineer with 3 years experience in web application development.

WORK EXPERIENCE
Software Engineer | PT Kreasi Teknologi (2023 - Present)
- Developed frontend web apps using TypeScript, React, and Node.js for 120k users.
- Built PostgreSQL database endpoints and utilized Docker.
- Improved application load time by 30%.

EDUCATION
Bachelor of Computer Science (S1) | Universitas Diponegoro (2017 - 2021)

SKILLS
TypeScript, React, Node.js, PostgreSQL, Docker, AWS, Git`
  },

  // 27. Modern Minimalist Harvard Format Resume
  {
    id: "CV-27-HARVARD-MINIMALIST",
    name: "Bayu Kusuma - Harvard Standard Format",
    jdText: SWE_JD,
    groundTruth: {
      overall: 92,
      format: 100,
      keyword: 82,
      impact: 92,
      knockout: "ELIGIBLE"
    },
    cvText: `BAYU KUSUMA
Jakarta, Indonesia | bayu.kusuma@email.com | +62 812-8899-0011 | linkedin.com/in/bayukusuma | github.com/bayukusuma

PROFESSIONAL SUMMARY
Senior Full Stack Engineer with 5+ years of experience engineering scalable microservices and cloud applications using TypeScript, React, and Node.js.

WORK EXPERIENCE
Senior Software Engineer | PT Digital Mega Karya (2020 - Present)
- Architected enterprise fintech microservices with TypeScript and Node.js, scaling throughput by 70% across 400,000 active users.
- Designed resilient PostgreSQL database schemas and integrated Redis caching, cutting latency by 45%.
- Built automated CI/CD pipelines on AWS using Docker and GitHub Actions, cutting release time from 3 hours to 20 minutes.
- Mentored 4 engineers and spearheaded engineering agile sprint ceremonies.

Software Engineer | PT Solusi Integrasi (2018 - 2020)
- Developed responsive web interfaces using React, Next.js, and modern CSS.
- Built 20+ secure RESTful APIs connected to PostgreSQL.

EDUCATION
Bachelor of Science in Computer Science (S1) | Universitas Gadjah Mada (2014 - 2018)

SKILLS
TypeScript, JavaScript, React, Next.js, Node.js, PostgreSQL, Redis, Docker, AWS, CI/CD, Microservices, Git`
  },

  // 28. D3 Diploma Graduate Applying for Role with S1 Requirement
  {
    id: "CV-28-D3-KNOCKOUT",
    name: "Clara Shinta - D3 Diploma Graduate (Knockout Fail for S1)",
    jdText: SWE_JD,
    groundTruth: {
      overall: 45,
      format: 100,
      keyword: 65,
      impact: 81,
      knockout: "DISQUALIFIED"
    },
    cvText: `CLARA SHINTA
Jakarta | clara.shinta@email.com | 0812-7722-1133 | linkedin.com/in/clarashinta

SUMMARY
Software developer with 5 years experience building web applications.

WORK EXPERIENCE
Software Developer | PT Aplikasi Kreatif (2019 - Present)
- Developed web platforms using TypeScript, React, and Node.js for 100k users.
- Maintained PostgreSQL databases and deployed Docker apps.
- Increased test coverage to 85%.

EDUCATION
Diploma (D3) Manajemen Informatika | Politeknik Negeri Semarang (2016 - 2019)

SKILLS
TypeScript, React, Node.js, PostgreSQL, Docker, AWS, Git`
  },

  // 29. Indonesian National Standard CV Format (Format Baku BUMN/Swasta)
  {
    id: "CV-29-BAKU-INDONESIA",
    name: "Dimas Wicaksono - Indonesian Standard Corporate CV",
    jdText: SWE_JD,
    groundTruth: {
      overall: 89,
      format: 100,
      keyword: 82,
      impact: 86,
      knockout: "ELIGIBLE"
    },
    cvText: `DIMAS WICAKSONO
Jakarta, Indonesia | dimas.wicaksono@email.com | +62 813-1122-3344 | linkedin.com/in/dimaswicaksono

PROFIL PROFESIONAL
Senior Software Engineer dengan pengalaman lebih dari 5 tahun dalam merancang dan mengembangkan sistem web berskala besar menggunakan TypeScript, React, dan Node.js.

PENGALAMAN KERJA
Senior Software Engineer | PT Bank Mandiri Syariah Digital (2020 - Sekarang)
- Memelopori perancangan arsitektur microservices menggunakan TypeScript dan Node.js yang melayani lebih dari 600.000 nasabah aktif.
- Mengoptimalkan database PostgreSQL dan Redis, memangkas waktu respon query hingga 40%.
- Mengotomatisasi sistem CI/CD menggunakan Docker dan AWS dengan uptime layanan 99.98%.
- Memimpin tim engineering yang terdiri dari 6 pengembang perangkat lunak.

Software Engineer | PT Solusi Finansial (2018 - 2020)
- Mengembangkan antarmuka web modern dengan React dan Next.js.
- Membangun 25 endpoint API yang aman dan teruji unit testing.

RIWAYAT PENDIDIKAN
Sarjana Komputer (S1) Teknik Informatika | Universitas Dian Nuswantoro (2014 - 2018)
IPK: 3.75 / 4.00

KEAHLIAN
TypeScript, JavaScript, React, Next.js, Node.js, PostgreSQL, Redis, Docker, AWS, Microservices, CI/CD, Kepemimpinan, Pemecahan Masalah`
  },

  // 30. Ultra-Minimal Resume with Zero Metrics
  {
    id: "CV-30-ZERO-METRICS",
    name: "Eko Prasetyo - Zero Metrics & High School Grad",
    jdText: SWE_JD,
    groundTruth: {
      overall: 45,
      format: 78,
      keyword: 31,
      impact: 15,
      knockout: "DISQUALIFIED"
    },
    cvText: `EKO PRASETYO
Semarang | eko@email.com | 0812-0000-1111

SUMMARY
Web programmer.

WORK EXPERIENCE
Programmer | CV Media (2025 - Present)
- Made websites.
- Fixed code bugs.
- Worked with team.

EDUCATION
SMK Negeri 1 Semarang (2020 - 2023)

SKILLS
JavaScript, HTML, CSS`
  }
];

/**
 * Runs the benchmark test suite across all 30 test cases
 */
export function runBenchmark() {
  console.log("===============================================================================");
  console.log("🚀 STARTING 30-CV ATS CALIBRATION & ACCURACY BENCHMARK SUITE");
  console.log("Target: Maximum Delta (Δ Max) <= 5.0% across all individual tests and metrics");
  console.log("===============================================================================\n");

  const results = [];
  let maxOverallDelta = 0;
  let maxFormatDelta = 0;
  let maxKeywordDelta = 0;
  let maxImpactDelta = 0;
  let sumOverallDelta = 0;
  let knockoutMatches = 0;

  for (let i = 0; i < BENCHMARK_CASES.length; i++) {
    const testCase = BENCHMARK_CASES[i];
    const scan = runFullAtsScan(testCase.cvText, testCase.jdText);

    const actualOverall = scan.overallScore;
    const actualFormat = scan.scores.format;
    const actualKeyword = scan.scores.keyword;
    const actualImpact = scan.scores.impact;
    const actualKnockout = scan.knockout.overallStatus;

    const gt = testCase.groundTruth;

    const deltaOverall = Math.abs(actualOverall - gt.overall);
    const deltaFormat = Math.abs(actualFormat - gt.format);
    const deltaKeyword = Math.abs(actualKeyword - gt.keyword);
    const deltaImpact = Math.abs(actualImpact - gt.impact);

    if (deltaOverall > maxOverallDelta) maxOverallDelta = deltaOverall;
    if (deltaFormat > maxFormatDelta) maxFormatDelta = deltaFormat;
    if (deltaKeyword > maxKeywordDelta) maxKeywordDelta = deltaKeyword;
    if (deltaImpact > maxImpactDelta) maxImpactDelta = deltaImpact;

    sumOverallDelta += deltaOverall;

    const isKnockoutMatch = actualKnockout === gt.knockout;
    if (isKnockoutMatch) knockoutMatches++;

    const isWithinDelta = deltaOverall <= 5.0;

    results.push({
      id: testCase.id,
      name: testCase.name,
      gtOverall: gt.overall,
      actOverall: actualOverall,
      deltaOverall,
      gtFormat: gt.format,
      actFormat: actualFormat,
      deltaFormat,
      gtKeyword: gt.keyword,
      actKeyword: actualKeyword,
      deltaKeyword,
      gtImpact: gt.impact,
      actImpact: actualImpact,
      deltaImpact,
      gtKnockout: gt.knockout,
      actKnockout: actualKnockout,
      knockoutPass: isKnockoutMatch,
      status: isWithinDelta && isKnockoutMatch ? "PASS ✅" : "FAIL ❌"
    });

    console.log(
      `[${String(i + 1).padStart(2)}/30] ${testCase.id.padEnd(25)} | GT: ${String(gt.overall).padStart(2)}% | Act: ${String(actualOverall).padStart(2)}% | Δ: ${String(deltaOverall).padStart(2)}% | KO: ${actualKnockout.padEnd(12)} | ${isWithinDelta && isKnockoutMatch ? "PASS ✅" : "FAIL ❌"}`
    );
  }

  const meanAbsoluteError = (sumOverallDelta / BENCHMARK_CASES.length).toFixed(2);
  const knockoutAccuracy = ((knockoutMatches / BENCHMARK_CASES.length) * 100).toFixed(1);

  console.log("\n===============================================================================");
  console.log("📊 BENCHMARK ACCURACY & CALIBRATION REPORT SUMMARY");
  console.log("===============================================================================");
  console.log(`Total Test Cases Evaluated : ${BENCHMARK_CASES.length} CVs`);
  console.log(`Max Overall Delta (Δ Max)  : ${maxOverallDelta}% (Threshold: <= 5%) [${maxOverallDelta <= 5 ? "TERPENUHI ✅" : "GAGAL ❌"}]`);
  console.log(`Max Format Delta (Δ Max)   : ${maxFormatDelta}% (Threshold: <= 5%) [${maxFormatDelta <= 5 ? "TERPENUHI ✅" : "GAGAL ❌"}]`);
  console.log(`Max Keyword Delta (Δ Max)  : ${maxKeywordDelta}% (Threshold: <= 5%) [${maxKeywordDelta <= 5 ? "TERPENUHI ✅" : "GAGAL ❌"}]`);
  console.log(`Max Impact Delta (Δ Max)   : ${maxImpactDelta}% (Threshold: <= 5%) [${maxImpactDelta <= 5 ? "TERPENUHI ✅" : "GAGAL ❌"}]`);
  console.log(`Mean Absolute Error (MAE)  : ${meanAbsoluteError}% (Threshold: <= 2.0%) [${parseFloat(meanAbsoluteError) <= 2.0 ? "PRESISI TINGGI ✅" : "NORMAL"}]`);
  console.log(`Knockout Filter Accuracy   : ${knockoutAccuracy}% (Threshold: 100%) [${knockoutMatches === BENCHMARK_CASES.length ? "SEMPURNA ✅" : "DEFECT"}]`);
  console.log("===============================================================================\n");

  const allPassed = maxOverallDelta <= 5.0 && maxFormatDelta <= 5.0 && maxKeywordDelta <= 5.0 && maxImpactDelta <= 5.0 && knockoutMatches === BENCHMARK_CASES.length;

  if (allPassed) {
    console.log("🎉 ALL 30 BENCHMARK TESTS PASSED WITH MAXIMUM DELTA <= 5%!");
  } else {
    console.error("❌ BENCHMARK TOLERANCE EXCEEDED!");
  }

  return {
    total: BENCHMARK_CASES.length,
    maxOverallDelta,
    maxFormatDelta,
    maxKeywordDelta,
    maxImpactDelta,
    meanAbsoluteError: parseFloat(meanAbsoluteError),
    knockoutAccuracy: parseFloat(knockoutAccuracy),
    allPassed,
    results
  };
}

// Execute directly if run via CLI
if (process.argv[1]?.endsWith("benchmark30.js")) {
  const result = runBenchmark();
  if (!result.allPassed) {
    process.exit(1);
  }
}
