import { Link } from "react-router-dom";
import {
  Users, Briefcase, Home, GraduationCap, TrendingUp, Building2,
  DollarSign, AlertTriangle, CheckCircle, Clock, BarChart2, ArrowUpRight
} from "lucide-react";
import { jobs, universities, properties, opportunities, businessListings } from "@/lib/mockData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const userGrowthData = [
  { month: "Jan", users: 85000, active: 62000 },
  { month: "Feb", users: 110000, active: 82000 },
  { month: "Mar", users: 145000, active: 108000 },
  { month: "Apr", users: 190000, active: 142000 },
  { month: "May", users: 260000, active: 196000 },
  { month: "Jun", users: 340000, active: 255000 },
  { month: "Jul", users: 480000, active: 362000 },
  { month: "Aug", users: 680000, active: 512000 },
  { month: "Sep", users: 890000, active: 672000 },
  { month: "Oct", users: 1050000, active: 792000 },
  { month: "Nov", users: 1150000, active: 869000 },
  { month: "Dec", users: 1200000, active: 924000 },
];

const ROLE_COLORS = ["#3B82F6", "#22C55E", "#D4A72C", "#EF4444", "#8B5CF6", "#F97316", "#06B6D4"];

const roleData = [
  { name: "Job Seekers", value: 420000 },
  { name: "Students", value: 280000 },
  { name: "Travelers", value: 210000 },
  { name: "Relocators", value: 145000 },
  { name: "Entrepreneurs", value: 80000 },
  { name: "Employers", value: 50000 },
  { name: "Property Providers", value: 15000 },
];

interface AdminOverviewProps {
  onNavigate: (tab: string) => void;
}

export default function AdminOverview({ onNavigate }: AdminOverviewProps) {
  const stats = [
    { label: "Total Users", value: "1.2M", change: "+8.2%", icon: Users, color: "text-royalblue-600", bg: "bg-royalblue-50", tab: "users" },
    { label: "Active Users", value: "924K", change: "+5.4%", icon: BarChart2, color: "text-emerald-600", bg: "bg-emerald-50", tab: "analytics" },
    { label: "New This Month", value: "48.2K", change: "+12.1%", icon: ArrowUpRight, color: "text-gold-600", bg: "bg-gold-50", tab: "users" },
    { label: "Job Listings", value: String(jobs.length), change: "+3 new", icon: Briefcase, color: "text-navy-600", bg: "bg-navy-50", tab: "jobs" },
    { label: "Properties", value: String(properties.length), change: "+2 pending", icon: Home, color: "text-purple-600", bg: "bg-purple-50", tab: "properties" },
    { label: "Universities", value: String(universities.length), change: "All verified", icon: GraduationCap, color: "text-royalblue-600", bg: "bg-royalblue-50", tab: "universities" },
    { label: "Opportunities", value: String(opportunities.length), change: "+4 new", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", tab: "opportunities" },
    { label: "Businesses", value: String(businessListings.length), change: "2 pending", icon: Building2, color: "text-orange-600", bg: "bg-orange-50", tab: "businesses" },
    { label: "Revenue (MTD)", value: "₹4.2Cr", change: "+18% YoY", icon: DollarSign, color: "text-gold-600", bg: "bg-gold-50", tab: "analytics" },
    { label: "Pending Verif.", value: "17", change: "Needs review", icon: Clock, color: "text-amber-600", bg: "bg-amber-50", tab: "jobs" },
    { label: "Open Reports", value: "8", change: "3 urgent", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50", tab: "reviews" },
    { label: "Resolved Today", value: "24", change: "+6 cases", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", tab: "reviews" },
  ];

  const pendingItems = [
    { type: "Job", title: "Product Designer at Klarna", status: "pending", time: "2h ago" },
    { type: "Property", title: "Luxury Apartment Amsterdam", status: "pending", time: "4h ago" },
    { type: "Business", title: "Nordic Tech Startup", status: "pending", time: "1d ago" },
    { type: "Review", title: "Negative review flagged", status: "flagged", time: "3h ago" },
    { type: "Job", title: "ML Engineer at Deliveroo", status: "pending", time: "5h ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm">Platform overview and management console · Last updated: just now</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <button key={s.label} onClick={() => onNavigate(s.tab)} className="card-premium p-4 text-left hover:border-royalblue-300 transition-all">
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>
                <Icon size={16} className={s.color} />
              </div>
              <p className="font-bold text-lg text-navy-900 font-serif leading-none">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              <p className={`text-xs mt-1 font-semibold ${s.change.includes("+") ? "text-emerald-600" : s.change.includes("urgent") || s.change.includes("pending") ? "text-amber-600" : "text-gray-500"}`}>
                {s.change}
              </p>
            </button>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth */}
        <div className="lg:col-span-2 card-premium p-6">
          <h3 className="font-semibold text-navy-900 mb-4">User Growth (2026)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => [`${(v / 1000).toFixed(0)}K`, ""]} />
              <Area type="monotone" dataKey="users" stroke="#2563EB" fill="url(#usersGrad)" strokeWidth={2} name="Total Users" />
              <Area type="monotone" dataKey="active" stroke="#22C55E" fill="url(#activeGrad)" strokeWidth={2} name="Active Users" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Roles Pie */}
        <div className="card-premium p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Users by Role</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={roleData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                {roleData.map((_, i) => <Cell key={i} fill={ROLE_COLORS[i % ROLE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`${(v / 1000).toFixed(0)}K`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {roleData.slice(0, 4).map((r, i) => (
              <div key={r.name} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: ROLE_COLORS[i] }} />
                <span className="flex-1 text-gray-600">{r.name}</span>
                <span className="font-semibold text-navy-900">{(r.value / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Items & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Items */}
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-900 flex items-center gap-2">
              <Clock size={15} className="text-amber-500" /> Pending Review
            </h3>
            <span className="tag bg-amber-100 text-amber-700 text-xs">5 items</span>
          </div>
          <div className="space-y-2">
            {pendingItems.map((item, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${item.status === "flagged" ? "bg-red-50 border border-red-100" : "bg-amber-50 border border-amber-100"}`}>
                <span className={`tag text-xs ${item.status === "flagged" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{item.type}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-900 truncate">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => {}} className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600">✓</button>
                  <button onClick={() => {}} className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600">✗</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card-premium p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Add User", icon: "👤", tab: "users" },
              { label: "Post Job", icon: "💼", tab: "jobs" },
              { label: "Add Property", icon: "🏠", tab: "properties" },
              { label: "New Blog Post", icon: "📝", tab: "blog" },
              { label: "Analytics", icon: "📊", tab: "analytics" },
              { label: "System Settings", icon: "⚙️", tab: "settings" },
            ].map(a => (
              <button
                key={a.label}
                onClick={() => onNavigate(a.tab)}
                className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-navy-50 border border-gray-200 hover:border-navy-300 rounded-xl transition-all text-left"
              >
                <span className="text-lg">{a.icon}</span>
                <span className="text-sm font-medium text-navy-900">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
