import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell, User, Menu, X, ChevronDown, Globe, Briefcase, GraduationCap,
  Plane, Home, Building2, TrendingUp, Sparkles, LogOut, Settings, Bookmark, ClipboardList,
  MapPin, Calculator, Users, MessageSquare
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { notifications } from "@/lib/mockData";

const navItems = [
  { label: "Explore", path: "/explore", icon: Globe },
  { label: "Jobs", path: "/jobs", icon: Briefcase },
  { label: "Education", path: "/education", icon: GraduationCap },
  { label: "Travel", path: "/travel", icon: Plane },
  { label: "Housing", path: "/housing", icon: Home },
  { label: "Relocation", path: "/relocation-planner", icon: MapPin },
  { label: "Cost of Living", path: "/cost-calculator", icon: Calculator },
  { label: "AI Advisor", path: "/ai-advisor", icon: Sparkles },
  { label: "Community", path: "/community", icon: Users },
  { label: "Business", path: "/business", icon: Building2 },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  const isActive = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(path));

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-premium border-b border-border/50" : "bg-navy-900/95 backdrop-blur-sm"
      }`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-gold-500 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">E</span>
              </div>
              <span className={`font-serif font-bold text-xl tracking-wide transition-colors ${
                scrolled ? "text-navy-900" : "text-white"
              }`}>
                EUROPIUM
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-0.5">
              {navItems.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(path)
                      ? scrolled
                        ? "bg-navy-900 text-white"
                        : "bg-white/15 text-white"
                      : scrolled
                        ? "text-gray-700 hover:bg-gray-100 hover:text-navy-900"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              {isAuthenticated && (
                <div ref={notifRef} className="relative">
                  <button
                    onClick={() => setNotifOpen(!notifOpen)}
                    className={`relative p-2 rounded-lg transition-all duration-200 ${
                      scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  {notifOpen && (
                    <div className="absolute right-0 top-12 w-[360px] bg-white rounded-2xl shadow-premium-xl border border-border/50 overflow-hidden z-50">
                      <div className="p-4 border-b border-border/50 flex items-center justify-between">
                        <h3 className="font-semibold text-navy-900">Notifications</h3>
                        <div className="flex items-center gap-2">
                          <span className="tag tag-blue">{unreadCount} new</span>
                          <Link to="/notifications" onClick={() => setNotifOpen(false)} className="text-xs text-royalblue-600 hover:underline font-semibold">View all</Link>
                        </div>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map(n => (
                          <div key={n.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!n.read ? "bg-royalblue-50/50" : ""}`}>
                            <div className="flex gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                n.type === "job" ? "bg-royalblue-100 text-royalblue-600" :
                                n.type === "opportunity" ? "bg-gold-100 text-gold-600" :
                                n.type === "alert" ? "bg-red-100 text-red-600" :
                                "bg-gray-100 text-gray-600"
                              }`}>
                                <Bell size={14} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-navy-900">{n.title}</p>
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                              </div>
                              {!n.read && <div className="w-2 h-2 rounded-full bg-royalblue-500 mt-1 shrink-0" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Auth buttons or Profile */}
              {isAuthenticated ? (
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                      scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{user?.name.charAt(0)}</span>
                    </div>
                    <span className={`text-sm font-medium hidden lg:block ${scrolled ? "text-navy-900" : "text-white"}`}>
                      {user?.name.split(" ")[0]}
                    </span>
                    <ChevronDown size={14} className={scrolled ? "text-gray-400" : "text-white/60"} />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-premium-xl border border-border/50 overflow-hidden z-50">
                      <div className="p-3 border-b border-gray-100">
                        <p className="font-semibold text-navy-900 text-sm">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <div className="p-1.5">
                        <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                          <User size={15} /> Dashboard
                        </Link>
                        <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                          <Settings size={15} /> Profile Settings
                        </Link>
                        <Link to="/saved" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                          <Bookmark size={15} /> Saved Items
                        </Link>
                        <Link to="/applications" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                          <ClipboardList size={15} /> Applications
                        </Link>
                        <Link to="/messages" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                          <MessageSquare size={15} /> Messages
                        </Link>
                        <Link to="/notifications" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                          <Bell size={15} /> Notifications
                        </Link>
                        <Link to="/employer-dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                          <Building2 size={15} /> Employer Dashboard
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50">
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    scrolled ? "text-navy-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
                  }`}>
                    Login
                  </Link>
                  <Link to="/register" className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-gold">
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`xl:hidden p-2 rounded-lg transition-colors ${
                  scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="xl:hidden border-t border-white/10 bg-navy-900 pb-4">
            <nav className="max-w-[1400px] mx-auto px-4 pt-3 space-y-0.5">
              {navItems.map(({ label, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(path) ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="flex gap-3 pt-3 border-t border-white/10 mt-2">
                  <Link to="/login" className="flex-1 text-center px-4 py-2.5 rounded-xl text-white/80 border border-white/20 text-sm font-medium">Login</Link>
                  <Link to="/register" className="flex-1 text-center px-4 py-2.5 rounded-xl bg-gold-500 text-white text-sm font-semibold">Register</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
      {/* Spacer */}
      <div className="h-16 lg:h-18" />
    </>
  );
}
