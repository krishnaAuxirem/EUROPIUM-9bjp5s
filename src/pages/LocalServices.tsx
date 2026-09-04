import { useState, useMemo } from "react";
import { MapPin, Star, BadgeCheck, Search, Phone, Globe, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "@/components/features/SearchBar";
import EmptyState from "@/components/features/EmptyState";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { localServices } from "@/lib/mockData";

const CATEGORIES = [
  { key: "All", label: "All Services", icon: "🌍" },
  { key: "Healthcare", label: "Healthcare", icon: "🏥" },
  { key: "Banks", label: "Banking", icon: "🏦" },
  { key: "Transport", label: "Transport", icon: "🚆" },
  { key: "Legal Services", label: "Legal", icon: "⚖️" },
  { key: "Relocation Services", label: "Relocation", icon: "📦" },
  { key: "Community Groups", label: "Community", icon: "👥" },
  { key: "Professional Services", label: "Professional", icon: "💼" },
];

const countryList = ["All Countries", "EU-Wide", "Germany", "Netherlands", "France", "Sweden", "Portugal", "Spain", "Italy", "Switzerland", "Denmark", "Austria", "Norway"];

const categoryColors: Record<string, string> = {
  "Healthcare": "bg-red-100 text-red-700 border-red-200",
  "Banks": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Transport": "bg-royalblue-100 text-royalblue-700 border-royalblue-200",
  "Legal Services": "bg-purple-100 text-purple-700 border-purple-200",
  "Relocation Services": "bg-orange-100 text-orange-700 border-orange-200",
  "Community Groups": "bg-pink-100 text-pink-700 border-pink-200",
  "Professional Services": "bg-gold-100 text-gold-700 border-gold-200",
};

const categoryIcons: Record<string, string> = {
  "Healthcare": "🏥", "Banks": "🏦", "Transport": "🚆",
  "Legal Services": "⚖️", "Relocation Services": "📦",
  "Community Groups": "👥", "Professional Services": "💼",
};

export default function LocalServicesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [country, setCountry] = useState("All Countries");

  const filtered = useMemo(() => {
    return localServices.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCat = category === "All" || s.category === category;
      const matchCountry = country === "All Countries" || s.country === country || s.country === "EU-Wide";
      return matchSearch && matchCat && matchCountry;
    });
  }, [search, category, country]);

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-royalblue-500 flex items-center justify-center shrink-0">
              <MapPin size={28} className="text-white" />
            </div>
            <div>
              <h1 className="font-serif text-4xl font-bold text-white mb-2">Local Services Directory</h1>
              <p className="text-white/70 text-lg">Healthcare, banking, transport, legal help, and community groups across Europe.</p>
            </div>
          </div>
          <SearchBar
            placeholder="Search services, providers, categories..."
            value={search}
            onChange={setSearch}
            size="lg"
          />
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                category === cat.key
                  ? "bg-navy-900 text-white border-navy-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-navy-400"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <select value={country} onChange={e => setCountry(e.target.value)} className="input-premium text-sm min-w-[180px]">
            {countryList.map(c => <option key={c}>{c}</option>)}
          </select>
          <p className="text-sm text-gray-500 ml-auto">{filtered.length} services found</p>
        </div>

        {/* Featured: EU-Wide Services */}
        {category === "All" && search === "" && country === "All Countries" && (
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-4">🌍 Essential EU-Wide Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "European Health Insurance Card", cat: "Healthcare", desc: "Free healthcare in all EU countries", link: "#" },
                { name: "Wise — International Banking", cat: "Banks", desc: "Best rates for international transfers", link: "#" },
                { name: "Fragomen Immigration Law", cat: "Legal Services", desc: "EU Blue Card & work permit experts", link: "#" },
              ].map(s => (
                <div key={s.name} className="card-premium p-5 flex items-start gap-3">
                  <span className="text-2xl">{categoryIcons[s.cat]}</span>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{s.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                    <span className={`tag text-xs mt-2 border ${categoryColors[s.cat]}`}>{s.cat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <EmptyState
            title="No services found"
            description="Try adjusting your search or filters."
            action={{ label: "Clear Filters", onClick: () => { setSearch(""); setCategory("All"); setCountry("All Countries"); } }}
          />
        ) : (
          <>
            {/* Group by category */}
            {category === "All" ? (
              CATEGORIES.filter(c => c.key !== "All").map(cat => {
                const catServices = filtered.filter(s => s.category === cat.key);
                if (catServices.length === 0) return null;
                return (
                  <div key={cat.key} className="mb-10">
                    <h2 className="font-serif text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                      <span>{cat.icon}</span> {cat.label}
                      <span className="text-sm font-normal text-gray-400">({catServices.length})</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {catServices.map(service => (
                        <ServiceCard key={service.id} service={service} />
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </>
        )}

        {/* AI Advisor CTA */}
        <div className="mt-12 bg-navy-900 rounded-3xl p-10 text-center text-white">
          <Sparkles size={48} className="text-gold-400 mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold mb-3">Need Personalized Guidance?</h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto">Our AI Advisor can recommend specific services for your situation, country, and relocation purpose.</p>
          <Link to="/ai-advisor" className="btn-gold">Ask AI Advisor</Link>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: typeof localServices[0] }) {
  const catColor = categoryColors[service.category] ?? "bg-gray-100 text-gray-700 border-gray-200";
  return (
    <div className="card-premium p-5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-2xl">
          {categoryIcons[service.category] ?? "🔧"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-navy-900 text-sm">{service.name}</h3>
                {service.verified && <BadgeCheck size={13} className="text-royalblue-500 shrink-0" />}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{service.type} · {service.city}, {service.country}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Star size={11} className="fill-gold-400 text-gold-400" />
              <span className="text-xs font-semibold text-navy-900">{service.rating}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">{service.description}</p>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className={`tag text-xs border ${catColor}`}>{service.category}</span>
            {service.tags.slice(0, 2).map(t => (
              <span key={t} className="tag tag-gray text-xs">{t}</span>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
            {service.website && (
              <a
                href={`https://${service.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-royalblue-600 font-semibold hover:underline"
              >
                <Globe size={11} /> {service.website}
              </a>
            )}
            {service.phone && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Phone size={11} /> {service.phone}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
