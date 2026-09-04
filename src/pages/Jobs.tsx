import { useState, useMemo } from "react";
import {
  Briefcase, MapPin, Filter, SlidersHorizontal, Search, Globe,
  Star, Wifi, Shield, CheckCircle, TrendingUp, X, ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";
import JobCard from "@/components/features/JobCard";
import EmptyState from "@/components/features/EmptyState";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { jobs, toINR } from "@/lib/mockData";

const categories = ["All Categories", "Technology", "Design", "Data & Analytics", "Product Management", "Marketing", "Finance", "Research", "Energy", "Healthcare"];
const jobTypes = ["All Types", "full-time", "part-time", "contract", "remote", "hybrid"];
const countryList = ["All Countries", "Germany", "France", "Netherlands", "Sweden", "Spain", "Italy", "Portugal", "Switzerland", "Denmark", "Norway", "Poland", "Austria"];
const experienceLevels = ["All Levels", "Junior", "Mid", "Senior"];
const workModes = ["All Modes", "remote", "hybrid", "on-site"];
const industries = ["All Industries", "Technology", "FinTech", "E-Commerce", "Healthcare Technology", "Banking & Finance", "Music Tech", "Travel Tech", "Renewable Energy", "Artificial Intelligence", "Payments", "Pharmaceuticals", "Enterprise Software"];
const datePosted = ["Any Time", "Last 24 hours", "Last 7 days", "Last 14 days", "Last 30 days"];

const STATS = [
  { icon: Briefcase, value: "48,000+", label: "Active Jobs" },
  { icon: Globe, value: "44", label: "Countries" },
  { icon: Star, value: "12,000+", label: "Verified Employers" },
  { icon: TrendingUp, value: "94%", label: "Placement Rate" },
];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [type, setType] = useState("All Types");
  const [country, setCountry] = useState("All Countries");
  const [experience, setExperience] = useState("All Levels");
  const [workMode, setWorkMode] = useState("All Modes");
  const [industry, setIndustry] = useState("All Industries");
  const [visaOnly, setVisaOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = jobs.filter(j => {
      const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchLocation = !location || j.city.toLowerCase().includes(location.toLowerCase()) ||
        j.country.toLowerCase().includes(location.toLowerCase());
      const matchCat = category === "All Categories" || j.category === category;
      const matchType = type === "All Types" || j.type === type;
      const matchCountry = country === "All Countries" || j.country === country;
      const matchExp = experience === "All Levels" || j.experience === experience;
      const matchMode = workMode === "All Modes" || j.workMode === workMode;
      const matchIndustry = industry === "All Industries" || j.industry === industry;
      const matchVisa = !visaOnly || j.visaSponsorship === true;
      return matchSearch && matchLocation && matchCat && matchType && matchCountry && matchExp && matchMode && matchIndustry && matchVisa;
    });
    if (sortBy === "salary-high") result = [...result].sort((a, b) => b.salaryMax - a.salaryMax);
    if (sortBy === "applicants") result = [...result].sort((a, b) => b.applicants - a.applicants);
    return result;
  }, [search, location, category, type, country, experience, workMode, industry, visaOnly, sortBy]);

  const activeFilters = [
    country !== "All Countries" && { key: "country", label: country },
    category !== "All Categories" && { key: "category", label: category },
    type !== "All Types" && { key: "type", label: type },
    experience !== "All Levels" && { key: "experience", label: experience },
    workMode !== "All Modes" && { key: "workMode", label: workMode },
    industry !== "All Industries" && { key: "industry", label: industry },
    visaOnly && { key: "visa", label: "Visa Sponsorship" },
  ].filter(Boolean) as { key: string; label: string }[];

  const clearFilter = (key: string) => {
    if (key === "country") setCountry("All Countries");
    if (key === "category") setCategory("All Categories");
    if (key === "type") setType("All Types");
    if (key === "experience") setExperience("All Levels");
    if (key === "workMode") setWorkMode("All Modes");
    if (key === "industry") setIndustry("All Industries");
    if (key === "visa") setVisaOnly(false);
  };

  const clearAll = () => {
    setSearch(""); setLocation(""); setCategory("All Categories"); setType("All Types");
    setCountry("All Countries"); setExperience("All Levels"); setWorkMode("All Modes");
    setIndustry("All Industries"); setVisaOnly(false);
  };

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="bg-navy-900 europium-pattern py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3">Jobs Marketplace</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
              Find Your Opportunity in Europe
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              48,000+ verified positions at Europe's top companies. Visa sponsorship available.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-3 flex flex-col md:flex-row gap-3 mb-6 shadow-premium-xl">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Job title, skill, company..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-navy-900 placeholder:text-gray-400 text-sm"
              />
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2 md:w-64">
              <MapPin size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Country or city..."
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="flex-1 bg-transparent outline-none text-navy-900 placeholder:text-gray-400 text-sm"
              />
            </div>
            <button className="btn-primary px-8 py-3 shrink-0">
              <Search size={16} /> Find Jobs
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <s.icon size={18} className="text-gold-400" />
                <div>
                  <div className="text-white font-bold text-sm">{s.value}</div>
                  <div className="text-white/50 text-xs">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`w-64 shrink-0 hidden lg:block`}>
            <div className="bg-white rounded-2xl border border-border/50 shadow-card p-5 sticky top-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-navy-900 flex items-center gap-2">
                  <Filter size={16} /> Filters
                </h3>
                {activeFilters.length > 0 && (
                  <button onClick={clearAll} className="text-xs text-royalblue-600 hover:underline">
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {/* Country */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Country</label>
                  <select value={country} onChange={e => setCountry(e.target.value)} className="input-premium text-sm py-2">
                    {countryList.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* Job Type */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Job Type</label>
                  <div className="space-y-1">
                    {jobTypes.slice(1).map(t => (
                      <button key={t} onClick={() => setType(type === t ? "All Types" : t)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all ${type === t ? "bg-navy-900 text-white" : "hover:bg-gray-50 text-gray-700"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Work Mode */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Work Mode</label>
                  <div className="space-y-1">
                    {["remote", "hybrid", "on-site"].map(m => (
                      <button key={m} onClick={() => setWorkMode(workMode === m ? "All Modes" : m)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all flex items-center gap-2 ${workMode === m ? "bg-navy-900 text-white" : "hover:bg-gray-50 text-gray-700"}`}>
                        {m === "remote" && <Wifi size={12} />}
                        {m === "hybrid" && <Globe size={12} />}
                        {m === "on-site" && <MapPin size={12} />}
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Experience</label>
                  <div className="space-y-1">
                    {experienceLevels.slice(1).map(l => (
                      <button key={l} onClick={() => setExperience(experience === l ? "All Levels" : l)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${experience === l ? "bg-navy-900 text-white" : "hover:bg-gray-50 text-gray-700"}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="input-premium text-sm py-2">
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* Visa Sponsorship */}
                <div className="flex items-center justify-between py-2 border-t border-border/50">
                  <div>
                    <p className="text-sm font-medium text-navy-900 flex items-center gap-1.5">
                      <Shield size={14} className="text-emerald-500" /> Visa Sponsorship
                    </p>
                    <p className="text-xs text-gray-500">Only show visa-sponsored roles</p>
                  </div>
                  <button
                    onClick={() => setVisaOnly(!visaOnly)}
                    className={`w-11 h-6 rounded-full transition-all duration-200 relative ${visaOnly ? "bg-emerald-500" : "bg-gray-200"}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 ${visaOnly ? "left-6" : "left-1"}`} />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filters Toggle */}
            <div className="lg:hidden mb-4">
              <button onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium text-navy-900 shadow-card">
                <SlidersHorizontal size={14} /> Filters
                {activeFilters.length > 0 && (
                  <span className="w-5 h-5 bg-navy-900 text-white rounded-full text-xs font-bold flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                )}
              </button>
            </div>

            {/* Results header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <span className="font-semibold text-navy-900">{filtered.length} jobs found</span>
                {activeFilters.length > 0 && (
                  <span className="text-gray-500 text-sm ml-2">with {activeFilters.length} filter{activeFilters.length > 1 ? "s" : ""}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {activeFilters.map(f => (
                  <span key={f.key} className="flex items-center gap-1.5 tag tag-blue">
                    {f.label}
                    <button onClick={() => clearFilter(f.key)} className="hover:text-red-500 ml-0.5">
                      <X size={10} />
                    </button>
                  </span>
                ))}
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-premium text-sm py-2 w-auto">
                  <option value="recent">Most Recent</option>
                  <option value="salary-high">Highest Salary</option>
                  <option value="applicants">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Featured Banner */}
            {filtered.some(j => j.visaSponsorship) && (
              <div className="bg-gradient-to-r from-emerald-50 to-royalblue-50 border border-emerald-200 rounded-xl p-3 mb-5 flex items-center gap-3">
                <Shield size={16} className="text-emerald-500 shrink-0" />
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-emerald-700">{filtered.filter(j => j.visaSponsorship).length} jobs</span> offer visa sponsorship in your search results.
                </p>
              </div>
            )}

            {filtered.length === 0 ? (
              <EmptyState
                title="No jobs found"
                description="Try broadening your search or clearing some filters."
                action={{ label: "Clear all filters", onClick: clearAll }}
                icon={<Briefcase size={28} className="text-gray-400" />}
              />
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filtered.map(job => <JobCard key={job.id} job={job} />)}
              </div>
            )}

            {filtered.length >= 4 && (
              <div className="text-center mt-10 py-8 border-t border-border/50">
                <p className="text-gray-500 text-sm mb-3">Showing {filtered.length} of 48,000+ positions</p>
                <button className="btn-outline">Load More Jobs</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
