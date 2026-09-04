import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, Star, Calendar, Clock, MapPin, CheckCircle, Bookmark,
  Hotel, UtensilsCrossed, Bus, Sparkles, ChevronRight, Info, Zap
} from "lucide-react";
import { travelDestinations } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
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

const budgetColors: Record<string, string> = {
  budget: "bg-emerald-500",
  "mid-range": "bg-royalblue-500",
  luxury: "bg-gold-500"
};
const budgetLabels: Record<string, string> = { budget: "Budget", "mid-range": "Mid-Range", luxury: "Luxury" };

const starIcons = (n: number) => Array(5).fill(0).map((_, i) => (
  <Star key={i} size={12} className={i < n ? "fill-gold-400 text-gold-400" : "text-gray-300"} />
));

export default function TravelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();
  const { success, info } = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "hotels" | "restaurants" | "transport" | "tips">("overview");

  const dest = travelDestinations.find(d => d.id === id);
  const isSaved = false; // Travel saves could be added to user later

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold mb-2">Destination Not Found</h2>
          <button onClick={() => navigate("/travel")} className="btn-primary mt-4">Back to Travel</button>
        </div>
      </div>
    );
  }

  const heroImg = dest.image ? imageMap[dest.image] : null;

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="relative h-[480px] overflow-hidden">
        {heroImg ? (
          <img src={heroImg} alt={dest.name} className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full ${dest.colorClass}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm transition-colors">
              <ArrowLeft size={16} /> Back to Travel
            </button>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${budgetColors[dest.budget]}`}>
                    {budgetLabels[dest.budget]}
                  </span>
                  {dest.popularity && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white">
                      🔥 {dest.popularity}% Popularity
                    </span>
                  )}
                </div>
                <h1 className="font-serif text-5xl font-bold text-white leading-tight">{dest.name}</h1>
                <div className="flex items-center gap-4 text-white/80 text-sm mt-2">
                  <span className="flex items-center gap-1"><MapPin size={13} />{dest.country}</span>
                  <span className="flex items-center gap-1"><Star size={13} className="fill-gold-400 text-gold-400" />{dest.rating}/5.0</span>
                  <span className="flex items-center gap-1"><Clock size={13} />{dest.duration}</span>
                  <span className="flex items-center gap-1"><Calendar size={13} />{dest.bestSeason}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link to="/trip-planner" className="btn-gold px-5 py-2.5 text-sm">
                  <Zap size={15} /> Plan This Trip
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {/* Tab nav */}
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 border border-border/50 shadow-card mb-8 overflow-x-auto scrollbar-hide">
          {[
            { key: "overview", label: "Overview" },
            { key: "hotels", label: "Hotels" },
            { key: "restaurants", label: "Restaurants" },
            { key: "transport", label: "Transport" },
            { key: "tips", label: "Travel Tips" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? "bg-navy-900 text-white shadow-premium"
                  : "text-gray-500 hover:text-navy-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "overview" && (
              <>
                <div className="card-premium p-6">
                  <h2 className="font-serif text-xl font-bold text-navy-900 mb-3">About {dest.name}</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">{dest.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {dest.type.map(t => <span key={t} className="tag tag-navy">{t}</span>)}
                    {dest.tags.map(t => <span key={t} className="tag tag-gray">{t}</span>)}
                  </div>
                </div>

                {dest.topAttractions && (
                  <div className="card-premium p-6">
                    <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">🏛️ Top Attractions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {dest.topAttractions.map((a, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-royalblue-50 border border-royalblue-100 rounded-xl">
                          <div className="w-7 h-7 rounded-full bg-royalblue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </div>
                          <span className="text-sm font-medium text-navy-900">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="card-premium p-6">
                  <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">⚡ Highlights</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {dest.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 bg-gold-50 border border-gold-100 rounded-xl">
                        <Star size={13} className="text-gold-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-navy-800">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-premium p-6">
                  <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">🎯 Activities</h2>
                  <div className="flex flex-wrap gap-2">
                    {dest.activities.map((a, i) => (
                      <span key={i} className="flex items-center gap-1 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-800 font-medium">
                        <CheckCircle size={13} className="text-emerald-500" /> {a}
                      </span>
                    ))}
                  </div>
                </div>

                {dest.events && dest.events.length > 0 && (
                  <div className="card-premium p-6">
                    <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">🎉 Events & Festivals</h2>
                    <div className="space-y-2">
                      {dest.events.map((e, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 border border-border/50 rounded-xl">
                          <Calendar size={14} className="text-royalblue-500 shrink-0" />
                          <span className="text-sm text-gray-700">{e}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === "hotels" && dest.hotels && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-navy-900">🏨 Where to Stay in {dest.name}</h2>
                {dest.hotels.map((hotel, i) => (
                  <div key={i} className="card-premium p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center shrink-0">
                          <Hotel size={22} className="text-navy-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-navy-900">{hotel.name}</h3>
                          <div className="flex items-center gap-1 mt-1">{starIcons(hotel.stars)}</div>
                          <p className="text-gray-500 text-sm mt-1">{hotel.description}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-navy-900 text-lg">{hotel.price}</p>
                        <button className="mt-2 text-xs font-semibold text-royalblue-600 hover:underline">Book Now →</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "restaurants" && dest.restaurants && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-navy-900">🍴 Where to Eat in {dest.name}</h2>
                {dest.restaurants.map((r, i) => (
                  <div key={i} className="card-premium p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center shrink-0">
                        <UtensilsCrossed size={20} className="text-gold-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-navy-900">{r.name}</h3>
                            <span className="tag tag-gray text-xs mt-1">{r.type}</span>
                          </div>
                          <span className="text-lg font-bold text-navy-900">{r.price}</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">{r.specialty}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "transport" && dest.transportation && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-navy-900">🚌 Getting Around {dest.name}</h2>
                {dest.transportation.map((t, i) => (
                  <div key={i} className="card-premium p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-royalblue-100 flex items-center justify-center shrink-0">
                      <Bus size={18} className="text-royalblue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{t}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "tips" && dest.tips && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-navy-900">💡 Insider Travel Tips</h2>
                {dest.tips.map((tip, i) => (
                  <div key={i} className="card-premium p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gold-500 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Trip Overview */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-4">📋 Trip Summary</h3>
              <div className="space-y-3 text-sm">
                {[
                  { icon: Calendar, label: "Best Season", value: dest.bestSeason },
                  { icon: Clock, label: "Ideal Duration", value: dest.duration },
                  { icon: MapPin, label: "Country", value: dest.country },
                  ...(dest.dailyBudget ? [{ icon: Star, label: "Daily Budget", value: dest.dailyBudget }] : []),
                ].map(d => (
                  <div key={d.label} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <d.icon size={14} className="text-royalblue-500 shrink-0" />
                    <span className="text-gray-500 flex-1">{d.label}</span>
                    <span className="font-semibold text-navy-900">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Estimate */}
            {dest.dailyBudget && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                  <Info size={15} /> Estimated Budget
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily budget (EUR)</span>
                    <span className="font-bold text-navy-900">{dest.dailyBudget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">For {dest.duration}</span>
                    <span className="font-bold text-emerald-600">Check AI Advisor</span>
                  </div>
                </div>
              </div>
            )}

            {/* Plan this trip CTA */}
            <div className="bg-navy-900 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-gold-400" />
                <h3 className="font-semibold">Plan This Trip</h3>
              </div>
              <p className="text-white/70 text-xs mb-4">Build a detailed day-by-day itinerary for {dest.name} with our Trip Planner.</p>
              <Link to="/trip-planner" className="btn-gold w-full justify-center py-2.5 text-sm">
                Open Trip Planner <ChevronRight size={14} />
              </Link>
            </div>

            {/* AI Advisor */}
            <div className="card-premium p-5 bg-royalblue-50 border-royalblue-100">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-royalblue-500" />
                <h3 className="font-semibold text-navy-900 text-sm">Ask AI Advisor</h3>
              </div>
              <p className="text-gray-500 text-xs mb-3">Get visa tips, travel budget, and hidden gems for {dest.name}.</p>
              <Link to="/ai-advisor" className="btn-primary w-full justify-center py-2 text-sm">
                Ask AI
              </Link>
            </div>

            {/* More destinations */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-3 text-sm">More Destinations</h3>
              <div className="space-y-2">
                {travelDestinations.filter(d => d.id !== dest.id).slice(0, 4).map(d => (
                  <Link key={d.id} to={`/travel/${d.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div className={`w-8 h-8 rounded-lg ${d.colorClass} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy-900 group-hover:text-royalblue-600 transition-colors">{d.name}</p>
                      <p className="text-xs text-gray-400">{d.country}</p>
                    </div>
                    <ChevronRight size={12} className="text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
