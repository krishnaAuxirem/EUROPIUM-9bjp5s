import { Link } from "react-router-dom";
import { MapPin, Star, Users, Shield, ArrowRight } from "lucide-react";
import type { BusinessListing } from "@/types";

interface BusinessCardProps {
  business: BusinessListing;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const typeColors: Record<string, string> = {
    employer: "tag-blue",
    supplier: "tag-gold",
    partner: "tag-green",
    service: "tag-navy",
    startup: "tag-gray",
  };

  return (
    <Link to={`/business/${business.id}`} className="block">
      <div className="card-premium p-5 group cursor-pointer">
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: business.colorGradient }}
          >
            <span className="text-white font-bold text-xl">{business.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-navy-900 group-hover:text-royalblue-600 transition-colors">
                    {business.name}
                  </h3>
                  {business.verified && (
                    <Shield size={14} className="text-royalblue-500 fill-royalblue-100" />
                  )}
                </div>
                <p className="text-sm text-gray-500">{business.category}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Star size={12} className="fill-gold-400 text-gold-400" />
                <span className="text-xs font-semibold">{business.rating}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={11} />{business.city}, {business.country}</span>
              <span className="flex items-center gap-1"><Users size={11} />{business.employees}</span>
              <span>Est. {business.founded}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className={`tag ${typeColors[business.type]}`}>{business.type}</span>
              {business.tags.slice(0, 2).map(t => (
                <span key={t} className="tag tag-gray">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-gray-500 line-clamp-1 flex-1">{business.description.slice(0, 70)}...</p>
          <ArrowRight size={14} className="text-gray-400 group-hover:text-royalblue-500 group-hover:translate-x-1 transition-all duration-200 ml-2 shrink-0" />
        </div>
      </div>
    </Link>
  );
}
