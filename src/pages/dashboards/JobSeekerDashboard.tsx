import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase, FileText, Star, Bell, Sparkles, TrendingUp,
  CheckCircle, Clock, MapPin, Upload, Plus, Target, Award
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { jobs, toINR } from "@/lib/mockData";
import DashboardLayout from "./DashboardLayout";

const SIDEBAR_ITEMS = [
  { icon: Target, label: "Overview", tab: "overview" },
  { icon: Briefcase, label: "Recommended Jobs", tab: "jobs" },
  { icon: Star, label: "Saved Jobs", tab: "saved" },
  { icon: FileText, label: "Applications", tab: "applications" },
  { icon: Clock, label: "Interviews", tab: "interviews" },
  { icon: Award, label: "Offers", tab: "offers" },
  { icon: Upload, label: "My Resume", tab: "resume" },
  { icon: Bell, label: "Career Alerts", tab: "alerts" },
  { icon: Sparkles, label: "AI Career Advisor", tab: "ai" },
];

export default function JobSeekerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const applications = user?.jobApplications || [];
  const savedJobsList = jobs.filter(j => user?.savedJobs?.includes(j.id));
  const recommendedJobs = jobs.filter(j => !user?.savedJobs?.includes(j.id)).slice(0, 5);

  const appStats = {
    applied: applications.filter(a => a.status === "applied").length,
    screening: applications.filter(a => a.status === "screening").length,
    interview: applications.filter(a => a.status === "interview").length,
    offer: applications.filter(a => a.status === "offer").length,
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
      default:
        return (
          <div className="space-y-6">
            {/* Profile completeness banner */}
            {(user?.profileCompleteness || 0) < 80 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4">
                <div className="text-2xl">⚠️</div>
                <div className="flex-1">
                  <p className="font-semibold text-amber-800 text-sm">Complete your profile to get better job matches</p>
                  <p className="text-xs text-amber-600">Your profile is {user?.profileCompleteness}% complete</p>
                  <div className="h-1.5 bg-amber-200 rounded-full mt-2">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${user?.profileCompleteness}%` }} />
                  </div>
                </div>
                <Link to="/profile" className="btn-secondary text-sm py-2 px-3">Complete</Link>
              </div>
            )}

            {/* Welcome */}
            <div className="bg-gradient-to-r from-navy-900 to-royalblue-700 rounded-2xl p-6 text-white">
              <p className="text-white/70 text-sm mb-1">Hello, {user?.name?.split(" ")[0]}! 💼</p>
              <h2 className="font-serif text-2xl font-bold mb-2">Your Career Journey</h2>
              <p className="text-white/70 text-sm">{jobs.length} job listings across Europe matching your profile</p>
              <Link to="/jobs" className="btn-gold mt-4 text-sm inline-flex">
                <Plus size={14} /> Explore Jobs
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { n: String(applications.length || 0), l: "Total Applications", icon: "📝" },
                { n: String(appStats.screening || 0), l: "In Screening", icon: "🔍" },
                { n: String(appStats.interview || 0), l: "Interviews", icon: "🎯" },
                { n: String(savedJobsList.length), l: "Saved Jobs", icon: "⭐" },
              ].map(s => (
                <div key={s.l} className="card-premium p-4 text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="font-bold text-2xl text-navy-900 font-serif">{s.n}</p>
                  <p className="text-xs text-gray-500">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Application Pipeline */}
            <div className="card-premium p-6">
              <h3 className="font-semibold text-navy-900 mb-4">Application Pipeline</h3>
              <div className="flex items-center gap-1 mb-4">
                {[
                  { label: "Applied", count: appStats.applied || 2, color: "bg-royalblue-500" },
                  { label: "Screening", count: appStats.screening || 1, color: "bg-amber-500" },
                  { label: "Interview", count: appStats.interview || 0, color: "bg-emerald-500" },
                  { label: "Offer", count: appStats.offer || 0, color: "bg-gold-500" },
                ].map((stage, i) => (
                  <div key={stage.label} className="flex-1">
                    <div className={`h-2 ${stage.color} ${i === 0 ? "rounded-l-full" : ""} ${i === 3 ? "rounded-r-full" : ""}`} />
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">{stage.label}</p>
                      <p className="text-xs font-bold text-navy-900">{stage.count}</p>
                    </div>
                  </div>
                ))}
              </div>
              {applications.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No applications yet. Start applying!</p>
              )}
              {applications.slice(0, 3).map(app => (
                <div key={app.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {app.company.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy-900">{app.jobTitle}</p>
                    <p className="text-xs text-gray-500">{app.company}</p>
                  </div>
                  <span className={`tag text-xs capitalize ${
                    app.status === "interview" ? "bg-emerald-100 text-emerald-700" :
                    app.status === "offer" ? "bg-gold-100 text-gold-700" :
                    app.status === "rejected" ? "bg-red-100 text-red-700" :
                    "bg-royalblue-100 text-royalblue-700"
                  }`}>{app.status}</span>
                </div>
              ))}
              <Link to="/applications" className="text-sm text-royalblue-600 hover:underline mt-3 block">View all applications →</Link>
            </div>

            {/* Recommended Jobs */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">Recommended for You</h3>
                <Link to="/jobs" className="text-sm text-royalblue-600 hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {recommendedJobs.map(job => (
                  <Link key={job.id} to={`/jobs/${job.id}`} className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-royalblue-50 rounded-xl transition-colors group">
                    <div className={`w-10 h-10 rounded-xl ${job.logo} flex items-center justify-center shrink-0`}>
                      <Briefcase size={16} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy-900 text-sm group-hover:text-royalblue-600 truncate">{job.title}</p>
                      <p className="text-xs text-gray-500">{job.company} · {job.city}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold text-navy-900">{job.salary.split("–")[0].trim()}+</p>
                      <p className="text-xs text-emerald-600">{toINR(job.salaryMin, job.currency)}+</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI */}
            <div className="bg-navy-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-gold-400" />
                <h3 className="font-semibold">AI Career Advisor</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">Get resume review, interview tips, and salary negotiation advice.</p>
              <Link to="/ai-advisor" className="btn-gold text-sm">Get Career Advice</Link>
            </div>
          </div>
        );

      case "jobs":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-navy-900">Recommended Jobs</h2>
              <Link to="/jobs" className="btn-primary text-sm">Browse All</Link>
            </div>
            {jobs.map(job => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="card-premium p-4 block">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${job.logo} rounded-xl flex items-center justify-center shrink-0`}>
                    <Briefcase size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-navy-900">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.company} · {job.city}, {job.country}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-navy-900 text-sm">{job.salary}</p>
                        <p className="text-xs text-emerald-600">{toINR(job.salaryMin, job.currency)}+</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="tag tag-blue text-xs">{job.type}</span>
                      <span className="tag tag-navy text-xs">{job.experience}</span>
                      {job.visaSponsorship && <span className="tag tag-green text-xs">Visa Sponsored</span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        );

      case "applications":
        return (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-navy-900">My Applications</h2>
            {applications.length === 0 ? (
              <div className="card-premium p-12 text-center">
                <FileText size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="font-semibold text-gray-600 mb-1">No applications yet</p>
                <p className="text-gray-400 text-sm mb-4">Start applying to jobs across Europe</p>
                <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
              </div>
            ) : (
              applications.map(app => (
                <div key={app.id} className="card-premium p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-navy-900">{app.jobTitle}</h3>
                      <p className="text-sm text-gray-500">{app.company} · {app.country}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Applied: {app.appliedDate}</p>
                    </div>
                    <span className={`tag text-xs capitalize ${
                      app.status === "interview" ? "bg-emerald-100 text-emerald-700" :
                      app.status === "offer" ? "bg-gold-100 text-gold-700" :
                      app.status === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-royalblue-100 text-royalblue-700"
                    }`}>{app.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case "ai":
        return (
          <div className="card-premium p-8 text-center">
            <Sparkles size={48} className="text-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">AI Career Advisor</h2>
            <p className="text-gray-500 mb-6">Resume optimization, interview prep, salary benchmarking, and career path guidance.</p>
            <Link to="/ai-advisor" className="btn-gold">Open AI Advisor</Link>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      sidebarItems={SIDEBAR_ITEMS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title="Job Seeker Dashboard"
      subtitle="Your career hub for European opportunities"
      role="job_seeker"
      roleEmoji="💼"
    >
      {renderContent()}
    </DashboardLayout>
  );
}
