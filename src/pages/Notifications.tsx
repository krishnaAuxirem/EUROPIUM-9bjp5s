import { useState, useMemo } from "react";
import {
  Bell, BellOff, CheckCheck, Trash2, Filter, Briefcase, GraduationCap,
  Home, AlertCircle, MessageSquare, Building2, Calendar, Award, X,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Notification } from "@/types";
import { notifications as initialNotifications } from "@/lib/mockData";

const MORE_NOTIFICATIONS: Notification[] = [
  { id: "n6", type: "university", title: "Application deadline approaching", message: "ETH Zurich MSc Computer Science deadline is in 30 days — December 15, 2026", read: false, time: "4 hours ago", link: "/education/u2" },
  { id: "n7", type: "job", title: "New job match: Frontend Developer", message: "Frontend Developer at Adyen Amsterdam — €75,000–€100,000. Matches your React skills!", read: false, time: "6 hours ago", link: "/jobs/j11" },
  { id: "n8", type: "business", title: "Business opportunity alert", message: "EIC Accelerator application window opens — up to €17.5M in funding for your startup", read: false, time: "8 hours ago", link: "/opportunities/o10" },
  { id: "n9", type: "property", title: "Property price drop alert", message: "Barcelona Eixample Penthouse — price reduced by €50,000 in your saved listings", read: true, time: "1 day ago", link: "/housing/p7" },
  { id: "n10", type: "event", title: "Community event in your city", message: "Berlin Tech Expats Meetup on Sep 28 — 124 people attending!", read: true, time: "1 day ago", link: "/community" },
  { id: "n11", type: "opportunity", title: "Erasmus+ deadline in 14 days", message: "Complete your Erasmus+ scholarship application before October 1, 2026", read: true, time: "2 days ago", link: "/opportunities/o2" },
  { id: "n12", type: "message", title: "New message from employer", message: "Hans Weber (Landlord) sent you a message about the Berlin apartment viewing", read: true, time: "2 days ago", link: "/messages" },
];

const ALL_NOTIFICATIONS = [...initialNotifications, ...MORE_NOTIFICATIONS];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  job: <Briefcase size={16} className="text-royalblue-600" />,
  opportunity: <Award size={16} className="text-gold-600" />,
  university: <GraduationCap size={16} className="text-purple-600" />,
  property: <Home size={16} className="text-emerald-600" />,
  message: <MessageSquare size={16} className="text-navy-600" />,
  system: <AlertCircle size={16} className="text-gray-500" />,
  alert: <Bell size={16} className="text-orange-500" />,
  business: <Building2 size={16} className="text-royalblue-700" />,
  event: <Calendar size={16} className="text-pink-600" />,
};

const TYPE_BG: Record<string, string> = {
  job: "bg-royalblue-50",
  opportunity: "bg-gold-50",
  university: "bg-purple-50",
  property: "bg-emerald-50",
  message: "bg-navy-50",
  system: "bg-gray-50",
  alert: "bg-orange-50",
  business: "bg-royalblue-50",
  event: "bg-pink-50",
};

const FILTER_OPTIONS = ["All", "Jobs", "Opportunities", "Universities", "Properties", "Messages", "Events", "Business"];

const filterMap: Record<string, string[]> = {
  "Jobs": ["job"],
  "Opportunities": ["opportunity"],
  "Universities": ["university"],
  "Properties": ["property"],
  "Messages": ["message"],
  "Events": ["event"],
  "Business": ["business"],
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(ALL_NOTIFICATIONS);
  const [filter, setFilter] = useState("All");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = useMemo(() => {
    return notifications.filter(n => {
      const matchFilter = filter === "All" || (filterMap[filter] ?? []).includes(n.type);
      const matchUnread = !showUnreadOnly || !n.read;
      return matchFilter && matchUnread;
    });
  }, [notifications, filter, showUnreadOnly]);

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotif = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="bg-navy-900 py-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gold-500 flex items-center justify-center">
                  <Bell size={28} className="text-white" />
                </div>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="font-serif text-4xl font-bold text-white mb-1">Notifications</h1>
                <p className="text-white/60 text-base">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl transition-all"
                >
                  <CheckCheck size={16} /> Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm font-semibold rounded-xl transition-all"
                >
                  <Trash2 size={16} /> Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Main notifications */}
          <div>
            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                {FILTER_OPTIONS.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                      filter === f ? "bg-navy-900 text-white border-navy-900" : "bg-white text-gray-600 border-gray-200 hover:border-navy-400"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ml-auto ${
                  showUnreadOnly ? "bg-navy-900 text-white border-navy-900" : "bg-white text-gray-600 border-gray-200 hover:border-navy-400"
                }`}
              >
                <Filter size={14} /> Unread only
              </button>
            </div>

            {/* Notification list */}
            {filtered.length === 0 ? (
              <div className="card-premium p-16 text-center">
                <BellOff size={48} className="text-gray-200 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-navy-900 mb-2">No notifications</h3>
                <p className="text-gray-400">
                  {showUnreadOnly ? "No unread notifications." : "You're all caught up!"}
                </p>
                {showUnreadOnly && (
                  <button onClick={() => setShowUnreadOnly(false)} className="btn-primary mt-4">Show all</button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map(notif => (
                  <div
                    key={notif.id}
                    className={`rounded-2xl border p-4 transition-all group ${
                      !notif.read ? "bg-white border-royalblue-200 border-l-4 border-l-royalblue-500" : "bg-white border-gray-100 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${TYPE_BG[notif.type] ?? "bg-gray-50"} flex items-center justify-center shrink-0`}>
                        {TYPE_ICONS[notif.type] ?? <Bell size={16} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className={`text-sm font-semibold ${notif.read ? "text-gray-600" : "text-navy-900"}`}>
                              {notif.title}
                            </p>
                            <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{notif.message}</p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {!notif.read && (
                              <button
                                onClick={() => markRead(notif.id)}
                                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                title="Mark as read"
                              >
                                <CheckCheck size={14} className="text-emerald-500" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotif(notif.id)}
                              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              title="Delete"
                            >
                              <X size={14} className="text-red-400" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">{notif.time}</span>
                          {notif.link && (
                            <Link
                              to={notif.link}
                              onClick={() => markRead(notif.id)}
                              className="flex items-center gap-1 text-xs text-royalblue-600 font-semibold hover:underline"
                            >
                              View <ChevronRight size={11} />
                            </Link>
                          )}
                        </div>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-royalblue-500 mt-1 shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar: Preferences */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-navy-900 mb-4">Notification Preferences</h3>
              <div className="space-y-3">
                {[
                  { label: "Job Alerts", icon: Briefcase, active: true },
                  { label: "Scholarship Deadlines", icon: GraduationCap, active: true },
                  { label: "Property Alerts", icon: Home, active: true },
                  { label: "Business Opportunities", icon: Building2, active: false },
                  { label: "Community Events", icon: Calendar, active: true },
                  { label: "Application Reminders", icon: AlertCircle, active: true },
                ].map(pref => {
                  const Icon = pref.icon;
                  return (
                    <label key={pref.label} className="flex items-center justify-between gap-3 cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <Icon size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-700">{pref.label}</span>
                      </div>
                      <div className={`w-10 h-5 rounded-full transition-all ${pref.active ? "bg-emerald-500" : "bg-gray-200"} relative`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${pref.active ? "left-5" : "left-0.5"}`} />
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-navy-900 rounded-2xl p-5 text-white">
              <h3 className="font-semibold mb-3 text-sm">Summary</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Total notifications", value: notifications.length },
                  { label: "Unread", value: unreadCount },
                  { label: "Jobs", value: notifications.filter(n => n.type === "job").length },
                  { label: "Deadlines", value: notifications.filter(n => n.type === "opportunity" || n.type === "university").length },
                ].map(s => (
                  <div key={s.label} className="flex justify-between items-center py-1.5 border-b border-white/10 last:border-0">
                    <span className="text-white/60">{s.label}</span>
                    <span className="font-semibold">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
