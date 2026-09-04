import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, CartesianGrid
} from "recharts";

const monthlyData = [
  { month: "Jan", users: 85000, jobs: 240, applications: 1200, revenue: 850000 },
  { month: "Feb", users: 110000, jobs: 290, applications: 1800, revenue: 1100000 },
  { month: "Mar", users: 145000, jobs: 350, applications: 2400, revenue: 1450000 },
  { month: "Apr", users: 190000, jobs: 420, applications: 3200, revenue: 1900000 },
  { month: "May", users: 260000, jobs: 510, applications: 4100, revenue: 2600000 },
  { month: "Jun", users: 340000, jobs: 620, applications: 5300, revenue: 3400000 },
  { month: "Jul", users: 480000, jobs: 780, applications: 7200, revenue: 4800000 },
  { month: "Aug", users: 680000, jobs: 920, applications: 9800, revenue: 6800000 },
  { month: "Sep", users: 890000, jobs: 1100, applications: 12400, revenue: 8900000 },
  { month: "Oct", users: 1050000, jobs: 1320, applications: 14800, revenue: 10500000 },
  { month: "Nov", users: 1150000, jobs: 1480, applications: 16200, revenue: 11500000 },
  { month: "Dec", users: 1200000, jobs: 1600, applications: 17400, revenue: 12000000 },
];

const countryData = [
  { country: "Germany", users: 240000, jobs: 420 },
  { country: "France", users: 185000, jobs: 310 },
  { country: "Netherlands", users: 142000, jobs: 240 },
  { country: "Sweden", users: 98000, jobs: 160 },
  { country: "Spain", users: 178000, jobs: 285 },
  { country: "Portugal", users: 89000, jobs: 140 },
  { country: "Italy", users: 156000, jobs: 230 },
];

const COLORS = ["#2563EB", "#22C55E", "#D4A72C", "#EF4444", "#8B5CF6", "#F97316", "#06B6D4"];

const engagementData = [
  { month: "Jan", pageViews: 1.2, sessions: 0.8, bounceRate: 42 },
  { month: "Feb", pageViews: 1.8, sessions: 1.2, bounceRate: 38 },
  { month: "Mar", pageViews: 2.4, sessions: 1.6, bounceRate: 35 },
  { month: "Apr", pageViews: 3.2, sessions: 2.1, bounceRate: 32 },
  { month: "May", pageViews: 4.1, sessions: 2.8, bounceRate: 31 },
  { month: "Jun", pageViews: 5.3, sessions: 3.6, bounceRate: 29 },
  { month: "Jul", pageViews: 7.2, sessions: 4.9, bounceRate: 28 },
  { month: "Aug", pageViews: 9.8, sessions: 6.7, bounceRate: 27 },
  { month: "Sep", pageViews: 12.4, sessions: 8.4, bounceRate: 25 },
  { month: "Oct", pageViews: 14.8, sessions: 10.1, bounceRate: 24 },
  { month: "Nov", pageViews: 16.2, sessions: 11.0, bounceRate: 23 },
  { month: "Dec", users: 17.4, sessions: 11.8, bounceRate: 22 },
];

export default function AdminAnalytics() {
  const [period, setPeriod] = useState("year");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-navy-900">Analytics</h2>
          <p className="text-gray-500 text-sm">Platform performance overview for 2026</p>
        </div>
        <div className="flex gap-2">
          {["month", "quarter", "year"].map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${period === p ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {p === "year" ? "This Year" : p === "quarter" ? "This Quarter" : "This Month"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { l: "Total Users", v: "1.2M", trend: "+142%", color: "text-royalblue-600" },
          { l: "Job Applications", v: "17.4K", trend: "+1,350%", color: "text-emerald-600" },
          { l: "Revenue (INR)", v: "₹108Cr", trend: "+312%", color: "text-gold-600" },
          { l: "Active Sessions", v: "11.8K", trend: "+1,375%", color: "text-navy-600" },
        ].map(k => (
          <div key={k.l} className="card-premium p-4">
            <p className={`font-bold text-2xl font-serif ${k.color}`}>{k.v}</p>
            <p className="text-xs text-gray-500 mt-0.5">{k.l}</p>
            <p className="text-xs font-semibold text-emerald-600 mt-1">↑ {k.trend} YoY</p>
          </div>
        ))}
      </div>

      {/* User Growth */}
      <div className="card-premium p-6">
        <h3 className="font-semibold text-navy-900 mb-4">User Growth (Jan–Dec 2026)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(v: number) => [`${(v / 1000).toFixed(0)}K users`]} />
            <Area type="monotone" dataKey="users" stroke="#2563EB" fill="url(#ag)" strokeWidth={2.5} name="Users" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Jobs & Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-premium p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Job Applications Monthly</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="applications" fill="#22C55E" radius={[4, 4, 0, 0]} name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-premium p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Revenue (₹ Lakh)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(v: number) => [`₹${(v / 100000).toFixed(1)}L`]} />
              <Line type="monotone" dataKey="revenue" stroke="#D4A72C" strokeWidth={2.5} dot={{ fill: "#D4A72C", r: 3 }} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Country Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-premium p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Users by Country</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={countryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="country" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip formatter={(v: number) => [`${(v / 1000).toFixed(0)}K`]} />
              <Bar dataKey="users" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-premium p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Engagement Metrics</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={engagementData.slice(-6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pageViews" stroke="#2563EB" strokeWidth={2} name="Page Views (M)" dot={false} />
              <Line type="monotone" dataKey="sessions" stroke="#22C55E" strokeWidth={2} name="Sessions (M)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
