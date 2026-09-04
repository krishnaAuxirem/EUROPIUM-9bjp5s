import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plane, MapPin, Star, Calendar, DollarSign, Sparkles,
  BookmarkCheck, Bell, Settings, LogOut, User, TrendingUp,
  Heart, Clock, Globe, ChevronRight, Plus, Map
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { travelDestinations } from "@/lib/mockData";
import DashboardLayout from "./DashboardLayout";

const SIDEBAR_ITEMS = [
  { icon: Map, label: "Overview", tab: "overview" },
  { icon: Plane, label: "My Trips", tab: "trips" },
  { icon: Heart, label: "Saved Destinations", tab: "saved" },
  { icon: Calendar, label: "Itinerary", tab: "itinerary" },
  { icon: DollarSign, label: "Travel Budget", tab: "budget" },
  { icon: MapPin, label: "Hotels & Stays", tab: "hotels" },
  { icon: Star, label: "Experiences", tab: "experiences" },
  { icon: Bell, label: "Travel Alerts", tab: "alerts" },
  { icon: Sparkles, label: "AI Travel Advisor", tab: "ai" },
];

export default function TravelerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const savedDestinations = travelDestinations.slice(0, 4);
  const upcomingTrips = [
    { dest: "Barcelona", country: "Spain", date: "Oct 15–21, 2026", status: "upcoming", budget: "₹1.2L" },
    { dest: "Prague", country: "Czech Republic", date: "Dec 2–6, 2026", status: "planning", budget: "₹65K" },
  ];

  const recentActivity = [
    { action: "Saved Santorini to wishlist", time: "2 hours ago", icon: "❤️" },
    { action: "Planned itinerary for Barcelona", time: "1 day ago", icon: "🗺️" },
    { action: "Booked flight to Amsterdam", time: "3 days ago", icon: "✈️" },
    { action: "Reviewed Norwegian Fjords guide", time: "1 week ago", icon: "📖" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
      default:
        return (
          <div className="space-y-6">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-navy-900 to-royalblue-700 rounded-2xl p-6 text-white">
              <p className="text-white/70 text-sm mb-1">Good day, {user?.name?.split(" ")[0]}! ✈️</p>
              <h2 className="font-serif text-2xl font-bold mb-2">Your Europe Adventure Awaits</h2>
              <p className="text-white/70 text-sm">2 upcoming trips · 8 saved destinations · 4 countries explored</p>
              <Link to="/trip-planner" className="btn-gold mt-4 text-sm inline-flex">
                <Plus size={14} /> Plan New Trip
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { n: "2", l: "Upcoming Trips", icon: "✈️", color: "bg-royalblue-50 text-royalblue-700" },
                { n: "8", l: "Saved Destinations", icon: "❤️", color: "bg-red-50 text-red-600" },
                { n: "4", l: "Countries Visited", icon: "🌍", color: "bg-emerald-50 text-emerald-700" },
                { n: "₹2.8L", l: "Travel Budget", icon: "💰", color: "bg-gold-50 text-gold-700" },
              ].map(s => (
                <div key={s.l} className={`card-premium p-4 ${s.color}`}>
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <p className="font-bold text-xl font-serif">{s.n}</p>
                  <p className="text-xs mt-0.5 opacity-80">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Upcoming Trips */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">Upcoming Trips</h3>
                <Link to="/trip-planner" className="text-sm text-royalblue-600 hover:underline flex items-center gap-1">Add trip <Plus size={14} /></Link>
              </div>
              <div className="space-y-3">
                {upcomingTrips.map(t => (
                  <div key={t.dest} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white text-lg shrink-0">
                      ✈️
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900 text-sm">{t.dest}, {t.country}</p>
                      <p className="text-xs text-gray-500">{t.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-navy-900 text-sm">{t.budget}</p>
                      <span className={`tag text-xs ${t.status === "upcoming" ? "tag-blue" : "bg-amber-100 text-amber-700"}`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Destinations */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">Saved Destinations</h3>
                <Link to="/travel" className="text-sm text-royalblue-600 hover:underline">View all</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {savedDestinations.map(dest => (
                  <Link key={dest.id} to={`/travel/${dest.id}`} className="group">
                    <div className={`${dest.colorClass} h-24 rounded-xl relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                        <div>
                          <p className="text-white font-semibold text-xs">{dest.name}</p>
                          <p className="text-white/70 text-xs">{dest.country}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card-premium p-6">
              <h3 className="font-semibold text-navy-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xl">{a.icon}</span>
                    <div>
                      <p className="text-sm text-gray-700">{a.action}</p>
                      <p className="text-xs text-gray-400">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Travel Advisor */}
            <div className="bg-navy-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-gold-400" />
                <h3 className="font-semibold">AI Travel Advisor</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">Get personalized travel recommendations, visa info, and packing lists.</p>
              <Link to="/ai-advisor" className="btn-gold text-sm">Ask AI Advisor</Link>
            </div>
          </div>
        );
      case "trips":
        return (
          <div className="card-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-bold text-navy-900">My Trips</h2>
              <Link to="/trip-planner" className="btn-primary text-sm">
                <Plus size={14} /> New Trip
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingTrips.map(t => (
                <div key={t.dest} className="p-5 border border-border rounded-2xl hover:border-royalblue-300 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-navy-900">{t.dest}</h3>
                      <p className="text-sm text-gray-500">{t.country} · {t.date}</p>
                      <span className={`tag mt-2 text-xs ${t.status === "upcoming" ? "tag-blue" : "bg-amber-100 text-amber-700"}`}>{t.status}</span>
                    </div>
                    <p className="font-bold text-navy-900">{t.budget}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Link to="/trip-planner" className="btn-secondary text-sm py-2 px-4">View Itinerary</Link>
                    <button className="btn-outline text-sm py-2 px-4">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "ai":
        return (
          <div className="card-premium p-8 text-center">
            <Sparkles size={48} className="text-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">AI Travel Advisor</h2>
            <p className="text-gray-500 mb-6">Get personalized travel recommendations, itinerary planning, visa guidance, and budget optimization.</p>
            <Link to="/ai-advisor" className="btn-gold">Open AI Advisor</Link>
          </div>
        );
      case "budget":
        return (
          <div className="card-premium p-6">
            <h2 className="font-serif text-xl font-bold text-navy-900 mb-6">Travel Budget Tracker</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { l: "Total Budget", v: "₹4.2L", c: "text-navy-900" },
                { l: "Spent", v: "₹1.4L", c: "text-red-600" },
                { l: "Remaining", v: "₹2.8L", c: "text-emerald-600" },
              ].map(b => (
                <div key={b.l} className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className={`font-bold text-2xl font-serif ${b.c}`}>{b.v}</p>
                  <p className="text-sm text-gray-500">{b.l}</p>
                </div>
              ))}
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "33%" }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">33% of budget used</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      sidebarItems={SIDEBAR_ITEMS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title="Traveler Dashboard"
      subtitle="Your European adventure hub"
      role="traveler"
      roleEmoji="✈️"
    >
      {renderContent()}
    </DashboardLayout>
  );
}
