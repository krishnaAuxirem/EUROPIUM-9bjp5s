import { useState, useMemo } from "react";
import {
  TrendingUp, Filter, Star, Globe, Award, Zap,
  GraduationCap, Briefcase, Users, Search, SlidersHorizontal,
  Shield, Calendar, ArrowRight, Bookmark, BadgeCheck, X
} from "lucide-react";
import { Link } from "react-router-dom";
import EmptyState from "@/components/features/EmptyState";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { opportunities } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";

const ALL_CATEGORIES = [
  { key: "all", label: "All", icon: Globe },
  { key: "Research & Innovation", label: "Research", icon: Star },
  { key: "Education", label: "Scholarships", icon: GraduationCap },
  { key: "Internships", label: "Internships", icon: Briefcase },
  { key: "Startup & Business", label: "Startup Programs", icon: Zap },
  { key: "Residency & Visa", label: "Visas", icon: Shield },
  { key: "Awards", label: "Awards", icon: Award },
];

const TYPE_LABELS: Record<string, string> = {
  grant: "💰 Grant", scholarship: "🎓 Scholarship", fellowship: "🔬 Fellowship",
  visa: "📋 Visa Program", program: "🌟 Program", accelerator: "🚀 Accelerator",
  award: "🏆 Award", internship: "💼 Internship", event: "📅 Event", research: "🔭 Research"
};

const STATS = [
  { icon: TrendingUp, value: "3,400+", label: "Opportunities" },
  { icon: Globe, value: "44", label: "Countries" },
  { icon: Award, value: "€8B+", label: "Total Funding" },
  { icon: Users, value: "180K+", label: "Applications/Year" },
];

const countryList = ["All Countries", "EU-Wide", "Germany", "France", "Netherlands", "Sweden", "Portugal", "Switzerland"];

export default function OpportunitiesPage() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { success, info } = useToast();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [country, setCountry] = useState("All Countries");
  const [deadline, setDeadline] = useState("Any Deadline");

  const filtered = useMemo(() => {
    return opportunities.filter(o => {
      const matchSearch = !search || o.title.toLowerCase().includes(search.toLowerCase()) ||
        o.organization.toLowerCase().includes(search.toLowerCase()) ||
        o.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = activeCategory === "all" || o.category === activeCategory;
      const matchCountry = country === "All Countries" || o.country === country ||
        (country === "EU-Wide" && o.country === "EU-Wide");
      return matchSearch && matchCategory && matchCountry;
    });
  }, [search, activeCategory, country, deadline]);

  const featured = filtered.filter(o => o.featured);
  const rest = filtered.filter(o => !o.featured);

  const handleSave = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (!isAuthenticated) { info("Please login to save"); return; }
    const savedOpportunities = user?.savedOpportunities.includes(id)
      ? (user?.savedOpportunities ?? []).filter(x => x !== id)
      : [...(user?.savedOpportunities ?? []), id];
    updateUser({ savedOpportunities });
    success(user?.savedOpportunities.includes(id) ? "Removed from saved" : "Opportunity saved!");
  };

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="bg-navy-900 europium-pattern py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3">Opportunities Hub</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
              European Opportunities
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Grants, scholarships, fellowships, visas, internships and more — all in one place.
            </p>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl p-3 flex flex-col md:flex-row gap-3 mb-6 shadow-premium-xl max-w-3xl mx-auto">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search grants, scholarships, visas, internships..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-navy-900 placeholder:text-gray-400 text-sm"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>
            <button className="btn-primary px-8 py-3 shrink-0">
              <Search size={16} /> Search
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <s.icon size={18} className="text-gold-400" />
                <div>
                  <div className="text-white font-bold text-sm">{s.value}</div>
                  <div className="text-white/50 text-xs">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat.key
                  ? "bg-navy-900 text-white shadow-premium"
                  : "bg-white border border-border text-gray-600 hover:border-navy-400 hover:text-navy-800"
              }`}
            >
              <cat.icon size={14} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <select value={country} onChange={e => setCountry(e.target.value)} className="input-premium text-sm py-2 w-auto min-w-[160px]">
            {countryList.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={deadline} onChange={e => setDeadline(e.target.value)} className="input-premium text-sm py-2 w-auto min-w-[160px]">
            <option>Any Deadline</option>
            <option>Closing Soon</option>
            <option>Open Ongoing</option>
          </select>
          <div className="flex items-center gap-2 text-sm text-gray-500 ml-auto">
            <Filter size={14} />
            <span><strong className="text-navy-900">{filtered.length}</strong> opportunities found</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No opportunities found"
            description="Try different filters or search terms."
            action={{ label: "Clear Filters", onClick: () => { setSearch(""); setActiveCategory("all"); setCountry("All Countries"); } }}
            icon={<TrendingUp size={28} className="text-gray-400" />}
          />
        ) : (
          <div className="space-y-8">
            {/* Featured */}
            {featured.length > 0 && activeCategory === "all" && !search && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <Star size={20} className="text-gold-500" /> Featured Opportunities
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {featured.map(o => (
                    <OpportunityDetailCard key={o.id} opportunity={o} user={user} onSave={handleSave} />
                  ))}
                </div>
              </div>
            )}

            {/* All / Rest */}
            <div>
              {activeCategory === "all" && !search && featured.length > 0 && rest.length > 0 && (
                <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">All Opportunities</h2>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {(activeCategory === "all" && !search ? rest : filtered).map(o => (
                  <OpportunityDetailCard key={o.id} opportunity={o} user={user} onSave={handleSave} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OpportunityDetailCard({ opportunity: o, user, onSave }: {
  opportunity: typeof opportunities[0];
  user: ReturnType<typeof useAuth>["user"];
  onSave: (e: React.MouseEvent, id: string) => void;
}) {
  const isSaved = user?.savedOpportunities.includes(o.id) ?? false;
  const typeEmoji = TYPE_LABELS[o.type]?.split(" ")[0] ?? "🌟";
  const typeLabel = TYPE_LABELS[o.type]?.split(" ").slice(1).join(" ") ?? o.type;

  const daysLeft = () => {
    if (o.deadline === "Ongoing") return null;
    const diff = Math.ceil((new Date(o.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diff;
  };
  const days = daysLeft();

  return (
    <Link to={`/opportunities/${o.id}`} className="block group">
      <div className="card-premium p-5 h-full">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl ${o.colorClass} flex items-center justify-center text-xl shrink-0 shadow-card`}>
            {typeEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="tag tag-gray text-xs capitalize">{typeLabel}</span>
                  {o.verified && <BadgeCheck size={13} className="text-royalblue-500" />}
                  {o.featured && <span className="tag tag-gold text-xs">Featured</span>}
                </div>
                <h3 className="font-semibold text-navy-900 group-hover:text-royalblue-600 transition-colors line-clamp-2 leading-snug">
                  {o.title}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">{o.organization}</p>
              </div>
              <button
                onClick={e => onSave(e, o.id)}
                className={`shrink-0 p-1.5 rounded-lg transition-all ${isSaved ? "text-gold-500 bg-gold-50" : "text-gray-400 hover:text-gold-500"}`}
              >
                <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Globe size={11} />{o.country}</span>
              <span className="text-emerald-600 font-semibold">💎 {o.value}</span>
              {o.deadline === "Ongoing" ? (
                <span className="text-emerald-600 font-semibold flex items-center gap-1"><Star size={10} fill="currentColor" /> Ongoing</span>
              ) : (
                <span className={`flex items-center gap-1 ${days && days < 14 ? "text-red-500 font-semibold" : ""}`}>
                  <Calendar size={11} />{days !== null ? `${days}d left` : o.deadline}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">{o.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-3">
              {o.tags.slice(0, 3).map(t => <span key={t} className="tag tag-navy text-xs">{t}</span>)}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end">
          <span className="text-xs text-royalblue-500 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            View Details <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
