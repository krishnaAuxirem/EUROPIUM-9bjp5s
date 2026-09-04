import { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap, BookOpen, Star, Calendar, DollarSign, Sparkles,
  Bell, Clock, Award, FileText, TrendingUp, Plus, CheckCircle, MapPin
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { universities, opportunities } from "@/lib/mockData";
import DashboardLayout from "./DashboardLayout";

const SIDEBAR_ITEMS = [
  { icon: BookOpen, label: "Overview", tab: "overview" },
  { icon: GraduationCap, label: "Saved Universities", tab: "universities" },
  { icon: FileText, label: "Applications", tab: "applications" },
  { icon: Clock, label: "Deadlines", tab: "deadlines" },
  { icon: Award, label: "Scholarships", tab: "scholarships" },
  { icon: BookOpen, label: "Programs", tab: "programs" },
  { icon: DollarSign, label: "Study Budget", tab: "budget" },
  { icon: Sparkles, label: "AI Advisor", tab: "ai" },
  { icon: Bell, label: "Alerts", tab: "alerts" },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const savedUnis = universities.slice(0, 3);
  const scholarships = opportunities.filter(o => o.type === "scholarship").slice(0, 3);

  const deadlines = [
    { uni: "Technical University of Munich", program: "MSc Computer Science", date: "Jan 15, 2027", days: 133, status: "upcoming" },
    { uni: "ETH Zurich", program: "MSc Computer Science", date: "Dec 15, 2026", days: 102, status: "upcoming" },
    { uni: "Erasmus+ Scholarship", program: "Exchange Program", date: "Oct 1, 2026", days: 27, status: "urgent" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-royalblue-700 to-navy-900 rounded-2xl p-6 text-white">
              <p className="text-white/70 text-sm mb-1">Welcome, {user?.name?.split(" ")[0]}! 🎓</p>
              <h2 className="font-serif text-2xl font-bold mb-2">Study in Europe</h2>
              <p className="text-white/70 text-sm">
                {user?.studyGoal || "Find your dream university and scholarship across Europe"}
              </p>
              <Link to="/education" className="btn-gold mt-4 text-sm inline-flex">
                <Plus size={14} /> Explore Universities
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { n: "3", l: "Saved Universities", icon: "🏛️" },
                { n: "1", l: "Applications", icon: "📝" },
                { n: "3", l: "Scholarships", icon: "🏆" },
                { n: "27", l: "Days to Deadline", icon: "⏰" },
              ].map(s => (
                <div key={s.l} className="card-premium p-4 text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="font-bold text-xl text-navy-900 font-serif">{s.n}</p>
                  <p className="text-xs text-gray-500">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Deadline Alerts */}
            <div className="card-premium p-6">
              <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <Clock size={16} className="text-red-500" /> Upcoming Deadlines
              </h3>
              <div className="space-y-3">
                {deadlines.map(d => (
                  <div key={d.uni} className={`flex items-start gap-4 p-3 rounded-xl ${d.status === "urgent" ? "bg-red-50 border border-red-100" : "bg-gray-50"}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${d.status === "urgent" ? "bg-red-500 text-white" : "bg-navy-900 text-white"}`}>
                      {d.days}d
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">{d.uni}</p>
                      <p className="text-xs text-gray-500">{d.program} · Deadline: {d.date}</p>
                    </div>
                    {d.status === "urgent" && (
                      <span className="tag bg-red-100 text-red-700 text-xs ml-auto shrink-0">Urgent</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Universities */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">Saved Universities</h3>
                <Link to="/education" className="text-sm text-royalblue-600 hover:underline">Browse more</Link>
              </div>
              <div className="space-y-3">
                {savedUnis.map(uni => (
                  <Link key={uni.id} to={`/education/${uni.id}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-royalblue-50 transition-colors group">
                    <div className={`w-10 h-10 rounded-xl ${uni.colorClass} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                      #{uni.ranking}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900 text-sm group-hover:text-royalblue-600">{uni.name}</p>
                      <p className="text-xs text-gray-500">{uni.city}, {uni.country} · {uni.tuitionEU}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gold-500">
                      <Star size={11} fill="currentColor" /> {uni.rating}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Scholarships */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">Available Scholarships</h3>
                <Link to="/opportunities" className="text-sm text-royalblue-600 hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {scholarships.map(s => (
                  <Link key={s.id} to={`/opportunities/${s.id}`} className="flex items-start gap-3 p-3 bg-gold-50 border border-gold-100 rounded-xl hover:border-gold-300 transition-colors">
                    <div className="text-xl">🏆</div>
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">{s.title}</p>
                      <p className="text-xs text-gray-500">{s.organization} · <span className="text-emerald-600 font-semibold">{s.value}</span></p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI */}
            <div className="bg-navy-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-gold-400" />
                <h3 className="font-semibold">AI University Advisor</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">Get matched to universities based on your profile, grades, and budget.</p>
              <Link to="/ai-advisor" className="btn-gold text-sm">Get AI Recommendations</Link>
            </div>
          </div>
        );
      case "scholarships":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-navy-900">Scholarships & Funding</h2>
              <Link to="/opportunities" className="btn-primary text-sm">Explore All</Link>
            </div>
            {opportunities.filter(o => o.type === "scholarship" || o.type === "fellowship").map(s => (
              <Link key={s.id} to={`/opportunities/${s.id}`} className="card-premium p-5 block">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${s.colorClass} rounded-xl flex items-center justify-center text-2xl shrink-0`}>🏆</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-navy-900">{s.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{s.organization}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-emerald-600 font-bold text-sm">{s.value}</span>
                      <span className="text-xs text-gray-400">Deadline: {s.deadline}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        );
      case "ai":
        return (
          <div className="card-premium p-8 text-center">
            <Sparkles size={48} className="text-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">AI University Advisor</h2>
            <p className="text-gray-500 mb-6">Get personalized university recommendations, application help, and scholarship matches.</p>
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
      title="Student Dashboard"
      subtitle="Your path to European education"
      role="student"
      roleEmoji="🎓"
    >
      {renderContent()}
    </DashboardLayout>
  );
}
