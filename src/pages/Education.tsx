import { useState, useMemo } from "react";
import {
  GraduationCap, Filter, Star, Globe, BookOpen, Search,
  SlidersHorizontal, MapPin, Award, Users, CheckCircle, X
} from "lucide-react";
import { Link } from "react-router-dom";
import UniversityCard from "@/components/features/UniversityCard";
import EmptyState from "@/components/features/EmptyState";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { universities } from "@/lib/mockData";

const countryList = ["All Countries", "Germany", "Switzerland", "Netherlands", "France", "Sweden", "Italy", "Denmark"];
const programList = ["All Programs", "Engineering", "Computer Science", "Business", "MBA", "Medicine", "Law", "Economics", "Physics", "Architecture", "Data Science"];
const degreeList = ["All Degrees", "Bachelor", "Master", "PhD", "MBA"];
const typeList = ["All Types", "public", "private"];
const tuitionList = ["Any Tuition", "Free / €0", "Under €5,000", "Under €15,000"];
const languageList = ["All Languages", "English", "German", "French", "Italian"];

const STATS = [
  { icon: GraduationCap, value: "800+", label: "Universities" },
  { icon: Globe, value: "44", label: "Countries" },
  { icon: Award, value: "68%", label: "Offer Scholarships" },
  { icon: Users, value: "1.2M+", label: "Students Helped" },
];

export default function EducationPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [program, setProgram] = useState("All Programs");
  const [type, setType] = useState("All Types");
  const [degree, setDegree] = useState("All Degrees");
  const [language, setLanguage] = useState("All Languages");
  const [scholarshipOnly, setScholarshipOnly] = useState(false);
  const [sortBy, setSortBy] = useState("ranking");
  const [compareList, setCompareList] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let result = universities.filter(u => {
      const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.city.toLowerCase().includes(search.toLowerCase()) ||
        u.programs.some(p => p.toLowerCase().includes(search.toLowerCase()));
      const matchCountry = country === "All Countries" || u.country === country;
      const matchProgram = program === "All Programs" || u.programs.some(p => p.toLowerCase().includes(program.toLowerCase()));
      const matchType = type === "All Types" || u.type === type;
      const matchLanguage = language === "All Languages" || u.language.toLowerCase().includes(language.toLowerCase());
      const matchScholarship = !scholarshipOnly || (u.scholarships && u.scholarships.length > 0);
      return matchSearch && matchCountry && matchProgram && matchType && matchLanguage && matchScholarship;
    });
    if (sortBy === "ranking") result = [...result].sort((a, b) => a.ranking - b.ranking);
    if (sortBy === "students") result = [...result].sort((a, b) => b.students - a.students);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [search, country, program, type, degree, language, scholarshipOnly, sortBy]);

  const activeFilters = [
    country !== "All Countries" && { key: "country", label: country },
    program !== "All Programs" && { key: "program", label: program },
    type !== "All Types" && { key: "type", label: type },
    language !== "All Languages" && { key: "language", label: language },
    scholarshipOnly && { key: "scholarship", label: "Scholarships Available" },
  ].filter(Boolean) as { key: string; label: string }[];

  const clearFilter = (key: string) => {
    if (key === "country") setCountry("All Countries");
    if (key === "program") setProgram("All Programs");
    if (key === "type") setType("All Types");
    if (key === "language") setLanguage("All Languages");
    if (key === "scholarship") setScholarshipOnly(false);
  };

  const clearAll = () => {
    setSearch(""); setCountry("All Countries"); setProgram("All Programs");
    setType("All Types"); setLanguage("All Languages"); setScholarshipOnly(false);
  };

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(x => x !== id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, id]);
    }
  };

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="bg-navy-900 europium-pattern py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3">Education Hub</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
              World-Class European Universities
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              800+ universities across Europe. Free tuition available. Scholarships for international students.
            </p>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl p-3 flex flex-col md:flex-row gap-3 mb-6 shadow-premium-xl max-w-3xl mx-auto">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="University name, city, program..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-navy-900 placeholder:text-gray-400 text-sm"
              />
            </div>
            <button className="btn-primary px-8 py-3 shrink-0">
              <Search size={16} /> Search
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <s.icon size={18} className="text-gold-400" />
                <div>
                  <div className="text-white font-bold text-sm">{s.value}</div>
                  <div className="text-white/50 text-xs">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl border border-border/50 shadow-card p-5 sticky top-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-navy-900 flex items-center gap-2">
                  <Filter size={16} /> Filters
                </h3>
                {activeFilters.length > 0 && (
                  <button onClick={clearAll} className="text-xs text-royalblue-600 hover:underline">Clear all</button>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Country</label>
                  <select value={country} onChange={e => setCountry(e.target.value)} className="input-premium text-sm py-2">
                    {countryList.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Program / Field</label>
                  <select value={program} onChange={e => setProgram(e.target.value)} className="input-premium text-sm py-2">
                    {programList.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">University Type</label>
                  <div className="space-y-1">
                    {["public", "private"].map(t => (
                      <button key={t} onClick={() => setType(type === t ? "All Types" : t)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all ${type === t ? "bg-navy-900 text-white" : "hover:bg-gray-50 text-gray-700"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Language of Instruction</label>
                  <select value={language} onChange={e => setLanguage(e.target.value)} className="input-premium text-sm py-2">
                    {languageList.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>

                <div className="flex items-center justify-between py-2 border-t border-border/50">
                  <div>
                    <p className="text-sm font-medium text-navy-900 flex items-center gap-1.5">
                      <Award size={14} className="text-gold-500" /> Scholarships
                    </p>
                    <p className="text-xs text-gray-500">Show only with scholarships</p>
                  </div>
                  <button
                    onClick={() => setScholarshipOnly(!scholarshipOnly)}
                    className={`w-11 h-6 rounded-full transition-all duration-200 relative ${scholarshipOnly ? "bg-gold-500" : "bg-gray-200"}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 ${scholarshipOnly ? "left-6" : "left-1"}`} />
                  </button>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Sort By</label>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-premium text-sm py-2">
                    <option value="ranking">Global Ranking</option>
                    <option value="students">Student Count</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Compare Banner */}
            {compareList.length > 0 && (
              <div className="bg-royalblue-900 rounded-xl p-3 mb-5 flex items-center gap-3 animate-fade-in">
                <BookOpen size={16} className="text-royalblue-300 shrink-0" />
                <p className="text-white text-sm flex-1">
                  <span className="font-semibold">{compareList.length} universities</span> selected for comparison
                </p>
                <button className="btn-gold text-xs px-4 py-2">Compare Now</button>
                <button onClick={() => setCompareList([])} className="text-white/60 hover:text-white">
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Info Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Free Tuition for EU Students", desc: "Germany, Norway, Finland & Sweden offer €0 tuition for EU citizens.", color: "bg-emerald-50 border-emerald-200", tc: "text-emerald-800" },
                { label: "Erasmus+ Available", desc: "All listed universities participate in the Erasmus+ exchange program.", color: "bg-royalblue-50 border-royalblue-200", tc: "text-royalblue-800" },
                { label: "English-Taught Programs", desc: "Most universities offer programs fully taught in English.", color: "bg-gold-50 border-gold-200", tc: "text-gold-800" },
              ].map(info => (
                <div key={info.label} className={`${info.color} border rounded-xl p-3`}>
                  <p className={`font-semibold text-xs ${info.tc}`}>{info.label}</p>
                  <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{info.desc}</p>
                </div>
              ))}
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {activeFilters.map(f => (
                  <span key={f.key} className="flex items-center gap-1.5 tag tag-blue">
                    {f.label}
                    <button onClick={() => clearFilter(f.key)} className="hover:text-red-500 ml-0.5">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mb-5">
              <span className="font-semibold text-navy-900">{filtered.length} universities found</span>
              <p className="text-xs text-gray-500">Select up to 3 to compare</p>
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                title="No universities found"
                description="Try adjusting your filters or search terms."
                action={{ label: "Clear Filters", onClick: clearAll }}
                icon={<GraduationCap size={28} className="text-gray-400" />}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {filtered.map(u => (
                  <UniversityCard
                    key={u.id}
                    university={u}
                    onCompare={toggleCompare}
                    isCompared={compareList.includes(u.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
