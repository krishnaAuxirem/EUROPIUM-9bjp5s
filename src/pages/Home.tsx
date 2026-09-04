import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, ArrowRight, Globe, Briefcase, GraduationCap, Home as HomeIcon,
  Plane, Building2, TrendingUp, Sparkles, Star, MapPin, ChevronRight,
  Shield, Check, Users, Bookmark, Play, ChevronLeft, Award, Zap,
  DollarSign, Clock, ExternalLink, Quote, Euro, Heart
} from "lucide-react";
import heroImg from "@/assets/hero-europe-main.jpg";
import travelParis from "@/assets/travel-paris.jpg";
import travelRome from "@/assets/travel-rome.jpg";
import travelBarcelona from "@/assets/slide-barcelona.jpg";
import { jobs, universities, properties, opportunities, travelDestinations, businessListings, countries } from "@/lib/mockData";

const HERO_SLIDES = [
  {
    img: heroImg,
    city: "Paris", country: "France",
    tagline: "City of Light & Opportunity"
  },
  {
    img: travelParis,
    city: "Berlin", country: "Germany",
    tagline: "Europe's Tech Capital"
  },
  {
    img: travelRome,
    city: "Amsterdam", country: "Netherlands",
    tagline: "Gateway to Europe"
  },
  {
    img: travelBarcelona,
    city: "Barcelona", country: "Spain",
    tagline: "Mediterranean Lifestyle"
  },
];

const SEARCH_EXAMPLES = [
  "Find software jobs in Germany",
  "Best universities for Computer Science",
  "Affordable cities in Europe",
  "Plan a trip to Italy",
  "How can I relocate to Germany?",
  "Business opportunities in Netherlands",
];

const COUNTRY_EXPLORER = [
  { id: "de", name: "Germany", flag: "🇩🇪", capital: "Berlin", cost: 7, jobs: 9, edu: 10, safety: 9, tag: "Tech Hub" },
  { id: "fr", name: "France",  flag: "🇫🇷", capital: "Paris", cost: 6, jobs: 8, edu: 9, safety: 8, tag: "Culture" },
  { id: "it", name: "Italy",   flag: "🇮🇹", capital: "Rome", cost: 7, jobs: 7, edu: 8, safety: 8, tag: "Lifestyle" },
  { id: "nl", name: "Netherlands", flag: "🇳🇱", capital: "Amsterdam", cost: 5, jobs: 9, edu: 9, safety: 9, tag: "International" },
  { id: "es", name: "Spain",   flag: "🇪🇸", capital: "Madrid", cost: 8, jobs: 7, edu: 8, safety: 8, tag: "Lifestyle" },
  { id: "se", name: "Sweden",  flag: "🇸🇪", capital: "Stockholm", cost: 4, jobs: 8, edu: 9, safety: 10, tag: "Innovation" },
  { id: "ie", name: "Ireland", flag: "🇮🇪", capital: "Dublin", cost: 4, jobs: 9, edu: 9, safety: 9, tag: "English-speaking" },
  { id: "ch", name: "Switzerland", flag: "🇨🇭", capital: "Bern", cost: 3, jobs: 8, edu: 10, safety: 10, tag: "High Salary" },
];

const JOURNEY_STEPS = [
  { step: "Discover", icon: Globe, color: "bg-royalblue-500", desc: "Explore 44 countries" },
  { step: "Compare", icon: TrendingUp, color: "bg-gold-500", desc: "Side-by-side analysis" },
  { step: "Decide", icon: Check, color: "bg-emerald-500", desc: "AI-powered matching" },
  { step: "Apply", icon: Briefcase, color: "bg-navy-600", desc: "One-click applications" },
  { step: "Plan", icon: MapPin, color: "bg-royalblue-700", desc: "Relocation planner" },
  { step: "Relocate", icon: Plane, color: "bg-gold-600", desc: "Step-by-step guide" },
  { step: "Live", icon: HomeIcon, color: "bg-emerald-600", desc: "Housing & community" },
  { step: "Grow", icon: Award, color: "bg-navy-800", desc: "Career advancement" },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma", origin: "India → Germany", role: "Software Engineer at SAP",
    avatar: "PS", color: "bg-royalblue-500",
    text: "EUROPIUM helped me land a €95K job at SAP Berlin in just 3 months. The AI Advisor was incredibly helpful in navigating the German Blue Card process.",
    rating: 5
  },
  {
    name: "Carlos Mendez", origin: "Mexico → Netherlands", role: "UX Designer at Philips",
    avatar: "CM", color: "bg-gold-500",
    text: "I found my dream apartment in Amsterdam through EUROPIUM before even landing! The housing section saved me weeks of research. Now I'm living the canal life!",
    rating: 5
  },
  {
    name: "Aisha Okonkwo", origin: "Nigeria → France", role: "PhD Candidate, Sciences Po",
    avatar: "AO", color: "bg-emerald-600",
    text: "Got my Erasmus+ scholarship and admission to Sciences Po — all using EUROPIUM's opportunities tracker. The deadline reminders were a lifesaver!",
    rating: 5
  },
  {
    name: "Wei Zhang", origin: "China → Switzerland", role: "Financial Analyst at UBS",
    avatar: "WZ", color: "bg-navy-700",
    text: "The salary comparison feature showed me Switzerland was 60% higher paying than my options elsewhere. The relocation planner made the whole move smooth.",
    rating: 5
  },
];

const WHY_FEATURES = [
  { icon: Globe, title: "One Platform", desc: "Jobs, housing, education, travel, visas, and business — everything in one place.", color: "text-royalblue-500" },
  { icon: Sparkles, title: "AI Guidance", desc: "Get personalized recommendations and instant answers from our AI Europe Advisor.", color: "text-gold-500" },
  { icon: Shield, title: "Verified Info", desc: "Every listing and opportunity is verified and updated in real-time.", color: "text-emerald-500" },
  { icon: TrendingUp, title: "Opportunity Discovery", desc: "3,400+ scholarships, grants, and visa programs updated weekly.", color: "text-navy-600" },
  { icon: Users, title: "1.2M+ Community", desc: "Connect with expats, students, and professionals across Europe.", color: "text-royalblue-600" },
  { icon: Award, title: "Country Comparison", desc: "Compare cost of living, salaries, safety, and quality of life.", color: "text-gold-600" },
  { icon: MapPin, title: "Journey Tracking", desc: "Track your visa, applications, and relocation progress in one dashboard.", color: "text-emerald-600" },
  { icon: Zap, title: "Fast & Smart", desc: "AI-powered search finds what you need in seconds, not hours.", color: "text-navy-500" },
];

function IndicatorBar({ value, max = 10, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [exampleIdx, setExampleIdx] = useState(0);
  const [savedCountries, setSavedCountries] = useState<string[]>([]);
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Hero slider auto-advance
  useEffect(() => {
    slideTimer.current = setInterval(() => {
      setSlideIndex(i => (i + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
  }, []);

  // Rotating example placeholder
  useEffect(() => {
    const t = setInterval(() => setExampleIdx(i => (i + 1) % SEARCH_EXAMPLES.length), 3000);
    return () => clearInterval(t);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/ai-advisor?q=${encodeURIComponent(searchQuery)}`);
  };

  const toggleSave = (id: string) =>
    setSavedCountries(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const featuredJobs = jobs.filter(j => j.featured).slice(0, 4);
  const featuredUniversities = universities.slice(0, 4);
  const featuredProperties = properties.filter(p => p.featured).slice(0, 4);
  const featuredOpportunities = opportunities.filter(o => o.featured).slice(0, 4);
  const featuredTravel = travelDestinations.slice(0, 4);

  // INR conversion (approx)
  const toINR = (eur: number) => `₹${(eur * 90).toLocaleString("en-IN")}`;

  return (
    <div className="page-container overflow-hidden">

      {/* ═══════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Slides background */}
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === slideIndex ? 1 : 0 }}
          >
            <img src={slide.img} alt={slide.city} className="w-full h-full object-cover" />
          </div>
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay" />
        {/* Decorative blobs */}
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #D4A72C, transparent)" }} />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #2563EB, transparent)" }} />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">48,000+ Active Opportunities Across Europe</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
              Discover Europe.<br />
              <span className="text-gold-400">Build Your Future.</span>
            </h1>
            <p className="text-white/80 text-xl leading-relaxed mb-10 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Explore countries, careers, education, travel, housing and business opportunities across Europe — all in one intelligent platform.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center bg-white rounded-2xl shadow-premium-xl overflow-hidden">
                <div className="pl-5 pr-3 flex items-center shrink-0">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={`e.g. ${SEARCH_EXAMPLES[exampleIdx]}`}
                  className="flex-1 py-4 pr-4 text-gray-800 placeholder:text-gray-400 bg-transparent focus:outline-none text-base"
                />
                <button type="submit" className="m-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shrink-0">
                  Search <ArrowRight size={16} />
                </button>
              </div>
            </form>

            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-2 mt-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              {["Jobs in Germany", "Study in Europe", "Relocate to Portugal", "Travel deals"].map(s => (
                <button key={s} onClick={() => { setSearchQuery(s); navigate(`/ai-advisor?q=${encodeURIComponent(s)}`); }}
                  className="px-3 py-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 rounded-full text-sm hover:bg-white/25 transition-all">
                  {s}
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Link to="/explore" className="btn-gold px-8 py-4 text-base">
                <Globe size={18} /> Explore Europe
              </Link>
              <Link to="/ai-advisor" className="flex items-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/25 transition-all text-base">
                <Sparkles size={18} /> Ask AI Advisor
              </Link>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          <button onClick={() => setSlideIndex(i => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-all">
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlideIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === slideIndex ? "w-8 bg-gold-400" : "w-2 bg-white/40"}`} />
            ))}
          </div>
          <button onClick={() => setSlideIndex(i => (i + 1) % HERO_SLIDES.length)}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-all">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Slide info card */}
        <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 z-20">
          <MapPin size={16} className="text-gold-400" />
          <div>
            <p className="text-white font-semibold text-sm">{HERO_SLIDES[slideIndex].city}</p>
            <p className="text-white/60 text-xs">{HERO_SLIDES[slideIndex].tagline}</p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/10 z-10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: "48K+", l: "Active Jobs" }, { n: "1.2M+", l: "Members" },
              { n: "44", l: "Countries" }, { n: "3.4K+", l: "Opportunities" }
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-2xl font-bold text-gold-400 font-serif">{s.n}</div>
                <div className="text-white/70 text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — EUROPE EXPLORER
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header mb-12 text-left lg:flex lg:items-end lg:justify-between">
            <div>
              <span className="section-label text-gold-400">Interactive Explorer</span>
              <h2 className="font-serif text-4xl font-bold text-white mb-3">Discover Europe</h2>
              <p className="text-white/60 text-lg">Choose your destination and explore what each country has to offer.</p>
            </div>
            <Link to="/explore" className="mt-4 lg:mt-0 inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold transition-colors">
              View All Countries <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COUNTRY_EXPLORER.map(c => (
              <div key={c.id} className="group bg-white/8 hover:bg-white/12 border border-white/10 hover:border-gold-500/40 rounded-2xl p-5 transition-all duration-300 cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{c.flag}</span>
                    <div>
                      <h3 className="font-bold text-white">{c.name}</h3>
                      <p className="text-white/50 text-xs">{c.capital}</p>
                    </div>
                  </div>
                  <button onClick={() => toggleSave(c.id)}
                    className={`p-1.5 rounded-lg transition-all ${savedCountries.includes(c.id) ? "text-gold-400 bg-gold-500/20" : "text-white/40 hover:text-white"}`}>
                    <Bookmark size={15} fill={savedCountries.includes(c.id) ? "currentColor" : "none"} />
                  </button>
                </div>

                <span className="tag tag-gold text-xs mb-3 inline-block">{c.tag}</span>

                <div className="space-y-2 mb-4">
                  {[
                    { label: "Cost of Living", value: c.cost, color: c.cost >= 7 ? "bg-emerald-400" : c.cost >= 5 ? "bg-gold-400" : "bg-red-400" },
                    { label: "Job Opportunities", value: c.jobs, color: "bg-royalblue-400" },
                    { label: "Education", value: c.edu, color: "bg-gold-400" },
                    { label: "Safety", value: c.safety, color: "bg-emerald-400" },
                  ].map(ind => (
                    <div key={ind.label}>
                      <div className="flex justify-between text-xs text-white/50 mb-1">
                        <span>{ind.label}</span>
                        <span>{ind.value}/10</span>
                      </div>
                      <IndicatorBar value={ind.value} color={ind.color} />
                    </div>
                  ))}
                </div>

                <Link to={`/explore/${c.id}`}
                  className="w-full flex items-center justify-center gap-1 py-2 bg-white/10 hover:bg-gold-500 text-white text-sm font-semibold rounded-xl transition-all duration-200">
                  View Country <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — POPULAR COUNTRIES (premium cards)
      ═══════════════════════════════════════ */}
      <section className="py-20 europium-pattern bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <span className="section-label">Top Destinations</span>
            <h2 className="section-title">Most Popular in Europe</h2>
            <p className="section-subtitle">Handpicked destinations loved by expats, students, and professionals.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.slice(0, 8).map(c => (
              <Link key={c.id} to={`/explore/${c.id}`}
                className="group relative card-premium overflow-hidden h-64 flex flex-col justify-end">
                <div className={`absolute inset-0 ${c.colorClass} opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-serif font-bold text-xl">{c.name}</span>
                    <div className="flex items-center gap-0.5 bg-white/20 rounded-lg px-2 py-0.5">
                      <Star size={10} className="text-gold-400 fill-gold-400" />
                      <span className="text-white text-xs font-semibold">{c.rating}</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-xs mb-3 line-clamp-2">{c.description.slice(0, 60)}...</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 bg-white/20 rounded-full text-white text-xs">{c.capital}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        c.costOfLiving === "low" ? "bg-emerald-500/80 text-white" :
                        c.costOfLiving === "medium" ? "bg-gold-500/80 text-white" :
                        "bg-red-500/80 text-white"
                      }`}>
                        {c.costOfLiving === "very-high" ? "Very High Cost" : `${c.costOfLiving.charAt(0).toUpperCase() + c.costOfLiving.slice(1)} Cost`}
                      </span>
                    </div>
                    <ArrowRight size={16} className="text-white/60 group-hover:text-gold-400 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — JOBS & CAREERS
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header text-left lg:flex lg:items-end lg:justify-between mb-10">
            <div>
              <span className="section-label">48,000+ Active Listings</span>
              <h2 className="section-title mb-2">Jobs & Careers in Europe</h2>
              <p className="text-gray-500 max-w-xl">Top-paying roles at Europe's best companies, with relocation support and visa sponsorship.</p>
            </div>
            <Link to="/jobs" className="mt-4 lg:mt-0 btn-outline">
              Explore All Jobs <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {featuredJobs.map(job => (
              <div key={job.id} className="card-premium p-6 flex gap-4">
                <div className={`w-14 h-14 rounded-2xl ${job.logo} flex items-center justify-center shrink-0 text-white font-bold text-lg`}>
                  {job.company.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-navy-900 text-lg leading-tight">{job.title}</h3>
                      <p className="text-gray-500 text-sm mt-0.5">{job.company}</p>
                    </div>
                    {job.featured && <span className="tag tag-gold shrink-0">Featured</span>}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={12} /> {job.city}, {job.country}
                    </span>
                    <span className={`tag text-xs ${job.remote ? "tag-green" : "tag-blue"}`}>
                      {job.type}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-navy-900 font-bold text-base">{job.salary}</p>
                      <p className="text-gray-400 text-xs">{toINR(job.salaryMin)}–{toINR(job.salaryMax)} per year</p>
                    </div>
                    <Link to={`/jobs/${job.id}`} className="btn-primary text-sm px-4 py-2">
                      View Job
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {job.tags.slice(0, 3).map(t => (
                      <span key={t} className="tag tag-gray text-xs">{t}</span>
                    ))}
                    <span className="text-xs text-gray-400 self-center">{job.applicants} applicants</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 — EDUCATION
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header text-left lg:flex lg:items-end lg:justify-between mb-10">
            <div>
              <span className="section-label">Top-Ranked Institutions</span>
              <h2 className="section-title mb-2">World-Class Education</h2>
              <p className="text-gray-500 max-w-xl">From free-tuition universities to private business schools — find your perfect program.</p>
            </div>
            <Link to="/education" className="mt-4 lg:mt-0 btn-outline">
              Explore Universities <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredUniversities.map(u => (
              <Link key={u.id} to={`/education/${u.id}`} className="card-premium p-5 block">
                <div className={`w-12 h-12 rounded-xl ${u.colorClass} flex items-center justify-center mb-4 text-white font-bold text-sm`}>
                  #{u.ranking}
                </div>
                <h3 className="font-bold text-navy-900 text-base leading-tight mb-1">{u.name}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                  <MapPin size={11} /> {u.city}, {u.country}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {u.tags.slice(0, 2).map(t => (
                    <span key={t} className="tag tag-blue text-xs">{t}</span>
                  ))}
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-gray-400">EU Tuition</span>
                    <span className="font-semibold text-emerald-600">{u.tuitionEU}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Acceptance</span>
                    <span className="font-semibold">{u.acceptanceRate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} className={i < Math.floor(u.rating) ? "text-gold-400 fill-gold-400" : "text-gray-200 fill-gray-200"} />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">{u.rating}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6 — HOUSING
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header text-left lg:flex lg:items-end lg:justify-between mb-10">
            <div>
              <span className="section-label text-gold-400">Find Your Home</span>
              <h2 className="font-serif text-4xl font-bold text-white mb-2">European Properties</h2>
              <p className="text-white/60 max-w-xl">Curated rentals and properties in Europe's most desirable cities.</p>
            </div>
            <Link to="/housing" className="mt-4 lg:mt-0 btn-gold">
              Browse Properties <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProperties.map(p => (
              <Link key={p.id} to={`/housing/${p.id}`}
                className="group bg-white/8 hover:bg-white/12 border border-white/10 hover:border-gold-500/40 rounded-2xl overflow-hidden transition-all duration-300 block">
                <div className={`h-40 ${p.colorClass} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`tag text-xs font-bold ${p.listingType === "rent" ? "bg-royalblue-500 text-white" : "bg-emerald-500 text-white"}`}>
                      {p.listingType === "rent" ? "For Rent" : "For Sale"}
                    </span>
                    {p.featured && <span className="tag bg-gold-500 text-white text-xs">Featured</span>}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-lg">
                      {p.currency === "EUR" ? "€" : p.currency === "SEK" ? "SEK " : ""}
                      {p.price.toLocaleString()}
                      {p.period ? `/${p.period}` : ""}
                    </p>
                    <p className="text-white/60 text-xs">{toINR(p.currency === "EUR" ? p.price : p.price / 11)} {p.period ? "/month" : ""}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 mb-2">{p.title}</h3>
                  <div className="flex items-center gap-1 text-white/50 text-xs mb-3">
                    <MapPin size={11} /> {p.city}, {p.country}
                  </div>
                  <div className="flex items-center gap-3 text-white/60 text-xs">
                    {p.bedrooms > 0 && <span>{p.bedrooms} bed</span>}
                    <span>{p.bathrooms} bath</span>
                    <span>{p.area}m²</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7 — TRAVEL DESTINATIONS
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-background europium-pattern">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header text-left lg:flex lg:items-end lg:justify-between mb-10">
            <div>
              <span className="section-label">Explore & Experience</span>
              <h2 className="section-title mb-2">Top Travel Destinations</h2>
              <p className="text-gray-500 max-w-xl">Iconic destinations with curated itineraries and budget guides.</p>
            </div>
            <Link to="/travel" className="mt-4 lg:mt-0 btn-outline">
              All Destinations <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Paris", country: "France", flag: "🇫🇷", img: travelParis, budget: "Luxury", season: "Apr–Oct", budget_range: "€150–350/day", highlight: "Eiffel Tower · Louvre · Seine" },
              { name: "Rome", country: "Italy", flag: "🇮🇹", img: travelRome, budget: "Mid-range", season: "Mar–Jun", budget_range: "€80–180/day", highlight: "Colosseum · Vatican · Trevi" },
              { name: "Barcelona", country: "Spain", flag: "🇪🇸", img: travelBarcelona, budget: "Mid-range", season: "May–Sep", budget_range: "€90–200/day", highlight: "Sagrada Família · Beach · Gaudí" },
              ...featuredTravel.slice(3).map(t => ({
                name: t.name, country: t.country, flag: "🌍", img: null,
                budget: t.budget, season: t.bestSeason, budget_range: "€60–250/day",
                highlight: t.highlights.slice(0, 3).join(" · ")
              }))
            ].slice(0, 6).map((dest, i) => (
              <div key={i} className="group card-premium overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  {dest.img ? (
                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-navy-600 to-royalblue-700 flex items-center justify-center">
                      <span className="text-6xl">{dest.flag}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className={`tag text-xs ${dest.budget === "Luxury" ? "bg-gold-500 text-white" : dest.budget === "budget" ? "bg-emerald-500 text-white" : "bg-royalblue-500 text-white"}`}>
                      {dest.budget}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 text-2xl">{dest.flag}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-navy-900 text-xl mb-1">{dest.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{dest.country}</p>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-1">{dest.highlight}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-navy-900 font-bold text-sm">{dest.budget_range}</p>
                      <p className="text-gray-400 text-xs">Best: {dest.season}</p>
                    </div>
                    <Link to="/travel" className="btn-primary text-xs px-4 py-2">Explore</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 8 — BUSINESS OPPORTUNITIES
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header text-left lg:flex lg:items-end lg:justify-between mb-10">
            <div>
              <span className="section-label">B2B & Enterprise</span>
              <h2 className="section-title mb-2">Business in Europe</h2>
              <p className="text-gray-500 max-w-xl">Explore employer partnerships, supplier networks, and market entry opportunities.</p>
            </div>
            <Link to="/business" className="mt-4 lg:mt-0 btn-outline">
              Business Directory <ArrowRight size={16} />
            </Link>
          </div>

          {/* Business type quick filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            {["All", "Employers", "Startups", "Suppliers", "Partners", "Accelerators"].map(type => (
              <button key={type}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${type === "All" ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-navy-100"}`}>
                {type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {businessListings.map(b => (
              <Link key={b.id} to={`/business/${b.id}`}
                className="card-premium p-5 block">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{ background: b.colorGradient }}>
                    {b.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-navy-900 text-base truncate">{b.name}</h3>
                      {b.verified && <Shield size={14} className="text-royalblue-500 shrink-0" />}
                    </div>
                    <p className="text-gray-500 text-xs">{b.category} · {b.city}, {b.country}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{b.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <span className="tag tag-navy text-xs capitalize">{b.type}</span>
                    <span className="tag tag-gray text-xs">{b.employees}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star size={12} className="text-gold-400 fill-gold-400" />
                    <span className="text-xs font-semibold text-navy-900">{b.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 9 — SCHOLARSHIPS & OPPORTUNITIES
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header text-left lg:flex lg:items-end lg:justify-between mb-10">
            <div>
              <span className="section-label">Funding & Visas</span>
              <h2 className="section-title mb-2">Scholarships & Opportunities</h2>
              <p className="text-gray-500 max-w-xl">Grants, scholarships, fellowships, and visa programs to accelerate your European journey.</p>
            </div>
            <Link to="/opportunities" className="mt-4 lg:mt-0 btn-outline">
              View All Opportunities <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredOpportunities.map(o => (
              <Link key={o.id} to={`/opportunities/${o.id}`} className="card-premium p-5 block">
                <div className={`w-10 h-10 rounded-xl ${o.colorClass} flex items-center justify-center mb-3`}>
                  <Award size={18} className="text-white" />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <span className="tag tag-blue text-xs capitalize">{o.type}</span>
                  {o.deadline !== "Ongoing" && (
                    <div className="flex items-center gap-1 text-xs text-red-500 font-semibold">
                      <Clock size={11} /> Deadline
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-navy-900 text-sm leading-tight mb-1">{o.title}</h3>
                <p className="text-gray-500 text-xs mb-3">{o.organization}</p>
                <p className="text-navy-900 font-bold text-base mb-1">{o.value}</p>
                <p className="text-gray-400 text-xs">{o.deadline === "Ongoing" ? "Rolling applications" : `Deadline: ${o.deadline}`}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 10 — AI ADVISOR
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-royalblue-900 relative overflow-hidden">
        <div className="absolute inset-0 europium-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #D4A72C, transparent)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/20 border border-gold-500/40 rounded-full text-gold-400 text-sm font-semibold mb-6">
                <Sparkles size={14} /> AI-Powered Advisor
              </span>
              <h2 className="font-serif text-4xl font-bold text-white mb-4">
                Tell us your goal.<br />We'll find your path.
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Our AI advisor has helped 1.2M+ people navigate jobs, visas, universities, housing, and relocation across Europe.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {["Instant answers", "Personalized guidance", "Visa assistance", "Salary data"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-white/80 text-sm">
                    <Check size={16} className="text-emerald-400 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link to="/ai-advisor" className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-base">
                <Sparkles size={18} /> Start AI Session
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { q: "Which country is best for my career in tech?", a: "Based on your profile, Germany and Netherlands offer the best opportunities with EU Blue Card support..." },
                { q: "Find affordable universities in Europe", a: "Germany, Norway, and Czech Republic offer free or near-free tuition even for international students..." },
                { q: "Help me relocate to Portugal", a: "Portugal's NHR tax regime and Digital Nomad Visa make it ideal. Here's a 6-step relocation plan..." },
              ].map((item, i) => (
                <div key={i} className="bg-white/8 border border-white/10 rounded-2xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-royalblue-500 flex items-center justify-center shrink-0">
                      <Users size={13} className="text-white" />
                    </div>
                    <p className="text-white text-sm font-medium">{item.q}</p>
                  </div>
                  <div className="flex items-start gap-3 pl-10">
                    <div className="w-7 h-7 rounded-full bg-navy-700 flex items-center justify-center shrink-0 absolute ml-[-40px]">
                      <Sparkles size={13} className="text-gold-400" />
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">{item.a}</p>
                  </div>
                </div>
              ))}
              <Link to="/ai-advisor" className="block text-center text-gold-400 hover:text-gold-300 text-sm font-semibold pt-1 transition-colors">
                View all AI capabilities →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 11 — WHY EUROPIUM
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header mb-14">
            <span className="section-label">The EUROPIUM Advantage</span>
            <h2 className="section-title">Why 1.2M+ Choose EUROPIUM</h2>
            <p className="section-subtitle">Everything you need to discover, decide, and move to Europe — powered by AI.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_FEATURES.map((f, i) => (
              <div key={i} className="card-premium p-6 text-center group">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-navy-50 flex items-center justify-center mx-auto mb-4 transition-colors">
                  <f.icon size={24} className={f.color} />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 12 — JOURNEY STEPS
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header mb-14">
            <span className="section-label">Your Path to Europe</span>
            <h2 className="section-title">My Europe Journey</h2>
            <p className="section-subtitle">From first discovery to building your life in Europe — we guide every step.</p>
          </div>
          <div className="relative">
            {/* connector line desktop */}
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-royalblue-200 via-gold-200 to-emerald-200 mx-[5%]" />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {JOURNEY_STEPS.map((s, i) => (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  <div className={`w-20 h-20 rounded-2xl ${s.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-105 transition-transform duration-200 relative z-10`}>
                    <s.icon size={28} className="text-white" />
                  </div>
                  <h4 className="font-bold text-navy-900 text-sm mb-1">{s.step}</h4>
                  <p className="text-gray-400 text-xs leading-tight">{s.desc}</p>
                  {i < JOURNEY_STEPS.length - 1 && (
                    <ChevronRight size={16} className="hidden lg:block absolute right-[-10px] top-[30px] text-gray-300 z-20" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/relocation-planner" className="btn-primary px-10 py-4 text-base inline-flex">
              Start My Journey <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 13 — TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #D4A72C 0%, transparent 50%), radial-gradient(circle at 80% 50%, #2563EB 0%, transparent 50%)"
        }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header mb-12">
            <span className="section-label text-gold-400">Real Stories</span>
            <h2 className="font-serif text-4xl font-bold text-white mb-3">1.2M+ Success Stories</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">From landing dream jobs to finding the perfect apartment — EUROPIUM makes it happen.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/8 border border-white/10 rounded-2xl p-5 flex flex-col">
                <Quote size={24} className="text-gold-500 mb-3 shrink-0" />
                <p className="text-white/80 text-sm leading-relaxed flex-1 mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.role}</p>
                    <p className="text-gold-400 text-xs">{t.origin}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-3">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={12} className="text-gold-400 fill-gold-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 14 — FINAL CTA
      ═══════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-royalblue-600 via-royalblue-700 to-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 30% 70%, #D4A72C 0%, transparent 50%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-gold-400 rounded-full" />
            <span className="text-white/90 text-sm">Join 1.2M+ members building their European future</span>
          </div>
          <h2 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-6">
            Your European journey<br />
            <span className="text-gold-400">starts here.</span>
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover countries, find your career, secure housing, and get AI-powered guidance — all in one platform.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/explore" className="btn-gold px-10 py-4 text-base shadow-gold">
              <Globe size={20} /> Explore Europe
            </Link>
            <Link to="/register" className="flex items-center gap-2 px-10 py-4 bg-white text-navy-900 rounded-xl font-bold text-base hover:bg-gray-50 transition-all shadow-premium">
              <Users size={20} /> Create Free Account
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-6">Free forever · No credit card required · Cancel anytime</p>
        </div>
      </section>

    </div>
  );
}
