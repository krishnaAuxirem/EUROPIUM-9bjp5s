import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2, Briefcase, Users, BarChart2, MessageSquare, Sparkles,
  Bell, FileText, Star, Plus, TrendingUp, CheckCircle, Eye
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { jobs } from "@/lib/mockData";
import DashboardLayout from "./DashboardLayout";

const SIDEBAR_ITEMS = [
  { icon: Building2, label: "Overview", tab: "overview" },
  { icon: Building2, label: "Company Profile", tab: "company" },
  { icon: Briefcase, label: "Active Jobs", tab: "jobs" },
  { icon: FileText, label: "Applications", tab: "applications" },
  { icon: Users, label: "Candidates", tab: "candidates" },
  { icon: MessageSquare, label: "Messages", tab: "messages" },
  { icon: TrendingUp, label: "Business Opps", tab: "opportunities" },
  { icon: BarChart2, label: "Analytics", tab: "analytics" },
  { icon: Sparkles, label: "AI Advisor", tab: "ai" },
];

export default function EmployerDashboardNew() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const activeJobs = jobs.slice(0, 4);
  const totalApplications = activeJobs.reduce((s, j) => s + j.applicants, 0);

  const candidates = [
    { name: "Priya Sharma", role: "Senior Developer", country: "India", status: "shortlisted", match: 94 },
    { name: "Carlos M.", role: "UX Designer", country: "Mexico", status: "interview", match: 88 },
    { name: "Anna K.", role: "Product Manager", country: "Poland", status: "applied", match: 82 },
    { name: "Mehmet Y.", role: "Data Scientist", country: "Turkey", status: "screening", match: 79 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
      default:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-navy-900 to-royalblue-700 rounded-2xl p-6 text-white">
              <p className="text-white/70 text-sm mb-1">Welcome, {user?.name?.split(" ")[0]}! 🏢</p>
              <h2 className="font-serif text-2xl font-bold mb-2">
                {user?.companyName || "Your Company"} Dashboard
              </h2>
              <p className="text-white/70 text-sm">Manage jobs, candidates, and grow your team across Europe</p>
              <div className="flex gap-3 mt-4">
                <Link to="/employer-dashboard" className="btn-gold text-sm">
                  <Plus size={14} /> Post New Job
                </Link>
                <Link to="/business" className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-xl transition-all">
                  Business Profile
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { n: String(activeJobs.length), l: "Active Jobs", icon: "💼" },
                { n: String(totalApplications), l: "Total Applicants", icon: "👥" },
                { n: "12", l: "Shortlisted", icon: "⭐" },
                { n: "3", l: "Interviews This Week", icon: "🎯" },
              ].map(s => (
                <div key={s.l} className="card-premium p-4 text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="font-bold text-2xl text-navy-900 font-serif">{s.n}</p>
                  <p className="text-xs text-gray-500">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Active Jobs */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">Active Job Listings</h3>
                <Link to="/employer-dashboard" className="btn-primary text-sm py-2 px-3">
                  <Plus size={14} /> Post Job
                </Link>
              </div>
              <div className="space-y-3">
                {activeJobs.map(job => (
                  <div key={job.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 rounded-xl ${job.logo} flex items-center justify-center shrink-0`}>
                      <Briefcase size={14} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900 text-sm">{job.title}</p>
                      <p className="text-xs text-gray-500">{job.city} · {job.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Users size={11} /> {job.applicants}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <Eye size={11} /> {job.applicants * 8}
                      </div>
                    </div>
                    <span className="tag tag-green text-xs">Active</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Candidates */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">Top Candidates</h3>
                <Link to="/employer-dashboard" className="text-sm text-royalblue-600 hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {candidates.map(c => (
                  <div key={c.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900 text-sm">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.role} · from {c.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-emerald-600">{c.match}% match</p>
                      <span className={`tag text-xs capitalize ${
                        c.status === "interview" ? "tag-green" :
                        c.status === "shortlisted" ? "tag-blue" :
                        "tag-gray"
                      }`}>{c.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Analytics */}
            <div className="card-premium p-6">
              <h3 className="font-semibold text-navy-900 mb-4">This Month's Performance</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-royalblue-50 rounded-xl p-3">
                  <p className="font-bold text-royalblue-700 text-xl">+24%</p>
                  <p className="text-xs text-royalblue-600">Applications</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-3">
                  <p className="font-bold text-emerald-700 text-xl">1,240</p>
                  <p className="text-xs text-emerald-600">Profile Views</p>
                </div>
                <div className="bg-gold-50 rounded-xl p-3">
                  <p className="font-bold text-gold-700 text-xl">92%</p>
                  <p className="text-xs text-gold-600">Response Rate</p>
                </div>
              </div>
            </div>

            <div className="bg-navy-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-gold-400" />
                <h3 className="font-semibold">AI Recruitment Advisor</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">AI-powered candidate matching, job description optimization, and talent insights.</p>
              <Link to="/ai-advisor" className="btn-gold text-sm">Get AI Insights</Link>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-navy-900">Recruitment Analytics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { n: "1,240", l: "Job Views", trend: "+15%", up: true },
                { n: "284", l: "Applications", trend: "+24%", up: true },
                { n: "48", l: "Shortlisted", trend: "+8%", up: true },
                { n: "12", l: "Hired (YTD)", trend: "+3", up: true },
              ].map(s => (
                <div key={s.l} className="card-premium p-4">
                  <p className="font-bold text-2xl text-navy-900 font-serif">{s.n}</p>
                  <p className="text-xs text-gray-500">{s.l}</p>
                  <p className={`text-xs font-semibold mt-1 ${s.up ? "text-emerald-600" : "text-red-600"}`}>{s.trend}</p>
                </div>
              ))}
            </div>
            <div className="card-premium p-6">
              <h3 className="font-semibold text-navy-900 mb-4">Application Funnel</h3>
              {[
                { stage: "Views", count: 1240, pct: 100 },
                { stage: "Applications", count: 284, pct: 23 },
                { stage: "Screenings", count: 96, pct: 34 },
                { stage: "Interviews", count: 32, pct: 11 },
                { stage: "Offers", count: 12, pct: 4 },
                { stage: "Hired", count: 8, pct: 2.8 },
              ].map(f => (
                <div key={f.stage} className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-gray-600 w-24">{f.stage}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className="bg-royalblue-500 h-2 rounded-full" style={{ width: `${f.pct}%` }} />
                  </div>
                  <span className="text-sm font-bold text-navy-900 w-12 text-right">{f.count}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "ai":
        return (
          <div className="card-premium p-8 text-center">
            <Sparkles size={48} className="text-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">AI Recruitment Advisor</h2>
            <p className="text-gray-500 mb-6">Optimize job postings, match candidates, and get hiring strategy advice.</p>
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
      title="Employer Dashboard"
      subtitle="Hire European talent intelligently"
      role="employer"
      roleEmoji="🏢"
    >
      {renderContent()}
    </DashboardLayout>
  );
}
