import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Briefcase, GraduationCap, ArrowRight, Clock, CheckCircle,
  XCircle, MapPin, Building2, Calendar, ChevronRight, Sparkles,
  Plus, TrendingUp
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import type { JobApplication, UniversityApplication } from "@/types";

// Job Application Stages
const JOB_STAGES: { key: JobApplication["status"]; label: string; color: string; bg: string }[] = [
  { key: "saved", label: "Saved", color: "text-gray-600", bg: "bg-gray-100" },
  { key: "applied", label: "Applied", color: "text-royalblue-600", bg: "bg-royalblue-100" },
  { key: "screening", label: "Screening", color: "text-purple-600", bg: "bg-purple-100" },
  { key: "interview", label: "Interview", color: "text-gold-600", bg: "bg-gold-100" },
  { key: "offer", label: "Offer", color: "text-emerald-600", bg: "bg-emerald-100" },
  { key: "accepted", label: "Accepted", color: "text-emerald-700", bg: "bg-emerald-200" },
  { key: "rejected", label: "Rejected", color: "text-red-600", bg: "bg-red-100" },
];

// University Application Stages
const UNI_STAGES: { key: UniversityApplication["status"]; label: string; color: string; bg: string }[] = [
  { key: "saved", label: "Saved", color: "text-gray-600", bg: "bg-gray-100" },
  { key: "preparing", label: "Preparing", color: "text-blue-600", bg: "bg-blue-100" },
  { key: "documents", label: "Documents", color: "text-purple-600", bg: "bg-purple-100" },
  { key: "submitted", label: "Submitted", color: "text-royalblue-600", bg: "bg-royalblue-100" },
  { key: "under_review", label: "Under Review", color: "text-gold-600", bg: "bg-gold-100" },
  { key: "accepted", label: "Accepted", color: "text-emerald-700", bg: "bg-emerald-200" },
  { key: "rejected", label: "Rejected", color: "text-red-600", bg: "bg-red-100" },
];

type TabType = "jobs" | "universities";

export default function ApplicationTrackerPage() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabType>("jobs");

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please login to view your applications.</p>
          <button onClick={() => navigate("/login")} className="btn-primary">Login</button>
        </div>
      </div>
    );
  }

  const jobApplications = user.jobApplications ?? [];
  const uniApplications = user.universityApplications ?? [];

  const updateJobStatus = (id: string, status: JobApplication["status"]) => {
    const updated = jobApplications.map(a => a.id === id ? { ...a, status } : a);
    updateUser({ jobApplications: updated });
  };

  const updateUniStatus = (id: string, status: UniversityApplication["status"]) => {
    const updated = uniApplications.map(a => a.id === id ? { ...a, status } : a);
    updateUser({ universityApplications: updated });
  };

  return (
    <div className="page-container">
      <section className="bg-navy-900 py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Application Tracker</span>
              <h1 className="font-serif text-3xl font-bold text-white mt-1">Track Your Applications</h1>
              <p className="text-white/60 mt-1">Monitor your job and university application journey.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/jobs" className="btn-secondary text-sm">
                <Briefcase size={14} /> Find Jobs
              </Link>
              <Link to="/education" className="btn-gold text-sm">
                <GraduationCap size={14} /> Find Universities
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6">
            {([
              { key: "jobs" as TabType, label: "Job Applications", count: jobApplications.length, icon: Briefcase },
              { key: "universities" as TabType, label: "University Applications", count: uniApplications.length, icon: GraduationCap },
            ]).map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t.key ? "bg-white text-navy-900" : "bg-white/10 text-white hover:bg-white/20"}`}>
                <t.icon size={14} />
                {t.label}
                <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${tab === t.key ? "bg-navy-900 text-white" : "bg-white/20 text-white"}`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {tab === "jobs" && (
          <div>
            {jobApplications.length === 0 ? (
              <div className="text-center py-20">
                <Briefcase size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-navy-900 text-lg mb-2">No Job Applications Yet</h3>
                <p className="text-gray-500 text-sm mb-6">Apply to jobs and track your progress here.</p>
                <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
              </div>
            ) : (
              <div>
                {/* Stage Summary */}
                <div className="grid grid-cols-3 md:grid-cols-7 gap-3 mb-8">
                  {JOB_STAGES.map(stage => {
                    const count = jobApplications.filter(a => a.status === stage.key).length;
                    return (
                      <div key={stage.key} className={`text-center p-3 rounded-xl ${stage.bg} border border-white/50`}>
                        <div className={`text-2xl font-bold font-serif ${stage.color}`}>{count}</div>
                        <div className={`text-xs font-medium mt-0.5 ${stage.color}`}>{stage.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Kanban */}
                <div className="space-y-4">
                  {JOB_STAGES.filter(s => s.key !== "rejected").map(stage => {
                    const apps = jobApplications.filter(a => a.status === stage.key);
                    if (apps.length === 0) return null;
                    return (
                      <div key={stage.key}>
                        <h3 className={`font-semibold text-sm mb-3 flex items-center gap-2 ${stage.color}`}>
                          <span className={`w-2 h-2 rounded-full ${stage.bg.replace("bg-", "bg-").replace("-100", "-500").replace("-200", "-600")}`} />
                          {stage.label} ({apps.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {apps.map(app => (
                            <JobAppCard key={app.id} app={app} onStatusChange={updateJobStatus} />
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Rejected */}
                  {jobApplications.filter(a => a.status === "rejected").length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-red-600">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        Rejected ({jobApplications.filter(a => a.status === "rejected").length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-60">
                        {jobApplications.filter(a => a.status === "rejected").map(app => (
                          <JobAppCard key={app.id} app={app} onStatusChange={updateJobStatus} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "universities" && (
          <div>
            {uniApplications.length === 0 ? (
              <div className="text-center py-20">
                <GraduationCap size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-navy-900 text-lg mb-2">No University Applications Yet</h3>
                <p className="text-gray-500 text-sm mb-6">Apply to universities and track your admission journey.</p>
                <Link to="/education" className="btn-primary">Browse Universities</Link>
              </div>
            ) : (
              <div>
                {/* Stage Summary */}
                <div className="grid grid-cols-3 md:grid-cols-7 gap-3 mb-8">
                  {UNI_STAGES.map(stage => {
                    const count = uniApplications.filter(a => a.status === stage.key).length;
                    return (
                      <div key={stage.key} className={`text-center p-3 rounded-xl ${stage.bg}`}>
                        <div className={`text-2xl font-bold font-serif ${stage.color}`}>{count}</div>
                        <div className={`text-xs font-medium mt-0.5 ${stage.color}`}>{stage.label.replace("_", " ")}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uniApplications.map(app => (
                    <UniAppCard key={app.id} app={app} onStatusChange={updateUniStatus} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function JobAppCard({ app, onStatusChange }: {
  app: JobApplication;
  onStatusChange: (id: string, status: JobApplication["status"]) => void;
}) {
  const stage = JOB_STAGES.find(s => s.key === app.status);
  return (
    <div className="card-premium p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-navy-900 flex items-center justify-center">
            <Building2 size={16} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-navy-900 text-sm">{app.company}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} />{app.country}</p>
          </div>
        </div>
        <span className={`tag text-xs ${stage?.bg} ${stage?.color}`}>{stage?.label}</span>
      </div>

      <p className="text-sm text-gray-700 font-medium mb-2 line-clamp-1">{app.jobTitle}</p>
      <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
        <Calendar size={10} />Applied: {app.appliedDate}
      </p>

      <div>
        <p className="text-xs text-gray-500 mb-1.5 font-medium">Update Status:</p>
        <select
          value={app.status}
          onChange={e => onStatusChange(app.id, e.target.value as JobApplication["status"])}
          className="w-full text-xs border border-border rounded-lg px-2.5 py-1.5 bg-white outline-none focus:ring-1 focus:ring-royalblue-400"
        >
          {JOB_STAGES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
      </div>

      <Link to={`/jobs/${app.jobId}`} className="mt-3 flex items-center gap-1 text-xs text-royalblue-600 hover:underline">
        View job <ChevronRight size={12} />
      </Link>
    </div>
  );
}

function UniAppCard({ app, onStatusChange }: {
  app: UniversityApplication;
  onStatusChange: (id: string, status: UniversityApplication["status"]) => void;
}) {
  const stage = UNI_STAGES.find(s => s.key === app.status);
  return (
    <div className="card-premium p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gold-500 flex items-center justify-center">
            <GraduationCap size={16} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-navy-900 text-sm line-clamp-1">{app.universityName}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} />{app.country}</p>
          </div>
        </div>
        <span className={`tag text-xs ${stage?.bg} ${stage?.color}`}>{stage?.label.replace("_", " ")}</span>
      </div>

      <p className="text-sm text-royalblue-700 font-medium mb-2 line-clamp-1">{app.program}</p>
      <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
        <Calendar size={10} />Applied: {app.appliedDate}
      </p>

      <div>
        <p className="text-xs text-gray-500 mb-1.5 font-medium">Update Status:</p>
        <select
          value={app.status}
          onChange={e => onStatusChange(app.id, e.target.value as UniversityApplication["status"])}
          className="w-full text-xs border border-border rounded-lg px-2.5 py-1.5 bg-white outline-none focus:ring-1 focus:ring-royalblue-400"
        >
          {UNI_STAGES.map(s => <option key={s.key} value={s.key}>{s.label.replace("_", " ")}</option>)}
        </select>
      </div>

      <Link to={`/education/${app.universityId}`} className="mt-3 flex items-center gap-1 text-xs text-royalblue-600 hover:underline">
        View university <ChevronRight size={12} />
      </Link>
    </div>
  );
}
