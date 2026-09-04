import { useState } from "react";
import {
  Briefcase, Users, BarChart3, PlusCircle, Building2, CheckCircle,
  Eye, Edit2, Trash2, Send, Clock, TrendingUp, Star, Shield,
  MapPin, Globe, DollarSign, X, ChevronRight, BadgeCheck, Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { jobs } from "@/lib/mockData";

const JOB_FORM_DEFAULTS = {
  title: "", description: "", location: "", city: "", country: "Germany",
  salary: "", salaryMin: "", salaryMax: "", currency: "EUR",
  type: "full-time", workMode: "hybrid", experience: "Mid",
  visaSponsorship: false, skills: "", benefits: "",
};

const COUNTRIES = ["Germany", "Netherlands", "France", "Sweden", "Portugal", "Spain", "Switzerland", "Denmark", "Austria", "Norway"];
const WORK_TYPES = ["full-time", "part-time", "contract"];
const WORK_MODES = ["remote", "hybrid", "on-site"];
const EXPERIENCE_LEVELS = ["Junior", "Mid", "Senior", "Lead", "Executive"];

const COMPANY_PROFILE = {
  name: "EUROPIUM GmbH", industry: "Technology", country: "Germany", city: "Berlin",
  founded: "2022", size: "50–200 employees", website: "europium.eu",
  description: "EUROPIUM connects talent with opportunities across 44 European countries.",
  verified: true, rating: 4.7, openRoles: 8,
};

const MOCK_CANDIDATES = [
  { id: "c1", name: "Priya Sharma", role: "Senior Software Engineer", country: "India", exp: "6 years", skills: ["React", "Node.js", "AWS"], match: 96, status: "reviewing" },
  { id: "c2", name: "Carlos Mendoza", role: "UX Designer", country: "Mexico", exp: "4 years", skills: ["Figma", "UX Research"], match: 88, status: "interview" },
  { id: "c3", name: "Aisha Okonkwo", role: "Data Scientist", country: "Nigeria", exp: "5 years", skills: ["Python", "ML", "SQL"], match: 92, status: "screening" },
  { id: "c4", name: "Rohan Patel", role: "Product Manager", country: "India", exp: "7 years", skills: ["Agile", "Analytics", "SaaS"], match: 85, status: "offer" },
];

const statusColors: Record<string, string> = {
  reviewing: "bg-gray-100 text-gray-700",
  screening: "bg-gold-100 text-gold-700",
  interview: "bg-royalblue-100 text-royalblue-700",
  offer: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default function EmployerDashboardPage() {
  const { success, info } = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "post-job" | "jobs" | "candidates" | "analytics">("overview");
  const [form, setForm] = useState(JOB_FORM_DEFAULTS);
  const [postedJobs, setPostedJobs] = useState(jobs.slice(0, 3));
  const [editingJob, setEditingJob] = useState<string | null>(null);

  const handleFormChange = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePostJob = () => {
    if (!form.title || !form.description || !form.city) {
      info("Please fill in title, description, and location");
      return;
    }
    success("Job posted successfully! Your listing is now live.");
    setForm(JOB_FORM_DEFAULTS);
    setActiveTab("jobs");
  };

  const handleDeleteJob = (id: string) => {
    setPostedJobs(prev => prev.filter(j => j.id !== id));
    success("Job listing removed");
  };

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="bg-navy-900 py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #D4A72C 0%, transparent 50%)" }} />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-center">
                <Building2 size={28} className="text-gold-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-3xl font-bold text-white">{COMPANY_PROFILE.name}</h1>
                  {COMPANY_PROFILE.verified && <BadgeCheck size={20} className="text-royalblue-400" />}
                </div>
                <p className="text-white/60 mt-1">{COMPANY_PROFILE.industry} · {COMPANY_PROFILE.city}, {COMPANY_PROFILE.country}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-white/50 text-xs">Account Status</p>
                <span className="text-emerald-400 font-semibold text-sm">✓ Verified Employer</span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Active Jobs", value: postedJobs.length, icon: Briefcase, color: "text-royalblue-400" },
              { label: "Applications", value: "247", icon: Users, color: "text-gold-400" },
              { label: "Profile Views", value: "1,840", icon: Eye, color: "text-emerald-400" },
              { label: "Avg Match Score", value: "91%", icon: Star, color: "text-gold-400" },
            ].map(s => (
              <div key={s.label} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <s.icon size={20} className={`${s.color} mb-2`} />
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab nav */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-8 overflow-x-auto scrollbar-hide w-fit">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "post-job", label: "Post Job", icon: PlusCircle },
            { id: "jobs", label: "My Jobs", icon: Briefcase },
            { id: "candidates", label: "Candidates", icon: Users },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id ? "bg-white text-navy-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Company Profile Card */}
              <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-xl font-bold text-navy-900">Company Profile</h2>
                  <button className="btn-secondary text-sm px-4">
                    <Edit2 size={13} /> Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  {[
                    { label: "Industry", value: COMPANY_PROFILE.industry },
                    { label: "Company Size", value: COMPANY_PROFILE.size },
                    { label: "Founded", value: COMPANY_PROFILE.founded },
                    { label: "Website", value: COMPANY_PROFILE.website },
                    { label: "HQ Location", value: `${COMPANY_PROFILE.city}, ${COMPANY_PROFILE.country}` },
                    { label: "Open Roles", value: String(COMPANY_PROFILE.openRoles) },
                  ].map(d => (
                    <div key={d.label} className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-gray-500">{d.label}</span>
                      <span className="font-semibold text-navy-900">{d.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{COMPANY_PROFILE.description}</p>
                {COMPANY_PROFILE.verified && (
                  <div className="flex items-center gap-2 mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <Shield size={14} className="text-emerald-600" />
                    <p className="text-emerald-700 text-sm font-semibold">Verified Employer · ID and registration confirmed</p>
                  </div>
                )}
              </div>

              {/* Recent Applications */}
              <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-xl font-bold text-navy-900">Recent Candidates</h2>
                  <button onClick={() => setActiveTab("candidates")} className="text-sm text-royalblue-600 hover:underline flex items-center gap-1">
                    View all <ChevronRight size={13} />
                  </button>
                </div>
                <div className="space-y-3">
                  {MOCK_CANDIDATES.slice(0, 3).map(c => (
                    <div key={c.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {c.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-navy-900 text-sm">{c.name}</p>
                        <p className="text-xs text-gray-500">{c.role} · {c.country}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold text-sm">{c.match}%</span>
                        <span className={`tag text-xs ${statusColors[c.status]}`}>{c.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="card-premium p-5">
                <h3 className="font-semibold text-navy-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button onClick={() => setActiveTab("post-job")} className="btn-primary w-full justify-center">
                    <PlusCircle size={14} /> Post New Job
                  </button>
                  <button onClick={() => setActiveTab("candidates")} className="btn-secondary w-full justify-center">
                    <Users size={14} /> Search Candidates
                  </button>
                  <Link to="/ai-advisor" className="flex items-center gap-2 justify-center w-full py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-navy-400 transition-all">
                    <Sparkles size={14} /> AI Hiring Advisor
                  </Link>
                </div>
              </div>
              <div className="card-premium p-5">
                <h3 className="font-semibold text-navy-900 mb-3 text-sm">Active Jobs</h3>
                <div className="space-y-2">
                  {postedJobs.map(j => (
                    <div key={j.id} className="flex items-start justify-between gap-2 py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-navy-900 leading-tight">{j.title}</p>
                        <p className="text-xs text-gray-400">{j.applicants} applicants</p>
                      </div>
                      <span className="tag bg-emerald-100 text-emerald-700 text-xs shrink-0">Active</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POST JOB */}
        {activeTab === "post-job" && (
          <div className="max-w-3xl">
            <div className="card-premium p-8">
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">Post a New Job</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title *</label>
                  <input type="text" value={form.title} onChange={e => handleFormChange("title", e.target.value)} className="input-premium" placeholder="e.g. Senior Software Engineer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Description *</label>
                  <textarea value={form.description} onChange={e => handleFormChange("description", e.target.value)} rows={5} className="input-premium resize-none" placeholder="Describe the role, team, and impact..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                    <select value={form.country} onChange={e => handleFormChange("country", e.target.value)} className="input-premium">
                      {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                    <input type="text" value={form.city} onChange={e => handleFormChange("city", e.target.value)} className="input-premium" placeholder="e.g. Berlin" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Salary Min</label>
                    <input type="number" value={form.salaryMin} onChange={e => handleFormChange("salaryMin", e.target.value)} className="input-premium" placeholder="60000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Salary Max</label>
                    <input type="number" value={form.salaryMax} onChange={e => handleFormChange("salaryMax", e.target.value)} className="input-premium" placeholder="90000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
                    <select value={form.currency} onChange={e => handleFormChange("currency", e.target.value)} className="input-premium">
                      {["EUR", "CHF", "SEK", "DKK", "NOK"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Type</label>
                    <select value={form.type} onChange={e => handleFormChange("type", e.target.value)} className="input-premium">
                      {WORK_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Work Mode</label>
                    <select value={form.workMode} onChange={e => handleFormChange("workMode", e.target.value)} className="input-premium">
                      {WORK_MODES.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience Level</label>
                    <select value={form.experience} onChange={e => handleFormChange("experience", e.target.value)} className="input-premium">
                      {EXPERIENCE_LEVELS.map(e => <option key={e}>{e}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Required Skills (comma-separated)</label>
                  <input type="text" value={form.skills} onChange={e => handleFormChange("skills", e.target.value)} className="input-premium" placeholder="React, TypeScript, Node.js, AWS" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Benefits (comma-separated)</label>
                  <input type="text" value={form.benefits} onChange={e => handleFormChange("benefits", e.target.value)} className="input-premium" placeholder="Health insurance, Remote work, Stock options" />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.visaSponsorship} onChange={e => handleFormChange("visaSponsorship", e.target.checked)} className="w-4 h-4 accent-navy-900" />
                  <span className="text-sm font-medium text-gray-700">Offer visa sponsorship for international candidates</span>
                </label>
                <button onClick={handlePostJob} className="btn-gold w-full justify-center py-4 text-base">
                  <Send size={16} /> Post Job Listing
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MY JOBS */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-navy-900">Active Job Listings</h2>
              <button onClick={() => setActiveTab("post-job")} className="btn-primary">
                <PlusCircle size={14} /> Post New Job
              </button>
            </div>
            {postedJobs.map(job => (
              <div key={job.id} className="card-premium p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-navy-900">{job.title}</h3>
                      <span className="tag bg-emerald-100 text-emerald-700 text-xs">Active</span>
                      {job.featured && <span className="tag bg-gold-100 text-gold-700 text-xs">Featured</span>}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{job.company} · {job.city}, {job.country} · {job.type}</p>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{job.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Users size={13} />{job.applicants} applicants</span>
                      <span className="flex items-center gap-1"><Clock size={13} />Posted {job.posted}</span>
                      <span className="flex items-center gap-1"><Eye size={13} />{job.applicants * 8} views</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link to={`/jobs/${job.id}`} className="p-2 border border-gray-200 rounded-xl hover:border-navy-400 transition-all" title="View listing">
                      <Eye size={16} className="text-gray-500" />
                    </Link>
                    <button className="p-2 border border-gray-200 rounded-xl hover:border-royalblue-400 transition-all" title="Edit">
                      <Edit2 size={16} className="text-gray-500" />
                    </button>
                    <button onClick={() => handleDeleteJob(job.id)} className="p-2 border border-gray-200 rounded-xl hover:border-red-400 hover:text-red-500 transition-all" title="Delete">
                      <Trash2 size={16} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {postedJobs.length === 0 && (
              <div className="card-premium p-16 text-center">
                <Briefcase size={48} className="text-gray-200 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-navy-900 mb-2">No active job listings</h3>
                <p className="text-gray-400 mb-4">Post your first job to start receiving applications.</p>
                <button onClick={() => setActiveTab("post-job")} className="btn-primary">Post a Job</button>
              </div>
            )}
          </div>
        )}

        {/* CANDIDATES */}
        {activeTab === "candidates" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Candidate Pipeline</h2>
              <p className="text-gray-500 text-sm">Manage applications and search for matching candidates.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Reviewing", count: 12, color: "bg-gray-100 text-gray-700" },
                { label: "Screening", count: 8, color: "bg-gold-100 text-gold-700" },
                { label: "Interviewing", count: 5, color: "bg-royalblue-100 text-royalblue-700" },
                { label: "Offer Stage", count: 2, color: "bg-emerald-100 text-emerald-700" },
              ].map(s => (
                <div key={s.label} className="card-premium p-4 text-center">
                  <p className="text-3xl font-bold text-navy-900">{s.count}</p>
                  <span className={`tag text-xs mt-2 ${s.color}`}>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {MOCK_CANDIDATES.map(c => (
                <div key={c.id} className="card-premium p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center text-white font-bold shrink-0">
                      {c.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-semibold text-navy-900">{c.name}</h3>
                        <span className={`tag text-xs ${statusColors[c.status]}`}>{c.status}</span>
                      </div>
                      <p className="text-sm text-gray-500">{c.role} · {c.exp} · {c.country}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {c.skills.map(s => <span key={s} className="tag tag-navy text-xs">{s}</span>)}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-emerald-600">{c.match}%</p>
                        <p className="text-xs text-gray-400">match</p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <button className="px-3 py-1.5 bg-royalblue-600 text-white text-xs font-semibold rounded-xl hover:bg-royalblue-700 transition-all">
                          Schedule Interview
                        </button>
                        <button className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:border-navy-400 transition-all">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-navy-900">Hiring Analytics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Applications", value: "247", change: "+23% vs last month" },
                { label: "Avg Time to Hire", value: "24 days", change: "-3 days vs last month" },
                { label: "Offer Acceptance", value: "78%", change: "+5% vs last month" },
                { label: "Job View to Apply", value: "12%", change: "+2% vs last month" },
              ].map(m => (
                <div key={m.label} className="card-premium p-5">
                  <p className="text-3xl font-bold text-navy-900 font-serif">{m.value}</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{m.label}</p>
                  <p className="text-xs text-emerald-600 mt-1">{m.change}</p>
                </div>
              ))}
            </div>
            <div className="card-premium p-6">
              <h3 className="font-serif text-lg font-bold text-navy-900 mb-4">Applications by Source</h3>
              <div className="space-y-3">
                {[
                  { source: "EUROPIUM Search", pct: 52, count: 128 },
                  { source: "Direct Applications", pct: 28, count: 69 },
                  { source: "Job Alerts", pct: 12, count: 30 },
                  { source: "Company Profile", pct: 8, count: 20 },
                ].map(s => (
                  <div key={s.source} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-44 shrink-0">{s.source}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-royalblue-500 rounded-full" style={{ width: `${s.pct}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-navy-900 w-10 text-right">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
