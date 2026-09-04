import { Link } from "react-router-dom";
import { MapPin, Star, GraduationCap, Bookmark, Users, Award, BadgeCheck, BookOpen } from "lucide-react";
import type { University } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";

const EUR_TO_INR = 90;
const CHF_TO_INR = 100;

function tuitionToINR(str: string): string {
  if (!str || str === "Free" || str.includes("€0")) return "Free";
  const match = str.match(/[\d,]+/);
  if (!match) return "";
  const num = parseInt(match[0].replace(/,/g, ""));
  if (isNaN(num)) return "";
  const isCHF = str.includes("CHF");
  const inr = num * (isCHF ? CHF_TO_INR : EUR_TO_INR);
  if (inr >= 100000) return `₹${(inr / 100000).toFixed(1)}L`;
  return `₹${inr.toLocaleString("en-IN")}`;
}

interface UniversityCardProps {
  university: University;
  onCompare?: (id: string) => void;
  isCompared?: boolean;
}

export default function UniversityCard({ university, onCompare, isCompared }: UniversityCardProps) {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { success, info } = useToast();
  const isSaved = user?.savedUniversities.includes(university.id) ?? false;

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { info("Please login to save"); return; }
    const savedUniversities = isSaved
      ? (user?.savedUniversities ?? []).filter(id => id !== university.id)
      : [...(user?.savedUniversities ?? []), university.id];
    updateUser({ savedUniversities });
    success(isSaved ? "Removed from saved" : "University saved!");
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    onCompare?.(university.id);
  };

  const euINR = tuitionToINR(university.tuitionEU);
  const nonEuINR = tuitionToINR(university.tuitionNonEU);
  const hasScholarship = university.scholarships && university.scholarships.length > 0;

  return (
    <Link to={`/education/${university.id}`} className="block group">
      <div className="card-premium overflow-hidden">
        {/* Color Header */}
        <div className={`${university.colorClass} h-16 relative`}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="tag bg-white/20 text-white text-xs">#{university.ranking} Global</span>
              <span className="tag bg-white/20 text-white text-xs capitalize">{university.type}</span>
              {hasScholarship && (
                <span className="tag bg-gold-500/80 text-white text-xs">
                  <Award size={9} /> Scholarships
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 bg-white/20 rounded-lg px-2 py-1">
              <Star size={11} className="fill-gold-400 text-gold-400" />
              <span className="text-white font-bold text-xs">{university.rating}</span>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="font-semibold text-navy-900 group-hover:text-royalblue-600 transition-colors leading-snug">
                  {university.name}
                </h3>
                <BadgeCheck size={14} className="text-royalblue-500 shrink-0" />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin size={11} />{university.city}, {university.country}
                <span className="text-gray-300">·</span>
                <Users size={11} />{university.students.toLocaleString()} students
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {onCompare && (
                <button onClick={handleCompare}
                  className={`p-1.5 rounded-lg transition-all text-xs font-medium ${isCompared ? "bg-royalblue-500 text-white" : "bg-gray-100 text-gray-500 hover:bg-royalblue-100 hover:text-royalblue-600"}`}>
                  {isCompared ? "✓" : "⊕"}
                </button>
              )}
              <button onClick={handleSave}
                className={`p-1.5 rounded-lg transition-all ${isSaved ? "text-gold-500 bg-gold-50" : "text-gray-400 hover:text-gold-500"}`}>
                <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{university.description}</p>

          {/* Tuition */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2.5">
              <p className="text-xs text-emerald-600 font-semibold">EU Students</p>
              <p className="text-sm font-bold text-navy-900">{university.tuitionEU}</p>
              {euINR && euINR !== "Free" && <p className="text-xs text-emerald-700 mt-0.5">{euINR}/yr</p>}
              {(euINR === "Free" || university.tuitionEU.includes("€0")) && (
                <p className="text-xs text-emerald-700 font-semibold mt-0.5">Free for EU!</p>
              )}
            </div>
            <div className="bg-royalblue-50 border border-royalblue-100 rounded-lg p-2.5">
              <p className="text-xs text-royalblue-600 font-semibold">Non-EU</p>
              <p className="text-sm font-bold text-navy-900">{university.tuitionNonEU.split("–")[0].trim()}+</p>
              {nonEuINR && <p className="text-xs text-royalblue-700 mt-0.5">{nonEuINR}+/yr</p>}
            </div>
          </div>

          {/* Programs */}
          <div className="flex flex-wrap gap-1 mb-3">
            {university.programs.slice(0, 4).map(p => (
              <span key={p} className="flex items-center gap-1 tag tag-gray text-xs">
                <BookOpen size={9} />{p}
              </span>
            ))}
            {university.programs.length > 4 && (
              <span className="tag tag-navy text-xs">+{university.programs.length - 4}</span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 border-t border-border/40 pt-3">
            {university.tags.slice(0, 3).map(t => (
              <span key={t} className="tag tag-blue text-xs">{t}</span>
            ))}
            <span className="tag tag-gray text-xs">{university.acceptanceRate} acceptance</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
