import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import type { User } from "@/types";

// Keep Profile page as-is but ensure it redirects to login if not authenticated
import { Link } from "react-router-dom";
import {
  User as UserIcon, MapPin, Briefcase, GraduationCap, Globe,
  Edit2, Plus, Trash2, Save, X, Award, Languages, Target, Shield,
  CheckCircle
} from "lucide-react";

const SKILLS_SUGGESTIONS = ["React", "TypeScript", "Python", "Node.js", "AWS", "Java", "Go", "Docker", "Kubernetes", "SQL", "Machine Learning", "Product Management", "Marketing", "Finance", "Data Analysis"];
const LANGUAGES = ["English", "German", "French", "Spanish", "Italian", "Dutch", "Portuguese", "Swedish", "Polish", "Chinese", "Japanese", "Arabic", "Hindi"];
const COUNTRIES = ["Germany", "France", "Netherlands", "Sweden", "Portugal", "Spain", "Italy", "Switzerland", "Denmark", "Austria", "Norway", "Poland", "Belgium", "Ireland"];

export default function ProfilePage() {
  const { user, updateUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { success, info } = useToast();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    country: user?.country || "",
    city: user?.city || "",
    phone: user?.phone || "",
    profession: user?.profession || "",
    salaryExpectation: user?.salaryExpectation || "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [showSkillInput, setShowSkillInput] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view your profile.</p>
          <Link to="/login" className="btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  const completeness = user?.profileCompleteness || 0;

  const handleSave = () => {
    updateUser({ ...form });
    setEditing(false);
    success("Profile updated successfully!");
  };

  const addSkill = (skill: string) => {
    if (!skill.trim()) return;
    const skills = [...(user?.skills || [])];
    if (!skills.includes(skill)) {
      updateUser({ skills: [...skills, skill] });
      success(`Added "${skill}" to skills`);
    }
    setNewSkill("");
    setShowSkillInput(false);
  };

  const removeSkill = (skill: string) => {
    updateUser({ skills: (user?.skills || []).filter(s => s !== skill) });
  };

  const toggleLanguage = (lang: string) => {
    const langs = user?.languages || [];
    if (langs.includes(lang)) {
      updateUser({ languages: langs.filter(l => l !== lang) });
    } else {
      updateUser({ languages: [...langs, lang] });
    }
  };

  const toggleCountry = (c: string) => {
    const countries = user?.preferredCountries || [];
    if (countries.includes(c)) {
      updateUser({ preferredCountries: countries.filter(x => x !== c) });
    } else {
      updateUser({ preferredCountries: [...countries, c] });
    }
  };

  const ROLE_COLORS: Record<string, string> = {
    traveler: "bg-royalblue-500",
    student: "bg-gold-500",
    job_seeker: "bg-emerald-600",
    relocator: "bg-purple-600",
    entrepreneur: "bg-orange-500",
    employer: "bg-navy-700",
    property_provider: "bg-teal-600",
    admin: "bg-red-600",
  };

  return (
    <div className="page-container">
      <section className="bg-navy-900 py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gold-500 flex items-center justify-center text-white font-serif font-bold text-3xl shrink-0">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="font-serif text-3xl font-bold text-white">{user?.name}</h1>
                {user?.verified && <CheckCircle size={20} className="text-royalblue-400" />}
                <span className={`tag text-xs text-white ${ROLE_COLORS[user?.role || ""] || "bg-navy-700"}`}>
                  {(user?.role || "").replace("_", " ")}
                </span>
              </div>
              <p className="text-white/70">{user?.profession || "No profession set"}</p>
              <p className="text-white/50 text-sm">{user?.city}{user?.country ? `, ${user.country}` : ""} · Joined {user?.joinedDate}</p>
            </div>
            <div className="flex gap-3 shrink-0">
              {!editing && (
                <button onClick={() => { setEditing(true); setForm({ name: user?.name || "", bio: user?.bio || "", country: user?.country || "", city: user?.city || "", phone: user?.phone || "", profession: user?.profession || "", salaryExpectation: user?.salaryExpectation || "" }); }} className="btn-secondary text-sm">
                  <Edit2 size={14} /> Edit Profile
                </button>
              )}
              <Link to="/dashboard" className="btn-gold text-sm">My Dashboard</Link>
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="mt-6 bg-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/80 text-sm font-semibold">Profile Completeness</p>
              <p className="text-white font-bold">{completeness}%</p>
            </div>
            <div className="h-2 bg-white/20 rounded-full">
              <div className={`h-full rounded-full transition-all duration-500 ${completeness === 100 ? "bg-emerald-400" : completeness > 60 ? "bg-gold-400" : "bg-royalblue-400"}`} style={{ width: `${completeness}%` }} />
            </div>
            {completeness < 100 && (
              <p className="text-white/50 text-xs mt-1">Complete your profile to get better matches and recommendations</p>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-navy-900">Basic Information</h2>
                {editing && (
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="btn-primary text-sm py-2 px-3"><Save size={14} /> Save</button>
                    <button onClick={() => setEditing(false)} className="btn-secondary text-sm py-2 px-3"><X size={14} /></button>
                  </div>
                )}
              </div>
              {editing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="input-premium" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                    <input value={form.profession} onChange={e => setForm(p => ({ ...p, profession: e.target.value }))} className="input-premium" placeholder="e.g. Software Engineer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))} className="input-premium">
                      <option value="">Select country</option>
                      {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} className="input-premium" placeholder="e.g. Berlin" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="input-premium" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Expectation</label>
                    <input value={form.salaryExpectation} onChange={e => setForm(p => ({ ...p, salaryExpectation: e.target.value }))} className="input-premium" placeholder="e.g. €70K – €90K" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} rows={3} className="input-premium resize-none" placeholder="Tell us about yourself..." />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { l: "Email", v: user?.email, icon: "📧" },
                    { l: "Profession", v: user?.profession, icon: "💼" },
                    { l: "Location", v: user?.city && user?.country ? `${user.city}, ${user.country}` : user?.country || user?.city, icon: "📍" },
                    { l: "Phone", v: user?.phone, icon: "📱" },
                    { l: "Plan", v: user?.plan, icon: "⭐" },
                    { l: "Salary", v: user?.salaryExpectation, icon: "💰" },
                  ].map(f => f.v ? (
                    <div key={f.l} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <span className="text-xl">{f.icon}</span>
                      <div>
                        <p className="text-xs text-gray-500">{f.l}</p>
                        <p className="font-semibold text-navy-900 text-sm capitalize">{f.v}</p>
                      </div>
                    </div>
                  ) : null)}
                  {user?.bio && (
                    <div className="sm:col-span-2 p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Bio</p>
                      <p className="text-gray-700 text-sm">{user.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-navy-900">Skills</h2>
                <button onClick={() => setShowSkillInput(!showSkillInput)} className="text-xs text-royalblue-600 hover:underline flex items-center gap-1">
                  <Plus size={14} /> Add Skill
                </button>
              </div>
              {showSkillInput && (
                <div className="flex gap-2 mb-4">
                  <input
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addSkill(newSkill)}
                    placeholder="Type skill..."
                    className="input-premium flex-1 text-sm"
                    autoFocus
                  />
                  <button onClick={() => addSkill(newSkill)} className="btn-primary text-sm py-2 px-3">Add</button>
                </div>
              )}
              {showSkillInput && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {SKILLS_SUGGESTIONS.filter(s => !(user?.skills || []).includes(s)).map(s => (
                    <button key={s} onClick={() => addSkill(s)} className="tag tag-gray text-xs hover:bg-royalblue-100 hover:text-royalblue-700 transition-colors cursor-pointer">
                      + {s}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {(user?.skills || []).map(skill => (
                  <div key={skill} className="flex items-center gap-1 bg-navy-100 text-navy-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="text-navy-400 hover:text-red-500 transition-colors ml-1">
                      <X size={12} />
                    </button>
                  </div>
                ))}
                {(!user?.skills || user.skills.length === 0) && (
                  <p className="text-gray-400 text-sm">No skills added yet. Add your skills to get better job matches.</p>
                )}
              </div>
            </div>

            {/* Languages */}
            <div className="card-premium p-6">
              <h2 className="font-semibold text-navy-900 mb-4">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map(lang => {
                  const selected = (user?.languages || []).includes(lang);
                  return (
                    <button
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`tag cursor-pointer transition-all ${selected ? "bg-royalblue-500 text-white" : "tag-gray hover:tag-blue"}`}
                    >
                      {selected && <CheckCircle size={11} />}
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferred Countries */}
            <div className="card-premium p-6">
              <h2 className="font-semibold text-navy-900 mb-4">Preferred Countries</h2>
              <div className="flex flex-wrap gap-2">
                {COUNTRIES.map(c => {
                  const selected = (user?.preferredCountries || []).includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() => toggleCountry(c)}
                      className={`tag cursor-pointer transition-all ${selected ? "bg-emerald-500 text-white" : "tag-gray hover:tag-green"}`}
                    >
                      {selected && <CheckCircle size={11} />}
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Account */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-3">Account Details</h3>
              <div className="space-y-2 text-sm">
                {[
                  { l: "Plan", v: user?.plan === "premium" ? "Premium ⭐" : "Free" },
                  { l: "Role", v: (user?.role || "").replace("_", " ") },
                  { l: "Member Since", v: user?.joinedDate },
                  { l: "Profile", v: `${completeness}% complete` },
                  { l: "Email Verified", v: user?.emailVerified ? "Yes ✓" : "No" },
                ].map(d => (
                  <div key={d.l} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500">{d.l}</span>
                    <span className="font-semibold text-navy-900 capitalize">{d.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-3">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { l: "My Dashboard", path: "/dashboard" },
                  { l: "Saved Items", path: "/saved" },
                  { l: "Applications", path: "/applications" },
                  { l: "Messages", path: "/messages" },
                  { l: "Notifications", path: "/notifications" },
                ].map(l => (
                  <Link key={l.path} to={l.path} className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-royalblue-600 transition-colors">
                    {l.l} →
                  </Link>
                ))}
              </div>
            </div>

            {/* Upgrade */}
            {user?.plan !== "premium" && (
              <div className="bg-gradient-to-br from-navy-900 to-royalblue-700 rounded-2xl p-5 text-white">
                <p className="text-gold-400 font-semibold text-sm mb-1">EUROPIUM Premium</p>
                <h3 className="font-serif text-xl font-bold mb-2">Unlock Full Access</h3>
                <ul className="text-white/70 text-xs space-y-1 mb-4">
                  <li>• Unlimited job applications</li>
                  <li>• Advanced AI Advisor access</li>
                  <li>• Priority support</li>
                  <li>• Premium listings</li>
                </ul>
                <button onClick={() => info("Premium plans coming soon!")} className="btn-gold w-full justify-center text-sm">
                  Upgrade to Premium
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
