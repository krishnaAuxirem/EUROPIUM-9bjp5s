import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Briefcase, GraduationCap, TrendingUp, MapPin, Star } from "lucide-react";
import { jobs, universities, opportunities } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toINR } from "@/lib/mockData";

/**
 * AIRecommendations - Shows personalized "Recommended for you" sections
 * Uses user profile to surface contextually relevant items
 */
export default function AIRecommendations() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) return null;

  // Simple matching logic based on user profile
  const profession = user.profession?.toLowerCase() ?? "";
  const isStudent = profession.includes("student") || profession.includes("graduate");
  const isEntrepreneur = profession.includes("founder") || profession.includes("entrepreneur") || profession.includes("ceo");
  const isTechWorker = profession.includes("engineer") || profession.includes("developer") || profession.includes("software");

  // Recommended jobs: exclude saved, match by user's country preference or profession
  const recommendedJobs = jobs
    .filter(j => !user.savedJobs.includes(j.id) && !user.jobApplications?.some(a => a.jobId === j.id))
    .slice(0, 4);

  // Recommended opportunities
  const recommendedOpps = opportunities
    .filter(o => {
      if (isStudent) return o.type === "scholarship" || o.type === "internship" || o.type === "fellowship";
      if (isEntrepreneur) return o.type === "accelerator" || o.type === "grant" || o.type === "award";
      return o.featured;
    })
    .filter(o => !user.savedOpportunities.includes(o.id))
    .slice(0, 4);

  // Recommended universities for students
  const recommendedUnis = isStudent
    ? universities.filter(u => !user.savedUniversities.includes(u.id)).slice(0, 3)
    : [];

  return (
    <div className="space-y-8">
      {/* AI Match Header */}
      <div className="bg-gradient-to-r from-navy-900 to-royalblue-700 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gold-500 flex items-center justify-center shrink-0">
          <Sparkles size={22} className="text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">AI Matched for You</h3>
          <p className="text-white/70 text-sm">Based on your profile as <span className="text-gold-300 font-medium">{user.profession || "user"}</span> in {user.country || "Europe"}</p>
        </div>
        <Link to="/ai-advisor" className="ml-auto btn-gold text-sm whitespace-nowrap">
          Full AI Advice
        </Link>
      </div>

      {/* Recommended Jobs */}
      {recommendedJobs.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-900 flex items-center gap-2">
              <Briefcase size={16} className="text-royalblue-500" /> Recommended Jobs
            </h3>
            <Link to="/jobs" className="text-sm text-royalblue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendedJobs.map(job => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="group">
                <div className="card-premium p-4 flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${job.logo} flex items-center justify-center shrink-0`}>
                    <Briefcase size={16} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy-900 text-sm group-hover:text-royalblue-600 transition-colors line-clamp-1">{job.title}</p>
                    <p className="text-xs text-gray-500">{job.company} · {job.city}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-navy-900">{job.salary.split("–")[0].trim()}+</span>
                      <span className="text-xs text-emerald-600">{toINR(job.salaryMin, job.currency)}+/yr</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin size={11} />{job.country.substring(0, 3)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Opportunities */}
      {recommendedOpps.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-900 flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-500" />
              {isStudent ? "Scholarships & Fellowships" : isEntrepreneur ? "Grants & Accelerators" : "Featured Opportunities"}
            </h3>
            <Link to="/opportunities" className="text-sm text-royalblue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendedOpps.map(opp => (
              <Link key={opp.id} to={`/opportunities/${opp.id}`} className="group">
                <div className="card-premium p-4 flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${opp.colorClass} flex items-center justify-center text-lg shrink-0`}>
                    {opp.type === "scholarship" ? "🎓" : opp.type === "grant" ? "💰" : opp.type === "accelerator" ? "🚀" : opp.type === "internship" ? "💼" : "🌟"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy-900 text-sm group-hover:text-royalblue-600 transition-colors line-clamp-1">{opp.title}</p>
                    <p className="text-xs text-gray-500">{opp.organization}</p>
                    <p className="text-xs text-emerald-600 font-semibold mt-0.5">{opp.value}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Universities for Students */}
      {recommendedUnis.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-900 flex items-center gap-2">
              <GraduationCap size={16} className="text-gold-500" /> Top Universities for You
            </h3>
            <Link to="/education" className="text-sm text-royalblue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recommendedUnis.map(uni => (
              <Link key={uni.id} to={`/education/${uni.id}`} className="group">
                <div className="card-premium overflow-hidden">
                  <div className={`${uni.colorClass} h-10 relative`}>
                    <div className="absolute inset-0 bg-black/40 flex items-center px-3">
                      <span className="text-white text-xs font-semibold">#{uni.ranking} Global</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-navy-900 text-sm group-hover:text-royalblue-600 transition-colors line-clamp-1">{uni.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><MapPin size={10} />{uni.city}, {uni.country}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-emerald-600 font-semibold">{uni.tuitionEU}</span>
                      <span className="flex items-center gap-0.5 text-xs text-gray-500"><Star size={9} fill="currentColor" className="text-gold-400" />{uni.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
