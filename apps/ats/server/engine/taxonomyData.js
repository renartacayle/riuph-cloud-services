/**
 * Comprehensive Skills, Verbs, Clichés, and Acronym Taxonomy
 * Multi-industry coverage: Tech, Product, Marketing, Finance, HR, Operations
 * Bilingual: English & Indonesian
 */

export const SKILLS_TAXONOMY = {
  software_engineering: [
    "javascript", "typescript", "python", "java", "c++", "c#", "go", "golang",
    "rust", "php", "ruby", "swift", "kotlin", "dart", "scala", "c",
    "html", "html5", "css", "css3", "sass", "less", "tailwind", "tailwind css",
    "bootstrap", "material ui", "chakra ui", "styled components",
    "react", "react.js", "reactjs", "next.js", "nextjs", "vue", "vue.js", "vuejs",
    "nuxt.js", "nuxtjs", "angular", "svelte", "sveltekit", "solidjs",
    "node.js", "nodejs", "express", "express.js", "nest.js", "nestjs", "fastapi",
    "django", "flask", "spring", "spring boot", "laravel", "codeigniter",
    "asp.net", "dotnet", ".net core", "ruby on rails", "gin", "fiber",
    "microservices", "unit testing", "jest", "restful api", "rest api", "graphql",
    "git", "github"
  ],
  mobile_development: [
    "flutter", "react native", "android", "ios", "swift", "swiftui", "kotlin",
    "jetpack compose", "objective-c", "xcode", "android studio"
  ],
  database_storage: [
    "sql", "postgresql", "mysql", "mongodb", "redis", "elasticsearch", "sqlite",
    "mariadb", "oracle", "microsoft sql server", "mssql", "cassandra", "dynamodb",
    "prisma", "typeorm", "sequelize", "mongoose", "hibernate", "firebase", "supabase"
  ],
  devops_cloud: [
    "docker", "kubernetes", "k8s", "aws", "amazon web services", "gcp", "google cloud platform",
    "azure", "microsoft azure", "ci/cd", "continuous integration", "github actions", "gitlab ci",
    "jenkins", "terraform", "ansible", "linux", "ubuntu", "nginx", "apache",
    "prometheus", "grafana", "datadog", "new relic", "elk stack", "helm", "serverless",
    "cybersecurity", "penetration testing", "vulnerability assessment"
  ],
  data_ai_ml: [
    "machine learning", "deep learning", "artificial intelligence", "nlp", "natural language processing",
    "computer vision", "llm", "large language models", "pytorch", "tensorflow", "keras",
    "scikit-learn", "pandas", "numpy", "scipy", "tableau", "power bi", "matplotlib",
    "seaborn", "apache spark", "hadoop", "airflow", "dbt", "data warehousing", "bigquery",
    "snowflake", "etl", "data pipeline", "statistics", "a/b testing", "data analysis"
  ],
  product_management_design: [
    "product management", "product strategy", "product roadmap", "user research", "wireframing",
    "prototyping", "figma", "adobe xd", "sketch", "ui/ux", "user interface", "user experience",
    "design system", "usability testing", "jira", "confluence", "scrum", "agile",
    "kanban", "sprint planning", "prd", "okr", "kpi", "customer journey", "mvp"
  ],
  digital_marketing_growth: [
    "digital marketing", "seo", "search engine optimization", "sem", "search engine marketing",
    "google ads", "google analytics", "ga4", "meta ads", "facebook ads", "instagram ads",
    "tiktok ads", "content marketing", "copywriting", "email marketing", "mailchimp", "hubspot",
    "crm", "growth hacking", "conversion rate optimization", "cro", "social media marketing"
  ],
  finance_accounting: [
    "financial modeling", "financial analysis", "p&l", "profit and loss", "balance sheet",
    "cash flow", "budgeting", "forecasting", "valuation", "dcf", "excel", "microsoft excel",
    "vlookup", "pivot table", "macros", "vba", "sap", "quickbooks", "xero", "accurate",
    "auditing", "taxation", "brevet a", "brevet b", "ifrs", "psak", "variance analysis"
  ],
  hr_recruitment: [
    "talent acquisition", "recruitment", "human resources", "hris", "payroll",
    "employee relations", "performance appraisal", "onboarding", "employer branding",
    "headhunting", "sourcing", "screening", "linkedin recruiter", "kpi", "kompensasi dan benefit",
    "industrial relations", "uu ketenagakerjaan"
  ]
};

export const SOFT_SKILLS = [
  "leadership", "kepemimpinan",
  "communication", "komunikasi",
  "problem solving", "pemecahan masalah",
  "teamwork", "kolaborasi", "kerjasama tim",
  "critical thinking", "berpikir kritis",
  "time management", "manajemen waktu",
  "adaptability", "adaptabilitas",
  "analytical thinking", "kemampuan analitis",
  "negotiation", "negosiasi",
  "presentation", "presentasi",
  "stakeholder management",
  "decision making", "pengambilan keputusan",
  "conflict resolution", "resolusi konflik",
  "cross-functional collaboration",
  "mentorship", "mentoring"
];

export const SYNONYM_MAP = {
  "js": "javascript",
  "ts": "typescript",
  "py": "python",
  "golang": "go",
  "k8s": "kubernetes",
  "postgres": "postgresql",
  "psql": "postgresql",
  "reactjs": "react",
  "react.js": "react",
  "vuejs": "vue",
  "vue.js": "vue",
  "nextjs": "next.js",
  "nuxtjs": "nuxt.js",
  "fe": "frontend",
  "be": "backend",
  "ml": "machine learning",
  "dl": "deep learning",
  "ai": "artificial intelligence",
  "bi": "business intelligence",
  "db": "database",
  "qa": "quality assurance",
  "pm": "product manager",
  "ui/ux": "ui ux",
  "ui/ux design": "ui ux",
  "ci/cd": "cicd",
  "continuous integration": "cicd",
  "gcp": "google cloud",
  "google cloud platform": "google cloud",
  "aws": "amazon web services",
  "amazon web services": "aws",
  "seo": "search engine optimization",
  "sem": "search engine marketing",
  "ga4": "google analytics",
  "p&l": "profit and loss",
  "financial model": "financial modeling",
  "tax": "taxation",
  "brevet": "brevet pajak",
  "ta": "talent acquisition"
};

export const POWER_VERBS = {
  high_impact: [
    "spearheaded", "architected", "engineered", "accelerated", "slashed",
    "orchestrated", "doubled", "tripled", "generated", "transformed",
    "automated", "overhauled", "championed", "maximized", "streamlined",
    "negotiated", "scaled", "pioneered", "boosted", "delivered", "optimized",
    "mentored", "surpassed", "executed", "formulated", "authored", "achieved",
    "memelopori", "mengarsiteki", "melipatgandakan", "memangkas",
    "mentransformasi", "mengotomatisasi", "merombak", "mengakselerasi",
    "mengoptimalkan", "memimpin"
  ],
  medium_impact: [
    "developed", "built", "created", "designed", "implemented",
    "managed", "led", "coordinated", "produced", "conducted", "analyzed",
    "established", "maintained", "integrated", "monitored", "improved",
    "increased", "reduced", "published", "secured", "facilitated", "authored",
    "mengembangkan", "membangun", "membuat", "mendesain", "mengimplementasikan",
    "menjalankan", "mengelola", "mengkoordinasikan", "menganalisis"
  ],
  weak_passive: [
    "responsible for", "worked on", "helped with", "assisted",
    "participated in", "tasked with", "handled", "involved in",
    "supported", "contributed to", "tried to", "was part of",
    "made websites", "fixed code bugs", "worked with team",
    "bertanggung jawab untuk", "membantu dalam", "berpartisipasi dalam",
    "terlibat dalam", "mengerjakan", "mengurus"
  ]
};

export const CLICHE_BUZZWORDS = [
  "hard worker", "pekerja keras",
  "go-getter",
  "dynamic team player", "pemain tim dinamis",
  "results-driven", "berorientasi pada hasil",
  "detail-oriented", "berorientasi detail",
  "out of the box", "out-of-the-box", "berpikir di luar kotak",
  "synergistic", "sinergi",
  "self-starter", "mandiri",
  "fast learner", "cepat belajar", "quick learner",
  "passionate", "memiliki hasrat tinggi",
  "think outside the box",
  "proven track record", "rekam jejak terbukti",
  "strategic thinker",
  "wear many hats",
  "bisa bekerja di bawah tekanan", "work under pressure",
  "memiliki motivasi tinggi", "highly motivated",
  "mampu bekerja sama", "team player",
  "ahli dalam segala hal", "guru", "rockstar", "ninja"
];

export const EDUCATION_LEVELS = [
  { level: 1, labels: ["sma", "smk", "high school", "senior high school"] },
  { level: 2, labels: ["diploma", "d3", "d4", "associate degree"] },
  { level: 3, labels: ["sarjana", "s1", "bachelor", "bachelor's", "bachelors", "s.kom", "s.e", "s.t", "s.si", "bs", "ba"] },
  { level: 4, labels: ["magister", "s2", "master", "master's", "masters", "m.kom", "m.m", "m.t", "ms", "mba"] },
  { level: 5, labels: ["doktor", "s3", "phd", "ph.d", "doctorate"] }
];

export const PRESET_JOB_DESCRIPTIONS = [
  {
    id: "senior_software_engineer",
    title: "Senior Full Stack Software Engineer",
    department: "Engineering",
    minYearsExperience: 4,
    minEducationLevel: 3, // S1/Bachelor
    location: "Jakarta (Hybrid)",
    requiredSkills: [
      "typescript", "javascript", "react", "node.js", "postgresql", "docker",
      "aws", "ci/cd", "microservices", "unit testing"
    ],
    preferredSkills: [
      "next.js", "kubernetes", "redis", "graphql", "tailwind css", "terraform"
    ],
    softSkills: [
      "leadership", "problem solving", "communication", "mentorship", "cross-functional collaboration"
    ],
    text: `Job Title: Senior Full Stack Software Engineer
Location: Jakarta / Remote Friendly
Experience Required: Minimum 4+ years of professional software engineering experience.
Education: Bachelor's degree (S1) in Computer Science, Information Technology, or equivalent.

About the Role:
We are looking for an experienced Senior Full Stack Engineer to spearhead our next-generation fintech platform. You will design, architect, and scale microservices serving millions of active users.

Responsibilities:
- Architect and develop scalable web applications using TypeScript, React, and Node.js.
- Design resilient relational databases with PostgreSQL and optimize complex query performance with Redis caching.
- Build CI/CD deployment pipelines using Docker, Kubernetes, and AWS infrastructure.
- Lead code reviews, mentor junior and mid-level software developers, and champion best engineering practices.
- Collaborate with Product Managers and UI/UX designers to translate requirements into technical architecture.

Key Requirements:
- 4+ years of hands-on experience building web applications in production.
- Strong proficiency in TypeScript, React, Node.js, and modern ECMAScript standards.
- Solid experience with relational databases (PostgreSQL/MySQL) and ORMs (Prisma, TypeORM).
- Practical experience with cloud services (AWS or GCP), Docker containerization, and automated CI/CD pipelines.
- Bachelor's degree in Computer Science, Informatics, or related technical field.`
  },
  {
    id: "product_manager",
    title: "Product Manager (Fintech / E-Commerce)",
    department: "Product",
    minYearsExperience: 3,
    minEducationLevel: 3,
    location: "Jakarta (Onsite/Hybrid)",
    requiredSkills: [
      "product management", "product roadmap", "user research", "agile", "scrum",
      "jira", "prd", "okr", "kpi", "a/b testing", "data analysis"
    ],
    preferredSkills: [
      "sql", "figma", "wireframing", "google analytics", "growth hacking"
    ],
    softSkills: [
      "leadership", "stakeholder management", "communication", "problem solving", "analytical thinking"
    ],
    text: `Job Title: Product Manager
Location: Jakarta, Indonesia
Experience Required: At least 3 years of product management experience in technology/fintech.
Education: Bachelor's degree (S1) in any quantitative, business, or engineering discipline.

Job Overview:
We are seeking an impact-driven Product Manager to lead our growth squad. You will own the product lifecycle from initial customer discovery to launch and post-launch optimization.

Key Responsibilities:
- Define product strategy, roadmaps, and PRD specifications based on qualitative user research and quantitative product analytics.
- Collaborate closely with Engineering, UI/UX Design, and Business teams in two-week Agile/Scrum sprints.
- Drive key metrics including Conversion Rate, Retention, DAU/MAU, and Gross Transaction Value.
- Formulate hypotheses and execute A/B testing campaigns to maximize user funnel efficiency.

Qualifications:
- Minimum 3 years of end-to-end Product Management experience.
- Deep familiarity with Jira, Confluence, Figma, and Product Analytics platforms.
- Proven track record of launching successful mobile or web features with measurable business impact.`
  },
  {
    id: "data_scientist",
    title: "Data Scientist / Machine Learning Engineer",
    department: "Data & AI",
    minYearsExperience: 2,
    minEducationLevel: 3,
    location: "Jakarta / Remote",
    requiredSkills: [
      "python", "machine learning", "pandas", "numpy", "scikit-learn", "sql",
      "deep learning", "statistics", "data pipeline"
    ],
    preferredSkills: [
      "pytorch", "tensorflow", "llm", "nlp", "tableau", "power bi", "docker", "airflow"
    ],
    softSkills: [
      "analytical thinking", "problem solving", "communication", "critical thinking"
    ],
    text: `Job Title: Data Scientist / ML Engineer
Location: Jakarta (Remote Friendly)
Experience Required: 2+ years of experience in data science, predictive modeling, or machine learning.
Education: Bachelor's (S1) or Master's (S2) in Computer Science, Mathematics, Statistics, or related STEM field.

What You Will Do:
- Develop, validate, and deploy statistical and machine learning models for customer credit scoring, fraud detection, and recommendation systems.
- Perform exploratory data analysis (EDA) on terabytes of transactional data using Python (Pandas, NumPy, Scikit-Learn) and SQL.
- Implement deep learning / NLP architectures and integrate with production inference endpoints.
- Build automated data pipelines and dashboards for executive business reporting.`
  },
  {
    id: "digital_marketing_specialist",
    title: "Performance & Digital Marketing Specialist",
    department: "Marketing",
    minYearsExperience: 2,
    minEducationLevel: 3,
    location: "Jakarta",
    requiredSkills: [
      "digital marketing", "seo", "sem", "google ads", "meta ads",
      "google analytics", "ga4", "conversion rate optimization", "copywriting"
    ],
    preferredSkills: [
      "tiktok ads", "email marketing", "hubspot", "crm", "sql", "a/b testing"
    ],
    softSkills: [
      "analytical thinking", "communication", "creativity", "time management"
    ],
    text: `Job Title: Performance & Digital Marketing Specialist
Location: Jakarta, Indonesia
Experience: Minimum 2 years managing paid advertising budgets and organic search growth.
Education: Bachelor's degree (S1) in Marketing, Communications, Business, or related field.

Key Responsibilities:
- Plan, execute, and optimize paid acquisition campaigns across Meta Ads, Google Search/Display, and TikTok Ads with high ROAS.
- Oversee technical on-page and off-page SEO strategy to drive organic search traffic growth.
- Monitor marketing funnels and CAC/LTV using Google Analytics 4 (GA4) and CRM dashboards.
- A/B test ad creatives, landing page copy, and call-to-actions to continuously improve conversion rates.`
  }
];
