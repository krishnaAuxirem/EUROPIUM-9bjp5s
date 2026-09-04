import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Briefcase, Save, Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export default function ProfilePage() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const { success } = useToast();

  const [name, setName] = useState(user?.name ?? "");
  const [profession, setProfession] = useState(user?.profession ?? "");
  const [country, setCountry] = useState(user?.country ?? "");
  const [city, setCity] = useState(user?.city ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    updateUser({ name, profession, country, city });
    setSaving(false);
    success("Profile updated successfully!");
  };

  return (
    <div className="page-container">
      <section className="bg-navy-900 py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-white/60 mt-1">Manage your personal information and preferences.</p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <div className="max-w-2xl">
          <div className="card-premium p-8 mb-6">
            {/* Avatar */}
            <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-100">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-navy-900 flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">{user.name.charAt(0)}</span>
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-royalblue-500 flex items-center justify-center shadow">
                  <Camera size={13} className="text-white" />
                </button>
              </div>
              <div>
                <h2 className="font-semibold text-navy-900 text-xl">{user.name}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <span className={`tag text-xs mt-1 inline-block ${user.plan === "premium" ? "tag-gold" : "tag-gray"}`}>
                  {user.plan === "premium" ? "⭐ Premium Member" : "Free Plan"}
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-premium pl-10" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input type="email" value={user.email} readOnly className="input-premium bg-gray-50 cursor-not-allowed text-gray-500" />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed after registration.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Profession / Role</label>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={profession} onChange={e => setProfession(e.target.value)} placeholder="e.g. Software Engineer" className="input-premium pl-10" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="Germany" className="input-premium pl-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                  <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Berlin" className="input-premium" />
                </div>
              </div>

              <button onClick={handleSave} disabled={saving} className="btn-primary w-full justify-center py-3.5">
                {saving ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</span>
                ) : (
                  <><Save size={16} /> Save Changes</>
                )}
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="font-semibold text-red-800 mb-2">Danger Zone</h3>
            <p className="text-red-600 text-sm mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="border border-red-300 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl text-sm font-medium transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
