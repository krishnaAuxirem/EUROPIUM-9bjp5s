import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, CheckCircle, FileText, Home, Briefcase, Sparkles,
  Calendar, DollarSign, Bell, TrendingUp, Plus, Clock, Shield
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "./DashboardLayout";

const SIDEBAR_ITEMS = [
  { icon: MapPin, label: "Overview", tab: "overview" },
  { icon: TrendingUp, label: "Relocation Progress", tab: "progress" },
  { icon: FileText, label: "Documents", tab: "documents" },
  { icon: Shield, label: "Visa & Immigration", tab: "visa" },
  { icon: Home, label: "Housing Search", tab: "housing" },
  { icon: Briefcase, label: "Job Search", tab: "jobs" },
  { icon: Calendar, label: "Appointments", tab: "appointments" },
  { icon: DollarSign, label: "Relocation Budget", tab: "budget" },
  { icon: Sparkles, label: "AI Advisor", tab: "ai" },
  { icon: Bell, label: "Alerts", tab: "alerts" },
];

const PROGRESS_STEPS = [
  { id: 1, label: "Research Destination", done: true },
  { id: 2, label: "Get Job Offer / Visa Approval", done: true },
  { id: 3, label: "Secure Housing", done: false },
  { id: 4, label: "Submit Visa Application", done: false },
  { id: 5, label: "Book Flights", done: false },
  { id: 6, label: "Register Address on Arrival", done: false },
  { id: 7, label: "Open Bank Account", done: false },
  { id: 8, label: "Get Health Insurance", done: false },
];

export default function RelocatorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [steps, setSteps] = useState(PROGRESS_STEPS);

  const doneCount = steps.filter(s => s.done).length;
  const progress = Math.round((doneCount / steps.length) * 100);

  const toggleStep = (id: number) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, done: !s.done } : s));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
      default:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-700 to-navy-900 rounded-2xl p-6 text-white">
              <p className="text-white/70 text-sm mb-1">Welcome, {user?.name?.split(" ")[0]}! 🏡</p>
              <h2 className="font-serif text-2xl font-bold mb-2">Your Relocation to Europe</h2>
              <p className="text-white/70 text-sm">{user?.destinationCountry ? `Destination: ${user.destinationCountry}` : "Define your destination to get started"}</p>
              <div className="flex gap-3 mt-4">
                <Link to="/relocation-planner" className="btn-gold text-sm">
                  <Plus size={14} /> Relocation Planner
                </Link>
                <Link to="/cost-calculator" className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-xl transition-all">
                  Cost Calculator
                </Link>
              </div>
            </div>

            {/* Progress */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">Relocation Progress</h3>
                <span className="font-bold text-navy-900">{progress}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full mb-4">
                <div className={`h-full rounded-full transition-all ${progress === 100 ? "bg-emerald-500" : "bg-royalblue-500"}`} style={{ width: `${progress}%` }} />
              </div>
              <div className="space-y-2">
                {steps.map(step => (
                  <button key={step.id} onClick={() => toggleStep(step.id)} className="w-full flex items-center gap-3 py-2 hover:bg-gray-50 rounded-xl px-2 transition-colors text-left">
                    {step.done ? (
                      <CheckCircle size={18} className="text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0" />
                    )}
                    <span className={`text-sm ${step.done ? "line-through text-gray-400" : "text-gray-700"}`}>{step.label}</span>
                  </button>
                ))}
              </div>
              <Link to="/relocation-planner" className="btn-primary w-full justify-center mt-4 text-sm">
                View Full Checklist
              </Link>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: "🏠", label: "Find Housing", path: "/housing" },
                { icon: "💼", label: "Find Jobs", path: "/jobs" },
                { icon: "🛂", label: "Visa Info", path: "/opportunities?type=visa" },
                { icon: "🏦", label: "Banking", path: "/local-services?cat=Banks" },
                { icon: "💰", label: "Cost Calculator", path: "/cost-calculator" },
                { icon: "🤖", label: "AI Advisor", path: "/ai-advisor" },
              ].map(q => (
                <Link key={q.label} to={q.path} className="card-premium p-4 text-center hover:border-royalblue-300 transition-all">
                  <div className="text-2xl mb-2">{q.icon}</div>
                  <p className="text-sm font-semibold text-navy-900">{q.label}</p>
                </Link>
              ))}
            </div>

            {/* Budget Overview */}
            <div className="card-premium p-6">
              <h3 className="font-semibold text-navy-900 mb-4">Relocation Budget</h3>
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="font-bold text-navy-900">₹8.5L</p>
                  <p className="text-xs text-gray-500">Total Budget</p>
                </div>
                <div className="bg-red-50 rounded-xl p-3">
                  <p className="font-bold text-red-600">₹1.2L</p>
                  <p className="text-xs text-gray-500">Spent</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-3">
                  <p className="font-bold text-emerald-600">₹7.3L</p>
                  <p className="text-xs text-gray-500">Remaining</p>
                </div>
              </div>
              <Link to="/cost-calculator" className="text-sm text-royalblue-600 hover:underline">Update budget →</Link>
            </div>

            <div className="bg-navy-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-gold-400" />
                <h3 className="font-semibold">AI Relocation Advisor</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">Get step-by-step guidance on visa, housing, jobs, and settling in your new country.</p>
              <Link to="/ai-advisor" className="btn-gold text-sm">Get Relocation Advice</Link>
            </div>
          </div>
        );
      case "ai":
        return (
          <div className="card-premium p-8 text-center">
            <Sparkles size={48} className="text-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">AI Relocation Advisor</h2>
            <p className="text-gray-500 mb-6">Step-by-step relocation support, visa guidance, and settling-in tips.</p>
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
      title="Relocator Dashboard"
      subtitle="Your European relocation command center"
      role="relocator"
      roleEmoji="🏡"
    >
      {renderContent()}
    </DashboardLayout>
  );
}
