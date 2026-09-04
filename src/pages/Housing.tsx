import { useState, useMemo } from "react";
import { Home, SlidersHorizontal, BadgeCheck, MapPin, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyCard from "@/components/features/PropertyCard";
import SearchBar from "@/components/features/SearchBar";
import EmptyState from "@/components/features/EmptyState";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { properties, toINR } from "@/lib/mockData";

const countryList = ["All Countries", "Germany", "Netherlands", "France", "Portugal", "Sweden", "Spain", "Austria"];
const typeList = ["All Types", "apartment", "house", "studio", "room", "villa"];
const listingTypes = ["All", "rent", "buy"];
const priceRanges = ["Any Price", "Under ₹1.5L/mo", "₹1.5L–₹2.5L/mo", "₹2.5L+/mo"];

export default function HousingPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [propType, setPropType] = useState("All Types");
  const [listingType, setListingType] = useState("All");
  const [minBeds, setMinBeds] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [furnished, setFurnished] = useState(false);

  const filtered = useMemo(() => {
    let result = properties.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase()) ||
        p.country.toLowerCase().includes(search.toLowerCase());
      const matchCountry = country === "All Countries" || p.country === country;
      const matchType = propType === "All Types" || p.type === propType;
      const matchListing = listingType === "All" || p.listingType === listingType;
      const matchBeds = minBeds === 0 || p.bedrooms >= minBeds;
      const matchFurnished = !furnished || p.amenities.some(a => a.toLowerCase().includes("furnished"));
      return matchSearch && matchCountry && matchType && matchListing && matchBeds && matchFurnished;
    });
    if (sortBy === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [search, country, propType, listingType, minBeds, sortBy, furnished]);

  const rentCount = properties.filter(p => p.listingType === "rent").length;
  const buyCount = properties.filter(p => p.listingType === "buy").length;

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="bg-navy-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Housing</span>
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shrink-0">
                <Home size={28} className="text-white" />
              </div>
              <div>
                <h1 className="font-serif text-4xl font-bold text-white mb-1">European Housing Market</h1>
                <p className="text-white/70">Rent or buy properties across Europe's finest cities. All prices in INR + EUR.</p>
              </div>
            </div>
            <div className="flex gap-3">
              {[
                { label: "For Rent", count: rentCount, color: "bg-royalblue-500" },
                { label: "For Sale", count: buyCount, color: "bg-gold-500" },
              ].map(s => (
                <div key={s.label} className="bg-white/10 rounded-xl px-4 py-3 text-center">
                  <p className="text-white font-bold text-xl">{s.count}</p>
                  <p className="text-white/60 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <SearchBar
              placeholder="City, country, neighborhood..."
              value={search}
              onChange={setSearch}
              size="lg"
              className="flex-1"
            />
            <div className="flex gap-2">
              {listingTypes.map(lt => (
                <button
                  key={lt}
                  onClick={() => setListingType(lt)}
                  className={`px-5 py-3.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                    listingType === lt ? "bg-white text-navy-900" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {lt === "All" ? "All" : lt === "rent" ? "For Rent" : "For Sale"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {/* INR highlight banner */}
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <span className="text-2xl">₹</span>
          <div>
            <p className="font-semibold text-emerald-800 text-sm">Prices shown in INR + EUR</p>
            <p className="text-emerald-600 text-xs">Conversion rate: €1 = ₹90 · All listings show both currencies for easy comparison</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-card mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Filters</p>
          <div className="flex flex-wrap items-center gap-3">
            <select value={country} onChange={e => setCountry(e.target.value)} className="input-premium text-sm min-w-[160px]">
              {countryList.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={propType} onChange={e => setPropType(e.target.value)} className="input-premium text-sm min-w-[130px] capitalize">
              {typeList.map(t => <option key={t} className="capitalize">{t === "All Types" ? t : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
            <select value={String(minBeds)} onChange={e => setMinBeds(Number(e.target.value))} className="input-premium text-sm min-w-[130px]">
              <option value="0">Any Bedrooms</option>
              <option value="1">1+ Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-premium text-sm min-w-[140px]">
              <option value="default">Sort: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input
                type="checkbox"
                checked={furnished}
                onChange={e => setFurnished(e.target.checked)}
                className="w-4 h-4 accent-navy-900"
              />
              <Wifi size={13} className="text-gray-400" /> Furnished
            </label>
            <div className="flex items-center gap-2 text-sm text-gray-500 ml-auto">
              <SlidersHorizontal size={14} />
              <span className="font-semibold">{filtered.length} properties</span>
            </div>
          </div>
        </div>

        {/* Featured Property */}
        {filtered.length > 0 && filtered.find(p => p.featured) && (() => {
          const featured = filtered.find(p => p.featured)!;
          const inrPrice = toINR(featured.price, featured.currency);
          const sym = featured.currency === "EUR" ? "€" : featured.currency === "SEK" ? "SEK " : "";
          return (
            <div className="mb-8">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">⭐ Featured Property</p>
              <Link to={`/housing/${featured.id}`} className="block group">
                <div className={`relative h-64 rounded-2xl overflow-hidden ${featured.colorClass}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
                  <div className="absolute inset-0 flex items-end">
                    <div className="p-8 w-full">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <div className="flex gap-2 mb-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${featured.listingType === "rent" ? "bg-royalblue-500" : "bg-gold-500"}`}>
                              For {featured.listingType === "rent" ? "Rent" : "Sale"}
                            </span>
                            <span className="tag bg-white/20 text-white text-xs">⭐ {featured.rating}</span>
                          </div>
                          <h2 className="font-serif text-2xl font-bold text-white group-hover:text-gold-300 transition-colors">{featured.title}</h2>
                          <p className="text-white/70 text-sm mt-1 flex items-center gap-1"><MapPin size={12} />{featured.address}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-3xl font-bold text-white">{sym}{featured.price.toLocaleString()}{featured.period ? "/mo" : ""}</p>
                          <p className="text-emerald-400 font-semibold">{inrPrice}{featured.period ? "/month" : ""}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })()}

        {filtered.length === 0 ? (
          <EmptyState
            title="No properties found"
            description="Try adjusting your search or filters."
            action={{ label: "Clear Filters", onClick: () => { setSearch(""); setCountry("All Countries"); setPropType("All Types"); setListingType("All"); setMinBeds(0); setFurnished(false); } }}
            icon={<Home size={28} className="text-gray-400" />}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}

        {/* Market Insights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-navy-900 rounded-2xl p-6 text-white">
            <h3 className="font-serif text-xl font-bold mb-4">Average Rent by City</h3>
            <div className="space-y-3">
              {[
                { city: "Zurich", rent: "€2,200", inr: "₹1.98L" },
                { city: "Amsterdam", rent: "€1,900", inr: "₹1.71L" },
                { city: "Paris", rent: "€1,800", inr: "₹1.62L" },
                { city: "Berlin", rent: "€1,500", inr: "₹1.35L" },
                { city: "Lisbon", rent: "€1,100", inr: "₹99K" },
                { city: "Warsaw", rent: "€700", inr: "₹63K" },
              ].map(c => (
                <div key={c.city} className="flex items-center gap-3">
                  <span className="text-white/70 text-sm w-24">{c.city}</span>
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gold-400 h-2 rounded-full"
                      style={{ width: `${(parseInt(c.rent.replace(/[€,]/g, "")) / 2200) * 100}%` }}
                    />
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white font-semibold text-sm">{c.rent}</p>
                    <p className="text-white/50 text-xs">{c.inr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium p-6">
            <h3 className="font-serif text-xl font-bold text-navy-900 mb-4">List Your Property</h3>
            <p className="text-gray-500 text-sm mb-4">Reach thousands of European professionals and families looking for properties.</p>
            <div className="space-y-3 mb-6">
              {["Free listing for first 30 days", "Verified landlord badge", "Multi-language support", "Direct tenant inquiries"].map(b => (
                <div key={b} className="flex items-center gap-2 text-sm">
                  <BadgeCheck size={14} className="text-emerald-500 shrink-0" />
                  <span className="text-gray-700">{b}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn-primary w-full justify-center">List Your Property</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
