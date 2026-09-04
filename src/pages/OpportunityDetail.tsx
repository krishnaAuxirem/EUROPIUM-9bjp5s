import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, MapPin, Calendar, Globe, Shield, Star, Award,
  CheckCircle, Bookmark, ArrowRight, BadgeCheck, Sparkles
} from "lucide-react";
import { opportunities } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

const TYPE_LABELS: Record<string, string> = {
  grant: "💰 Grant", scholarship: "🎓 Scholarship", fellowship: "🔬 Fellowship",
  visa: "📋 Visa Program", program: "🌟 Program", accelerator: "🚀 Accelerator",
  award: "🏆 Award", internship: "💼 Internship", event: "📅 Event", research: "🔭 Research"
};

export default function OpportunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();
  const { success, info } = useToast();

  const opp = opportunities.find(o => o.id === id);
  const isSaved = user?.savedOpportunities.includes(id ?? "") ?? false;
  const similarOpps = opportunities.filter(o => o.id !== id && (o.type === opp?.type || o.country === opp?.country)).slice(0, 3);

  if (!opp) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Opportunity Not Found</h2>
          <button onClick={() => navigate("/opportunities")} className="btn-primary mt-4">Browse Opportunities</button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!isAuthenticated) { info("Please login to save"); return; }
    const savedOpportunities = isSaved
      ? (user?.savedOpportunities ?? []).filter(x => x !== opp.id)
      : [...(user?.savedOpportunities ?? []), opp.id];
    updateUser({ savedOpportunities });
    success(isSaved ? "Removed from saved" : "Opportunity saved!");
  };

  const daysLeft = opp.deadline === "Ongoing" ? null :
    Math.ceil((new Date(opp.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const typeLabel = TYPE_LABELS[opp.type] ?? opp.type;

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="bg-navy-900 py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/60 hover:text-white mb-6 text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Opportunities
          </button>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className={`w-16 h-16 rounded-2xl ${opp.colorClass} flex items-center justify-center text-2xl shrink-0 shadow-premium`}>
              {typeLabel.split(" ")[0]}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag bg-white/10 text-white text-xs capitalize">{typeLabel.split(" ").slice(1).join(" ")}</span>
                    {opp.verified && <BadgeCheck size={14} className="text-royalblue-400" />}
                    {opp.featured && <span className="tag bg-gold-500/20 text-gold-300 text-xs">Featured</span>}
                    {opp.category && <span className="tag bg-white/10 text-white/80 text-xs">{opp.category}</span>}
                  </div>
                  <h1 className="font-serif text-3xl font-bold text-white mb-1">{opp.title}</h1>
                  <p className="text-white/70">{opp.organization}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={handleSave} className={`p-3 rounded-xl border transition-all ${isSaved ? "bg-gold-500 border-gold-500 text-white" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}`}>
                    <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
                  </button>
                  <a href="#apply" className="btn-gold px-6 py-3">Apply Now</a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Globe size={14} />{opp.country}</span>
                <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">💎 {opp.value}</span>
                {opp.deadline === "Ongoing" ? (
                  <span className="flex items-center gap-1.5 text-emerald-300 font-semibold"><Star size={12} fill="currentColor" /> Ongoing</span>
                ) : (
                  <span className={`flex items-center gap-1.5 font-semibold ${daysLeft && daysLeft < 14 ? "text-red-400" : "text-white/70"}`}>
                    <Calendar size={14} />
                    {daysLeft !== null ? `${daysLeft} days left` : opp.deadline}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="card-premium p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-3">About This Opportunity</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{opp.description}</p>
              <div className="flex flex-wrap gap-2">
                {opp.tags.map(t => <span key={t} className="tag tag-navy">{t}</span>)}
              </div>
            </div>

            {/* Eligibility */}
            <div className="card-premium p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">Eligibility Requirements</h2>
              <div className="space-y-3">
                {opp.eligibility.map((e, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-border/50">
                    <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{e}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="card-premium p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">What You Get</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {opp.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-royalblue-50 border border-royalblue-100 rounded-xl">
                    <Star size={13} className="text-gold-500 shrink-0" />
                    <span className="text-sm text-navy-800 font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Section */}
            <div id="apply" className="card-premium p-6 border-2 border-royalblue-200">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">How to Apply</h2>
              <div className="space-y-3 mb-6">
                {[
                  "Review eligibility requirements above carefully",
                  "Prepare all required documents (CV, motivation letter, references)",
                  `Visit ${opp.organization}'s official website to submit your application`,
                  `Application deadline: ${opp.deadline}`,
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-royalblue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 text-sm">{step}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="btn-primary flex-1 justify-center">
                  Apply on Official Website <ArrowRight size={16} />
                </button>
                <button onClick={handleSave} className={`btn-secondary ${isSaved ? "text-gold-600 border-gold-400" : ""}`}>
                  <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                  {isSaved ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            {/* Similar */}
            {similarOpps.length > 0 && (
              <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-xl font-bold text-navy-900">Similar Opportunities</h2>
                  <Link to="/opportunities" className="text-sm text-royalblue-600 hover:underline flex items-center gap-1">
                    View all <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="space-y-3">
                  {similarOpps.map(o => (
                    <Link key={o.id} to={`/opportunities/${o.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                      <div className={`w-10 h-10 rounded-xl ${o.colorClass} flex items-center justify-center text-lg shrink-0`}>
                        {TYPE_LABELS[o.type]?.split(" ")[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-navy-900 group-hover:text-royalblue-600 transition-colors text-sm line-clamp-1">{o.title}</p>
                        <p className="text-xs text-gray-500">{o.organization} · {o.value}</p>
                      </div>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-royalblue-500 transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick Info */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-4">Quick Overview</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Type", value: typeLabel.split(" ").slice(1).join(" ") },
                  { label: "Organization", value: opp.organization },
                  { label: "Country", value: opp.country },
                  { label: "Value", value: opp.value },
                  { label: "Deadline", value: opp.deadline },
                  ...(opp.industry ? [{ label: "Industry", value: opp.industry }] : []),
                ].map(d => (
                  <div key={d.label} className="flex justify-between items-start py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500">{d.label}</span>
                    <span className="font-semibold text-navy-900 text-right max-w-[60%]">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deadline Warning */}
            {daysLeft !== null && daysLeft < 30 && (
              <div className={`rounded-2xl p-4 border ${daysLeft < 14 ? "bg-red-50 border-red-200" : "bg-gold-50 border-gold-200"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={14} className={daysLeft < 14 ? "text-red-600" : "text-gold-600"} />
                  <p className={`font-semibold text-sm ${daysLeft < 14 ? "text-red-800" : "text-gold-800"}`}>
                    {daysLeft < 14 ? "Closing Soon!" : "Deadline Approaching"}
                  </p>
                </div>
                <p className={`text-xs ${daysLeft < 14 ? "text-red-700" : "text-gold-700"}`}>
                  Only {daysLeft} days left to apply. Don't miss this opportunity.
                </p>
              </div>
            )}

            {/* AI Advisor */}
            <div className="bg-navy-900 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-gold-400" />
                <h3 className="font-semibold">Get AI Guidance</h3>
              </div>
              <p className="text-white/70 text-xs mb-4">
                Get personalized tips for this {opp.type} application from our AI advisor.
              </p>
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
