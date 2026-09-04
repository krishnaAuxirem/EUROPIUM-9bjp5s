import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Rocket, Globe, TrendingUp, DollarSign, Users, Sparkles,
  Bell, Building2, FileText, Star, Plus, BarChart2, Target
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { countries, opportunities } from "@/lib/mockData";
import DashboardLayout from "./DashboardLayout";

const SIDEBAR_ITEMS = [
  { icon: Rocket, label: "Overview", tab: "overview" },
  { icon: Target, label: "Target Market", tab: "market" },
  { icon: BarChart2, label: "Market Research", tab: "research" },
  { icon: TrendingUp, label: "Opportunities", tab: "opportunities" },
  { icon: DollarSign, label: "Funding", tab: "funding" },
  { icon: Users, label: "Partners", tab: "partners" },
  { icon: Globe, label: "Expansion Plan", tab: "expansion" },
  { icon: Sparkles, label: "AI Business Advisor", tab: "ai" },
  { icon: Bell, label: "Alerts", tab: "alerts" },
];

export default function EntrepreneurDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const fundingOpps = opportunities.filter(o => o.type === "grant" || o.type === "accelerator").slice(0, 4);
  const topMarkets = countries.slice(0, 5);

  const marketScore = (c: typeof countries[0]) => {
    const scores: Record<string, number> = { Germany: 94, Netherlands: 91, Sweden: 89, France: 87, Portugal: 83, Denmark: 88, Switzerland: 85 };
    return scores[c.name] || Math.floor(Math.random() * 20 + 70);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
      default:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gold-600 to-navy-900 rounded-2xl p-6 text-white">
              <p className="text-white/70 text-sm mb-1">Hello, {user?.name?.split(" ")[0]}! 🚀</p>
              <h2 className="font-serif text-2xl font-bold mb-2">Your European Business Journey</h2>
              <p className="text-white/70 text-sm">{user?.targetMarket ? `Target: ${user.targetMarket}` : "Explore opportunities to launch or expand in Europe"}</p>
              <div className="flex gap-3 mt-4">
                <Link to="/business" className="btn-gold text-sm"><Building2 size={14} /> Business Directory</Link>
                <Link to="/opportunities" className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-xl transition-all">Find Funding</Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { n: "44", l: "EU Markets", icon: "🌍" },
                { n: "€17.5M", l: "Max Funding", icon: "💰" },
                { n: "3,400+", l: "Opportunities", icon: "🎯" },
                { n: "89", l: "Market Score", icon: "📊" },
              ].map(s => (
                <div key={s.l} className="card-premium p-4 text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="font-bold text-xl text-navy-900 font-serif">{s.n}</p>
                  <p className="text-xs text-gray-500">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Top Markets */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">Top European Markets</h3>
                <Link to="/explore" className="text-sm text-royalblue-600 hover:underline">Explore all</Link>
              </div>
              <div className="space-y-3">
                {topMarkets.map(c => (
                  <Link key={c.id} to={`/explore/${c.id}`} className="flex items-center gap-4 p-3 bg-gray-50 hover:bg-royalblue-50 rounded-xl transition-colors group">
                    <div className={`w-10 h-10 rounded-xl ${c.colorClass} shrink-0`} />
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900 text-sm group-hover:text-royalblue-600">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.capital} · {c.currency} · {c.costOfLiving} cost</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-navy-900 text-sm">{marketScore(c)}/100</p>
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${marketScore(c)}%` }} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Funding Opportunities */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">Funding Opportunities</h3>
                <Link to="/opportunities" className="text-sm text-royalblue-600 hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {fundingOpps.map(opp => (
                  <Link key={opp.id} to={`/opportunities/${opp.id}`} className="flex items-start gap-3 p-3 bg-emerald-50 border border-emerald-100 hover:border-emerald-300 rounded-xl transition-colors group">
                    <span className="text-xl">{opp.type === "grant" ? "💰" : "🚀"}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900 text-sm group-hover:text-royalblue-600">{opp.title}</p>
                      <p className="text-xs text-gray-500">{opp.organization}</p>
                      <p className="text-xs text-emerald-600 font-semibold mt-0.5">{opp.value}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">Deadline: {opp.deadline.slice(0, 10)}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Business Setup Guide */}
            <div className="card-premium p-6">
              <h3 className="font-semibold text-navy-900 mb-4">Business Setup Checklist</h3>
              <div className="space-y-2">
                {[
                  { l: "Choose target EU market", done: true },
                  { l: "Research legal structure (GmbH, BV, Ltd.)", done: true },
                  { l: "Register business entity", done: false },
                  { l: "Open business bank account", done: false },
                  { l: "Apply for EU VAT number", done: false },
                  { l: "Set up accounting & compliance", done: false },
                ].map(item => (
                  <div key={item.l} className="flex items-center gap-2 py-1.5">
                    {item.done ? <Star size={14} className="text-emerald-500 fill-current shrink-0" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 shrink-0" />}
                    <span className={`text-sm ${item.done ? "line-through text-gray-400" : "text-gray-700"}`}>{item.l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-gold-400" />
                <h3 className="font-semibold">AI Business Advisor</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">Market entry strategy, funding guidance, and legal setup advice for Europe.</p>
              <Link to="/ai-advisor" className="btn-gold text-sm">Get Business Advice</Link>
            </div>
          </div>
        );
      case "ai":
        return (
          <div className="card-premium p-8 text-center">
            <Sparkles size={48} className="text-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">AI Business Advisor</h2>
            <p className="text-gray-500 mb-6">Market analysis, funding strategy, legal setup, and expansion planning for Europe.</p>
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
      title="Entrepreneur Dashboard"
      subtitle="Your European business intelligence hub"
      role="entrepreneur"
      roleEmoji="🚀"
    >
      {renderContent()}
    </DashboardLayout>
  );
}
