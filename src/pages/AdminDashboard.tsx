import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, Building2, Briefcase, Home, GraduationCap,
  TrendingUp, FileText, Shield, BarChart2, Settings, LogOut,
  Bell, Search, ChevronRight, Menu, X, Newspaper, DollarSign,
  AlertTriangle, CheckCircle, Clock, Eye
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import AdminOverview from "./admin/AdminOverview";
import AdminUsers from "./admin/AdminUsers";
import AdminJobs from "./admin/AdminJobs";
import AdminProperties from "./admin/AdminProperties";
import AdminUniversities from "./admin/AdminUniversities";
import AdminOpportunities from "./admin/AdminOpportunities";
import AdminBlog from "./admin/AdminBlog";
import AdminAnalytics from "./admin/AdminAnalytics";
import AdminSettings from "./admin/AdminSettings";
import AdminBusinesses from "./admin/AdminBusinesses";
import AdminReviews from "./admin/AdminReviews";

const SIDEBAR_SECTIONS = [
  {
    label: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", tab: "overview" },
      { icon: BarChart2, label: "Analytics", tab: "analytics" },
    ]
  },
  {
    label: "Management",
    items: [
      { icon: Users, label: "Users", tab: "users", badge: 12 },
      { icon: Briefcase, label: "Jobs", tab: "jobs", badge: 5 },
      { icon: Home, label: "Properties", tab: "properties", badge: 3 },
      { icon: Building2, label: "Businesses", tab: "businesses" },
      { icon: GraduationCap, label: "Universities", tab: "universities" },
      { icon: TrendingUp, label: "Opportunities", tab: "opportunities" },
      { icon: FileText, label: "Reviews", tab: "reviews" },
    ]
  },
  {
    label: "Content",
    items: [
      { icon: Newspaper, label: "Blog / CMS", tab: "blog" },
    ]
  },
  {
    label: "System",
    items: [
      { icon: Settings, label: "Settings", tab: "settings" },
    ]
  },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    success("Logged out.");
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <AdminOverview onNavigate={setActiveTab} />;
      case "analytics": return <AdminAnalytics />;
      case "users": return <AdminUsers />;
      case "jobs": return <AdminJobs />;
      case "properties": return <AdminProperties />;
      case "businesses": return <AdminBusinesses />;
      case "universities": return <AdminUniversities />;
      case "opportunities": return <AdminOpportunities />;
      case "reviews": return <AdminReviews />;
      case "blog": return <AdminBlog />;
      case "settings": return <AdminSettings />;
      default: return <AdminOverview onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-navy-950 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="p-5 border-b border-navy-800">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-base">E</span>
              </div>
              <div>
                <span className="font-serif font-bold text-base text-white">EUROPIUM</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <Shield size={10} className="text-gold-400" />
                  <span className="text-gold-400 text-[10px] font-semibold">ADMIN</span>
                </div>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
              <X size={18} />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto space-y-4">
          {SIDEBAR_SECTIONS.map(section => (
            <div key={section.label}>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-wider px-3 mb-1">{section.label}</p>
              <div className="space-y-0.5">
                {section.items.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => { setActiveTab(item.tab); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                        activeTab === item.tab
                          ? "bg-white/15 text-white font-semibold"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon size={16} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {"badge" in item && item.badge ? (
                        <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{item.badge}</span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-navy-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user?.name}</p>
              <p className="text-white/40 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all">
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-border sticky top-0 z-30 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu size={20} />
            </button>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-navy-900 text-sm">Admin Panel</h1>
              <p className="text-xs text-gray-400">EUROPIUM Management Console</p>
            </div>
          </div>

          <div className="flex-1 max-w-xs hidden md:block">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search anything..." className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royalblue-500 focus:border-royalblue-500" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">8</span>
            </button>
            <Link to="/" className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-navy-900 border border-gray-200 rounded-lg text-xs hover:bg-gray-50 transition-all">
              <Eye size={13} /> View Site
            </Link>
            <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white font-semibold text-sm">
              {user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
