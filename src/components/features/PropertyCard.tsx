import { Link } from "react-router-dom";
import { MapPin, Star, Bookmark, Bed, Bath, Maximize, BadgeCheck } from "lucide-react";
import type { Property } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import { toINR } from "@/lib/mockData";

// Property images
import propertyBerlin from "@/assets/property-berlin.jpg";
import propertyAmsterdam from "@/assets/property-amsterdam.jpg";
import propertyParis from "@/assets/property-paris.jpg";
import propertyLisbon from "@/assets/property-lisbon.jpg";
import propertyBarcelona from "@/assets/property-barcelona.jpg";
import propertyStockholm from "@/assets/property-stockholm.jpg";

const propertyImages: Record<string, string> = {
  "property-berlin": propertyBerlin,
  "property-amsterdam": propertyAmsterdam,
  "property-paris": propertyParis,
  "property-lisbon": propertyLisbon,
  "property-barcelona": propertyBarcelona,
  "property-stockholm": propertyStockholm,
};

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { success, info } = useToast();
  const isSaved = user?.savedProperties.includes(property.id) ?? false;

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { info("Please login to save properties"); return; }
    const savedProperties = isSaved
      ? (user?.savedProperties ?? []).filter(id => id !== property.id)
      : [...(user?.savedProperties ?? []), property.id];
    updateUser({ savedProperties });
    success(isSaved ? "Property removed from saved" : "Property saved!");
  };

  const formatPrice = () => {
    const fmt = new Intl.NumberFormat("en-EU", { style: "decimal", maximumFractionDigits: 0 });
    const sym = property.currency === "EUR" ? "€" : property.currency === "SEK" ? "SEK " : "";
    return `${sym}${fmt.format(property.price)}${property.period ? "/mo" : ""}`;
  };

  const inrPrice = toINR(property.price, property.currency);
  const heroImg = property.image ? propertyImages[property.image] : null;

  return (
    <Link to={`/housing/${property.id}`} className="block">
      <div className="card-premium overflow-hidden group">
        {/* Image area */}
        <div className="h-48 relative overflow-hidden">
          {heroImg ? (
            <img
              src={heroImg}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className={`w-full h-full ${property.colorClass}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/40 transition-all duration-300" />
          <button
            onClick={handleSave}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isSaved ? "bg-gold-500 text-white" : "bg-white/90 text-gray-600 hover:bg-gold-500 hover:text-white"
            }`}
          >
            <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
          </button>
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${
              property.listingType === "rent" ? "bg-royalblue-500" : "bg-gold-500"
            }`}>
              For {property.listingType === "rent" ? "Rent" : "Sale"}
            </span>
            {property.featured && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gold-500 text-white">⭐ Featured</span>
            )}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-navy-900 group-hover:text-royalblue-600 transition-colors line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star size={12} className="fill-gold-400 text-gold-400" />
              <span className="text-xs font-semibold">{property.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <MapPin size={13} />
            <span>{property.city}, {property.country}</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
            {property.bedrooms > 0 && <span className="flex items-center gap-1"><Bed size={12} />{property.bedrooms} bed</span>}
            <span className="flex items-center gap-1"><Bath size={12} />{property.bathrooms} bath</span>
            <span className="flex items-center gap-1"><Maximize size={12} />{property.area}m²</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <span className="text-xl font-bold text-navy-900">{formatPrice()}</span>
              {property.listingType === "rent" && <span className="text-xs text-gray-400 ml-1">/ month</span>}
              <p className="text-emerald-600 font-semibold text-sm mt-0.5">{inrPrice}{property.period ? "/month" : ""}</p>
            </div>
            <div className="flex gap-1">
              {property.tags.slice(0, 1).map(t => (
                <span key={t} className="tag tag-blue text-xs">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
