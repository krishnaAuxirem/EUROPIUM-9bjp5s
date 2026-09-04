import { Link } from "react-router-dom";
import { MapPin, Calendar, Bookmark, Star, ArrowRight } from "lucide-react";
import type { Opportunity } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";

const typeIcons: Record<string, string> = {
  grant: "💰", scholarship: "🎓", fellowship: "🔬", visa: "📋",
  program: "🌟", accelerator: "🚀", award: "🏆"
};

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { success, info } = useToast();
  const isSaved = user?.savedOpportunities.includes(opportunity.id) ?? false;

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { info("Please login to save"); return; }
    const savedOpportunities = isSaved
      ? (user?.savedOpportunities ?? []).filter(id => id !== opportunity.id)
      : [...(user?.savedOpportunities ?? []), opportunity.id];
    updateUser({ savedOpportunities });
    success(isSaved ? "Removed from saved" : "Opportunity saved!");
  };

  const daysLeft = () => {
    if (opportunity.deadline === "Ongoing") return null;
    const diff = Math.ceil((new Date(opportunity.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diff;
  };
  const days = daysLeft();

  return (
    <Link to={`/opportunities/${opportunity.id}`} className="block">
      <div className="card-premium p-5 group cursor-pointer">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl ${opportunity.colorClass} flex items-center justify-center shrink-0 text-xl`}>
            {typeIcons[opportunity.type]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-navy-900 group-hover:text-royalblue-600 transition-colors line-clamp-2 leading-snug">
                  {opportunity.title}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">{opportunity.organization}</p>
              </div>
              <button
                onClick={handleSave}
                className={`shrink-0 p-1.5 rounded-lg transition-all duration-200 ${
                  isSaved ? "text-gold-500 bg-gold-50" : "text-gray-400 hover:text-gold-500"
                }`}
              >
                <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={11} />{opportunity.country}</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-600">💎 {opportunity.value}</span>
              {opportunity.deadline !== "Ongoing" && (
                <span className={`flex items-center gap-1 ${days && days < 14 ? "text-red-500 font-semibold" : ""}`}>
                  <Calendar size={11} />
                  {days !== null ? `${days}d left` : opportunity.deadline}
                </span>
              )}
              {opportunity.deadline === "Ongoing" && (
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <Star size={11} fill="currentColor" /> Ongoing
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className="tag tag-navy capitalize">{opportunity.type}</span>
              {opportunity.featured && <span className="tag tag-gold">Featured</span>}
              {opportunity.tags.slice(0, 2).map(t => (
                <span key={t} className="tag tag-gray">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs">
          <p className="text-gray-500 line-clamp-1">{opportunity.description.slice(0, 80)}...</p>
          <ArrowRight size={14} className="text-gray-400 group-hover:text-royalblue-500 group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-2" />
        </div>
      </div>
    </Link>
  );
}
