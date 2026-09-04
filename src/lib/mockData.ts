import type {
  Country, Job, University, Property, BusinessListing, Opportunity,
  TravelDestination, Notification, Program, StudentReview
} from "@/types";

// EUR to INR conversion rate
export const EUR_TO_INR = 90;
export const CHF_TO_INR = 100;
export const SEK_TO_INR = 8;
export const DKK_TO_INR = 12;
export const NOK_TO_INR = 8;

export function toINR(amount: number, currency: string): string {
  const rate = currency === "CHF" ? CHF_TO_INR : currency === "SEK" ? SEK_TO_INR : currency === "DKK" ? DKK_TO_INR : currency === "NOK" ? NOK_TO_INR : EUR_TO_INR;
  const inr = amount * rate;
  if (inr >= 10000000) return `₹${(inr / 10000000).toFixed(1)}Cr`;
  if (inr >= 100000) return `₹${(inr / 100000).toFixed(1)}L`;
  return `₹${inr.toLocaleString("en-IN")}`;
}

export const countries: Country[] = [
  {
    id: "de", name: "Germany", code: "DE", capital: "Berlin", region: "Central Europe",
    population: "84.4M", language: "German", currency: "EUR",
    description: "Europe's largest economy offers world-class engineering, innovative startups, and a high quality of life.",
    highlights: ["Largest EU economy", "World-class universities", "Strong job market", "Excellent infrastructure"],
    tags: ["Tech Hub", "Engineering", "Manufacturing", "Strong Economy"],
    rating: 4.7, jobCount: 2840, universityCount: 45, costOfLiving: "medium", visaFriendly: true, colorClass: "country-germany"
  },
  {
    id: "fr", name: "France", code: "FR", capital: "Paris", region: "Western Europe",
    population: "68.2M", language: "French", currency: "EUR",
    description: "A cultural powerhouse with iconic cities, world-renowned cuisine, and a thriving tech ecosystem.",
    highlights: ["Cultural capital", "Top tech ecosystem", "Great lifestyle", "Strong social benefits"],
    tags: ["Culture", "Fashion", "Tech", "Tourism"],
    rating: 4.6, jobCount: 2120, universityCount: 38, costOfLiving: "high", visaFriendly: true, colorClass: "country-france"
  },
  {
    id: "nl", name: "Netherlands", code: "NL", capital: "Amsterdam", region: "Western Europe",
    population: "17.9M", language: "Dutch / English", currency: "EUR",
    description: "A highly international, progressive nation with excellent English proficiency and top-tier logistics.",
    highlights: ["English-friendly", "Strong expat community", "Excellent logistics", "Progressive culture"],
    tags: ["International", "Finance", "Logistics", "Tech"],
    rating: 4.8, jobCount: 1560, universityCount: 18, costOfLiving: "high", visaFriendly: true, colorClass: "country-netherlands"
  },
  {
    id: "se", name: "Sweden", code: "SE", capital: "Stockholm", region: "Northern Europe",
    population: "10.5M", language: "Swedish / English", currency: "SEK",
    description: "Innovation leader with exceptional work-life balance, clean environment and world-class startups.",
    highlights: ["Innovation hub", "Work-life balance", "Clean environment", "Strong welfare state"],
    tags: ["Innovation", "Startups", "Sustainability", "Quality of Life"],
    rating: 4.9, jobCount: 980, universityCount: 14, costOfLiving: "very-high", visaFriendly: false, colorClass: "country-sweden"
  },
  {
    id: "es", name: "Spain", code: "ES", capital: "Madrid", region: "Southern Europe",
    population: "47.4M", language: "Spanish", currency: "EUR",
    description: "Vibrant culture, Mediterranean lifestyle, and a rapidly growing tech scene in Barcelona and Madrid.",
    highlights: ["Mediterranean lifestyle", "Growing tech scene", "Rich culture", "Affordable living"],
    tags: ["Lifestyle", "Tourism", "Tech", "Real Estate"],
    rating: 4.5, jobCount: 1840, universityCount: 32, costOfLiving: "medium", visaFriendly: true, colorClass: "country-spain"
  },
  {
    id: "it", name: "Italy", code: "IT", capital: "Rome", region: "Southern Europe",
    population: "58.9M", language: "Italian", currency: "EUR",
    description: "The cradle of Western civilization with unmatched art, design, fashion, and culinary heritage.",
    highlights: ["Art & Design", "Fashion capital", "Rich history", "World-class cuisine"],
    tags: ["Culture", "Design", "Fashion", "Tourism"],
    rating: 4.4, jobCount: 1420, universityCount: 28, costOfLiving: "medium", visaFriendly: true, colorClass: "country-italy"
  },
  {
    id: "pt", name: "Portugal", code: "PT", capital: "Lisbon", region: "Western Europe",
    population: "10.2M", language: "Portuguese", currency: "EUR",
    description: "A rising digital nomad destination with affordable living, warm climate, and NHR tax incentives.",
    highlights: ["NHR Tax Regime", "Digital nomad visa", "Warm climate", "Affordable cost"],
    tags: ["Digital Nomad", "Real Estate", "Lifestyle", "Golden Visa"],
    rating: 4.7, jobCount: 760, universityCount: 12, costOfLiving: "medium", visaFriendly: true, colorClass: "country-portugal"
  },
  {
    id: "ch", name: "Switzerland", code: "CH", capital: "Bern", region: "Central Europe",
    population: "8.7M", language: "German / French / Italian", currency: "CHF",
    description: "The highest salaries in Europe, pristine nature, and a world-leading financial and pharma sector.",
    highlights: ["Highest salaries", "Financial hub", "Pharma leader", "Pristine nature"],
    tags: ["Finance", "Pharma", "Luxury", "High Salaries"],
    rating: 4.8, jobCount: 620, universityCount: 10, costOfLiving: "very-high", visaFriendly: false, colorClass: "country-switzerland"
  },
  {
    id: "no", name: "Norway", code: "NO", capital: "Oslo", region: "Northern Europe",
    population: "5.4M", language: "Norwegian / English", currency: "NOK",
    description: "Spectacular fjords, one of the world's highest HDI scores, and a rich oil & gas economy.",
    highlights: ["Highest HDI", "Oil & gas wealth", "Spectacular nature", "Strong welfare"],
    tags: ["Energy", "Nature", "Welfare", "Sustainability"],
    rating: 4.9, jobCount: 480, universityCount: 8, costOfLiving: "very-high", visaFriendly: false, colorClass: "country-norway"
  },
  {
    id: "pl", name: "Poland", code: "PL", capital: "Warsaw", region: "Eastern Europe",
    population: "37.6M", language: "Polish", currency: "PLN",
    description: "One of Europe's fastest-growing economies with a booming tech sector and affordable living.",
    highlights: ["Fast-growing economy", "Tech startup hub", "Affordable living", "Central location"],
    tags: ["Tech", "Affordable", "Growing Economy", "Outsourcing"],
    rating: 4.3, jobCount: 1200, universityCount: 22, costOfLiving: "low", visaFriendly: true, colorClass: "country-poland"
  },
  {
    id: "dk", name: "Denmark", code: "DK", capital: "Copenhagen", region: "Northern Europe",
    population: "5.9M", language: "Danish / English", currency: "DKK",
    description: "The happiest country on earth with exceptional design culture and top-rated education system.",
    highlights: ["Happiest country", "Design capital", "Top education", "Green energy leader"],
    tags: ["Design", "Happiness", "Green Energy", "Welfare"],
    rating: 4.9, jobCount: 520, universityCount: 9, costOfLiving: "very-high", visaFriendly: false, colorClass: "country-denmark"
  },
  {
    id: "at", name: "Austria", code: "AT", capital: "Vienna", region: "Central Europe",
    population: "9.1M", language: "German", currency: "EUR",
    description: "Vienna consistently ranks as the world's most livable city, with rich culture and excellent quality of life.",
    highlights: ["Most livable city", "Cultural heritage", "Strong economy", "Central location"],
    tags: ["Quality of Life", "Culture", "Finance", "Tourism"],
    rating: 4.8, jobCount: 680, universityCount: 12, costOfLiving: "high", visaFriendly: true, colorClass: "country-austria"
  },
];

export const jobs: Job[] = [
  {
    id: "j1", title: "Senior Software Engineer", company: "SAP SE", country: "Germany", city: "Berlin",
    type: "full-time", category: "Technology", salary: "€85,000 – €115,000",
    salaryMin: 85000, salaryMax: 115000, currency: "EUR",
    description: "Join SAP's core engineering team to build next-generation enterprise software that serves millions of businesses worldwide. You'll work on cutting-edge cloud architectures, microservices, and distributed systems that power global enterprises.",
    responsibilities: [
      "Design and implement scalable backend services using Java and Spring Boot",
      "Lead technical design reviews and mentor junior engineers",
      "Collaborate with product managers and architects on system design",
      "Drive adoption of best practices in code quality and testing",
      "Participate in on-call rotations and incident response"
    ],
    requirements: ["5+ years experience", "React or Vue.js expertise", "Cloud architecture knowledge", "Team leadership skills", "Java/Spring Boot proficiency"],
    benefits: ["Health insurance", "30 days vacation", "Remote flexibility", "Stock options", "Relocation package", "Gym membership", "Subsidized meals"],
    posted: "2 days ago", deadline: "2026-10-01", remote: false, featured: true, logo: "bg-navy-900",
    tags: ["React", "Node.js", "Cloud", "Enterprise"], experience: "Senior", applicants: 142,
    visaSponsorship: true, verified: true, workMode: "hybrid", industry: "Enterprise Software"
  },
  {
    id: "j2", title: "UX/UI Designer", company: "Philips Design", country: "Netherlands", city: "Amsterdam",
    type: "full-time", category: "Design", salary: "€70,000 – €90,000",
    salaryMin: 70000, salaryMax: 90000, currency: "EUR",
    description: "Design human-centered healthcare and consumer products that improve quality of life for billions of people.",
    responsibilities: [
      "Create user flows, wireframes, and high-fidelity prototypes in Figma",
      "Conduct user research and usability testing sessions",
      "Collaborate with engineering teams on design implementation",
      "Maintain and evolve the Philips Design System",
      "Present design concepts to senior stakeholders"
    ],
    requirements: ["Portfolio required", "Figma expert", "3+ years experience", "Interaction design", "UX research skills"],
    benefits: ["Pension plan", "Flexible hours", "Hybrid work", "Learning budget", "Health insurance"],
    posted: "1 week ago", deadline: "2026-09-20", remote: false, featured: true, logo: "bg-royalblue-600",
    tags: ["Figma", "UX Research", "Prototyping", "Healthcare"], experience: "Mid", applicants: 87,
    visaSponsorship: true, verified: true, workMode: "hybrid", industry: "Healthcare Technology"
  },
  {
    id: "j3", title: "Data Scientist", company: "Spotify", country: "Sweden", city: "Stockholm",
    type: "full-time", category: "Data & Analytics", salary: "SEK 720,000 – 960,000",
    salaryMin: 72000, salaryMax: 96000, currency: "SEK",
    description: "Use machine learning and big data to improve music recommendations for 600M+ Spotify users worldwide.",
    responsibilities: [
      "Build and deploy machine learning models for music recommendations",
      "Analyze large-scale behavioral data using Python and Spark",
      "A/B test recommendation algorithms at scale",
      "Collaborate with product teams to define metrics and success criteria",
      "Publish internal research on recommendation systems"
    ],
    requirements: ["Python/R proficiency", "ML algorithms", "SQL expertise", "Statistics background", "Spark/PySpark"],
    benefits: ["Spotify Premium for family", "Generous parental leave", "Stock options", "Wellness allowance", "Flexible hours"],
    posted: "3 days ago", deadline: "2026-09-30", remote: true, featured: true, logo: "bg-emerald-600",
    tags: ["Python", "Machine Learning", "Big Data", "Recommender Systems"], experience: "Mid", applicants: 203,
    visaSponsorship: false, verified: true, workMode: "remote", industry: "Music Tech"
  },
  {
    id: "j4", title: "Product Manager – FinTech", company: "N26 Bank", country: "Germany", city: "Berlin",
    type: "full-time", category: "Product Management", salary: "€90,000 – €120,000",
    salaryMin: 90000, salaryMax: 120000, currency: "EUR",
    description: "Lead product development for Europe's leading neobank, serving 8 million customers across Europe.",
    responsibilities: [
      "Define and drive product roadmap for core banking features",
      "Work with engineering, design, and compliance teams",
      "Analyze user data to identify growth opportunities",
      "Manage stakeholder expectations and communicate product strategy",
      "Launch and iterate features across 25 EU markets"
    ],
    requirements: ["5+ years PM experience", "FinTech knowledge", "Agile methodology", "Data-driven mindset", "German/English fluency"],
    benefits: ["N26 Black account", "Health insurance", "Berlin office", "International team", "Stock options"],
    posted: "5 days ago", deadline: "2026-10-15", remote: false, featured: false, logo: "bg-gray-800",
    tags: ["FinTech", "Product Strategy", "Agile", "Banking"], experience: "Senior", applicants: 178,
    visaSponsorship: true, verified: true, workMode: "hybrid", industry: "FinTech"
  },
  {
    id: "j5", title: "DevOps Engineer", company: "Booking.com", country: "Netherlands", city: "Amsterdam",
    type: "full-time", category: "Technology", salary: "€80,000 – €105,000",
    salaryMin: 80000, salaryMax: 105000, currency: "EUR",
    description: "Build and maintain the infrastructure that powers 1.5M hotel bookings per day at one of Europe's largest tech companies.",
    responsibilities: [
      "Design and maintain Kubernetes clusters and CI/CD pipelines",
      "Monitor and optimize cloud infrastructure on AWS and GCP",
      "Implement infrastructure as code using Terraform",
      "Respond to incidents and implement reliability improvements",
      "Mentor junior DevOps engineers"
    ],
    requirements: ["Kubernetes expertise", "AWS/GCP", "CI/CD pipelines", "Terraform", "Linux administration"],
    benefits: ["Travel discounts", "Relocation support", "Visa sponsorship", "International environment", "Learning budget"],
    posted: "1 week ago", deadline: "2026-10-05", remote: false, featured: false, logo: "bg-royalblue-700",
    tags: ["Kubernetes", "AWS", "Docker", "CI/CD"], experience: "Senior", applicants: 96,
    visaSponsorship: true, verified: true, workMode: "on-site", industry: "Travel Tech"
  },
  {
    id: "j6", title: "Marketing Manager", company: "Zalando SE", country: "Germany", city: "Berlin",
    type: "full-time", category: "Marketing", salary: "€65,000 – €85,000",
    salaryMin: 65000, salaryMax: 85000, currency: "EUR",
    description: "Drive marketing campaigns for Europe's largest online fashion platform with operations in 25+ countries.",
    responsibilities: [
      "Plan and execute multi-channel marketing campaigns across EU markets",
      "Manage performance marketing budgets and optimize ROI",
      "Collaborate with creative teams on campaign assets",
      "Analyze campaign performance and generate insights",
      "Lead a team of 4 marketing specialists"
    ],
    requirements: ["5+ years marketing", "Digital marketing expertise", "Analytics proficiency", "Creative mindset", "Team leadership"],
    benefits: ["Fashion allowance", "Hybrid work", "Career development", "Health insurance", "30 days vacation"],
    posted: "2 weeks ago", deadline: "2026-09-25", remote: false, featured: false, logo: "bg-gold-500",
    tags: ["Digital Marketing", "Fashion", "Campaign Management", "Analytics"], experience: "Senior", applicants: 124,
    visaSponsorship: false, verified: true, workMode: "hybrid", industry: "E-Commerce"
  },
  {
    id: "j7", title: "Research Scientist – AI", company: "DeepMind", country: "France", city: "Paris",
    type: "full-time", category: "Research", salary: "€110,000 – €160,000",
    salaryMin: 110000, salaryMax: 160000, currency: "EUR",
    description: "Conduct cutting-edge AI research at DeepMind's Paris lab, contributing to breakthroughs in artificial general intelligence.",
    responsibilities: [
      "Design and conduct original research in deep learning and reinforcement learning",
      "Publish research in top-tier ML conferences (NeurIPS, ICML, ICLR)",
      "Collaborate with teams across DeepMind's global research network",
      "Mentor junior researchers and interns",
      "Contribute to open-source AI research projects"
    ],
    requirements: ["PhD in CS/ML", "Published research", "Deep learning expertise", "Python & JAX", "Strong math background"],
    benefits: ["Research budget", "Conference allowance", "Top-tier healthcare", "Remote flexibility", "Publication bonuses"],
    posted: "4 days ago", deadline: "2026-11-01", remote: false, featured: true, logo: "bg-navy-800",
    tags: ["AI", "Machine Learning", "Research", "Deep Learning"], experience: "Senior", applicants: 67,
    visaSponsorship: true, verified: true, workMode: "hybrid", industry: "Artificial Intelligence"
  },
  {
    id: "j8", title: "Financial Analyst", company: "UBS Group AG", country: "Switzerland", city: "Zurich",
    type: "full-time", category: "Finance", salary: "CHF 100,000 – 140,000",
    salaryMin: 100000, salaryMax: 140000, currency: "CHF",
    description: "Join UBS's global investment banking division in Zurich, managing multi-billion dollar client portfolios.",
    responsibilities: [
      "Analyze equity and fixed income portfolios for institutional clients",
      "Build and maintain financial models for valuation and scenario analysis",
      "Prepare investment reports and client presentations",
      "Monitor market developments and provide actionable insights",
      "Work with compliance team on regulatory reporting"
    ],
    requirements: ["CFA certification", "5+ years finance", "Bloomberg Terminal", "Excel modeling", "German/English fluency"],
    benefits: ["Exceptional compensation", "Bonus structure", "International exposure", "Premium benefits", "Training budget"],
    posted: "6 days ago", deadline: "2026-10-20", remote: false, featured: false, logo: "bg-red-700",
    tags: ["Finance", "Investment Banking", "CFA", "Asset Management"], experience: "Senior", applicants: 89,
    visaSponsorship: false, verified: true, workMode: "on-site", industry: "Banking & Finance"
  },
  {
    id: "j9", title: "Software Engineer – Backend", company: "Revolut", country: "Portugal", city: "Lisbon",
    type: "full-time", category: "Technology", salary: "€65,000 – €90,000",
    salaryMin: 65000, salaryMax: 90000, currency: "EUR",
    description: "Build the infrastructure that processes millions of financial transactions daily for Revolut's 40M+ users.",
    responsibilities: [
      "Design and implement high-performance microservices in Go",
      "Build reliable, scalable payment processing systems",
      "Optimize database performance and query efficiency",
      "Participate in architecture reviews and technical planning",
      "Maintain high availability systems with 99.99% uptime"
    ],
    requirements: ["Go or Java expertise", "Microservices", "PostgreSQL", "High-availability systems", "REST/gRPC APIs"],
    benefits: ["Revolut Premium", "Flexible work", "Equity package", "Global offices access", "Learning budget"],
    posted: "3 days ago", deadline: "2026-10-10", remote: true, featured: false, logo: "bg-navy-700",
    tags: ["Go", "Java", "Microservices", "FinTech"], experience: "Mid", applicants: 156,
    visaSponsorship: true, verified: true, workMode: "remote", industry: "FinTech"
  },
  {
    id: "j10", title: "Renewable Energy Engineer", company: "Orsted A/S", country: "Denmark", city: "Copenhagen",
    type: "full-time", category: "Energy", salary: "DKK 650,000 – 850,000",
    salaryMin: 65000, salaryMax: 85000, currency: "DKK",
    description: "Design and optimize offshore wind farms at the world's most sustainable energy company.",
    responsibilities: [
      "Design and model offshore wind turbine layouts using industry tools",
      "Perform energy yield assessments and resource analysis",
      "Collaborate with civil and electrical engineering teams",
      "Prepare technical reports for regulatory submissions",
      "Travel to offshore sites for project monitoring"
    ],
    requirements: ["Engineering degree", "Offshore experience", "CAD software", "Project management", "Wind energy knowledge"],
    benefits: ["Purpose-driven work", "Excellent benefits", "International projects", "Green pension", "Training budget"],
    posted: "1 week ago", deadline: "2026-10-30", remote: false, featured: false, logo: "bg-emerald-700",
    tags: ["Wind Energy", "Engineering", "Sustainability", "Offshore"], experience: "Mid", applicants: 73,
    visaSponsorship: false, verified: true, workMode: "hybrid", industry: "Renewable Energy"
  },
  {
    id: "j11", title: "Frontend Developer", company: "Adyen", country: "Netherlands", city: "Amsterdam",
    type: "full-time", category: "Technology", salary: "€75,000 – €100,000",
    salaryMin: 75000, salaryMax: 100000, currency: "EUR",
    description: "Build intuitive payment interfaces used by millions of consumers and merchants across Europe.",
    responsibilities: [
      "Build and maintain React-based payment UI components",
      "Optimize web performance and Core Web Vitals",
      "Implement A/B testing frameworks",
      "Collaborate with design and backend teams",
      "Contribute to the Adyen Design System"
    ],
    requirements: ["React/TypeScript expert", "3+ years frontend", "Performance optimization", "CSS mastery", "Testing frameworks"],
    benefits: ["Profit sharing", "30 days vacation", "Commuter benefits", "Learning budget", "Mental health support"],
    posted: "4 days ago", deadline: "2026-10-08", remote: false, featured: true, logo: "bg-royalblue-800",
    tags: ["React", "TypeScript", "Payments", "Performance"], experience: "Mid", applicants: 118,
    visaSponsorship: true, verified: true, workMode: "hybrid", industry: "Payments"
  },
  {
    id: "j12", title: "Clinical Research Associate", company: "Roche Diagnostics", country: "Switzerland", city: "Basel",
    type: "full-time", category: "Healthcare", salary: "CHF 85,000 – 110,000",
    salaryMin: 85000, salaryMax: 110000, currency: "CHF",
    description: "Monitor and manage clinical trials for innovative diagnostics products that transform patient care globally.",
    responsibilities: [
      "Monitor clinical trial sites and ensure GCP compliance",
      "Review and clean clinical data submissions",
      "Train site staff on study protocols",
      "Prepare monitoring visit reports",
      "Coordinate with global clinical operations team"
    ],
    requirements: ["Life sciences degree", "2+ years CRA experience", "GCP certification", "ICH guidelines knowledge", "German/English"],
    benefits: ["Research allowance", "Patent incentives", "Health coverage", "Excellent retirement", "International travel"],
    posted: "5 days ago", deadline: "2026-11-15", remote: false, featured: false, logo: "bg-red-600",
    tags: ["Clinical Research", "GCP", "Pharma", "Life Sciences"], experience: "Mid", applicants: 54,
    visaSponsorship: false, verified: true, workMode: "on-site", industry: "Pharmaceuticals"
  },
];

export const universities: University[] = [
  {
    id: "u1", name: "Technical University of Munich", country: "Germany", city: "Munich",
    ranking: 37, type: "public", founded: 1868, students: 50000,
    programs: ["Engineering", "Computer Science", "Physics", "Business", "Medicine"],
    tuitionEU: "€0 / year", tuitionNonEU: "€3,000 / year",
    description: "Germany's most prestigious technical university and a global leader in STEM education and research. TUM's strong industry partnerships with BMW, Siemens and MAN offer unmatched career opportunities.",
    tags: ["STEM", "Engineering", "Research", "No Tuition"], acceptanceRate: "18%", language: "German / English", colorClass: "bg-navy-800", rating: 4.9,
    scholarships: ["Deutschlandstipendium", "DAAD Scholarship", "Bayern Stipendium"],
    campusLife: ["Over 50 student clubs", "Elite sports facilities", "International student network", "Entrepreneurship hub"],
    accommodation: "University dorms from €350/month",
    applicationDeadline: "2027-01-15",
    intakeMonths: ["October", "April"],
    website: "tum.de",
    reviewCount: 1240
  },
  {
    id: "u2", name: "ETH Zurich", country: "Switzerland", city: "Zurich",
    ranking: 7, type: "public", founded: 1855, students: 22000,
    programs: ["Computer Science", "Engineering", "Physics", "Architecture", "Chemistry"],
    tuitionEU: "CHF 1,460 / year", tuitionNonEU: "CHF 1,460 / year",
    description: "One of the world's top technical universities, birthplace of 21 Nobel laureates and thousands of innovations. ETH offers the same low tuition for all students regardless of nationality.",
    tags: ["World Top 10", "Research", "Innovation", "Equal Tuition"], acceptanceRate: "27%", language: "German / English", colorClass: "bg-red-700", rating: 5.0,
    scholarships: ["ETH Excellence Scholarship", "Swiss Government Excellence Scholarships"],
    campusLife: ["330+ student associations", "World-class research labs", "ETH Entrepreneurs Club"],
    accommodation: "Student housing from CHF 600/month",
    applicationDeadline: "2026-12-15",
    intakeMonths: ["September"],
    website: "ethz.ch",
    reviewCount: 892
  },
  {
    id: "u3", name: "University of Amsterdam", country: "Netherlands", city: "Amsterdam",
    ranking: 55, type: "public", founded: 1632, students: 31000,
    programs: ["Business", "Law", "Social Sciences", "Humanities", "Economics"],
    tuitionEU: "€2,314 / year", tuitionNonEU: "€12,000 / year",
    description: "A globally renowned research university in the heart of one of Europe's most international cities.",
    tags: ["International", "Research", "English Programs", "Business"], acceptanceRate: "35%", language: "Dutch / English", colorClass: "bg-royalblue-700", rating: 4.7,
    scholarships: ["Amsterdam Merit Scholarship", "Holland Scholarship"],
    campusLife: ["200+ student associations", "Canal-side campus", "Startup incubator"],
    accommodation: "Student housing from €600/month",
    applicationDeadline: "2027-02-01",
    intakeMonths: ["September", "February"],
    website: "uva.nl",
    reviewCount: 765
  },
  {
    id: "u4", name: "Sciences Po Paris", country: "France", city: "Paris",
    ranking: 243, type: "public", founded: 1872, students: 14000,
    programs: ["Political Science", "International Relations", "Economics", "Law", "Sociology"],
    tuitionEU: "€0 – €14,000 / year", tuitionNonEU: "€14,000 / year",
    description: "Europe's leading institution for political science, international affairs, and social sciences.",
    tags: ["Politics", "International Relations", "Prestigious", "Paris"], acceptanceRate: "15%", language: "French / English", colorClass: "bg-royalblue-800", rating: 4.8,
    scholarships: ["Sciences Po Foundation Grant", "Erasmus+", "Eiffel Excellence Scholarship"],
    campusLife: ["140 nationalities on campus", "Model UN", "Policy debate clubs"],
    accommodation: "Student dorms from €700/month in Paris",
    applicationDeadline: "2027-01-06",
    intakeMonths: ["September"],
    website: "sciencespo.fr",
    reviewCount: 523
  },
  {
    id: "u5", name: "KTH Royal Institute of Technology", country: "Sweden", city: "Stockholm",
    ranking: 89, type: "public", founded: 1827, students: 12000,
    programs: ["Engineering", "Computer Science", "Architecture", "Industrial Engineering"],
    tuitionEU: "Free", tuitionNonEU: "€14,000 / year",
    description: "Scandinavia's largest technical university with world-class research in engineering and technology.",
    tags: ["Engineering", "Free Tuition EU", "Innovation", "Sustainability"], acceptanceRate: "30%", language: "Swedish / English", colorClass: "bg-navy-600", rating: 4.7,
    scholarships: ["KTH Scholarship", "Swedish Institute Scholarship", "Erasmus+"],
    campusLife: ["THS Student Union", "Innovation accelerator", "Robotics club"],
    accommodation: "SSSB student housing from SEK 3,000/month",
    applicationDeadline: "2027-01-15",
    intakeMonths: ["September"],
    website: "kth.se",
    reviewCount: 412
  },
  {
    id: "u6", name: "Bocconi University", country: "Italy", city: "Milan",
    ranking: 7, type: "private", founded: 1902, students: 14600,
    programs: ["Economics", "Management", "Finance", "Law", "Data Science"],
    tuitionEU: "€3,000 – €13,000 / year", tuitionNonEU: "€14,000 / year",
    description: "Europe's top business and economics university, producing leaders across global finance and business.",
    tags: ["Business", "Finance", "Top Ranked", "Milan"], acceptanceRate: "22%", language: "Italian / English", colorClass: "bg-gold-600", rating: 4.8,
    scholarships: ["Bocconi Merit Award", "Need-based grants", "International Excellence"],
    campusLife: ["270+ student associations", "Milan Fashion Week connections", "Finance club"],
    accommodation: "Bocconi residence from €750/month",
    applicationDeadline: "2027-01-08",
    intakeMonths: ["September"],
    website: "unibocconi.it",
    reviewCount: 678
  },
  {
    id: "u7", name: "Delft University of Technology", country: "Netherlands", city: "Delft",
    ranking: 52, type: "public", founded: 1842, students: 25000,
    programs: ["Engineering", "Architecture", "Aerospace", "Civil Engineering", "Computer Science"],
    tuitionEU: "€2,314 / year", tuitionNonEU: "€16,000 / year",
    description: "One of the top engineering universities in the world with a strong focus on technology and innovation.",
    tags: ["Engineering", "Architecture", "Research", "Innovation"], acceptanceRate: "25%", language: "Dutch / English", colorClass: "bg-royalblue-600", rating: 4.8,
    scholarships: ["Holland Scholarship", "TU Delft Excellence Grant", "Erasmus+"],
    campusLife: ["DSC student association", "Innovation lab", "Architecture studios"],
    accommodation: "Student housing from €500/month",
    applicationDeadline: "2027-02-01",
    intakeMonths: ["September"],
    website: "tudelft.nl",
    reviewCount: 594
  },
  {
    id: "u8", name: "Copenhagen Business School", country: "Denmark", city: "Copenhagen",
    ranking: 26, type: "public", founded: 1917, students: 20000,
    programs: ["Business Administration", "Economics", "Finance", "Marketing", "International Business"],
    tuitionEU: "Free", tuitionNonEU: "€9,000 – €15,000 / year",
    description: "The largest business school in Scandinavia with outstanding programs in sustainability and CSR.",
    tags: ["Business", "Free EU Tuition", "Sustainability", "Copenhagen"], acceptanceRate: "40%", language: "Danish / English", colorClass: "bg-navy-700", rating: 4.6,
    scholarships: ["CBS Scholarship", "Danish State Grant", "Erasmus+"],
    campusLife: ["CBS Students association", "Sustainability incubator", "Copenhagen networking"],
    accommodation: "University housing from DKK 3,500/month",
    applicationDeadline: "2027-03-01",
    intakeMonths: ["September", "February"],
    website: "cbs.dk",
    reviewCount: 445
  },
];

export const programs: Program[] = [
  {
    id: "pr1", universityId: "u1", name: "MSc Computer Science", degree: "Master",
    duration: "2 years", tuitionEU: "€0 / year", tuitionNonEU: "€3,000 / year",
    language: "English", intake: ["October"], deadline: "2027-01-15",
    description: "A cutting-edge program covering AI, distributed systems, and software engineering with strong industry ties to Munich's tech ecosystem.",
    eligibility: ["Bachelor in CS or related field", "GPA 3.0+", "English proficiency (IELTS 6.5+)"],
    careerOutcomes: ["Software Engineer", "ML Engineer", "Tech Lead", "Research Scientist"],
    scholarships: ["Deutschlandstipendium", "DAAD Scholarship"]
  },
  {
    id: "pr2", universityId: "u1", name: "MBA", degree: "MBA",
    duration: "2 years", tuitionEU: "€5,000 / year", tuitionNonEU: "€8,000 / year",
    language: "English", intake: ["October"], deadline: "2027-03-01",
    description: "A globally recognized MBA program with focus on innovation management and digital transformation.",
    eligibility: ["Bachelor's degree", "3+ years work experience", "GMAT 600+", "English proficiency"],
    careerOutcomes: ["Product Manager", "Strategy Consultant", "Entrepreneur", "Business Development"],
    scholarships: ["TUM Global Scholarship", "Bayern Stipendium"]
  },
  {
    id: "pr3", universityId: "u2", name: "MSc Computer Science", degree: "Master",
    duration: "2 years", tuitionEU: "CHF 1,460 / year", tuitionNonEU: "CHF 1,460 / year",
    language: "English", intake: ["September"], deadline: "2026-12-15",
    description: "ETH Zurich's CS Master is consistently ranked among the world's best, offering specializations in machine learning, security, and systems.",
    eligibility: ["BSc in CS or equivalent", "Strong math background", "English proficiency"],
    careerOutcomes: ["AI Researcher", "Systems Engineer", "Startup Founder", "Quant Analyst"],
    scholarships: ["ETH Excellence Scholarship"]
  },
  {
    id: "pr4", universityId: "u6", name: "MSc Finance", degree: "Master",
    duration: "1 year", tuitionEU: "€12,000 / year", tuitionNonEU: "€14,000 / year",
    language: "English", intake: ["September"], deadline: "2027-01-08",
    description: "Bocconi's elite Finance Master consistently ranks in the top 5 globally, with exceptional placement in investment banking and private equity.",
    eligibility: ["Bachelor in Economics/Finance", "GMAT/GRE recommended", "Work experience preferred"],
    careerOutcomes: ["Investment Banker", "Private Equity", "Asset Manager", "CFO"],
    scholarships: ["Bocconi Merit Award", "Need-based grants"]
  },
];

export const studentReviews: StudentReview[] = [
  { id: "r1", name: "Priya Sharma", country: "India", program: "MSc Computer Science", year: 2025, rating: 5, comment: "TUM exceeded all my expectations. The industry connections are incredible — I had 3 job offers before graduating.", avatar: "PS" },
  { id: "r2", name: "Carlos Mendoza", country: "Mexico", program: "MBA", year: 2024, rating: 4, comment: "World-class faculty and an amazing peer network. Munich is an incredible city to live in during your studies.", avatar: "CM" },
  { id: "r3", name: "Aisha Okonkwo", country: "Nigeria", program: "MSc Data Science", year: 2025, rating: 5, comment: "ETH Zurich is worth every penny of the application effort. The research opportunities are unmatched anywhere.", avatar: "AO" },
  { id: "r4", name: "Rajesh Patel", country: "India", program: "MSc Finance", year: 2024, rating: 5, comment: "Bocconi opened doors I never imagined. Now working at Goldman Sachs Milan. Best decision of my life.", avatar: "RP" },
];

export const properties: Property[] = [
  {
    id: "p1", title: "Modern 2BR Apartment in Prenzlauer Berg", type: "apartment", listingType: "rent",
    country: "Germany", city: "Berlin", address: "Prenzlauer Berg, Berlin",
    price: 1850, currency: "EUR", period: "month", bedrooms: 2, bathrooms: 1, area: 72,
    description: "Beautiful modern apartment in Berlin's most sought-after neighborhood. High ceilings, designer kitchen, balcony with city views.",
    amenities: ["Balcony", "Fully furnished", "Fast WiFi", "Gym", "Bike storage", "Elevator"],
    tags: ["Furnished", "Central", "Modern", "Balcony"], featured: true, colorClass: "country-germany", rating: 4.8,
    image: "property-berlin"
  },
  {
    id: "p2", title: "Luxury Studio in Amsterdam Canal Belt", type: "studio", listingType: "rent",
    country: "Netherlands", city: "Amsterdam", address: "Jordaan, Amsterdam",
    price: 1950, currency: "EUR", period: "month", bedrooms: 0, bathrooms: 1, area: 45,
    description: "Stunning studio in Amsterdam's historic Jordaan district. Original canal house features with modern comforts.",
    amenities: ["Canal view", "Original beams", "Modern kitchen", "Central heating", "Bicycle included"],
    tags: ["Canal View", "Historic", "Studio", "Central"], featured: true, colorClass: "country-netherlands", rating: 4.9,
    image: "property-amsterdam"
  },
  {
    id: "p3", title: "Bright 3BR Family Home in Mitte", type: "house", listingType: "rent",
    country: "Germany", city: "Berlin", address: "Mitte, Berlin",
    price: 2800, currency: "EUR", period: "month", bedrooms: 3, bathrooms: 2, area: 110,
    description: "Spacious family home in central Berlin with large garden, perfect for families relocating to Germany.",
    amenities: ["Private garden", "Parking", "Pets allowed", "Storage room", "Terrace"],
    tags: ["Family", "Garden", "Spacious", "Pet Friendly"], featured: false, colorClass: "country-germany", rating: 4.7,
    image: "property-berlin"
  },
  {
    id: "p4", title: "Paris 6th Arrondissement 1BR Gem", type: "apartment", listingType: "rent",
    country: "France", city: "Paris", address: "6ème Arrondissement, Paris",
    price: 2200, currency: "EUR", period: "month", bedrooms: 1, bathrooms: 1, area: 55,
    description: "Elegant Haussmann-style apartment in Saint-Germain-des-Prés, walking distance to the Seine and Luxembourg Gardens.",
    amenities: ["Haussmann architecture", "Stone floors", "Fireplace", "Concierge", "Cellar"],
    tags: ["Haussmann", "Elegant", "Central Paris", "Classic"], featured: true, colorClass: "country-france", rating: 4.9,
    image: "property-paris"
  },
  {
    id: "p5", title: "Lisbon Alfama Townhouse with Terrace", type: "house", listingType: "buy",
    country: "Portugal", city: "Lisbon", address: "Alfama, Lisbon",
    price: 420000, currency: "EUR", bedrooms: 3, bathrooms: 2, area: 130,
    description: "Stunning restored townhouse in Alfama with panoramic views of the Tagus River and terrace perfect for entertaining.",
    amenities: ["Rooftop terrace", "River views", "Restored original features", "Aircon", "Solar panels"],
    tags: ["Investment", "Views", "Terrace", "Restored"], featured: true, colorClass: "country-portugal", rating: 4.8,
    image: "property-lisbon"
  },
  {
    id: "p6", title: "Stockholm Södermalm Modern 2BR", type: "apartment", listingType: "rent",
    country: "Sweden", city: "Stockholm", address: "Södermalm, Stockholm",
    price: 18500, currency: "SEK", period: "month", bedrooms: 2, bathrooms: 1, area: 68,
    description: "Stylish apartment in Stockholm's vibrant Södermalm district with Scandinavian design interior.",
    amenities: ["Scandinavian design", "Balcony", "Communal sauna", "Storage", "Bike room"],
    tags: ["Scandinavian", "Design", "Trendy", "Balcony"], featured: false, colorClass: "country-sweden", rating: 4.7,
    image: "property-stockholm"
  },
  {
    id: "p7", title: "Barcelona Eixample Luxury Penthouse", type: "apartment", listingType: "buy",
    country: "Spain", city: "Barcelona", address: "Eixample, Barcelona",
    price: 890000, currency: "EUR", bedrooms: 3, bathrooms: 2, area: 180,
    description: "Breathtaking penthouse in Barcelona's prestigious Eixample district with private terrace and pool.",
    amenities: ["Private pool", "360° terrace", "Concierge", "Gym", "Spa", "City views"],
    tags: ["Penthouse", "Luxury", "Pool", "Views"], featured: true, colorClass: "country-spain", rating: 5.0,
    image: "property-barcelona"
  },
  {
    id: "p8", title: "Vienna 1st District Heritage Apartment", type: "apartment", listingType: "rent",
    country: "Austria", city: "Vienna", address: "1st District, Vienna",
    price: 2400, currency: "EUR", period: "month", bedrooms: 2, bathrooms: 1, area: 85,
    description: "Classic Viennese apartment with Ringstrasse architecture in the imperial 1st district, minutes from the Opera.",
    amenities: ["Parquet floors", "Ornate ceilings", "Central location", "Cellar", "Concierge"],
    tags: ["Heritage", "Imperial", "Central", "Classic"], featured: false, colorClass: "country-austria", rating: 4.8,
    image: "property-berlin"
  },
];

export const opportunities: Opportunity[] = [
  {
    id: "o1", title: "Horizon Europe Research Grant 2026", type: "grant", category: "Research & Innovation",
    country: "EU-Wide", organization: "European Commission",
    value: "€1.5M – €5M", deadline: "2026-11-15",
    description: "Europe's flagship research and innovation program offering substantial funding for breakthrough research projects.",
    eligibility: ["EU institutions or associated countries", "Minimum 3 consortium partners", "PhD required for PI", "Research track record"],
    benefits: ["Full project funding", "International collaboration", "Open access publishing", "Commercialization support"],
    tags: ["Research", "Innovation", "EU Funding", "Academic"], featured: true, colorClass: "bg-royalblue-600",
    verified: true, industry: "Research"
  },
  {
    id: "o2", title: "Erasmus+ Study Abroad Scholarship", type: "scholarship", category: "Education",
    country: "EU-Wide", organization: "European Commission",
    value: "€200 – €700/month", deadline: "2026-10-01",
    description: "Study or intern in Europe with monthly stipends, free language courses, and full insurance coverage.",
    eligibility: ["Enrolled at a higher education institution", "Minimum 1 academic year completed", "EU or partner country citizen"],
    benefits: ["Monthly stipend", "Language course", "Travel grant", "Insurance", "Cultural activities"],
    tags: ["Students", "Study Abroad", "Language", "Exchange"], featured: true, colorClass: "bg-gold-500",
    verified: true, industry: "Education"
  },
  {
    id: "o3", title: "Portugal Golden Visa Program", type: "visa", category: "Residency & Visa",
    country: "Portugal", organization: "AIMA Portugal",
    value: "Residency + Citizenship Path", deadline: "Ongoing",
    description: "Gain Portuguese residency through qualifying investments. Path to EU citizenship after 5 years.",
    eligibility: ["Non-EU nationals", "Minimum €250,000 investment", "Clean criminal record", "Health insurance"],
    benefits: ["EU residency", "Freedom of movement", "Path to citizenship", "Tax benefits", "Family inclusion"],
    tags: ["Residency", "Investment", "Citizenship", "EU Access"], featured: true, colorClass: "bg-emerald-600",
    verified: true, industry: "Immigration"
  },
  {
    id: "o4", title: "German Tech Startup Accelerator EXIST", type: "accelerator", category: "Startup & Business",
    country: "Germany", organization: "Federal Ministry of Economics",
    value: "€125,000 + coaching", deadline: "2026-09-30",
    description: "Government-funded accelerator supporting tech startups from German universities with funding and mentorship.",
    eligibility: ["University student or graduate", "Technology startup idea", "German university affiliation"],
    benefits: ["€125,000 seed funding", "Business mentoring", "Free office space", "Network access"],
    tags: ["Startup", "Funding", "Accelerator", "Germany"], featured: false, colorClass: "bg-navy-700",
    verified: true, industry: "Technology"
  },
  {
    id: "o5", title: "Marie Curie Individual Fellowship", type: "fellowship", category: "Research & Innovation",
    country: "EU-Wide", organization: "European Research Council",
    value: "€100,000 – €250,000", deadline: "2026-10-15",
    description: "Prestigious fellowship for experienced researchers to pursue independent research projects across Europe.",
    eligibility: ["Postdoctoral researcher", "4+ years research experience", "Host institution agreement"],
    benefits: ["Full living allowance", "Research budget", "Training activities", "International mobility"],
    tags: ["Research", "Fellowship", "Postdoc", "Science"], featured: false, colorClass: "bg-royalblue-700",
    verified: true, industry: "Research"
  },
  {
    id: "o6", title: "Netherlands Highly Skilled Migrant Visa", type: "visa", category: "Residency & Visa",
    country: "Netherlands", organization: "IND Netherlands",
    value: "Work & Residency Permit", deadline: "Ongoing",
    description: "Fast-track work permit for highly skilled professionals relocating to work in the Netherlands.",
    eligibility: ["Valid job offer from Dutch employer", "Recognized sponsoring employer", "Salary threshold met"],
    benefits: ["30% tax ruling", "Fast processing", "Family reunification", "Pathway to residency"],
    tags: ["Work Permit", "Tax Benefits", "Relocation", "Tech"], featured: false, colorClass: "bg-navy-600",
    verified: true, industry: "Technology"
  },
  {
    id: "o7", title: "Google Summer of Code – Europe", type: "internship", category: "Internships",
    country: "EU-Wide", organization: "Google",
    value: "$3,000 – $6,600 stipend", deadline: "2027-01-30",
    description: "Paid summer internship program for students contributing to open-source projects under mentorship of experienced developers.",
    eligibility: ["University student", "18+ years old", "Programming experience", "Open-source interest"],
    benefits: ["Paid stipend", "Google mentorship", "Certificate", "Google swag", "Network access"],
    tags: ["Students", "Programming", "Open Source", "Internship"], featured: true, colorClass: "bg-royalblue-600",
    verified: true, industry: "Technology"
  },
  {
    id: "o8", title: "European Investment Bank Young Leader Award", type: "award", category: "Awards",
    country: "EU-Wide", organization: "European Investment Bank",
    value: "€30,000 + mentorship", deadline: "2026-12-01",
    description: "Recognizing and funding young entrepreneurs driving sustainable development across Europe.",
    eligibility: ["Age 18–35", "EU or associated country citizen", "Sustainability-focused venture"],
    benefits: ["€30,000 prize", "EIB mentorship network", "Media exposure", "Investor introductions"],
    tags: ["Youth", "Entrepreneurship", "Sustainability", "Award"], featured: true, colorClass: "bg-gold-600",
    verified: true, industry: "Sustainability"
  },
  {
    id: "o9", title: "Sweden Tech Talent Visa", type: "visa", category: "Residency & Visa",
    country: "Sweden", organization: "Swedish Migration Agency",
    value: "Residence Permit", deadline: "Ongoing",
    description: "Streamlined visa process for tech professionals wanting to work for Swedish tech companies.",
    eligibility: ["Job offer from Swedish employer", "Tech background", "Salary above median"],
    benefits: ["2-year initial permit", "Family accompanying rights", "Path to permanent residence"],
    tags: ["Tech", "Sweden", "Work Permit", "Relocation"], featured: false, colorClass: "bg-navy-600",
    verified: false, industry: "Technology"
  },
  {
    id: "o10", title: "European Innovation Council Accelerator", type: "accelerator", category: "Startup & Business",
    country: "EU-Wide", organization: "European Commission",
    value: "Up to €17.5M", deadline: "2026-10-09",
    description: "The EU's flagship program for high-impact startups and SMEs developing breakthrough innovations for global markets.",
    eligibility: ["EU-based company", "Scalable technology", "Market potential", "Team of min. 2"],
    benefits: ["Up to €2.5M grant", "Up to €15M equity investment", "Coaching", "Access to EIC network"],
    tags: ["Startup", "Deep Tech", "EU Funding", "Scale-up"], featured: true, colorClass: "bg-emerald-700",
    verified: true, industry: "Innovation"
  },
  {
    id: "o11", title: "DAAD Research Internship", type: "internship", category: "Internships",
    country: "Germany", organization: "DAAD",
    value: "€800 – €1,200/month", deadline: "2026-12-15",
    description: "Fully funded research internships at leading German universities and research institutes for international students.",
    eligibility: ["Bachelor or Master student", "Natural sciences, engineering, IT", "Undergraduate GPA 3.5+"],
    benefits: ["Monthly stipend", "Travel allowance", "Insurance", "German language course"],
    tags: ["Research", "Germany", "Students", "Funded"], featured: false, colorClass: "bg-gold-500",
    verified: true, industry: "Research"
  },
  {
    id: "o12", title: "TechLeap.nl Startup Grant", type: "grant", category: "Startup & Business",
    country: "Netherlands", organization: "RVO Netherlands",
    value: "€10,000 – €50,000", deadline: "2027-01-15",
    description: "Government grants for tech startups launching in the Netherlands, covering R&D, market validation, and scaling costs.",
    eligibility: ["Netherlands-registered company", "Tech innovation focus", "Revenue under €1M"],
    benefits: ["Non-dilutive grant", "Business coaching", "Network access", "Visibility"],
    tags: ["Netherlands", "Startup", "Grant", "Tech"], featured: false, colorClass: "bg-royalblue-500",
    verified: true, industry: "Technology"
  },
];

export const travelDestinations: TravelDestination[] = [
  {
    id: "t1", name: "Amalfi Coast", country: "Italy", type: ["Beach", "Scenic Drive", "Culture"],
    bestSeason: "May – September", duration: "5–7 days", budget: "luxury",
    rating: 5.0, description: "Dramatic cliffside villages, crystal-clear Mediterranean waters, and legendary Italian cuisine on one of the world's most spectacular coastlines.",
    highlights: ["Positano village", "Path of the Gods hike", "Ravello concerts", "Limoncello tasting"],
    tags: ["Luxury", "Romantic", "Scenic", "Beaches"], colorClass: "country-italy",
    activities: ["Swimming", "Hiking", "Boat tours", "Wine tasting", "Photography"],
    image: "travel-amalfi",
    dailyBudget: "€150 – €350",
    popularity: 98,
    topAttractions: ["Positano", "Ravello Cathedral", "Grotta dello Smeraldo", "Praiano Beach"],
    hotels: [
      { name: "Hotel Santa Caterina", stars: 5, price: "€450/night", description: "Cliffside luxury with private beach access" },
      { name: "Villa Treville", stars: 5, price: "€800/night", description: "Exclusive villa with panoramic caldera views" },
      { name: "Hotel Amalfi", stars: 3, price: "€150/night", description: "Comfortable rooms in the heart of Amalfi town" },
    ],
    restaurants: [
      { name: "La Sponda", type: "Fine Dining", price: "€€€€", specialty: "Fresh seafood, candlelit terrace" },
      { name: "Trattoria Da Gemma", type: "Traditional", price: "€€", specialty: "Classic Neapolitan cuisine" },
      { name: "Bar Pompeii", type: "Café", price: "€", specialty: "Local espresso & pastries" },
    ],
    transportation: ["Ferry between towns", "Local buses (SITA)", "Private boat hire", "Vespa rental"],
    events: ["Ravello Festival (Jul–Aug)", "Feast of Sant'Andrea (Nov)", "Regatta Storica (Jun)"],
    tips: [
      "Avoid July–August peak season for smaller crowds",
      "Book restaurants and hotels 3–6 months in advance",
      "Use ferries to travel between towns — much easier than buses",
      "Carry cash — many small shops don't accept cards",
    ]
  },
  {
    id: "t2", name: "Santorini", country: "Greece", type: ["Island", "Romance", "Volcanic"],
    bestSeason: "April – October", duration: "4–6 days", budget: "luxury",
    rating: 4.9, description: "Iconic white-washed architecture, breathtaking caldera sunsets, and world-famous volcanic beaches make Santorini Europe's most photographed island.",
    highlights: ["Oia sunset", "Caldera boat tour", "Fira walking", "Black sand beaches"],
    tags: ["Romantic", "Island", "Sunset", "Photography"], colorClass: "country-greece",
    activities: ["Sunset watching", "Wine tours", "Sailing", "Cave diving", "Spa"],
    image: "travel-santorini",
    dailyBudget: "€120 – €300",
    popularity: 97,
    topAttractions: ["Oia Village", "Akrotiri Archaeological Site", "Red Beach", "Fira Caldera Walk"],
    hotels: [
      { name: "Canaves Oia Epitome", stars: 5, price: "€600/night", description: "Infinity pool with caldera views" },
      { name: "Grace Hotel", stars: 5, price: "€450/night", description: "Boutique luxury with helicopter landing pad" },
      { name: "Hotel Keti", stars: 3, price: "€120/night", description: "Cave rooms with caldera view" },
    ],
    restaurants: [
      { name: "Lauda Restaurant", type: "Fine Dining", price: "€€€€", specialty: "Mediterranean cuisine with volcanic soil wines" },
      { name: "Metaxy Mas", type: "Traditional Greek", price: "€€", specialty: "Grilled octopus and fresh fava" },
      { name: "To Psaraki", type: "Taverna", price: "€€", specialty: "Fresh catch, sunset dining" },
    ],
    transportation: ["ATV rental", "Local buses", "Water taxi", "Cable car (Fira)"],
    events: ["Ifestia Festival (Sep)", "Easter Celebrations", "Wine Harvest Festival (Aug)"],
    tips: [
      "Book sunset-view accommodation in Oia at least 6 months ahead",
      "Visit Akrotiri archaeological site in the morning before crowds",
      "Try local Assyrtiko wine from volcanic soil vineyards",
      "Water taxis between beaches are more scenic than buses",
    ]
  },
  {
    id: "t3", name: "Norwegian Fjords", country: "Norway", type: ["Nature", "Adventure", "Cruise"],
    bestSeason: "June – August", duration: "7–10 days", budget: "mid-range",
    rating: 4.9, description: "Breathtaking natural spectacle of dramatic fjords, thundering waterfalls, and majestic snow-capped mountains in one of Europe's most untouched landscapes.",
    highlights: ["Geirangerfjord", "Flåm Railway", "Trolltunga hike", "Northern Lights (winter)"],
    tags: ["Nature", "Adventure", "Fjords", "Hiking"], colorClass: "country-norway",
    activities: ["Fjord cruises", "Kayaking", "Hiking", "Northern Lights viewing", "Skiing"],
    image: "travel-norway-fjords",
    dailyBudget: "€80 – €180",
    popularity: 94,
    topAttractions: ["Geirangerfjord (UNESCO)", "Trolltunga", "Nærøyfjord", "Flåm Railway"],
    hotels: [
      { name: "Hotel Union Øye", stars: 4, price: "€250/night", description: "Historic luxury in Norway fjord setting" },
      { name: "Fretheim Hotel", stars: 4, price: "€180/night", description: "Classic Norwegian hotel in Flåm village" },
      { name: "Voss Camping", stars: 2, price: "€40/night", description: "Adventure camping at Voss fjord" },
    ],
    restaurants: [
      { name: "Cornelius Seafood Restaurant", type: "Seafood", price: "€€€", specialty: "Fresh Norwegian salmon & lobster" },
      { name: "Flåmsbryggja Pub", type: "Pub", price: "€€", specialty: "Local craft beer & Norwegian dishes" },
      { name: "Ægir BrewPub", type: "Pub", price: "€€", specialty: "Viking-themed pub with fjord views" },
    ],
    transportation: ["Scenic railway (Flåm)", "Ferry (Hurtigruten)", "Local buses", "Car rental"],
    events: ["Midnight Sun (June–July)", "Bergen International Festival (May)", "Snowshoeing events (winter)"],
    tips: [
      "Book Flåm Railway tickets well in advance during summer",
      "Trolltunga hike requires good fitness — 8–10 hours round trip",
      "Pack waterproof gear year-round",
      "Fjord cruise from Bergen is the most scenic route",
    ]
  },
  {
    id: "t4", name: "Prague Old Town", country: "Czech Republic", type: ["Culture", "History", "Architecture"],
    bestSeason: "April – October", duration: "3–5 days", budget: "budget",
    rating: 4.8, description: "One of Europe's best-preserved medieval cities with fairytale gothic architecture, a vibrant beer culture, and remarkable history at every corner.",
    highlights: ["Prague Castle", "Charles Bridge", "Astronomical Clock", "Old Town Square"],
    tags: ["History", "Architecture", "Budget", "Culture"], colorClass: "country-czech",
    activities: ["Castle tours", "River cruise", "Beer tasting", "Walking tours", "Jazz clubs"],
    image: "travel-prague",
    dailyBudget: "€40 – €90",
    popularity: 88,
    topAttractions: ["Prague Castle (largest in world)", "Charles Bridge (1357)", "Old Town Astronomical Clock", "Josefov Jewish Quarter"],
    hotels: [
      { name: "Four Seasons Prague", stars: 5, price: "€350/night", description: "Luxury on the Vltava riverbank" },
      { name: "Hotel Josef", stars: 4, price: "€150/night", description: "Design hotel in Old Town" },
      { name: "Mosaic House", stars: 3, price: "€70/night", description: "Eco-friendly boutique hostel" },
    ],
    restaurants: [
      { name: "La Degustation Boheme Bourgeoise", type: "Fine Dining", price: "€€€€", specialty: "Modern Czech tasting menu" },
      { name: "Lokál Dlouhááá", type: "Czech Pub", price: "€€", specialty: "Unfiltered Pilsner Urquell & svíčková" },
      { name: "Café Savoy", type: "Café", price: "€€", specialty: "Art Nouveau café, traditional Czech breakfast" },
    ],
    transportation: ["Metro (3 lines)", "Tram network", "Walking Old Town", "Uber available"],
    events: ["Prague Spring Music Festival (May)", "Prague Christmas Markets (Dec)", "Signal Light Festival (Oct)"],
    tips: [
      "Visit Prague Castle early morning to avoid crowds",
      "The Astronomical Clock shows at the top of every hour",
      "Czech beer is cheaper than water — enjoy responsibly",
      "Cross Charles Bridge at sunrise for stunning photos",
    ]
  },
  {
    id: "t5", name: "Barcelona", country: "Spain", type: ["City", "Architecture", "Beaches"],
    bestSeason: "May – June, September", duration: "4–6 days", budget: "mid-range",
    rating: 4.8, description: "A city alive with Gaudí's surrealist masterpieces, world-class cuisine, vibrant beach culture, and a nightlife scene that never sleeps.",
    highlights: ["Sagrada Família", "Park Güell", "La Boqueria", "Gothic Quarter"],
    tags: ["Architecture", "Food", "Beach", "Nightlife"], colorClass: "country-spain",
    activities: ["Museum visits", "Beach days", "Food tours", "Cycling", "Flamenco shows"],
    image: "travel-barcelona",
    dailyBudget: "€70 – €160",
    popularity: 95,
    topAttractions: ["Sagrada Família", "Park Güell", "Casa Batlló", "Barceloneta Beach"],
    hotels: [
      { name: "Hotel Arts Barcelona", stars: 5, price: "€400/night", description: "Beachfront luxury skyscraper hotel" },
      { name: "Mandarin Oriental Barcelona", stars: 5, price: "€500/night", description: "Passeig de Gràcia luxury" },
      { name: "Generator Barcelona", stars: 3, price: "€80/night", description: "Trendy design hostel near Gaudí" },
    ],
    restaurants: [
      { name: "Disfrutar", type: "Fine Dining", price: "€€€€", specialty: "World Top 5 restaurant, avant-garde cuisine" },
      { name: "Bar del Pla", type: "Catalan Tapas", price: "€€", specialty: "Patatas bravas, pan con tomate" },
      { name: "La Boqueria Market", type: "Food Market", price: "€", specialty: "Fresh produce, jamón, seafood" },
    ],
    transportation: ["Metro (8 lines)", "Bus network", "Cycling lanes", "Taxi/Uber"],
    events: ["La Mercè Festival (Sep)", "Primavera Sound (May)", "Festes de la Barceloneta (Sep)"],
    tips: [
      "Book Sagrada Família tickets 2–3 months in advance",
      "Visit Park Güell free zone early morning for photos",
      "Lunch is the main meal — set menus (menú del día) offer great value",
      "Beaches get crowded July–August; try Barceloneta early morning",
    ]
  },
  {
    id: "t6", name: "Amsterdam", country: "Netherlands", type: ["City", "Culture", "Cycling"],
    bestSeason: "April – May, September", duration: "3–4 days", budget: "mid-range",
    rating: 4.7, description: "An enchanting labyrinth of historic canals, world-class museums, tulip fields, and a vibrant multicultural cultural scene.",
    highlights: ["Rijksmuseum", "Anne Frank House", "Canal boat tour", "Flower Market"],
    tags: ["Museums", "Canals", "Culture", "Cycling"], colorClass: "country-netherlands",
    activities: ["Canal tours", "Museum visits", "Cycling", "Tulip fields", "Food markets"],
    image: "travel-amsterdam",
    dailyBudget: "€80 – €180",
    popularity: 91,
    topAttractions: ["Rijksmuseum", "Anne Frank House", "Van Gogh Museum", "Keukenhof Gardens (spring)"],
    hotels: [
      { name: "Pulitzer Amsterdam", stars: 5, price: "€350/night", description: "24 canal houses merged into one luxury hotel" },
      { name: "Hotel V Nesplein", stars: 4, price: "€180/night", description: "Design hotel in city center" },
      { name: "StayOkay Vondelpark", stars: 2, price: "€50/night", description: "Hostel next to Vondelpark" },
    ],
    restaurants: [
      { name: "Rijks Restaurant", type: "Dutch Fine Dining", price: "€€€€", specialty: "Modern Dutch cuisine inside Rijksmuseum" },
      { name: "Brouwerij 't IJ", type: "Craft Beer", price: "€€", specialty: "Organic craft beer in a windmill" },
      { name: "Albert Cuypmarkt", type: "Street Food", price: "€", specialty: "Stroopwafels, herring, raw salted fish" },
    ],
    transportation: ["Tram (most convenient)", "Metro", "Cycling (rent a bike)", "Canal boat"],
    events: ["King's Day (Apr 27)", "Amsterdam Light Festival (Dec)", "Amsterdam Dance Event (Oct)"],
    tips: [
      "Buy the I Amsterdam City Card for free museum entry",
      "Rent a bicycle — it's the local way and fastest transport",
      "Tulip season (late March–May) transforms the city and Keukenhof",
      "Book Anne Frank House tickets months in advance",
    ]
  },
];

export const businessListings: BusinessListing[] = [
  {
    id: "b1", name: "Alstom Transport", category: "Manufacturing", country: "France", city: "Paris",
    type: "employer", description: "World leader in sustainable transport systems, manufacturing trains and metro systems across Europe.",
    employees: "74,000+", founded: 1928, website: "alstom.com",
    tags: ["Transport", "Manufacturing", "Green Tech", "Engineering"], rating: 4.4, verified: true,
    colorGradient: "linear-gradient(135deg, #12355B 0%, #2563EB 100%)"
  },
  {
    id: "b2", name: "ASML Holding", category: "Technology", country: "Netherlands", city: "Eindhoven",
    type: "employer", description: "The world's most critical technology company — makes the machines that make the chips that run the world.",
    employees: "42,000+", founded: 1984, website: "asml.com",
    tags: ["Semiconductors", "Technology", "R&D", "World Leader"], rating: 4.8, verified: true,
    colorGradient: "linear-gradient(135deg, #003F8A 0%, #00ADEF 100%)"
  },
  {
    id: "b3", name: "Siemens AG", category: "Technology & Industry", country: "Germany", city: "Munich",
    type: "employer", description: "Global technology powerhouse in industrial automation, smart infrastructure, and digital industries.",
    employees: "311,000+", founded: 1847, website: "siemens.com",
    tags: ["Industrial", "Automation", "Smart Grid", "Digital"], rating: 4.5, verified: true,
    colorGradient: "linear-gradient(135deg, #009999 0%, #00CC00 100%)"
  },
  {
    id: "b4", name: "European Startup Alliance", category: "Business Services", country: "EU-Wide", city: "Brussels",
    type: "partner", description: "Pan-European network connecting startups, investors, and accelerators across 27 EU member states.",
    employees: "50+", founded: 2018, website: "eustartupalliance.eu",
    tags: ["Startup", "Network", "EU", "Ecosystem"], rating: 4.6, verified: true,
    colorGradient: "linear-gradient(135deg, #D4A72C 0%, #F4B92B 100%)"
  },
  {
    id: "b5", name: "Novartis AG", category: "Pharmaceuticals", country: "Switzerland", city: "Basel",
    type: "employer", description: "One of the world's largest pharmaceutical companies, pioneering innovative medicines for patients globally.",
    employees: "108,000+", founded: 1996, website: "novartis.com",
    tags: ["Pharma", "Biotech", "Research", "Healthcare"], rating: 4.7, verified: true,
    colorGradient: "linear-gradient(135deg, #E11D48 0%, #9F1239 100%)"
  },
  {
    id: "b6", name: "Nordic Cleantech Suppliers", category: "Energy & Environment", country: "Sweden", city: "Stockholm",
    type: "supplier", description: "Network of verified Nordic suppliers specializing in clean technology components and green energy solutions.",
    employees: "200–500", founded: 2015, website: "nordiccleantech.se",
    tags: ["CleanTech", "Sustainability", "Supplier", "Nordic"], rating: 4.5, verified: false,
    colorGradient: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)"
  },
];

export const notifications: Notification[] = [
  { id: "n1", type: "job", title: "New job match", message: "Senior React Developer at N26 matches your profile — €95,000/year in Berlin", read: false, time: "2 min ago", link: "/jobs/j4" },
  { id: "n2", type: "opportunity", title: "Deadline approaching", message: "Erasmus+ scholarship deadline is in 7 days. Complete your application now.", read: false, time: "1 hour ago", link: "/opportunities/o2" },
  { id: "n3", type: "system", title: "Profile 80% complete", message: "Complete your profile to get better job and opportunity matches.", read: false, time: "3 hours ago", link: "/profile" },
  { id: "n4", type: "alert", title: "Property price drop", message: "An apartment you saved in Amsterdam dropped price by €150/month", read: true, time: "1 day ago", link: "/housing/p2" },
  { id: "n5", type: "message", title: "Welcome to EUROPIUM", message: "Your account is ready. Start exploring opportunities across Europe.", read: true, time: "2 days ago" },
];

export const europeanCities = [
  { name: "Berlin", country: "Germany", emoji: "🇩🇪", pop: "3.8M", colorClass: "country-germany" },
  { name: "Paris", country: "France", emoji: "🇫🇷", pop: "2.1M", colorClass: "country-france" },
  { name: "Amsterdam", country: "Netherlands", emoji: "🇳🇱", pop: "873K", colorClass: "country-netherlands" },
  { name: "Barcelona", country: "Spain", emoji: "🇪🇸", pop: "1.6M", colorClass: "country-spain" },
  { name: "Stockholm", country: "Sweden", emoji: "🇸🇪", pop: "975K", colorClass: "country-sweden" },
  { name: "Lisbon", country: "Portugal", emoji: "🇵🇹", pop: "505K", colorClass: "country-portugal" },
  { name: "Vienna", country: "Austria", emoji: "🇦🇹", pop: "1.9M", colorClass: "country-austria" },
  { name: "Zurich", country: "Switzerland", emoji: "🇨🇭", pop: "421K", colorClass: "country-switzerland" },
];

export const aiResponses: Record<string, string> = {
  default: "I'm your EUROPIUM AI Advisor. I can help you find jobs, universities, housing, and opportunities across Europe. What are you looking for?",
  jobs: "Based on your profile, I found 47 matching positions across Germany, Netherlands, and Sweden. Top picks include a Senior Software Engineer role at SAP Berlin (€95K) and a Data Scientist position at Spotify Stockholm. Would you like me to refine by location, salary, or role type?",
  education: "Europe has exceptional universities with some offering free tuition for EU students. For your background in technology, I'd recommend TU Munich (ranked #37 globally), ETH Zurich (#7), or Delft TU (#52). All offer programs in English. Shall I create a comparison with deadlines and requirements?",
  housing: "For a comfortable life in Berlin, budget €1,500–2,200/month for a 1–2 bedroom apartment. Amsterdam averages €1,800–2,500/month. If cost is priority, consider Lisbon (€1,100–1,600) or Warsaw (€700–1,100). Want me to show available listings in your target city?",
  relocation: "Relocating to Europe involves several steps: 1) Secure a job offer or enrollment letter, 2) Apply for the appropriate visa (Highly Skilled Migrant, Blue Card, or Student Visa), 3) Register with local authorities within 30 days, 4) Open a bank account and register for health insurance. Which country are you targeting?",
  visa: "For non-EU professionals, the EU Blue Card is the most comprehensive work permit — valid in 25+ EU countries. Requirements: university degree, job offer with €43,992+ annual salary. Processing takes 2–4 weeks. Portugal's Digital Nomad Visa is excellent for remote workers. Which type of move are you planning?",
  salary: "European salaries vary significantly: Switzerland offers the highest average (CHF 85K), followed by Norway (€72K), Denmark (€62K), and Germany (€55K). Tech roles command 20–40% premiums. Tax rates differ too — Switzerland 15–25%, Germany 30–45%. Want a full cost-of-living comparison?",
};

// Local Services data
export const localServices = [
  {
    id: "ls1", name: "European Health Insurance Card (EHIC)", category: "Healthcare", country: "EU-Wide",
    city: "Online", description: "Free or reduced-cost emergency healthcare throughout the EU. Apply through your national health authority.",
    type: "Public", rating: 4.5, verified: true, phone: "+32 2 299 1111", website: "ec.europa.eu",
    tags: ["Healthcare", "Insurance", "Free", "EU"]
  },
  {
    id: "ls2", name: "Deutsche Krankenversicherung (GKV)", category: "Healthcare", country: "Germany",
    city: "Berlin", description: "German statutory health insurance covering all residents. Mandatory for employees earning under €66,600/year.",
    type: "Public Insurance", rating: 4.3, verified: true, phone: "+49 30 123456", website: "gkv.de",
    tags: ["Healthcare", "Germany", "Mandatory", "Insurance"]
  },
  {
    id: "ls3", name: "N26 Bank", category: "Banks", country: "EU-Wide",
    city: "Berlin", description: "Digital-first European bank with instant account opening, no fees, and full multi-currency support.",
    type: "Digital Bank", rating: 4.4, verified: true, website: "n26.com",
    tags: ["Banking", "Digital", "No Fees", "Expat-Friendly"]
  },
  {
    id: "ls4", name: "Wise (TransferWise)", category: "Banks", country: "EU-Wide",
    city: "Online", description: "Multi-currency account with real exchange rates. Best for international transfers and living abroad.",
    type: "Fintech", rating: 4.8, verified: true, website: "wise.com",
    tags: ["Banking", "International", "Low Fees", "Currency Exchange"]
  },
  {
    id: "ls5", name: "Revolut Business", category: "Banks", country: "EU-Wide",
    city: "Online", description: "All-in-one financial app with European IBAN, stock trading, and instant currency conversion.",
    type: "Neobank", rating: 4.5, verified: true, website: "revolut.com",
    tags: ["Banking", "Fintech", "Multi-currency", "App"]
  },
  {
    id: "ls6", name: "DB Deutsche Bahn", category: "Transport", country: "Germany",
    city: "Germany-Wide", description: "Germany's national rail network connecting 5,700+ stations. Offers Deutschlandticket for €49/month unlimited travel.",
    type: "Public Transport", rating: 3.8, verified: true, phone: "+49 180 6996633", website: "bahn.de",
    tags: ["Transport", "Rail", "Germany", "Monthly Pass"]
  },
  {
    id: "ls7", name: "Flixbus", category: "Transport", country: "EU-Wide",
    city: "Multiple Hubs", description: "Budget intercity bus network covering 40+ European countries with WiFi and USB charging.",
    type: "Private Bus", rating: 4.0, verified: true, website: "flixbus.com",
    tags: ["Transport", "Budget", "Intercity", "EU-Wide"]
  },
  {
    id: "ls8", name: "Eurostar & Thalys Rail", category: "Transport", country: "EU-Wide",
    city: "Paris, London, Brussels", description: "High-speed rail connecting major European capitals — Paris to London in 2h15, Brussels in 1h22.",
    type: "High-Speed Rail", rating: 4.5, verified: true, website: "eurostar.com",
    tags: ["Transport", "High-Speed", "International", "Luxury"]
  },
  {
    id: "ls9", name: "Fragomen Immigration", category: "Legal Services", country: "EU-Wide",
    city: "Multiple Offices", description: "World's leading immigration law firm specializing in EU work permits, Blue Cards, and residency.",
    type: "Immigration Law", rating: 4.7, verified: true, phone: "+32 2 650 0800", website: "fragomen.com",
    tags: ["Legal", "Immigration", "Visa", "Work Permit"]
  },
  {
    id: "ls10", name: "KPMG Relocation Advisory", category: "Relocation Services", country: "EU-Wide",
    city: "Multiple Offices", description: "End-to-end corporate relocation services including tax, legal, housing, and family support.",
    type: "Professional Services", rating: 4.5, verified: true, website: "kpmg.com",
    tags: ["Relocation", "Corporate", "Tax", "Family Support"]
  },
  {
    id: "ls11", name: "Expat Arrivals Community", category: "Community Groups", country: "EU-Wide",
    city: "Online & Local", description: "Global expat community with city-specific guides, forums, and monthly meetups across Europe.",
    type: "Community", rating: 4.6, verified: true, website: "expatarrivals.com",
    tags: ["Community", "Expat", "Networking", "Support"]
  },
  {
    id: "ls12", name: "InterNations Europe", category: "Community Groups", country: "EU-Wide",
    city: "50+ Cities", description: "Largest expat network in Europe with monthly events, professional groups, and language exchange.",
    type: "Networking", rating: 4.4, verified: true, website: "internations.org",
    tags: ["Community", "Networking", "Events", "Language Exchange"]
  },
  {
    id: "ls13", name: "Deloitte Tax Advisory", category: "Professional Services", country: "EU-Wide",
    city: "Multiple Offices", description: "International tax advisory for expatriates and multinational employees navigating EU tax systems.",
    type: "Tax Advisory", rating: 4.6, verified: true, website: "deloitte.com",
    tags: ["Tax", "Finance", "Professional", "International"]
  },
  {
    id: "ls14", name: "Medgate Europe", category: "Healthcare", country: "EU-Wide",
    city: "Online", description: "Telemedicine platform with English-speaking doctors across 20+ European countries. Available 24/7.",
    type: "Telemedicine", rating: 4.4, verified: true, website: "medgate.eu",
    tags: ["Healthcare", "Online", "English", "24/7"]
  },
  {
    id: "ls15", name: "European Social Fund+", category: "Professional Services", country: "EU-Wide",
    city: "Brussels", description: "EU-funded employment integration, vocational training, and skills development for newcomers.",
    type: "Government Support", rating: 4.3, verified: true, website: "ec.europa.eu/esf",
    tags: ["Employment", "Training", "Government", "Integration"]
  },
  {
    id: "ls16", name: "Goethe-Institut Language", category: "Community Groups", country: "Germany",
    city: "Multiple Cities", description: "Official German language courses for visa and citizenship requirements at all levels (A1–C2).",
    type: "Language School", rating: 4.7, verified: true, website: "goethe.de",
    tags: ["Language", "German", "Official", "Visa Requirement"]
  },
];
