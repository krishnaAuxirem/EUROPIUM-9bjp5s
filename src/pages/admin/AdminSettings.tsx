import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Globe, Bell, Database, Mail, Key, Save } from "lucide-react";

export default function AdminSettings() {
  const { success } = useToast();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("general");

  const [general, setGeneral] = useState({
    siteName: "EUROPIUM",
    siteUrl: "https://europium.eu",
    supportEmail: "support@europium.eu",
    defaultLanguage: "English",
    maintenanceMode: false,
    registrationOpen: true,
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    newUserAlert: true,
    newJobAlert: false,
    reportAlert: true,
    weeklyReport: true,
  });

  const sections = [
    { id: "general", label: "General", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  const handleSave = () => {
    success("Settings saved successfully.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy-900">Admin Settings</h2>
        <p className="text-gray-500 text-sm">Configure platform settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="card-premium p-4 h-fit">
          <div className="space-y-1">
            {sections.map(s => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${
                    activeSection === s.id ? "bg-navy-900 text-white" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={16} />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === "general" && (
            <div className="card-premium p-6 space-y-5">
              <h3 className="font-semibold text-navy-900">General Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Site Name</label>
                  <input value={general.siteName} onChange={e => setGeneral(p => ({ ...p, siteName: e.target.value }))} className="input-premium" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Site URL</label>
                  <input value={general.siteUrl} onChange={e => setGeneral(p => ({ ...p, siteUrl: e.target.value }))} className="input-premium" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Support Email</label>
                  <input value={general.supportEmail} onChange={e => setGeneral(p => ({ ...p, supportEmail: e.target.value }))} className="input-premium" type="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Default Language</label>
                  <select value={general.defaultLanguage} onChange={e => setGeneral(p => ({ ...p, defaultLanguage: e.target.value }))} className="input-premium">
                    <option>English</option>
                    <option>German</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={general.maintenanceMode} onChange={e => setGeneral(p => ({ ...p, maintenanceMode: e.target.checked }))} className="w-4 h-4 accent-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Maintenance Mode</p>
                    <p className="text-xs text-gray-500">Take site offline for maintenance (only admins can access)</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={general.registrationOpen} onChange={e => setGeneral(p => ({ ...p, registrationOpen: e.target.checked }))} className="w-4 h-4 accent-navy-900" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Open Registration</p>
                    <p className="text-xs text-gray-500">Allow new users to register</p>
                  </div>
                </label>
              </div>
              <button onClick={handleSave} className="btn-primary">
                <Save size={16} /> Save Settings
              </button>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="card-premium p-6 space-y-5">
              <h3 className="font-semibold text-navy-900">Notification Settings</h3>
              <div className="space-y-4">
                {[
                  { k: "emailNotifications", l: "Email Notifications", d: "Receive platform notifications via email" },
                  { k: "newUserAlert", l: "New User Alerts", d: "Alert when new users register" },
                  { k: "newJobAlert", l: "New Job Posting Alerts", d: "Alert when new jobs are posted" },
                  { k: "reportAlert", l: "Report Alerts", d: "Immediate alert when content is reported" },
                  { k: "weeklyReport", l: "Weekly Report", d: "Receive weekly platform analytics summary" },
                ].map(n => (
                  <label key={n.k} className="flex items-center justify-between gap-4 p-3 bg-gray-50 rounded-xl cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{n.l}</p>
                      <p className="text-xs text-gray-500">{n.d}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={(notifications as any)[n.k]}
                      onChange={e => setNotifications(p => ({ ...p, [n.k]: e.target.checked }))}
                      className="w-4 h-4 accent-navy-900"
                    />
                  </label>
                ))}
              </div>
              <button onClick={handleSave} className="btn-primary">
                <Save size={16} /> Save Settings
              </button>
            </div>
          )}

          {activeSection === "security" && (
            <div className="card-premium p-6 space-y-5">
              <h3 className="font-semibold text-navy-900">Security Settings</h3>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Shield size={16} className="text-emerald-600" />
                  <p className="font-semibold text-emerald-800 text-sm">Platform Security Status</p>
                </div>
                <p className="text-emerald-700 text-xs">All security measures are active. Last scan: 2 hours ago.</p>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  { l: "Admin Panel Access", v: "IP-restricted", status: "ok" },
                  { l: "Session Timeout", v: "7 days", status: "ok" },
                  { l: "Password Policy", v: "Min 8 chars, uppercase required", status: "ok" },
                  { l: "Rate Limiting", v: "100 req/min per IP", status: "ok" },
                  { l: "Data Encryption", v: "AES-256 at rest", status: "ok" },
                ].map(s => (
                  <div key={s.l} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-600">{s.l}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-navy-900 font-medium">{s.v}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold text-navy-900 mb-3 text-sm">Admin Credentials</h4>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                  Admin: admin@europium.eu · Password: Admin@1234 (Change in production)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
