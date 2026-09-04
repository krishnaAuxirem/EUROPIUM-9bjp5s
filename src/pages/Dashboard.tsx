import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase, Home, GraduationCap, TrendingUp, Bell, ArrowRight,
  MapPin, Calendar, Sparkles, BarChart3, ClipboardList
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { jobs, properties, opportunities, universities, notifications } from "@/lib/mockData";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import JobCard from "@/components/features/JobCard";
import AIRecommendations from "@/components/features/AIRecommendations";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const savedJobsList = jobs.filter(j => user.savedJobs.includes(j.id));
  const unreadNotifs = notifications.filter(n => !n.read);
  const totalApplications = (user.jobApplications?.length ?? 0) + (user.universityApplications?.length ?? 0);
  const completeness = user.profileCompleteness ?? 60;

  const stats = [
    { label: "Saved Jobs", value: user.savedJobs.length, icon: Briefcase, color: "bg-royalblue-100 text-royalblue-600", path: "/jobs" },
    { label: "Saved Properties", value: user.savedProperties.length, icon: Home, color: "bg-emerald-100 text-emerald-600", path: "/housing" },
    { label: "Saved Opps", value: user.savedOpportunities.length, icon: TrendingUp, color: "bg-gold-100 text-gold-600", path: "/opportunities" },
    { label: "Universities", value: user.savedUniversities.length, icon: GraduationCap, color: "bg-purple-100 text-purple-600", path: "/education" },
    { label: "Applications", value: totalApplications, icon: ClipboardList, color: "bg-navy-100 text-navy-600", path: "/applications" },
  ];

  const suggestedJobs = jobs
    .filter(j => !user.savedJobs.includes(j.id) && !user.jobApplications?.some(a => a.jobId === j.id))
    .slice(0, 3);

  return (
    <div className="page-container bg-background">
      {/* Header */}
      <section className="bg-navy-900 py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-gold-400 text-sm font-medium mb-1">Good day 👋</p>
              <h1 className="font-serif text-3xl font-bold text-white">{user.name}</h1>
              <div className="flex items-center gap-3 mt-2 text-white/60 text-sm">
                {user.city && <span className="flex items-center gap-1"><MapPin size={12} />{user.city}, {user.country}</span>}
                {user.profession && <span>{user.profession}</span>}
                <span className="flex items-center gap-1"><Calendar size={12} />Member since {user.joinedDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`tag text-xs font-semibold px-3 py-1.5 ${user.plan === "premium" ? "bg-gold-500 text-white" : "bg-white/10 text-white"}`}>
                {user.plan === "premium" ? "⭐ Premium" : "Free Plan"}
              </span>
              <Link to="/ai-advisor" className="hidden sm:flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                <Sparkles size={14} /> AI Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {stats.map(s => (
            <Link key={s.label} to={s.path} className="card-premium p-5 group">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon size={20} />
              </div>
              <div className="text-3xl font-bold text-navy-900 font-serif">{s.value}</div>
              <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
              <div className="text-xs text-royalblue-500 mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                View all <ArrowRight size={10} />
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Saved Jobs */}
            <div className="bg-white rounded-2xl border border-border/50 shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-navy-900 text-lg">Saved Jobs</h2>
                <Link to="/saved" className="text-sm text-royalblue-600 hover:underline flex items-center gap-1">View all <ArrowRight size={12} /></Link>
              </div>
              {savedJobsList.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase size={32} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No saved jobs yet.</p>
                  <Link to="/jobs" className="text-royalblue-600 text-sm hover:underline mt-1 inline-block">Browse Jobs →</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedJobsList.map(j => <JobCard key={j.id} job={j} compact />)}
                </div>
              )}
            </div>

            {/* Suggested Jobs */}
            <div className="bg-white rounded-2xl border border-border/50 shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-navy-900 text-lg">AI-Recommended for You</h2>
                <span className="tag tag-gold text-xs"><Sparkles size={10} /> AI Picks</span>
              </div>
              <div className="space-y-3">
                {suggestedJobs.map(j => <JobCard key={j.id} job={j} compact />)}
              </div>
              <Link to="/jobs" className="btn-outline mt-4 w-full justify-center text-sm">
                Browse All Jobs <ArrowRight size={14} />
              </Link>
            </div>

            {/* Application Tracker Quick */}
            {totalApplications > 0 && (
              <div className="bg-white rounded-2xl border border-border/50 shadow-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-navy-900 text-lg flex items-center gap-2">
                    <ClipboardList size={18} className="text-navy-600" /> My Applications
                  </h2>
                  <Link to="/applications" className="text-sm text-royalblue-600 hover:underline flex items-center gap-1">
                    Track All <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-royalblue-50 rounded-xl">
                    <div className="text-xl font-bold text-royalblue-600">{user.jobApplications?.length ?? 0}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Job Apps</div>
                  </div>
                  <div className="text-center p-3 bg-gold-50 rounded-xl">
                    <div className="text-xl font-bold text-gold-600">{user.universityApplications?.length ?? 0}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Uni Apps</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-xl">
                    <div className="text-xl font-bold text-emerald-600">
                      {(user.jobApplications?.filter(a => a.status === "offer" || a.status === "accepted").length ?? 0) +
                       (user.universityApplications?.filter(a => a.status === "accepted").length ?? 0)}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">Offers</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-border/50 shadow-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">Notifications</h3>
                {unreadNotifs.length > 0 && (
                  <span className="w-5 h-5 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                    {unreadNotifs.length}
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {notifications.slice(0, 4).map(n => (
                  <div key={n.id} className={`flex gap-3 p-2 rounded-xl ${!n.read ? "bg-royalblue-50" : ""}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                      n.type === "job" ? "bg-royalblue-100 text-royalblue-600" :
                      n.type === "opportunity" ? "bg-gold-100 text-gold-600" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      <Bell size={12} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-navy-900 line-clamp-1">{n.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-border/50 shadow-card p-5">
              <h3 className="font-semibold text-navy-900 mb-3">Quick Access</h3>
              <div className="space-y-1">
                {[
                  { label: "AI Advisor", path: "/ai-advisor", icon: "✨" },
                  { label: "Application Tracker", path: "/applications", icon: "📋" },
                  { label: "Relocation Planner", path: "/relocation-planner", icon: "🗺️" },
                  { label: "Cost Calculator", path: "/cost-calculator", icon: "💰" },
                  { label: "Saved Items", path: "/saved", icon: "🔖" },
                  { label: "Profile Settings", path: "/profile", icon: "⚙️" },
                ].map(l => (
                  <Link key={l.path} to={l.path} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 hover:text-navy-900 transition-colors">
                    <span>{l.icon}</span>
                    <span>{l.label}</span>
                    <ArrowRight size={12} className="ml-auto text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="bg-navy-50 border border-navy-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={16} className="text-navy-600" />
                <h3 className="font-semibold text-navy-900 text-sm">Profile Completeness</h3>
              </div>
              <div className="w-full bg-navy-200 rounded-full h-2.5 mb-2">
                <div className="bg-royalblue-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${completeness}%` }} />
              </div>
              <p className="text-xs text-navy-600">{completeness}% complete — <Link to="/profile" className="font-semibold hover:underline">Add more details</Link></p>
            </div>
          </div>
        </div>

        {/* AI Recommendations Section */}
        <div className="mt-10">
          <AIRecommendations />
        </div>
      </div>
    </div>
  );
}
