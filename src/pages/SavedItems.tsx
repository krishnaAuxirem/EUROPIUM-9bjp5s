import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Briefcase, Home, GraduationCap, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { jobs, properties, universities, opportunities } from "@/lib/mockData";
import JobCard from "@/components/features/JobCard";
import PropertyCard from "@/components/features/PropertyCard";
import UniversityCard from "@/components/features/UniversityCard";
import OpportunityCard from "@/components/features/OpportunityCard";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import EmptyState from "@/components/features/EmptyState";
import { useState } from "react";
import { Link } from "react-router-dom";

type Tab = "jobs" | "properties" | "universities" | "opportunities";

export default function SavedItemsPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("jobs");

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const savedJobs = jobs.filter(j => user.savedJobs.includes(j.id));
  const savedProps = properties.filter(p => user.savedProperties.includes(p.id));
  const savedUnis = universities.filter(u => user.savedUniversities.includes(u.id));
  const savedOpps = opportunities.filter(o => user.savedOpportunities.includes(o.id));

  const tabs: { key: Tab; label: string; icon: React.ElementType; count: number }[] = [
    { key: "jobs", label: "Jobs", icon: Briefcase, count: savedJobs.length },
    { key: "properties", label: "Properties", icon: Home, count: savedProps.length },
    { key: "universities", label: "Universities", icon: GraduationCap, count: savedUnis.length },
    { key: "opportunities", label: "Opportunities", icon: TrendingUp, count: savedOpps.length },
  ];

  return (
    <div className="page-container">
      <section className="bg-navy-900 py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Bookmark size={28} className="text-gold-400" />
            <div>
              <h1 className="font-serif text-3xl font-bold text-white">Saved Items</h1>
              <p className="text-white/60 mt-0.5">All your bookmarked opportunities in one place.</p>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === t.key ? "bg-white text-navy-900" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <t.icon size={14} />
                {t.label}
                <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                  tab === t.key ? "bg-navy-900 text-white" : "bg-white/20 text-white"
                }`}>{t.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {tab === "jobs" && (
          savedJobs.length === 0
            ? <EmptyState title="No saved jobs" description="Browse jobs and save ones you like." action={{ label: "Browse Jobs", onClick: () => navigate("/jobs") }} icon={<Briefcase size={28} className="text-gray-400" />} />
            : <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{savedJobs.map(j => <JobCard key={j.id} job={j} />)}</div>
        )}
        {tab === "properties" && (
          savedProps.length === 0
            ? <EmptyState title="No saved properties" description="Browse housing and save properties you like." action={{ label: "Browse Housing", onClick: () => navigate("/housing") }} icon={<Home size={28} className="text-gray-400" />} />
            : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{savedProps.map(p => <PropertyCard key={p.id} property={p} />)}</div>
        )}
        {tab === "universities" && (
          savedUnis.length === 0
            ? <EmptyState title="No saved universities" description="Browse education and save universities." action={{ label: "Browse Education", onClick: () => navigate("/education") }} icon={<GraduationCap size={28} className="text-gray-400" />} />
            : <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{savedUnis.map(u => <UniversityCard key={u.id} university={u} />)}</div>
        )}
        {tab === "opportunities" && (
          savedOpps.length === 0
            ? <EmptyState title="No saved opportunities" description="Browse and save grants, scholarships, and visas." action={{ label: "Browse Opportunities", onClick: () => navigate("/opportunities") }} icon={<TrendingUp size={28} className="text-gray-400" />} />
            : <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{savedOpps.map(o => <OpportunityCard key={o.id} opportunity={o} />)}</div>
        )}
      </div>
    </div>
  );
}
