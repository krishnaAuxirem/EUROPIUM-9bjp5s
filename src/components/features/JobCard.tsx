import { Link } from "react-router-dom";
import { MapPin, Briefcase, Bookmark, Star, BadgeCheck, Wifi, Globe, Shield } from "lucide-react";
import type { Job } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import { toINR } from "@/lib/mockData";

interface JobCardProps {
  job: Job;
  compact?: boolean;
}

export default function JobCard({ job, compact }: JobCardProps) {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { success, info } = useToast();
  const isSaved = user?.savedJobs.includes(job.id) ?? false;
  const hasApplied = user?.jobApplications?.some(a => a.jobId === job.id) ?? false;

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { info("Please login to save"); return; }
    const savedJobs = isSaved
      ? (user?.savedJobs ?? []).filter(id => id !== job.id)
      : [...(user?.savedJobs ?? []), job.id];
    updateUser({ savedJobs });
    success(isSaved ? "Removed from saved" : "Job saved!");
  };

  const inrMin = toINR(job.salaryMin, job.currency);
  const inrMax = toINR(job.salaryMax, job.currency);

  if (compact) {
    return (
      <Link to={`/jobs/${job.id}`} className="block group">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-border/50">
          <div className={`w-9 h-9 rounded-xl ${job.logo} flex items-center justify-center shrink-0`}>
            <Briefcase size={14} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-navy-900 text-sm group-hover:text-royalblue-600 transition-colors truncate">{job.title}</p>
            <p className="text-xs text-gray-500 truncate">{job.company} · {job.city}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-semibold text-navy-900">{job.salary.split("–")[0].trim()}+</p>
            <p className="text-xs text-emerald-600">{inrMin}+/yr</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/jobs/${job.id}`} className="block group">
      <div className="card-premium p-5">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className={`w-12 h-12 rounded-xl ${job.logo} flex items-center justify-center shrink-0 shadow-card`}>
            <Briefcase size={20} className="text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                {/* Company + verified */}
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-sm text-gray-500">{job.company}</span>
                  {job.verified && <BadgeCheck size={13} className="text-royalblue-500" />}
                  {job.featured && <span className="tag tag-gold text-xs ml-1">Featured</span>}
                </div>
                {/* Title */}
                <h3 className="font-semibold text-navy-900 group-hover:text-royalblue-600 transition-colors leading-snug">
                  {job.title}
                </h3>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className={`shrink-0 p-1.5 rounded-lg transition-all duration-200 ${isSaved ? "text-gold-500 bg-gold-50" : "text-gray-400 hover:text-gold-500"}`}
              >
                <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Location & Work Mode */}
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={11} />{job.city}, {job.country}</span>
              {job.workMode === "remote" && (
                <span className="flex items-center gap-1 text-emerald-600 font-medium"><Wifi size={11} />Remote</span>
              )}
              {job.workMode === "hybrid" && (
                <span className="flex items-center gap-1 text-royalblue-600 font-medium"><Globe size={11} />Hybrid</span>
              )}
              {job.visaSponsorship && (
                <span className="flex items-center gap-1 text-emerald-600 font-medium"><Shield size={11} />Visa Sponsored</span>
              )}
              <span className="text-gray-400">{job.posted}</span>
            </div>

            {/* Salary */}
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-bold text-navy-900 text-sm">{job.salary}</span>
              <span className="text-xs text-emerald-600 font-semibold">≈ {inrMin} – {inrMax}/yr</span>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className="tag tag-navy capitalize text-xs">{job.type}</span>
              <span className="tag tag-gray text-xs">{job.experience}</span>
              {job.tags.slice(0, 3).map(t => (
                <span key={t} className="tag tag-blue text-xs">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/40">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Star size={11} className="fill-gold-400 text-gold-400" />
              {job.applicants} applicants
            </span>
            {hasApplied && (
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                ✓ Applied
              </span>
            )}
          </div>
          <span className="text-xs text-royalblue-600 font-semibold group-hover:text-royalblue-700">
            View Job →
          </span>
        </div>
      </div>
    </Link>
  );
}
