
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, MapPin, Bed, Bath, Maximize, Star, Bookmark,
  Share2, CheckCircle, Phone, Mail, Shield, Calendar, BadgeCheck,
  Building, ChevronLeft, ChevronRight, Sparkles
} from "lucide-react";
import { properties, toINR } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

// Property images mapping
import propertyBerlin from "@/assets/property-berlin.jpg";
import propertyAmsterdam from "@/assets/property-amsterdam.jpg";
import propertyParis from "@/assets/property-paris.jpg";
import propertyLisbon from "@/assets/property-lisbon.jpg";
import propertyBarcelona from "@/assets/property-barcelona.jpg";
import propertyStockholm from "@/assets/property-stockholm.jpg";

const propertyImages: Record<string, string[]> = {
  "property-berlin": [propertyBerlin],
  "property-amsterdam": [propertyAmsterdam],
  "property-paris": [propertyParis],
  "property-lisbon": [propertyLisbon],
  "property-barcelona": [propertyBarcelona],
  "property-stockholm": [propertyStockholm],
};

const landlords = [
  { name: "Hans Weber", phone: "+49 160 1234567", email: "hans@europium.eu", verified: true, since: "2023", properties: 8, rating: 4.9, initials: "HW" },
  { name: "Sophie Laurent", phone: "+31 6 87654321", email: "sophie@europium.eu", verified: true, since: "2022", properties: 12, rating: 4.8, initials: "SL" },
  { name: "Maria Silva", phone: "+33 6 12345678", email: "maria@europium.eu", verified: false, since: "2024", properties: 3, rating: 4.6, initials: "MS" },
  { name: "João Costa", phone: "+351 91 1234567", email: "joao@europium.eu", verified: true, since: "2021", properties: 15, rating: 4.9, initials: "JC" },
];

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();
  const { success, info } = useToast();
  const [imgIdx, setImgIdx] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [scheduleForm, setScheduleForm] = useState(false);
  const [viewingDate, setViewingDate] = useState("");
  const [viewingMessage, setViewingMessage] = useState("");

  const property = properties.find(p => p.id === id);
  const isSaved = user?.savedProperties.includes(id ?? "") ?? false;
  const landlord = landlords[Math.abs((id?.charCodeAt(1) ?? 0) % landlords.length)];
  const imgs = property?.image ? (propertyImages[property.image] ?? []) : [];

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold mb-2">Property Not Found</h2>
          <button onClick={() => navigate("/housing")} className="btn-primary mt-4">Back to Housing</button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!isAuthenticated) { info("Please login to save"); return; }
    const savedProperties = isSaved
      ? (user?.savedProperties ?? []).filter(i => i !== property.id)
      : [...(user?.savedProperties ?? []), property.id];
    updateUser({ savedProperties });
    success(isSaved ? "Removed from saved" : "Property saved!");
  };

  const handleContact = () => {
    if (!isAuthenticated) { info("Please login first"); navigate("/login"); return; }
    setShowContact(!showContact);
  };

  const handleSchedule = () => {
    if (!isAuthenticated) { info("Please login first"); navigate("/login"); return; }
    if (!viewingDate) { info("Please select a date"); return; }
    success("Viewing scheduled! The landlord will confirm shortly.");
    setScheduleForm(false);
    setViewingDate("");
    setViewingMessage("");
  };

  const formatPrice = () => {
    const fmt = new Intl.NumberFormat("en", { maximumFractionDigits: 0 });
    const sym = property.currency === "EUR" ? "€" : property.currency === "SEK" ? "SEK " : "";
    return `${sym}${fmt.format(property.price)}${property.period === "month" ? "/mo" : ""}`;
  };

  const inrPrice = toINR(property.price, property.currency);
  const similarProperties = properties.filter(p => p.id !== property.id && p.country === property.country).slice(0, 3);

  return (
    <div className="page-container">
      {/* Image Gallery */}
      <div className="relative overflow-hidden" style={{ height: "420px" }}>
        {imgs.length > 0 ? (
          <img
            src={imgs[imgIdx]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full ${property.colorClass}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Nav arrows */}
        {imgs.length > 1 && (
          <>
            <button onClick={() => setImgIdx(i => (i - 1 + imgs.length) % imgs.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => setImgIdx(i => (i + 1) % imgs.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all">
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Top actions */}
        <div className="absolute top-4 left-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/80 hover:text-white bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl text-sm transition-colors">
            <ArrowLeft size={15} /> Back
          </button>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full text-white ${property.listingType === "rent" ? "bg-royalblue-500" : "bg-gold-500"}`}>
            For {property.listingType === "rent" ? "Rent" : "Sale"}
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="font-serif text-3xl font-bold text-white leading-tight">{property.title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-white/80 text-sm flex items-center gap-1"><MapPin size={12} />{property.address}</span>
            <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
              <Star size={11} className="fill-gold-400 text-gold-400" />
              <span className="text-white text-xs font-semibold">{property.rating}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price & Key Info */}
            <div className="card-premium p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl font-bold text-navy-900">{formatPrice()}</span>
                    {property.listingType === "rent" && <span className="text-sm text-gray-400">/ month</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-emerald-600 font-semibold text-lg">{inrPrice}</span>
                    {property.listingType === "rent" && <span className="text-sm text-gray-400">/ month</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSave} className={`p-2.5 rounded-xl border transition-all ${isSaved ? "bg-gold-50 border-gold-300 text-gold-600" : "border-border hover:border-gold-400"}`}>
                    <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />
                  </button>
                  <button className="p-2.5 rounded-xl border border-border hover:border-navy-400 transition-all">
                    <Share2 size={17} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 py-4 border-y border-gray-100">
                {property.bedrooms > 0 && (
                  <span className="flex items-center gap-1.5"><Bed size={16} className="text-royalblue-500" />{property.bedrooms} bedroom{property.bedrooms !== 1 ? "s" : ""}</span>
                )}
                <span className="flex items-center gap-1.5"><Bath size={16} className="text-royalblue-500" />{property.bathrooms} bathroom{property.bathrooms !== 1 ? "s" : ""}</span>
                <span className="flex items-center gap-1.5"><Maximize size={16} className="text-royalblue-500" />{property.area} m²</span>
                <span className="flex items-center gap-1.5"><Building size={16} className="text-royalblue-500" />{property.type}</span> {/* FIX: Closing tag for Building */}
                {property.featured && <span className="tag tag-gold">⭐ Featured</span>}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {property.tags.map(t => <span key={t} className="tag tag-blue">{t}</span>)}
              </div>
            </div>

            {/* Description */}
            <div className="card-premium p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-3">About This Property</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="card-premium p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">Amenities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((a, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                    <span className="text-sm text-gray-700">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Viewing */}
            {scheduleForm && (
              <div className="card-premium p-6 border-2 border-royalblue-200 animate-fade-in">
                <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">Schedule a Viewing</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date</label>
                    <input
                      type="date"
                      value={viewingDate}
                      onChange={e => setViewingDate(e.target.value)}
                      className="input-premium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message (optional)</label>
                    <textarea
                      value={viewingMessage}
                      onChange={e => setViewingMessage(e.target.value)}
                      placeholder="Tell the landlord about yourself..."
                      rows={3}
                      className="input-premium resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleSchedule} className="btn-primary flex-1 justify-center">
                      <Calendar size={15} /> Schedule Viewing
                    </button>
                    <button onClick={() => setScheduleForm(false)} className="btn-secondary px-4">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">Similar Properties in {property.country}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similarProperties.map(p => {
                    const sym = p.currency === "EUR" ? "€" : p.currency === "SEK" ? "SEK " : "";
                    return (
                      <Link key={p.id} to={`/housing/${p.id}`} className="card-premium overflow-hidden group block">
                        <div className={`h-32 ${p.colorClass} relative`}>
                          <div className="absolute inset-0 bg-black/30" />
                          <div className="absolute bottom-2 left-3">
                            <p className="text-white font-semibold text-sm group-hover:text-gold-300 transition-colors line-clamp-1">{p.title}</p>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="font-bold text-navy-900">{sym}{p.price.toLocaleString()}{p.period ? "/mo" : ""}</p>
                          <p className="text-xs text-emerald-600">{toINR(p.price, p.currency)}</p>
                          <p className="text-xs text-gray-500 mt-1">{p.city} · {p.area}m²</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* CTA Buttons */}
            <div className="card-premium p-5 space-y-3">
              <h3 className="font-semibold text-navy-900 mb-1">Interested in This Property?</h3>
              <button
                onClick={() => { if (!isAuthenticated) { info("Please login"); navigate("/login"); return; } setScheduleForm(!scheduleForm); }}
                className="btn-primary w-full justify-center"
              >
                <Calendar size={16} /> Schedule Viewing
              </button>
              <button onClick={handleContact} className="btn-secondary w-full justify-center">
                <Mail size={16} /> Contact Landlord
              </button>
              <button
                onClick={() => { if (!isAuthenticated) { info("Please login"); return; } success("Info request sent!"); }}
                className="w-full border border-gray-200 text-gray-600 hover:border-navy-400 hover:text-navy-900 rounded-xl py-3 text-sm font-semibold transition-all"
              >
                <Phone size={14} className="inline mr-1.5" /> Request Info
              </button>
            </div>

            {/* Contact Info (shown on click) */}
            {showContact && (
              <div className="card-premium p-5 border-royalblue-200 border-2 animate-fade-in">
                <p className="text-sm font-medium text-gray-700 mb-3">Landlord Contact</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><Phone size={13} className="text-royalblue-500" /><span className="text-gray-700">{landlord.phone}</span></div>
                  <div className="flex items-center gap-2"><Mail size={13} className="text-royalblue-500" /><span className="text-gray-700">{landlord.email}</span></div>
                </div>
              </div>
            )}

            {/* Landlord Profile */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-4">Landlord Profile</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center text-white font-bold">
                  {landlord.initials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-navy-900">{landlord.name}</p>
                    {landlord.verified && <BadgeCheck size={14} className="text-royalblue-500" />}
                  </div>
                  <p className="text-xs text-gray-500">Member since {landlord.since}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                <div className="bg-gray-50 rounded-xl p-2">
                  <p className="font-bold text-navy-900">{landlord.properties}</p>
                  <p className="text-xs text-gray-500">Listings</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-2">
                  <p className="font-bold text-navy-900">{landlord.rating}</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-2">
                  {landlord.verified ? (
                    <><p className="text-emerald-600 font-bold text-xs">✓ Verified</p><p className="text-xs text-gray-500">Landlord</p></>
                  ) : (
                    <><p className="text-gray-400 font-bold text-xs">Pending</p><p className="text-xs text-gray-500">Verify</p></>
                  )}
                </div>
              </div>
              {landlord.verified && (
                <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <Shield size={13} className="text-emerald-500 shrink-0" />
                  <p className="text-xs text-emerald-700">ID verified by EUROPIUM</p>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-3">Property Details</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { l: "Type", v: property.type.charAt(0).toUpperCase() + property.type.slice(1) },
                  { l: "Listing", v: property.listingType === "rent" ? "For Rent" : "For Sale" },
                  { l: "Country", v: property.country },
                  { l: "City", v: property.city },
                  { l: "Area", v: `${property.area} m²` },
                  ...(property.bedrooms > 0 ? [{ l: "Bedrooms", v: String(property.bedrooms) }] : []),
                  { l: "Bathrooms", v: String(property.bathrooms) },
                  { l: "Price (EUR)", v: formatPrice() },
                  { l: "Price (INR)", v: inrPrice + (property.period ? "/month" : "") },
                ].map(d => (
                  <div key={d.l} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500">{d.l}</span>
                    <span className="font-semibold text-navy-900">{d.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Advisor */}
            <div className="bg-navy-900 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-gold-400" />
                <h3 className="font-semibold">Relocation Advice</h3>
              </div>
              <p className="text-white/70 text-xs mb-4">Get help with leasing process, tenant rights, and neighborhood insights.</p>
              <Link to="/ai-advisor" className="btn-gold w-full justify-center py-2.5 text-sm">
                Ask AI Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
