import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Bell, Settings, LogOut, Menu, X, User,
  ChevronRight, Search, Sparkles, MessageSquare, Bookmark
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";

interface SidebarItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  tab: string;
  badge?: number;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  title: string;
  subtitle: string;
  role: string;
  roleEmoji: string;
}

export default function DashboardLayout({
  children, sidebarItems, activeTab, onTabChange, title, subtitle, role, roleEmoji
}: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { success } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = () => {
    logout();
    success("Logged out successfully.");
    navigate("/");
  };

  const profileInitial = user?.name?.charAt(0).toUpperCase() || "U";
  const completeness = user?.profileCompleteness || 30;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-navy-900 z-50 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:z-auto`}>
        {/* Logo */}
        <div className="p-5 border-b border-navy-800">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-base">E</span>
              </div>
              <span className="font-serif font-bold text-lg text-white">EUROPIUM</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
              <X size={18} />
            </button>
          </div>
          {/* Role badge */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-lg">{roleEmoji}</span>
            <div>
              <p className="text-white text-xs font-semibold capitalize">{role.replace("_", " ")}</p>
              <p className="text-white/50 text-xs">{user?.name}</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-0.5">
            {sidebarItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.tab}
                  onClick={() => { onTabChange(item.tab); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    activeTab === item.tab
                      ? "bg-white/15 text-white font-semibold"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge ? (
                    <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{item.badge}</span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-navy-800 my-3" />

          {/* Common items */}
          <div className="space-y-0.5">
            {[
              { icon: Bookmark, label: "Saved Items", tab: "saved", path: "/saved" },
              { icon: MessageSquare, label: "Messages", tab: "messages", path: "/messages" },
              { icon: Bell, label: "Notifications", tab: "notifications", path: "/notifications" },
              { icon: User, label: "Profile", tab: "profile", path: "/profile" },
              { icon: Settings, label: "Settings", tab: "settings", path: "/profile" },
            ].map(item => {
              const Icon = item.icon;
              return (
                <Link key={item.tab} to={item.path} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all">
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </nav>

        {/* Profile Completeness */}
        <div className="p-4 border-t border-navy-800">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs text-white/60">Profile</p>
            <p className="text-xs text-white/80 font-semibold">{completeness}%</p>
          </div>
          <div className="h-1.5 bg-navy-800 rounded-full overflow-hidden">
            <div className="h-full bg-gold-500 rounded-full transition-all" style={{ width: `${completeness}%` }} />
          </div>
          {completeness < 100 && (
            <Link to="/profile" className="text-xs text-gold-400 hover:text-gold-300 mt-1 block">Complete profile →</Link>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-border sticky top-0 z-30 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu size={20} className="text-gray-600" />
            </button>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-navy-900 text-sm">{title}</h1>
              <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xs hidden md:block">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royalblue-500 focus:border-royalblue-500" />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Link to="/ai-advisor" className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold rounded-lg transition-all">
              <Sparkles size={13} className="text-gold-400" /> AI Advisor
            </Link>
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">3</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-premium-xl border border-border z-50">
                  <div className="p-4 border-b border-border">
                    <p className="font-semibold text-navy-900 text-sm">Notifications</p>
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      { t: "New job match found", m: "Senior Developer at SAP — Berlin", time: "2h ago", dot: true },
                      { t: "Scholarship deadline", m: "Erasmus+ closes in 27 days", time: "5h ago", dot: true },
                      { t: "Profile reminder", m: "Complete your profile to get better matches", time: "1d ago", dot: true },
                    ].map((n, i) => (
                      <div key={i} className="flex gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-royalblue-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-navy-900">{n.t}</p>
                          <p className="text-xs text-gray-500">{n.m}</p>
                          <p className="text-xs text-gray-400">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <Link to="/notifications" onClick={() => setNotifOpen(false)} className="text-xs text-royalblue-600 hover:underline w-full text-center block">View all notifications</Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/profile" className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white font-semibold text-sm">
              {profileInitial}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
