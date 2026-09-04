import { Link } from "react-router-dom";
import { Star, MapPin, Users, Briefcase, GraduationCap, ChevronRight } from "lucide-react";
import type { Country } from "@/types";

interface CountryCardProps {
  country: Country;
  size?: "sm" | "md" | "lg";
}

export default function CountryCard({ country, size = "md" }: CountryCardProps) {
  const costColors = {
    low: "tag-green",
    medium: "tag-blue",
    high: "tag-gold",
    "very-high": "tag-navy",
  };
  const costLabels = { low: "Low Cost", medium: "Moderate", high: "High Cost", "very-high": "Premium" };

  return (
    <Link to={`/explore/${country.id}`} className="block">
      <div className="card-premium overflow-hidden group cursor-pointer">
        {/* Visual Banner */}
        <div className={`h-32 relative overflow-hidden ${country.colorClass}`}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-1">
                {country.code === "DE" ? "🇩🇪" : country.code === "FR" ? "🇫🇷" : country.code === "NL" ? "🇳🇱" :
                 country.code === "SE" ? "🇸🇪" : country.code === "ES" ? "🇪🇸" : country.code === "IT" ? "🇮🇹" :
                 country.code === "PT" ? "🇵🇹" : country.code === "CH" ? "🇨🇭" : country.code === "NO" ? "🇳🇴" :
                 country.code === "PL" ? "🇵🇱" : country.code === "DK" ? "🇩🇰" : country.code === "AT" ? "🇦🇹" : "🇪🇺"}
              </div>
            </div>
          </div>
          {country.visaFriendly && (
            <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              Visa Friendly
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-serif text-lg font-bold text-navy-900 group-hover:text-royalblue-600 transition-colors">
                {country.name}
              </h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-0.5">
                <MapPin size={12} />
                <span>{country.capital}</span>
                <span className="mx-1">·</span>
                <span>{country.region}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Star size={14} className="fill-gold-400 text-gold-400" />
              <span className="text-sm font-semibold text-gray-700">{country.rating}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{country.description}</p>

          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Briefcase size={12} className="text-royalblue-500" />
              <span>{country.jobCount.toLocaleString()} jobs</span>
            </div>
            <div className="flex items-center gap-1">
              <GraduationCap size={12} className="text-gold-500" />
              <span>{country.universityCount} universities</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={12} className="text-emerald-500" />
              <span>{country.population}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1.5 flex-wrap">
              <span className={`tag ${costColors[country.costOfLiving]}`}>{costLabels[country.costOfLiving]}</span>
              {country.tags.slice(0, 1).map(t => (
                <span key={t} className="tag tag-gray">{t}</span>
              ))}
            </div>
            <ChevronRight size={16} className="text-gray-400 group-hover:text-royalblue-500 group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </div>
      </div>
    </Link>
  );
}
