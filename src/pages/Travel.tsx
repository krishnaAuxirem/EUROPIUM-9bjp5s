import { useState, useMemo } from "react";
import { Plane, Search, Clock, TrendingUp, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "@/components/features/SearchBar";
import EmptyState from "@/components/features/EmptyState";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { travelDestinations } from "@/lib/mockData";
import travelAmalfi from "@/assets/travel-amalfi.jpg";
import travelSantorini from "@/assets/travel-santorini.jpg";
import travelNorway from "@/assets/travel-norway-fjords.jpg";
import travelPrague from "@/assets/travel-prague.jpg";
import travelBarcelona from "@/assets/travel-barcelona.jpg";
import travelAmsterdam from "@/assets/travel-amsterdam.jpg";

const imageMap: Record<string, string> = {
  "travel-amalfi": travelAmalfi,
  "travel-santorini": travelSantorini,
  "travel-norway-fjords": travelNorway,
  "travel-prague": travelPrague,
  "travel-barcelona": travelBarcelona,
  "travel-amsterdam": travelAmsterdam,
};

const budgets = ["All Budgets", "budget", "mid-range", "luxury"];
const budgetLabels: Record<string, string> = { budget: "Budget", "mid-range": "Mid-Range", luxury: "Luxury" };
const budgetColors: Record<string, string> = { budget: "bg-emerald-500", "mid-range": "bg-royalblue-500", luxury: "bg-gold-500" };
const typeOptions = ["All Types", "Beach", "Culture", "Nature", "City", "History", "Adventure", "Island", "Romance", "Scenic Drive", "Cruise", "Volcanic"];
const countryList = ["All Countries", "Italy", "Greece", "Norway", "Czech Republic", "Spain", "Netherlands"];
const durationOptions = ["Any Duration", "1–3 days", "3–5 days", "4–6 days", "5–7 days", "7–10 days"];

export default function TravelPage() {
  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState("All Budgets");
  const [destType, setDestType] = useState("All Types");
  const [country, setCountry] = useState("All Countries");
  const [duration, setDuration] = useState("Any Duration");

  const filtered = useMemo(() => {
    return travelDestinations.filter(d => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.country.toLowerCase().includes(search.toLowerCase()) ||
        d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchBudget = budget === "All Budgets" || d.budget === budget;
      const matchType = destType === "All Types" || d.type.includes(destType);
      const matchCountry = country === "All Countries" || d.country === country;
      const matchDuration = duration === "Any Duration" || d.duration.includes(duration.split(" ")[0]);
      return matchSearch && matchBudget && matchType && matchCountry && matchDuration;
    });
  }, [search, budget, destType, country, duration]);

  const featured = travelDestinations.filter(d => d.budget === "luxury").slice(0, 1)[0];

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="relative bg-navy-900 overflow-hidden">
        {featured && (
          <div className="absolute inset-0">
            <img src={imageMap[featured.image ?? ""] ?? ""} alt={featured.name} className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent" />
          </div>
        )}
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
              <Plane size={14} /> Discover Europe
            </div>
            <h1 className="font-serif text-5xl font-bold text-white mb-4 leading-tight">
              Your Next European<br />Adventure Awaits
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Curated destinations, AI travel tips, budget guides, and interactive trip planning for 50+ European destinations.
            </p>
            <SearchBar
              placeholder="Search destinations, countries, experiences..."
              value={search}
              onChange={setSearch}
              size="lg"
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: "🗺️", label: "Destinations", value: "50+" },
            { icon: "💰", label: "Budget Options", value: "All Ranges" },
            { icon: "✈️", label: "Countries Covered", value: "44" },
            { icon: "⭐", label: "Top Rated", value: "4.8+ Stars" },
          ].map(s => (
            <div key={s.label} className="card-premium p-4 flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="font-bold text-navy-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-card mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Filter Destinations</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <select value={budget} onChange={e => setBudget(e.target.value)} className="input-premium text-sm">
              {budgets.map(b => <option key={b} value={b}>{b === "All Budgets" ? b : budgetLabels[b]}</option>)}
            </select>
            <select value={destType} onChange={e => setDestType(e.target.value)} className="input-premium text-sm">
              {typeOptions.map(t => <option key={t}>{t}</option>)}
            </select>
            <select value={country} onChange={e => setCountry(e.target.value)} className="input-premium text-sm">
              {countryList.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={duration} onChange={e => setDuration(e.target.value)} className="input-premium text-sm">
              {durationOptions.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Season Guide */}
        <div className="bg-gradient-to-r from-navy-900 to-royalblue-700 rounded-2xl p-6 mb-8 text-white">
          <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-gold-400" /> Best Times to Visit Europe
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              { season: "🌸 Spring (Mar–May)", tip: "City exploration, mild weather, tulips, fewer crowds — ideal for Amsterdam & Prague." },
              { season: "☀️ Summer (Jun–Aug)", tip: "Beaches & festivals, Mediterranean sunshine, fjords & midnight sun in Norway." },
              { season: "🍂 Autumn (Sep–Nov)", tip: "Harvest festivals, crisp weather, affordable prices, stunning foliage." },
              { season: "❄️ Winter (Dec–Feb)", tip: "Christmas markets, Alpine skiing, Vienna & Prague fairytales, Northern Lights." },
            ].map(s => (
              <div key={s.season} className="bg-white/10 rounded-xl p-3">
                <p className="font-semibold text-gold-400 mb-1">{s.season}</p>
                <p className="text-white/70 text-xs leading-relaxed">{s.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trip Planner CTA */}
        <div className="bg-gradient-to-br from-gold-50 to-gold-100 border border-gold-200 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gold-500 flex items-center justify-center shrink-0">
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-navy-900">Plan Your Itinerary</h3>
              <p className="text-gray-600 text-sm">Build a day-by-day trip plan with attractions, hotels & restaurants</p>
            </div>
          </div>
          <Link to="/trip-planner" className="btn-gold shrink-0">
            Open Trip Planner <ChevronRight size={16} />
          </Link>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <EmptyState
            title="No destinations found"
            description="Try adjusting your filters or search terms."
            action={{ label: "Clear Filters", onClick: () => { setSearch(""); setBudget("All Budgets"); setDestType("All Types"); setCountry("All Countries"); setDuration("Any Duration"); } }}
            icon={<Plane size={28} className="text-gray-400" />}
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">{filtered.length} destination{filtered.length !== 1 ? "s" : ""} found</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <TrendingUp size={12} /> Sorted by popularity
              </div>
            </div>

            {/* Featured Card (large) */}
            {filtered.length > 0 && filtered[0].image && (
              <Link to={`/travel/${filtered[0].id}`} className="block mb-6 group">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-card-hover">
                  <img
                    src={imageMap[filtered[0].image] ?? ""}
                    alt={filtered[0].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${budgetColors[filtered[0].budget]}`}>
                      {budgetLabels[filtered[0].budget]}
                    </span>
                    {filtered[0].popularity && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white">
                        🔥 {filtered[0].popularity}% popular
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h2 className="font-serif text-3xl font-bold text-white">{filtered[0].name}</h2>
                        <p className="text-white/80 text-sm mt-1">📍 {filtered[0].country} · {filtered[0].duration} · {filtered[0].dailyBudget ?? "See details"}/day</p>
                        <div className="flex gap-2 mt-2">
                          {filtered[0].type.map(t => (
                            <span key={t} className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 text-center shrink-0">
                        <p className="text-gold-400 font-bold text-lg">⭐ {filtered[0].rating}</p>
                        <p className="text-white/70 text-xs">rating</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.slice(1).map(d => (
                <Link to={`/travel/${d.id}`} key={d.id} className="block group">
                  <div className="card-premium overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      {d.image ? (
                        <img
                          src={imageMap[d.image]}
                          alt={d.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`w-full h-full ${d.colorClass}`} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${budgetColors[d.budget]}`}>
                          {budgetLabels[d.budget]}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
                        <span className="text-gold-400 text-xs">⭐</span>
                        <span className="text-white text-xs font-semibold">{d.rating}</span>
                      </div>
                      <div className="absolute bottom-3 left-4">
                        <h3 className="font-serif font-bold text-white text-xl">{d.name}</h3>
                        <p className="text-white/80 text-sm">📍 {d.country}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{d.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span>🗓️ {d.bestSeason}</span>
                        <span>⏱️ {d.duration}</span>
                        {d.dailyBudget && <span className="text-emerald-600 font-semibold">{d.dailyBudget}/day</span>}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {d.type.slice(0, 2).map(t => (
                            <span key={t} className="tag tag-navy text-xs">{t}</span>
                          ))}
                        </div>
                        <span className="text-xs text-royalblue-600 font-semibold group-hover:translate-x-1 transition-transform inline-block">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="mt-12 bg-navy-900 rounded-3xl p-10 text-center text-white">
          <Plane size={48} className="text-gold-400 mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold mb-3">Ready to Plan Your Trip?</h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto">Use our AI Advisor to get personalized travel tips, visa information, and budget planning for any European destination.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/trip-planner" className="btn-gold">Build Itinerary</Link>
            <Link to="/ai-advisor" className="btn-secondary bg-transparent border-white/30 text-white hover:bg-white/10">Ask AI Advisor</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
