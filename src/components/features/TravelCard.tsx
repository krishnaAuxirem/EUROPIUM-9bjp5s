import { Link } from "react-router-dom";
import { Star, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import type { TravelDestination } from "@/types";

const budgetBadge = { "budget": "tag-green", "mid-range": "tag-blue", "luxury": "tag-gold" };
const budgetLabel = { "budget": "Budget", "mid-range": "Mid-Range", "luxury": "Luxury" };

interface TravelCardProps {
  destination: TravelDestination;
}

export default function TravelCard({ destination }: TravelCardProps) {
  return (
    <Link to={`/travel/${destination.id}`} className="block">
      <div className="card-premium overflow-hidden group cursor-pointer">
        <div className={`h-44 relative overflow-hidden ${destination.colorClass}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-300" />
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-serif font-bold text-white text-xl leading-tight">{destination.name}</h3>
            <div className="flex items-center gap-1 text-white/80 text-sm mt-0.5">
              <MapPin size={12} />
              <span>{destination.country}</span>
            </div>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
            <Star size={12} className="fill-gold-400 text-gold-400" />
            <span className="text-white text-xs font-semibold">{destination.rating}</span>
          </div>
          <div className="absolute top-3 left-3">
            <span className={`tag ${budgetBadge[destination.budget]} text-xs`}>{budgetLabel[destination.budget]}</span>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{destination.description}</p>

          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1"><Calendar size={11} />{destination.bestSeason}</span>
            <span className="flex items-center gap-1"><Users size={11} />{destination.duration}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {destination.type.slice(0, 2).map(t => (
                <span key={t} className="tag tag-navy text-xs">{t}</span>
              ))}
            </div>
            <ArrowRight size={14} className="text-gray-400 group-hover:text-royalblue-500 group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </div>
      </div>
    </Link>
  );
}
