import { useState, useCallback } from "react";
import { MapPin, CheckCircle, Circle, ArrowRight, Sparkles, Clock, AlertCircle, ChevronDown, ChevronUp, TrendingUp, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/contexts/AuthContext";
import type { RelocationChecklist, RelocationCheckItem } from "@/types";

const goals = [
  { value: "Work & Career", emoji: "💼", desc: "Job, work permit, blue card" },
  { value: "Higher Education", emoji: "🎓", desc: "Student visa, university enrollment" },
  { value: "Family Relocation", emoji: "👨‍👩‍👧", desc: "Family visa, school enrollment" },
  { value: "Start a Business", emoji: "🏢", desc: "Company registration, investor visa" },
  { value: "Remote Work", emoji: "💻", desc: "Digital nomad visa, tax setup" },
  { value: "Retirement", emoji: "🌅", desc: "Residence permit, pension transfer" },
];

const countryOptions = ["Germany", "France", "Netherlands", "Sweden", "Portugal", "Spain", "Italy", "Switzerland", "Denmark", "Austria", "Norway", "Poland"];
const timelines = ["1–3 months", "3–6 months", "6–12 months", "12+ months", "Planning ahead"];
const budgets = ["Under €5,000", "€5,000–€15,000", "€15,000–€30,000", "€30,000+"];

function generateChecklist(goal: string, country: string): RelocationChecklist[] {
  const base: RelocationChecklist[] = [
    {
      id: "documents",
      category: "📄 Documents & Identity",
      items: [
        { id: "passport", title: "Valid Passport", description: "Ensure passport is valid for 6+ months beyond intended stay", dueDate: "Immediately", completed: false, priority: "high" },
        { id: "birth-cert", title: "Birth Certificate (Apostilled)", description: "Official apostilled copy required for visa applications", dueDate: "2–4 weeks", completed: false, priority: "high" },
        { id: "photos", title: "Biometric Photos", description: "Recent passport-style photos (usually 35x45mm format)", dueDate: "Before visa application", completed: false, priority: "medium" },
        { id: "edu-certs", title: "Educational Certificates", description: "Degree certificates, transcripts — get official translations", dueDate: "4–6 weeks", completed: false, priority: "medium" },
      ]
    },
    {
      id: "visa",
      category: "🛂 Visa & Immigration",
      items: [
        { id: "visa-type", title: `Research ${country} Visa Requirements`, description: `Determine exact visa category needed for ${country} immigration`, dueDate: "Immediately", completed: false, priority: "high", link: "/opportunities" },
        { id: "visa-apply", title: "Submit Visa Application", description: `Apply at ${country} consulate or embassy in your home country`, dueDate: "6–8 weeks before move", completed: false, priority: "high" },
        { id: "biometrics", title: "Biometric Appointment", description: "Schedule fingerprints and photo at visa application center", dueDate: "After appointment letter", completed: false, priority: "high" },
      ]
    },
    {
      id: "housing",
      category: "🏠 Housing",
      items: [
        { id: "housing-search", title: "Research Neighborhoods", description: `Compare neighborhoods in your target city in ${country}`, dueDate: "3–6 months before", completed: false, priority: "medium", link: "/housing" },
        { id: "housing-book", title: "Book Temporary Accommodation", description: "Arrange short-term accommodation for first 1–3 months", dueDate: "1 month before move", completed: false, priority: "high" },
        { id: "housing-perm", title: "Find Permanent Housing", description: "Search for long-term rental or purchase option", dueDate: "On arrival", completed: false, priority: "medium" },
        { id: "rental-contract", title: "Sign Rental Contract", description: "Review contract carefully — consider legal advice for long-term leases", dueDate: "Before move-in", completed: false, priority: "medium" },
      ]
    },
    {
      id: "registration",
      category: "🏛️ Registration & Admin",
      items: [
        { id: "address-reg", title: "Register Address (Anmeldung/Domicile)", description: `Register your address at local municipality within 2 weeks of arrival in ${country}`, dueDate: "Within 14 days of arrival", completed: false, priority: "high" },
        { id: "bank-account", title: "Open Bank Account", description: "Open a local or expat-friendly bank account (N26, Wise recommended)", dueDate: "First week", completed: false, priority: "high", link: "/local-services" },
        { id: "tax-number", title: "Obtain Tax Identification Number", description: "Required for employment and tax purposes in most EU countries", dueDate: "First month", completed: false, priority: "high" },
        { id: "social-security", title: "Register for Social Security", description: "Essential for healthcare and pension contributions", dueDate: "Before starting work", completed: false, priority: "medium" },
      ]
    },
    {
      id: "healthcare",
      category: "🏥 Healthcare & Insurance",
      items: [
        { id: "health-insurance", title: "Arrange Health Insurance", description: "Public or private health insurance — mandatory in most EU countries", dueDate: "Before arrival", completed: false, priority: "high", link: "/local-services" },
        { id: "gp-register", title: "Register with a General Practitioner (GP)", description: "Find a local doctor and register as a patient", dueDate: "First month", completed: false, priority: "medium" },
        { id: "travel-insurance", title: "Travel Insurance for Move", description: "Cover for transit period before permanent health insurance activates", dueDate: "Before travel", completed: false, priority: "medium" },
      ]
    },
    {
      id: "finances",
      category: "💰 Financial Planning",
      items: [
        { id: "cost-calc", title: "Calculate Cost of Living", description: `Compare your salary vs living costs in ${country}`, dueDate: "Planning phase", completed: false, priority: "high", link: "/cost-calculator" },
        { id: "savings", title: "Build Relocation Fund (3–6 months expenses)", description: "Save enough for deposit, first month rent, flights, and setup costs", dueDate: "Before move", completed: false, priority: "high" },
        { id: "tax-advice", title: "Get International Tax Advice", description: "Understand double taxation treaties and reporting obligations", dueDate: "Before move", completed: false, priority: "medium" },
        { id: "currency", title: "Set Up International Transfer Account", description: "Use Wise or Revolut for low-fee international transfers", dueDate: "1 month before", completed: false, priority: "low" },
      ]
    },
  ];

  // Add goal-specific items
  if (goal.includes("Work") || goal.includes("Career")) {
    base.push({
      id: "work",
      category: "💼 Work & Employment",
      items: [
        { id: "job-offer", title: "Secure Job Offer / Contract", description: "Required for most work-related visas", dueDate: "Before visa application", completed: false, priority: "high", link: "/jobs" },
        { id: "blue-card", title: "Apply for EU Blue Card (if eligible)", description: "Unified work permit for high-skilled workers across EU", dueDate: "With visa application", completed: false, priority: "high" },
        { id: "work-permit", title: `${country} Work Permit`, description: "Country-specific work authorization", dueDate: "Before starting work", completed: false, priority: "high" },
        { id: "professional-certs", title: "Get Qualifications Recognized", description: "Some professions require local recognition of foreign degrees", dueDate: "Early planning stage", completed: false, priority: "medium" },
      ]
    });
  }

  if (goal.includes("Education")) {
    base.push({
      id: "study",
      category: "🎓 Education",
      items: [
        { id: "university-apply", title: "Apply to Universities", description: "Submit applications with required documents and transcripts", dueDate: "6–12 months before start", completed: false, priority: "high", link: "/education" },
        { id: "student-visa", title: "Student Visa Application", description: "Apply for student visa with acceptance letter", dueDate: "3–4 months before start", completed: false, priority: "high" },
        { id: "scholarship", title: "Apply for Scholarships", description: "Erasmus+, DAAD, and country-specific scholarship applications", dueDate: "12 months before", completed: false, priority: "medium", link: "/opportunities" },
      ]
    });
  }

  if (goal.includes("Family")) {
    base.push({
      id: "family",
      category: "👨‍👩‍👧 Family Requirements",
      items: [
        { id: "family-visa", title: "Family Reunification Visa", description: "Apply for family members to join you", dueDate: "6–8 weeks before arrival", completed: false, priority: "high" },
        { id: "school-enroll", title: "School Enrollment for Children", description: "Research and apply to local or international schools", dueDate: "3–6 months before", completed: false, priority: "high" },
        { id: "marriage-cert", title: "Marriage Certificate (Apostilled)", description: "Required for spouse visa and family reunification", dueDate: "With visa application", completed: false, priority: "high" },
      ]
    });
  }

  return base;
}

export default function RelocationPlannerPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { success, info } = useToast();

  const [goal, setGoal] = useState("");
  const [country, setCountry] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checklist, setChecklist] = useState<RelocationChecklist[]>([]);
  const [expandedCat, setExpandedCat] = useState<string | null>("documents");

  const handleGenerate = async () => {
    if (!goal || !country) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const cl = generateChecklist(goal, country);
    setChecklist(cl);
    setLoading(false);
    setGenerated(true);
    success("Your personalized relocation checklist is ready!");
  };

  const toggleItem = (catId: string, itemId: string) => {
    setChecklist(prev => prev.map(cat =>
      cat.id !== catId ? cat : {
        ...cat,
        items: cat.items.map(item =>
          item.id !== itemId ? item : { ...item, completed: !item.completed }
        )
      }
    ));
  };

  const totalItems = checklist.reduce((s, c) => s + c.items.length, 0);
  const completedItems = checklist.reduce((s, c) => s + c.items.filter(i => i.completed).length, 0);
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const priorityColor = (p: RelocationCheckItem["priority"]) =>
    p === "high" ? "text-red-600 bg-red-50 border-red-100" :
    p === "medium" ? "text-amber-600 bg-amber-50 border-amber-100" :
    "text-gray-400 bg-gray-50 border-gray-100";

  return (
    <div className="page-container">
      <section className="bg-navy-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 europium-pattern" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gold-500 flex items-center justify-center shrink-0">
              <MapPin size={28} className="text-white" />
            </div>
            <div>
              <h1 className="font-serif text-4xl font-bold text-white mb-2">Relocation Planner</h1>
              <p className="text-white/70 text-lg">Get a personalized, interactive checklist for your European relocation.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            {!generated ? (
              <div className="card-premium p-8">
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">Tell us about your relocation</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name (optional)</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Maria" className="input-premium max-w-xs" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">What's your relocation purpose? *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {goals.map(g => (
                        <button
                          key={g.value}
                          type="button"
                          onClick={() => setGoal(g.value)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            goal === g.value ? "bg-navy-900 border-navy-900 text-white" : "border-border hover:border-navy-400 text-gray-700"
                          }`}
                        >
                          <div className="text-2xl mb-1">{g.emoji}</div>
                          <div className="font-semibold text-sm">{g.value}</div>
                          <div className={`text-xs mt-0.5 ${goal === g.value ? "text-white/70" : "text-gray-400"}`}>{g.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Destination Country *</label>
                    <select value={country} onChange={e => setCountry(e.target.value)} className="input-premium">
                      <option value="">Select a country...</option>
                      {countryOptions.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                      <select value={timeline} onChange={e => setTimeline(e.target.value)} className="input-premium">
                        <option value="">Select timeline</option>
                        {timelines.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Relocation Budget</label>
                      <select value={budget} onChange={e => setBudget(e.target.value)} className="input-premium">
                        <option value="">Select budget</option>
                        {budgets.map(b => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={!goal || !country || loading}
                    className="btn-gold w-full justify-center py-4 text-base disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2"><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Creating your checklist...</span>
                    ) : (
                      <><Sparkles size={18} /> Generate My Relocation Plan</>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {/* Plan Header */}
                <div className="card-premium p-6 border-l-4 border-gold-500">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-navy-900">
                        {name ? `${name}'s ` : "Your "}Relocation to {country}
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        Purpose: <strong>{goal}</strong> {timeline && `· ${timeline}`} {budget && `· ${budget}`}
                      </p>
                    </div>
                    <button
                      onClick={() => { setGenerated(false); setChecklist([]); }}
                      className="btn-secondary text-sm px-4 py-2 shrink-0"
                    >
                      Reset
                    </button>
                  </div>

                  {/* Progress */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                      <span className="text-sm font-bold text-navy-900">{completedItems}/{totalItems} completed · {progress}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          progress === 100 ? "bg-emerald-500" : progress > 50 ? "bg-royalblue-500" : "bg-gold-500"
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1 text-emerald-600"><CheckCircle size={12} />{completedItems} done</span>
                      <span className="flex items-center gap-1 text-amber-500"><Clock size={12} />{totalItems - completedItems} remaining</span>
                    </div>
                  </div>
                </div>

                {/* Checklist Categories */}
                {checklist.map(cat => {
                  const catCompleted = cat.items.filter(i => i.completed).length;
                  const catTotal = cat.items.length;
                  const isExpanded = expandedCat === cat.id;
                  return (
                    <div key={cat.id} className="card-premium overflow-hidden">
                      <button
                        onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
                        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-left">
                            <p className="font-semibold text-navy-900">{cat.category}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{catCompleted}/{catTotal} completed</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${(catCompleted / catTotal) * 100}%` }}
                            />
                          </div>
                          {catCompleted === catTotal ? (
                            <CheckCircle size={18} className="text-emerald-500" />
                          ) : (
                            isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-border/50 divide-y divide-gray-50 animate-fade-in">
                          {cat.items.map(item => (
                            <div
                              key={item.id}
                              className={`flex items-start gap-4 p-4 transition-colors ${item.completed ? "bg-emerald-50/40" : "hover:bg-gray-50"}`}
                            >
                              <button
                                onClick={() => toggleItem(cat.id, item.id)}
                                className="mt-0.5 shrink-0 transition-transform active:scale-90"
                              >
                                {item.completed ? (
                                  <CheckCircle size={20} className="text-emerald-500" />
                                ) : (
                                  <Circle size={20} className="text-gray-300 hover:text-royalblue-400 transition-colors" />
                                )}
                              </button>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <p className={`font-semibold text-sm ${item.completed ? "line-through text-gray-400" : "text-navy-900"}`}>
                                    {item.title}
                                  </p>
                                  <span className={`tag text-xs shrink-0 border ${priorityColor(item.priority)}`}>
                                    {item.priority}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                                <div className="flex items-center gap-3 mt-2">
                                  {item.dueDate && (
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                      <Calendar size={10} /> {item.dueDate}
                                    </span>
                                  )}
                                  {item.link && (
                                    <Link to={item.link} className="text-xs text-royalblue-600 hover:underline font-medium">
                                      View resource →
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {progress === 100 && (
                  <div className="card-premium p-8 text-center bg-emerald-50 border-emerald-200 animate-fade-in">
                    <CheckCircle size={48} className="text-emerald-500 mx-auto mb-3" />
                    <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Checklist Complete! 🎉</h2>
                    <p className="text-gray-600 mb-4">You've completed all relocation steps for {country}. You're ready to go!</p>
                    <Link to="/ai-advisor" className="btn-primary">Get AI Guidance for Next Steps</Link>
                  </div>
                )}

                <div className="flex gap-3">
                  <Link to="/ai-advisor" className="btn-primary flex-1 justify-center">
                    <Sparkles size={16} /> AI Advisor <ArrowRight size={14} />
                  </Link>
                  <Link to="/cost-calculator" className="btn-secondary flex-1 justify-center">
                    Cost Calculator
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Journey Progress Visualization */}
            {generated && (
              <div className="card-premium p-5">
                <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={15} className="text-royalblue-500" /> My Europe Journey
                </h3>
                <div className="text-center mb-4">
                  <div className="relative w-24 h-24 mx-auto">
                    <svg viewBox="0 0 36 36" className="w-24 h-24 rotate-[-90deg]">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="16" fill="none"
                        stroke={progress === 100 ? "#10b981" : progress > 50 ? "#2563eb" : "#D4A72C"}
                        strokeWidth="3"
                        strokeDasharray={`${progress} ${100 - progress}`}
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center rotate-0">
                      <span className="font-bold text-navy-900 text-lg">{progress}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Relocation Ready</p>
                </div>
                <div className="space-y-2">
                  {checklist.map(cat => {
                    const done = cat.items.filter(i => i.completed).length;
                    const total = cat.items.length;
                    return (
                      <div key={cat.id} className="flex items-center gap-2 text-xs">
                        {done === total ? (
                          <CheckCircle size={12} className="text-emerald-500 shrink-0" />
                        ) : (
                          <AlertCircle size={12} className="text-amber-500 shrink-0" />
                        )}
                        <span className="text-gray-600 truncate">{cat.category.split(" ").slice(1).join(" ")}</span>
                        <span className="ml-auto font-medium text-navy-900 shrink-0">{done}/{total}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Resources */}
            <div className="bg-navy-900 rounded-2xl p-5 text-white">
              <h3 className="font-semibold mb-3">Quick Resources</h3>
              <div className="space-y-2">
                {[
                  { label: "Browse Jobs in Europe", path: "/jobs" },
                  { label: "Find Housing", path: "/housing" },
                  { label: "Visa & Opportunities", path: "/opportunities" },
                  { label: "Cost of Living", path: "/cost-calculator" },
                  { label: "Local Services", path: "/local-services" },
                  { label: "AI Advisor", path: "/ai-advisor" },
                ].map(l => (
                  <Link key={l.path} to={l.path} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0 text-white/80 hover:text-white text-sm transition-colors">
                    {l.label} <ArrowRight size={12} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Avg Relocation Costs */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-3 text-sm">Average Relocation Costs</h3>
              <div className="space-y-2 text-sm">
                {[
                  { c: "Germany", cost: "€8,000–€15,000", inr: "₹7.2L–₹13.5L" },
                  { c: "Netherlands", cost: "€10,000–€20,000", inr: "₹9L–₹18L" },
                  { c: "Portugal", cost: "€5,000–€12,000", inr: "₹4.5L–₹10.8L" },
                  { c: "Switzerland", cost: "€15,000–€30,000", inr: "₹13.5L–₹27L" },
                ].map(r => (
                  <div key={r.c} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600">{r.c}</span>
                    <div className="text-right">
                      <p className="font-semibold text-navy-900 text-xs">{r.cost}</p>
                      <p className="text-emerald-600 text-xs">{r.inr}</p>
                    </div>
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
