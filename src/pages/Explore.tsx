import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search, Filter, Globe, Star, Briefcase, GraduationCap, Shield, TrendingUp,
  MapPin, ChevronRight, X, Bookmark, Check, DollarSign, Users
} from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { countries } from "@/lib/mockData";

const REGIONS = ["All Regions", "Western Europe", "Northern Europe", "Central Europe", "Southern Europe", "Eastern Europe"];
const COSTS = ["Any Cost", "Low", "Medium", "High", "Very High"];
const JOB_FILTERS = ["Any", "High (800+)", "Medium (400-800)", "Low (<400)"];
const SORT_OPTIONS = ["Most Popular", "Highest Rated", "Most Jobs", "Cost: Low to High", "Cost: High to Low"];

const costOrder: Record<string, number> = { low: 1, medium: 2, high: 3, "very-high": 4 };
const costLabel: Record<string, string> = { low: "Low", medium: "Medium", high: "High", "very-high": "Very High" };
const costColor: Record<string, string> = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-gold-100 text-gold-700",
  high: "bg-orange-100 text-orange-700",
  "very-high": "bg-red-100 text-red-700"
};

const COUNTRY_FLAGS: Record<string, string> = {
  de: "🇩🇪", fr: "🇫🇷", nl: "🇳🇱", se: "🇸🇪", es: "🇪🇸", it: "🇮🇹",
  pt: "🇵🇹", ch: "🇨🇭", no: "🇳🇴", pl: "🇵🇱", dk: "🇩🇰", at: "🇦🇹"
};

// Country indicators 1-10
const COUNTRY_INDICATORS: Record<string, { jobs: number; safety: number; edu: number }> = {
  de: { jobs: 9, safety: 9, edu: 10 }, fr: { jobs: 8, safety: 8, edu: 9 },
  nl: { jobs: 9, safety: 9, edu: 9 }, se: { jobs: 8, safety: 10, edu: 9 },
  es: { jobs: 7, safety: 8, edu: 8 }, it: { jobs: 7, safety: 8, edu: 8 },
  pt: { jobs: 7, safety: 9, edu: 7 }, ch: { jobs: 8, safety: 10, edu: 10 },
  no: { jobs: 8, safety: 10, edu: 9 }, pl: { jobs: 8, safety: 8, edu: 8 },
  dk: { jobs: 8, safety: 10, edu: 9 }, at: { jobs: 8, safety: 9, edu: 9 },
};

function ScoreDot({ value }: { value: number }) {
  const dots = 5;
  const filled = Math.round((value / 10) * dots);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: dots }).map((_, i) => (
        <div key={i} className={`w-2 h-2 rounded-full ${i < filled ? "bg-royalblue-500" : "bg-gray-200"}`} />
      ))}
    </div>
  );
}

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All Regions");
  const [cost, setCost] = useState("Any Cost");
  const [sort, setSort] = useState("Most Popular");
  const [saved, setSaved] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleSave = (id: string) =>
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const filtered = useMemo(() => {
    let list = [...countries];
    if (search) list = list.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.capital.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
    if (region !== "All Regions") list = list.filter(c => c.region === region);
    if (cost !== "Any Cost") list = list.filter(c => costLabel[c.costOfLiving].toLowerCase() === cost.toLowerCase());
    switch (sort) {
      case "Highest Rated": list.sort((a, b) => b.rating - a.rating); break;
      case "Most Jobs": list.sort((a, b) => b.jobCount - a.jobCount); break;
      case "Cost: Low to High": list.sort((a, b) => costOrder[a.costOfLiving] - costOrder[b.costOfLiving]); break;
      case "Cost: High to Low": list.sort((a, b) => costOrder[b.costOfLiving] - costOrder[a.costOfLiving]); break;
      default: list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [search, region, cost, sort]);

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="bg-navy-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #2563EB 0%, transparent 50%), radial-gradient(circle at 80% 30%, #D4A72C 0%, transparent 50%)" }} />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gold-500 flex items-center justify-center shrink-0">
              <Globe size={28} className="text-white" />
            </div>
            <div>
              <h1 className="font-serif text-4xl font-bold text-white mb-2">Explore Europe</h1>
              <p className="text-white/70 text-lg">Discover 44 countries — compare cost of living, jobs, education, and lifestyle.</p>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search countries, capitals, keywords..."
                className="input-premium pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>
            <button onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl font-medium transition-all lg:hidden">
              <Filter size={16} /> Filters
            </button>
            <div className="hidden lg:flex items-center gap-2">
              {REGIONS.slice(1).map(r => (
                <button key={r} onClick={() => setRegion(region === r ? "All Regions" : r)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${region === r ? "bg-gold-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"}`}>
                  {r.replace(" Europe", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile filters */}
          {filtersOpen && (
            <div className="mt-3 flex flex-wrap gap-2 lg:hidden">
              {REGIONS.slice(1).map(r => (
                <button key={r} onClick={() => setRegion(region === r ? "All Regions" : r)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${region === r ? "bg-gold-500 text-white" : "bg-white/10 text-white/70"}`}>
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {/* Cost filter */}
            <select value={cost} onChange={e => setCost(e.target.value)} className="input-premium py-2 w-auto text-sm">
              {COSTS.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)} className="input-premium py-2 w-auto text-sm">
              {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="text-gray-500 text-sm font-medium">
            Showing <span className="text-navy-900 font-bold">{filtered.length}</span> countries
          </div>
        </div>

        {/* Active filters */}
        {(region !== "All Regions" || cost !== "Any Cost" || search) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {region !== "All Regions" && (
              <button onClick={() => setRegion("All Regions")} className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-100 text-navy-700 rounded-full text-sm font-medium hover:bg-navy-200">
                {region} <X size={13} />
              </button>
            )}
            {cost !== "Any Cost" && (
              <button onClick={() => setCost("Any Cost")} className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-100 text-navy-700 rounded-full text-sm font-medium hover:bg-navy-200">
                {cost} Cost <X size={13} />
              </button>
            )}
            {search && (
              <button onClick={() => setSearch("")} className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-100 text-navy-700 rounded-full text-sm font-medium hover:bg-navy-200">
                "{search}" <X size={13} />
              </button>
            )}
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Globe, label: "Countries", value: "44", color: "bg-royalblue-100 text-royalblue-600" },
            { icon: Briefcase, label: "Total Jobs", value: "48K+", color: "bg-gold-100 text-gold-700" },
            { icon: GraduationCap, label: "Universities", value: "2,400+", color: "bg-emerald-100 text-emerald-700" },
            { icon: Users, label: "Members", value: "1.2M+", color: "bg-navy-100 text-navy-700" },
          ].map(s => (
            <div key={s.label} className="card-premium p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center shrink-0`}>
                <s.icon size={18} />
              </div>
              <div>
                <p className="font-bold text-navy-900 text-lg">{s.value}</p>
                <p className="text-gray-400 text-xs">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Country Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Globe size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-navy-900 mb-2">No countries found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters.</p>
            <button onClick={() => { setSearch(""); setRegion("All Regions"); setCost("Any Cost"); }} className="btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(c => {
              const ind = COUNTRY_INDICATORS[c.id] || { jobs: 7, safety: 8, edu: 8 };
              return (
                <div key={c.id} className="card-premium overflow-hidden group">
                  {/* Country visual header */}
                  <div className={`h-32 ${c.colorClass} relative`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                    <div className="absolute top-3 left-3 text-4xl">{COUNTRY_FLAGS[c.id] || "🇪🇺"}</div>
                    <button onClick={() => toggleSave(c.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${saved.includes(c.id) ? "bg-gold-500 text-white" : "bg-white/20 text-white hover:bg-white/40"}`}>
                      <Bookmark size={14} fill={saved.includes(c.id) ? "currentColor" : "none"} />
                    </button>
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="text-white font-serif font-bold text-xl">{c.name}</span>
                      <div className="flex items-center gap-0.5 bg-black/30 rounded px-1.5 py-0.5">
                        <Star size={10} className="text-gold-400 fill-gold-400" />
                        <span className="text-white text-xs">{c.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <MapPin size={12} /> {c.capital} · {c.region}
                      </div>
                      <span className={`tag text-xs ${costColor[c.costOfLiving]}`}>
                        {costLabel[c.costOfLiving]} Cost
                      </span>
                    </div>

                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-4">{c.description}</p>

                    {/* Indicators */}
                    <div className="space-y-2 mb-4">
                      {[
                        { label: "Job Opportunities", score: ind.jobs },
                        { label: "Education", score: ind.edu },
                        { label: "Safety", score: ind.safety },
                      ].map(ind => (
                        <div key={ind.label} className="flex items-center justify-between gap-3">
                          <span className="text-gray-400 text-xs w-32 shrink-0">{ind.label}</span>
                          <ScoreDot value={ind.score} />
                          <span className="text-xs text-gray-500 w-6 text-right">{ind.score}/10</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {c.tags.slice(0, 3).map(t => (
                        <span key={t} className="tag tag-gray text-xs">{t}</span>
                      ))}
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      <div className="bg-gray-50 rounded-lg py-2">
                        <p className="font-bold text-navy-900 text-sm">{c.jobCount.toLocaleString()}</p>
                        <p className="text-gray-400 text-xs">Jobs</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg py-2">
                        <p className="font-bold text-navy-900 text-sm">{c.universityCount}</p>
                        <p className="text-gray-400 text-xs">Univs</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg py-2">
                        <p className={`font-bold text-sm ${c.visaFriendly ? "text-emerald-600" : "text-orange-500"}`}>
                          {c.visaFriendly ? "Easy" : "Strict"}
                        </p>
                        <p className="text-gray-400 text-xs">Visa</p>
                      </div>
                    </div>

                    <Link to={`/explore/${c.id}`}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold rounded-xl transition-all">
                      View Country <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
