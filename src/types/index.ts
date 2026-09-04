export interface Country {
  id: string;
  name: string;
  code: string;
  capital: string;
  region: string;
  population: string;
  language: string;
  currency: string;
  description: string;
  highlights: string[];
  tags: string[];
  rating: number;
  jobCount: number;
  universityCount: number;
  costOfLiving: "low" | "medium" | "high" | "very-high";
  visaFriendly: boolean;
  colorClass: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  population: string;
  description: string;
  highlights: string[];
  tags: string[];
  rating: number;
  costIndex: number;
  colorClass: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  country: string;
  city: string;
  type: "full-time" | "part-time" | "contract" | "remote" | "hybrid";
  category: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  description: string;
  requirements: string[];
  benefits: string[];
  responsibilities?: string[];
  posted: string;
  deadline: string;
  remote: boolean;
  featured: boolean;
  logo: string;
  tags: string[];
  experience: string;
  applicants: number;
  visaSponsorship?: boolean;
  verified?: boolean;
  workMode?: "remote" | "hybrid" | "on-site";
  industry?: string;
  status?: "active" | "draft" | "closed" | "pending";
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  type: "public" | "private";
  founded: number;
  students: number;
  programs: string[];
  tuitionEU: string;
  tuitionNonEU: string;
  description: string;
  tags: string[];
  acceptanceRate: string;
  language: string;
  colorClass: string;
  rating: number;
  scholarships?: string[];
  campusLife?: string[];
  accommodation?: string;
  applicationDeadline?: string;
  intakeMonths?: string[];
  website?: string;
  reviewCount?: number;
}

export interface Program {
  id: string;
  universityId: string;
  name: string;
  degree: "Bachelor" | "Master" | "PhD" | "MBA" | "Diploma";
  duration: string;
  tuitionEU: string;
  tuitionNonEU: string;
  language: string;
  intake: string[];
  deadline: string;
  description: string;
  eligibility: string[];
  careerOutcomes: string[];
  scholarships: string[];
}

export interface Property {
  id: string;
  title: string;
  type: "apartment" | "house" | "studio" | "room" | "villa" | "office";
  listingType: "rent" | "buy";
  country: string;
  city: string;
  address: string;
  price: number;
  currency: string;
  period?: "month" | "week";
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  amenities: string[];
  tags: string[];
  featured: boolean;
  colorClass: string;
  rating: number;
  image?: string;
  status?: "active" | "pending" | "sold" | "rented" | "rejected";
  views?: number;
  inquiries?: number;
  ownerId?: string;
}

export interface BusinessListing {
  id: string;
  name: string;
  category: string;
  country: string;
  city: string;
  type: "supplier" | "partner" | "employer" | "service" | "startup";
  description: string;
  employees: string;
  founded: number;
  website: string;
  tags: string[];
  rating: number;
  verified: boolean;
  colorGradient: string;
  status?: "active" | "pending" | "rejected";
}

export interface Opportunity {
  id: string;
  title: string;
  type: "grant" | "scholarship" | "fellowship" | "visa" | "program" | "accelerator" | "award" | "internship" | "event" | "research";
  category?: string;
  country: string;
  organization: string;
  value: string;
  deadline: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  tags: string[];
  featured: boolean;
  colorClass: string;
  verified?: boolean;
  industry?: string;
}

export interface TravelDestination {
  id: string;
  name: string;
  country: string;
  type: string[];
  bestSeason: string;
  duration: string;
  budget: "budget" | "mid-range" | "luxury";
  rating: number;
  description: string;
  highlights: string[];
  tags: string[];
  colorClass: string;
  activities: string[];
  image?: string;
  dailyBudget?: string;
  popularity?: number;
  topAttractions?: string[];
  hotels?: { name: string; stars: number; price: string; description: string }[];
  restaurants?: { name: string; type: string; price: string; specialty: string }[];
  transportation?: string[];
  events?: string[];
  tips?: string[];
}

// User Roles
export type UserRole =
  | "traveler"
  | "student"
  | "job_seeker"
  | "relocator"
  | "entrepreneur"
  | "employer"
  | "property_provider"
  | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // hashed/masked representation
  avatar?: string;
  role: UserRole;
  country?: string;
  city?: string;
  profession?: string;
  bio?: string;
  phone?: string;
  skills?: string[];
  languages?: string[];
  preferredCountries?: string[];
  preferredJobTypes?: string[];
  salaryExpectation?: string;
  experience?: WorkExperience[];
  education?: EducationEntry[];
  savedJobs: string[];
  savedProperties: string[];
  savedOpportunities: string[];
  savedUniversities: string[];
  savedTrips?: TripPlan[];
  appliedJobs?: string[];
  jobApplications?: JobApplication[];
  universityApplications?: UniversityApplication[];
  joinedDate: string;
  plan: "free" | "premium";
  resumeUrl?: string;
  profileCompleteness?: number;
  isActive?: boolean;
  isSuspended?: boolean;
  lastActive?: string;
  // Role-specific
  companyName?: string;
  companySize?: string;
  companyWebsite?: string;
  targetMarket?: string;
  destinationCountry?: string;
  studyGoal?: string;
  travelStyle?: string;
  verified?: boolean;
  emailVerified?: boolean;
  properties?: string[];
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  field: string;
  startYear: string;
  endYear: string;
  grade?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  country: string;
  appliedDate: string;
  status: "saved" | "applied" | "screening" | "interview" | "offer" | "accepted" | "rejected";
  notes?: string;
}

export interface UniversityApplication {
  id: string;
  universityId: string;
  universityName: string;
  program: string;
  country: string;
  appliedDate: string;
  status: "saved" | "preparing" | "documents" | "submitted" | "under_review" | "accepted" | "rejected";
  notes?: string;
}

export interface Notification {
  id: string;
  type: "job" | "opportunity" | "message" | "system" | "alert" | "university" | "property" | "event" | "business";
  title: string;
  message: string;
  read: boolean;
  time: string;
  link?: string;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  cards?: AICard[];
}

export interface AICard {
  type: "country" | "job" | "university" | "property" | "cost" | "checklist";
  title: string;
  subtitle?: string;
  metrics?: { label: string; value: string; highlight?: boolean }[];
  action?: { label: string; link: string };
  badge?: string;
  color?: string;
}

export interface CostItem {
  category: string;
  amount: number;
  icon: string;
}

export interface FilterOptions {
  search: string;
  country: string;
  category: string;
  sortBy: string;
  [key: string]: string;
}

export interface StudentReview {
  id: string;
  name: string;
  country: string;
  program: string;
  year: number;
  rating: number;
  comment: string;
  avatar: string;
}

export interface TripDay {
  day: number;
  date: string;
  items: TripItem[];
}

export interface TripItem {
  id: string;
  time: "Morning" | "Afternoon" | "Evening" | "Night";
  type: "attraction" | "restaurant" | "hotel" | "transport" | "activity";
  title: string;
  description?: string;
  duration?: string;
  cost?: string;
  notes?: string;
}

export interface TripPlan {
  id: string;
  name: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  budget: number;
  currency: string;
  days: TripDay[];
  totalCost: number;
  createdAt: string;
}

export interface RelocationChecklist {
  id: string;
  category: string;
  items: RelocationCheckItem[];
}

export interface RelocationCheckItem {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  link?: string;
}

export interface LocalService {
  id: string;
  name: string;
  category: string;
  country: string;
  city: string;
  description: string;
  type: string;
  rating: number;
  verified: boolean;
  phone?: string;
  website?: string;
  tags: string[];
}

// Community types
export interface CommunityPost {
  id: string;
  author: string;
  authorInitials: string;
  authorCountry: string;
  group: string;
  city: string;
  title: string;
  content: string;
  type: "post" | "question" | "guide" | "event";
  tags: string[];
  likes: number;
  comments: number;
  time: string;
  pinned?: boolean;
}

export interface CommunityGroup {
  id: string;
  name: string;
  city: string;
  country: string;
  category: "city" | "profession" | "interest" | "nationality";
  members: number;
  description: string;
  tags: string[];
  icon: string;
  color: string;
  recentActivity: string;
}

// Messaging types
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantInitials: string;
  participantRole: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  context: string;
  avatar?: string;
}

// Business / Employer types
export interface CompanyProfile {
  id: string;
  name: string;
  industry: string;
  country: string;
  city: string;
  size: string;
  founded: string;
  website: string;
  description: string;
  logo: string;
  verified: boolean;
  tags: string[];
  rating: number;
  jobs: number;
  employees: string;
}

export interface CountryBusinessProfile {
  id: string;
  country: string;
  flag: string;
  corporateTax: string;
  vatRate: string;
  setupTime: string;
  setupCost: string;
  marketSize: string;
  gdpGrowth: string;
  languages: string[];
  currency: string;
  businessEnvironment: number;
  talentPool: number;
  infrastructure: number;
  digitalMaturity: number;
  funding: string;
  highlights: string[];
  industries: string[];
  description: string;
  pros: string[];
  cons: string[];
}

// Blog / Content types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  authorId: string;
  authorAvatar?: string;
  featuredImage?: string;
  status: "draft" | "published" | "unpublished";
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  readTime?: number;
  views?: number;
  likes?: number;
}

// Analytics types
export interface AnalyticsDataPoint {
  month: string;
  value: number;
  value2?: number;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  totalJobs: number;
  totalApplications: number;
  totalUniversities: number;
  totalProperties: number;
  totalBusinesses: number;
  totalOpportunities: number;
  revenue: number;
  pendingVerification: number;
  reports: number;
}

// Registered users store
export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
}
