import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, MapPin, Briefcase, Star, Clock, Users, Shield, Wifi, Globe,
  CheckCircle, Bookmark, ExternalLink, Upload, Send, XCircle, Sparkles,
  Building2, ChevronRight, BadgeCheck, TrendingUp,
} from "lucide-react";
import { jobs, toINR } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import JobCard from "@/components/features/JobCard";
import type { JobApplication } from "@/types";

type AppStep = "idle" | "form" | "uploading" | "success";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();
  const { success, info, error } = useToast();

  const [appStep, setAppStep] = useState<AppStep>("idle");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeName, setResumeName] = useState("");

  const job = jobs.find(j => j.id === id);
  const isSaved = user?.savedJobs.includes(id ?? "") ?? false;
  const hasApplied = user?.jobApplications?.some(a => a.jobId === id) ?? false;
  const similarJobs = jobs.filter(j => j.id !== id && (j.category === job?.category || j.country === job?.country)).slice(0, 3);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Job Not Found</h2>
          <button onClick={() => navigate("/jobs")} className="btn-primary mt-4">Browse Jobs</button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!isAuthenticated) { info("Please login to save"); return; }
    const savedJobs = isSaved
      ? (user?.savedJobs ?? []).filter(x => x !== job.id)
      : [...(user?.savedJobs ?? []), job.id];
    updateUser({ savedJobs });
    success(isSaved ? "Removed from saved" : "Job saved!");
  };

  const handleApply = () => {
    if (!isAuthenticated) { info("Please login to apply"); navigate("/login"); return; }
    setAppStep("form");
  };

  const handleSubmit = async () => {
    if (!resumeName) { error("Please upload your resume"); return; }
    setAppStep("uploading");
    await new Promise(r => setTimeout(r, 1800));
    const application: JobApplication = {
      id: Date.now().toString(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      country: job.country,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "applied",
      notes: coverLetter
    };
    const jobApplications = [...(user?.jobApplications ?? []), application];
    updateUser({ jobApplications });
    setAppStep("success");
    success("Application submitted successfully!");
  };

  const inrMin = toINR(job.salaryMin, job.currency);
  const inrMax = toINR(job.salaryMax, job.currency);

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="bg-navy-900 py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/60 hover:text-white mb-6 text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Jobs
          </button>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className={`w-16 h-16 rounded-2xl ${job.logo} flex items-center justify-center shrink-0 shadow-premium`}>
              <Building2 size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-white mb-1">{job.title}</h1>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="font-semibold text-white">{job.company}</span>
                    {job.verified && <BadgeCheck size={14} className="text-royalblue-400" />}
                    <span className="text-white/40">·</span>
                    <MapPin size={12} />{job.city}, {job.country}
                    <span className="text-white/40">·</span>
                    <Clock size={12} />{job.posted}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleSave} className={`p-3 rounded-xl border transition-all ${isSaved ? "bg-gold-500 border-gold-500 text-white" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}`}>
                    <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
                  </button>
                  {!hasApplied ? (
                    <button onClick={handleApply} className="btn-gold px-6 py-3">
                      Apply Now
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-4 py-2.5 rounded-xl text-sm font-semibold">
                      <CheckCircle size={16} /> Applied
                    </div>
                  )}
                </div>
              </div>

              {/* Meta tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="tag bg-white/10 text-white capitalize">{job.type}</span>
                <span className={`tag capitalize ${job.workMode === "remote" ? "bg-emerald-500/20 text-emerald-300" : job.workMode === "hybrid" ? "bg-royalblue-500/20 text-royalblue-300" : "bg-gray-500/20 text-gray-300"}`}>
                  {job.workMode === "remote" && <Wifi size={10} />}
                  {job.workMode === "hybrid" && <Globe size={10} />}
                  {job.workMode === "on-site" && <MapPin size={10} />}
                  {job.workMode}
                </span>
                <span className="tag bg-white/10 text-white">{job.experience}</span>
                {job.visaSponsorship && (
                  <span className="tag bg-emerald-500/20 text-emerald-300">
                    <Shield size={10} /> Visa Sponsorship
                  </span>
                )}
                {job.featured && <span className="tag bg-gold-500/20 text-gold-300"><Star size={10} /> Featured</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Application Modal */}
            {appStep === "form" && (
              <div className="card-premium p-6 border-2 border-royalblue-200 animate-fade-in">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-serif text-xl font-bold text-navy-900">Apply for {job.title}</h2>
                  <button onClick={() => setAppStep("idle")} className="text-gray-400 hover:text-gray-600">
                    <XCircle size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resume / CV *</label>
                    <label className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${resumeName ? "border-emerald-400 bg-emerald-50" : "border-gray-300 hover:border-royalblue-400 hover:bg-royalblue-50"}`}>
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                        onChange={e => setResumeName(e.target.files?.[0]?.name ?? "")} />
                      {resumeName ? (
                        <>
                          <CheckCircle size={32} className="text-emerald-500 mb-2" />
                          <p className="text-emerald-700 font-medium text-sm">{resumeName}</p>
                          <p className="text-emerald-600 text-xs mt-1">Click to change</p>
                        </>
                      ) : (
                        <>
                          <Upload size={32} className="text-gray-400 mb-2" />
                          <p className="text-gray-600 font-medium text-sm">Upload Resume / CV</p>
                          <p className="text-gray-400 text-xs mt-1">PDF, DOC, DOCX · Max 10MB</p>
                        </>
                      )}
                    </label>
                  </div>
                  {/* Cover Letter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter <span className="text-gray-400">(optional)</span></label>
                    <textarea
                      value={coverLetter}
                      onChange={e => setCoverLetter(e.target.value)}
                      rows={5}
                      placeholder={`Why are you a great fit for ${job.title} at ${job.company}?`}
                      className="input-premium resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleSubmit} disabled={!resumeName} className="btn-primary flex-1 justify-center">
                      <Send size={16} /> Submit Application
                    </button>
                    <button onClick={() => setAppStep("idle")} className="btn-secondary px-4">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {appStep === "uploading" && (
              <div className="card-premium p-8 text-center animate-fade-in">
                <div className="w-14 h-14 border-4 border-royalblue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-semibold text-navy-900">Submitting your application...</p>
                <p className="text-gray-500 text-sm mt-1">Please wait</p>
              </div>
            )}

            {appStep === "success" && (
              <div className="card-premium p-8 text-center bg-emerald-50 border-emerald-200 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={36} className="text-emerald-500" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Application Submitted!</h2>
                <p className="text-gray-600 mb-1">You applied for <span className="font-semibold">{job.title}</span> at <span className="font-semibold">{job.company}</span></p>
                <p className="text-gray-500 text-sm mb-6">Track your application status in your dashboard.</p>
                <div className="flex justify-center gap-3">
                  <Link to="/dashboard" className="btn-primary">View Dashboard</Link>
                  <button onClick={() => setAppStep("idle")} className="btn-secondary">Back to Job</button>
                </div>
              </div>
            )}

            {/* Job Overview */}
            <div className="card-premium p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">About This Role</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {job.tags.map(t => <span key={t} className="tag tag-navy">{t}</span>)}
                {job.industry && <span className="tag tag-blue">{job.industry}</span>}
              </div>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="card-premium p-6">
                <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-royalblue-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-royalblue-600 font-bold text-xs">{i + 1}</span>
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            <div className="card-premium p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">Requirements & Skills</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.requirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-border/50">
                    <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                    <span className="text-sm text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="card-premium p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">Benefits & Perks</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {job.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-royalblue-50 border border-royalblue-100 rounded-xl">
                    <Star size={12} className="text-gold-500 shrink-0" />
                    <span className="text-sm text-navy-800 font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Jobs */}
            {similarJobs.length > 0 && (
              <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-xl font-bold text-navy-900">Similar Jobs</h2>
                  <Link to="/jobs" className="text-sm text-royalblue-600 hover:underline flex items-center gap-1">
                    View all <ChevronRight size={14} />
                  </Link>
                </div>
                <div className="space-y-3">
                  {similarJobs.map(j => <JobCard key={j.id} job={j} compact />)}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Salary */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-4">Compensation</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Annual Salary</p>
                  <p className="text-2xl font-bold text-navy-900 font-serif">{job.salary}</p>
                  <p className="text-sm text-emerald-600 font-semibold mt-1">
                    {inrMin} – {inrMax} /year
                  </p>
                </div>
                <div className="pt-3 border-t border-border/50 space-y-2 text-sm">
                  {[
                    { label: "Job Type", value: job.type },
                    { label: "Experience", value: `${job.experience} Level` },
                    { label: "Work Mode", value: job.workMode ?? "On-site" },
                    { label: "Category", value: job.category },
                    { label: "Applicants", value: `${job.applicants} applied` },
                    { label: "Deadline", value: job.deadline },
                  ].map(d => (
                    <div key={d.label} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-gray-500 capitalize">{d.label}</span>
                      <span className="font-semibold text-navy-900 capitalize">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Company */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-3">Company</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${job.logo} flex items-center justify-center`}>
                  <Building2 size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">{job.company}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={11} />{job.city}, {job.country}
                    {job.verified && <BadgeCheck size={12} className="text-royalblue-500 ml-1" />}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">Industry: <span className="font-medium text-navy-900">{job.industry ?? job.category}</span></p>
            </div>

            {/* Visa Info */}
            {job.visaSponsorship && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={16} className="text-emerald-600" />
                  <h3 className="font-semibold text-emerald-800 text-sm">Visa Sponsorship Available</h3>
                </div>
                <p className="text-emerald-700 text-xs leading-relaxed">
                  This employer sponsors work visas. International applicants from non-EU countries are welcome to apply.
                </p>
              </div>
            )}

            {/* AI Advisor CTA */}
            <div className="bg-navy-900 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-gold-400" />
                <h3 className="font-semibold">AI Career Advice</h3>
              </div>
              <p className="text-white/70 text-xs mb-4">Get personalized tips to stand out for this role.</p>
              <Link to="/ai-advisor" className="btn-gold w-full justify-center py-2.5 text-sm">
                Ask AI Advisor
              </Link>
            </div>

            {/* Apply CTA */}
            {appStep === "idle" && !hasApplied && (
              <button onClick={handleApply} className="btn-primary w-full justify-center py-4 text-base">
                <Send size={18} /> Apply Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
