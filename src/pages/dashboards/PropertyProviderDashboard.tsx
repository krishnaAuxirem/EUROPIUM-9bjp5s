import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home, Eye, MessageSquare, BarChart2, Bell, Sparkles,
  Plus, CheckCircle, Clock, DollarSign, Star, TrendingUp, Shield
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { properties, toINR } from "@/lib/mockData";
import DashboardLayout from "./DashboardLayout";

const SIDEBAR_ITEMS = [
  { icon: Home, label: "Overview", tab: "overview" },
  { icon: Home, label: "My Properties", tab: "properties" },
  { icon: Shield, label: "Verification", tab: "verification" },
  { icon: Eye, label: "Views & Inquiries", tab: "views" },
  { icon: MessageSquare, label: "Messages", tab: "messages" },
  { icon: BarChart2, label: "Analytics", tab: "analytics" },
  { icon: Bell, label: "Alerts", tab: "alerts" },
  { icon: Sparkles, label: "AI Advisor", tab: "ai" },
];

export default function PropertyProviderDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const myProperties = properties.slice(0, 4);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
      default:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-700 to-navy-900 rounded-2xl p-6 text-white">
              <p className="text-white/70 text-sm mb-1">Welcome, {user?.name?.split(" ")[0]}! 🏘️</p>
              <h2 className="font-serif text-2xl font-bold mb-2">Property Management Hub</h2>
              <p className="text-white/70 text-sm">Manage your listings, track inquiries, and grow your portfolio across Europe.</p>
              <Link to="/contact" className="btn-gold mt-4 text-sm inline-flex">
                <Plus size={14} /> List New Property
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { n: "4", l: "Listed Properties", icon: "🏠" },
                { n: "2", l: "Verified", icon: "✅" },
                { n: "284", l: "Total Views", icon: "👁️" },
                { n: "18", l: "Inquiries", icon: "💬" },
              ].map(s => (
                <div key={s.l} className="card-premium p-4 text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="font-bold text-2xl text-navy-900 font-serif">{s.n}</p>
                  <p className="text-xs text-gray-500">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Properties */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">My Listings</h3>
                <Link to="/contact" className="btn-primary text-sm py-2 px-3">
                  <Plus size={14} /> Add Property
                </Link>
              </div>
              <div className="space-y-3">
                {myProperties.map(p => {
                  const isVerified = p.featured;
                  const views = Math.floor(Math.random() * 150 + 50);
                  const inquiries = Math.floor(Math.random() * 10 + 2);
                  return (
                    <Link key={p.id} to={`/housing/${p.id}`} className="flex items-center gap-4 p-3 bg-gray-50 hover:bg-royalblue-50 rounded-xl transition-colors group">
                      <div className={`w-12 h-12 rounded-xl ${p.colorClass} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-navy-900 text-sm group-hover:text-royalblue-600 truncate">{p.title}</p>
                        <p className="text-xs text-gray-500">{p.city} · {p.listingType === "rent" ? `€${p.price}/mo` : `€${p.price.toLocaleString()}`}</p>
                        <p className="text-xs text-emerald-600 font-semibold">{toINR(p.price, p.currency)}{p.period ? "/mo" : ""}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 text-xs text-gray-500"><Eye size={11} />{views}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5"><MessageSquare size={11} />{inquiries}</div>
                        <span className={`tag text-xs mt-1 ${isVerified ? "tag-green" : "bg-amber-100 text-amber-700"}`}>
                          {isVerified ? "Verified" : "Pending"}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Revenue Overview */}
            <div className="card-premium p-6">
              <h3 className="font-semibold text-navy-900 mb-4">Monthly Revenue Overview</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-emerald-50 rounded-xl p-3">
                  <p className="font-bold text-emerald-700 font-serif">₹3.85L</p>
                  <p className="text-xs text-emerald-600">Monthly Income</p>
                </div>
                <div className="bg-royalblue-50 rounded-xl p-3">
                  <p className="font-bold text-royalblue-700 font-serif">4/4</p>
                  <p className="text-xs text-royalblue-600">Occupancy Rate</p>
                </div>
                <div className="bg-gold-50 rounded-xl p-3">
                  <p className="font-bold text-gold-700 font-serif">4.7★</p>
                  <p className="text-xs text-gold-600">Avg Rating</p>
                </div>
              </div>
            </div>

            {/* Recent Inquiries */}
            <div className="card-premium p-6">
              <h3 className="font-semibold text-navy-900 mb-4">Recent Inquiries</h3>
              <div className="space-y-3">
                {[
                  { name: "Priya S.", property: "Prenzlauer Berg Apartment", time: "2h ago", status: "new" },
                  { name: "Marco L.", property: "Barcelona Penthouse", time: "1d ago", status: "replied" },
                  { name: "Anna K.", property: "Lisbon Townhouse", time: "2d ago", status: "scheduled" },
                ].map(inq => (
                  <div key={inq.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {inq.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy-900">{inq.name}</p>
                      <p className="text-xs text-gray-500 truncate">{inq.property}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400">{inq.time}</p>
                      <span className={`tag text-xs ${inq.status === "new" ? "bg-red-100 text-red-700" : inq.status === "replied" ? "tag-blue" : "tag-green"}`}>
                        {inq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/messages" className="text-sm text-royalblue-600 hover:underline mt-3 block">View all messages →</Link>
            </div>

            <div className="bg-navy-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-gold-400" />
                <h3 className="font-semibold">AI Property Advisor</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">Price optimization, market analysis, and listing improvement tips.</p>
              <Link to="/ai-advisor" className="btn-gold text-sm">Get AI Advice</Link>
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-navy-900">Property Analytics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { n: "284", l: "Total Views", trend: "+18%" },
                { n: "18", l: "Inquiries", trend: "+12%" },
                { n: "4", l: "Viewings", trend: "This month" },
                { n: "100%", l: "Occupancy", trend: "All occupied" },
              ].map(s => (
                <div key={s.l} className="card-premium p-4">
                  <p className="font-bold text-2xl text-navy-900 font-serif">{s.n}</p>
                  <p className="text-xs text-gray-500">{s.l}</p>
                  <p className="text-xs text-emerald-600 mt-1">{s.trend}</p>
                </div>
              ))}
            </div>
            <div className="card-premium p-6">
              <h3 className="font-semibold text-navy-900 mb-4">Views per Property</h3>
              {myProperties.map(p => {
                const views = Math.floor(Math.random() * 150 + 50);
                return (
                  <div key={p.id} className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-gray-600 flex-1 truncate">{p.title.split(",")[0]}</span>
                    <div className="w-32 bg-gray-100 rounded-full h-2">
                      <div className="bg-royalblue-500 h-2 rounded-full" style={{ width: `${(views / 200) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold text-navy-900 w-10 text-right">{views}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "ai":
        return (
          <div className="card-premium p-8 text-center">
            <Sparkles size={48} className="text-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">AI Property Advisor</h2>
            <p className="text-gray-500 mb-6">Pricing optimization, market trends, tenant matching, and listing improvement.</p>
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
      title="Property Provider Dashboard"
      subtitle="Manage your European property portfolio"
      role="property_provider"
      roleEmoji="🏘️"
    >
      {renderContent()}
    </DashboardLayout>
  );
}
