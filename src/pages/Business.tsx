import { useState, useMemo } from "react";
import {
  Building2, Globe, TrendingUp, DollarSign, Users, Zap, Search,
  ChevronRight, Star, BadgeCheck, MapPin, BarChart3, Briefcase,
  ArrowRight, Sparkles, Shield, PieChart, Layers
} from "lucide-react";
import { Link } from "react-router-dom";
import { businessListings } from "@/lib/mockData";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

const COUNTRY_FLAGS: Record<string, string> = {
  de: "🇩🇪", fr: "🇫🇷", nl: "🇳🇱", se: "🇸🇪", es: "🇪🇸", it: "🇮🇹",
  pt: "🇵🇹", ch: "🇨🇭", no: "🇳🇴", pl: "🇵🇱", dk: "🇩🇰", at: "🇦🇹"
};

const COUNTRY_BUSINESS_DATA = [
  {
    id: "de", name: "Germany", flag: "🇩🇪", colorClass: "country-germany",
    corporateTax: "30%", vatRate: "19%", setupTime: "2–4 weeks", setupCost: "€25,000 (GmbH)",
    marketSize: "€3.8T GDP", gdpGrowth: "+1.2%", currency: "EUR",
    businessEnvironment: 8.5, talentPool: 9, infrastructure: 9.5, digitalMaturity: 8,
    funding: "€7B+ VC (2025)",
    industries: ["Automotive", "Engineering", "Finance", "Tech", "Pharma"],
    highlights: ["Largest EU economy", "World-class infrastructure", "Strong B2B market", "Top 5 startup ecosystem"],
    description: "Germany is Europe's powerhouse economy — ideal for manufacturing, B2B SaaS, and enterprise technology.",
    pros: ["Massive market size", "Strong talent pool", "Excellent infrastructure", "EU market access"],
    cons: ["High corporate tax", "Bureaucracy", "German language barrier", "High labor costs"],
  },
  {
    id: "nl", name: "Netherlands", flag: "🇳🇱", colorClass: "country-netherlands",
    corporateTax: "19–25%", vatRate: "21%", setupTime: "1–2 days", setupCost: "€0.01 (BV)",
    marketSize: "€900B GDP", gdpGrowth: "+1.5%", currency: "EUR",
    businessEnvironment: 9, talentPool: 8.5, infrastructure: 9.5, digitalMaturity: 9.5,
    funding: "€2.5B+ VC",
    industries: ["Finance", "Tech", "Logistics", "Agriculture", "Creative"],
    highlights: ["30% tax ruling", "Fastest company setup", "Global logistics hub", "English-friendly"],
    description: "The Netherlands is Europe's most business-friendly destination — low setup barriers, 30% tax ruling, and a highly international talent pool.",
    pros: ["30% tax ruling for expats", "Near-zero company registration", "English-speaking market", "Amsterdam tech scene"],
    cons: ["High living costs", "Housing shortage", "Smaller domestic market", "Dutch bureaucracy"],
  },
  {
    id: "pt", name: "Portugal", flag: "🇵🇹", colorClass: "country-portugal",
    corporateTax: "21%", vatRate: "23%", setupTime: "1 day", setupCost: "€1",
    marketSize: "€230B GDP", gdpGrowth: "+2.3%", currency: "EUR",
    businessEnvironment: 7.5, talentPool: 7, infrastructure: 7.5, digitalMaturity: 7.5,
    funding: "€800M ecosystem",
    industries: ["Tourism", "Tech", "Real Estate", "Finance", "Creative"],
    highlights: ["NHR Tax Regime", "Fastest growing startup hub", "Lowest setup cost EU", "Golden Visa"],
    description: "Portugal has become Europe's hottest startup destination — affordable, English-friendly, with NHR tax incentives for foreign founders.",
    pros: ["NHR flat 20% tax for 10 years", "Low cost of living", "Easy company formation", "Growing tech community"],
    cons: ["Smaller talent pool", "Lower salaries", "Smaller domestic market", "Bureaucratic processes"],
  },
  {
    id: "se", name: "Sweden", flag: "🇸🇪", colorClass: "country-sweden",
    corporateTax: "20.6%", vatRate: "25%", setupTime: "1–2 weeks", setupCost: "SEK 25,000",
    marketSize: "€550B GDP", gdpGrowth: "+0.8%", currency: "SEK",
    businessEnvironment: 8.5, talentPool: 9, infrastructure: 9, digitalMaturity: 9.5,
    funding: "€3B+ VC",
    industries: ["Tech", "Gaming", "Green Energy", "Finance", "Telecom"],
    highlights: ["Spotify, Klarna birthplace", "Top innovator in EU", "High sustainability", "Strong state support"],
    description: "Sweden is Europe's innovation powerhouse, producing more unicorns per capita than any other country.",
    pros: ["Top innovation ecosystem", "High trust society", "Strong state support", "Excellent talent"],
    cons: ["Very high living costs", "High income taxes", "Complex labor laws", "Smaller market"],
  },
  {
    id: "es", name: "Spain", flag: "🇪🇸", colorClass: "country-spain",
    corporateTax: "25%", vatRate: "21%", setupTime: "1–3 days", setupCost: "€3,000 (SL)",
    marketSize: "€1.3T GDP", gdpGrowth: "+2.5%", currency: "EUR",
    businessEnvironment: 7, talentPool: 8, infrastructure: 8, digitalMaturity: 7.5,
    funding: "€2B+ ecosystem",
    industries: ["Tourism", "Renewable Energy", "Finance", "Tech", "Real Estate"],
    highlights: ["Digital Nomad Visa", "Beckham Law tax", "Mediterranean lifestyle", "Growing Barcelona tech scene"],
    description: "Spain combines affordability, lifestyle, and a rapidly growing tech scene, especially in Barcelona and Madrid.",
    pros: ["Attractive tax regimes", "Affordable operations", "Large talent pool", "Quality of life"],
    cons: ["High unemployment", "Complex regulations", "Spanish language required", "Bureaucracy"],
  },
  {
    id: "ch", name: "Switzerland", flag: "🇨🇭", colorClass: "country-switzerland",
    corporateTax: "8.5–19%", vatRate: "7.7%", setupTime: "2–4 weeks", setupCost: "CHF 20,000 (AG)",
    marketSize: "€750B GDP", gdpGrowth: "+1.0%", currency: "CHF",
    businessEnvironment: 9.5, talentPool: 9.5, infrastructure: 10, digitalMaturity: 9,
    funding: "€2B+ VC",
    industries: ["Finance", "Pharma", "Luxury", "Watch", "AI Research"],
    highlights: ["Lowest corporate tax in OECD", "Political stability", "World's best infrastructure", "Banking hub"],
    description: "Switzerland offers the world's most stable business environment with competitive corporate taxes, exceptional infrastructure, and a highly skilled multilingual workforce.",
    pros: ["Very low corporate tax", "Political stability", "Top talent", "Banking secrecy"],
    cons: ["Very high costs", "Non-EU market", "Expensive to set up", "Immigration restrictions"],
  },
];

const INDUSTRY_INSIGHTS = [
  { icon: "💻", name: "Technology & SaaS", countries: ["Germany", "Netherlands", "Sweden"], growth: "+18%", fundingAvg: "€4.2M Series A" },
  { icon: "💊", name: "Life Sciences & Pharma", countries: ["Switzerland", "Germany", "Belgium"], growth: "+12%", fundingAvg: "€7.5M Series A" },
  { icon: "⚡", name: "Renewable Energy", countries: ["Germany", "Denmark", "Spain"], growth: "+24%", fundingAvg: "€6.8M Series A" },
  { icon: "🏦", name: "FinTech", countries: ["Netherlands", "Germany", "Sweden"], growth: "+21%", fundingAvg: "€5.1M Series A" },
  { icon: "🛒", name: "E-Commerce & Retail", countries: ["Germany", "France", "Netherlands"], growth: "+15%", fundingAvg: "€3.2M Series A" },
  { icon: "🚗", name: "Mobility & Transport", countries: ["Germany", "France", "Netherlands"], growth: "+19%", fundingAvg: "€8.4M Series A" },
];

const FUNDING_SOURCES = [
  { name: "Horizon Europe", type: "EU Grant", amount: "Up to €17.5M", deadline: "Oct 2026", url: "/opportunities" },
  { name: "EIC Accelerator", type: "EU Grant + Equity", amount: "Up to €17.5M", deadline: "Oct 2026", url: "/opportunities" },
  { name: "EXIST Startup Grant", type: "Germany Grant", amount: "€125,000", deadline: "Sep 2026", url: "/opportunities" },
  { name: "TechLeap.nl", type: "Netherlands Grant", amount: "€10,000–€50,000", deadline: "Jan 2027", url: "/opportunities" },
  { name: "Sequoia Capital Europe", type: "VC Fund", amount: "€1M–€20M+", deadline: "Rolling", url: "#" },
  { name: "Northzone", type: "Nordic VC", amount: "€500K–€50M", deadline: "Rolling", url: "#" },
];

const CATEGORIES = ["All", "Technology", "Manufacturing", "Pharmaceuticals", "Energy & Environment", "Business Services", "Technology & Industry"];

const typeColors: Record<string, string> = {
  employer: "bg-navy-100 text-navy-700",
  partner: "bg-gold-100 text-gold-700",
  supplier: "bg-emerald-100 text-emerald-700",
  service: "bg-royalblue-100 text-royalblue-700",
  startup: "bg-purple-100 text-purple-700",
};

export default function BusinessPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "compare" | "directory" | "funding">("overview");

  const filteredListings = useMemo(() => {
    return businessListings.filter(b => {
      const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase()) ||
        b.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCat = category === "All" || b.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="bg-navy-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 10% 50%, #D4A72C 0%, transparent 40%), radial-gradient(circle at 90% 20%, #2563EB 0%, transparent 40%)" }} />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Business Hub</span>
            </div>
            <h1 className="font-serif text-5xl font-bold text-white mb-4 leading-tight">
              Build Your Business<br /><span className="text-gold-400">Across Europe</span>
            </h1>
            <p className="text-white/70 text-xl mb-8 leading-relaxed">
              Country profiles, market intelligence, startup ecosystems, funding opportunities, and a marketplace to connect with European businesses.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Market Entry Guides", icon: Globe },
                { label: "Startup Ecosystem", icon: Zap },
                { label: "Funding & Grants", icon: DollarSign },
                { label: "Business Directory", icon: Layers },
              ].map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-white/80 text-sm">
                  <Icon size={14} className="text-gold-400" /> {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "EU Market Size", value: "€15.4T", icon: TrendingUp, color: "text-royalblue-600" },
              { label: "Active Startups", value: "47,000+", icon: Zap, color: "text-gold-600" },
              { label: "VC Funding (2025)", value: "€30B+", icon: DollarSign, color: "text-emerald-600" },
              { label: "Business Partners", value: "2,400+", icon: Users, color: "text-navy-600" },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center`}>
                  <s.icon size={18} className={s.color} />
                </div>
                <div>
                  <p className="font-bold text-navy-900 text-lg">{s.value}</p>
                  <p className="text-gray-400 text-xs">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {/* Tab Navigation */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-8 w-fit">
          {[
            { id: "overview", label: "Country Profiles", icon: Globe },
            { id: "compare", label: "Market Compare", icon: BarChart3 },
            { id: "directory", label: "Business Directory", icon: Layers },
            { id: "funding", label: "Funding & Grants", icon: DollarSign },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.id ? "bg-white text-navy-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Country Business Profiles</h2>
              <p className="text-gray-500">Detailed market intelligence for the top European business destinations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {COUNTRY_BUSINESS_DATA.map(c => (
                <div key={c.id} className="card-premium overflow-hidden">
                  {/* Header */}
                  <div className={`h-24 ${c.colorClass} relative`}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-3">
                      <span className="text-3xl">{c.flag}</span>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-white">{c.name}</h3>
                        <p className="text-white/70 text-xs">{c.marketSize} · {c.gdpGrowth} growth</p>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-gold-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{c.funding}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{c.description}</p>

                    {/* Key metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      {[
                        { label: "Corp Tax", value: c.corporateTax },
                        { label: "VAT", value: c.vatRate },
                        { label: "Setup Time", value: c.setupTime },
                        { label: "Setup Cost", value: c.setupCost },
                      ].map(m => (
                        <div key={m.label} className="bg-gray-50 rounded-xl p-3 text-center">
                          <p className="font-bold text-navy-900 text-xs">{m.value}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Score bars */}
                    <div className="space-y-2 mb-4">
                      {[
                        { label: "Business Environment", score: c.businessEnvironment },
                        { label: "Talent Pool", score: c.talentPool },
                        { label: "Infrastructure", score: c.infrastructure },
                        { label: "Digital Maturity", score: c.digitalMaturity },
                      ].map(s => (
                        <div key={s.label} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-36 shrink-0">{s.label}</span>
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-royalblue-500 rounded-full" style={{ width: `${s.score * 10}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-navy-900 w-6 text-right">{s.score}</span>
                        </div>
                      ))}
                    </div>

                    {/* Industries */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {c.industries.map(ind => <span key={ind} className="tag tag-navy text-xs">{ind}</span>)}
                    </div>

                    {/* Pros/Cons */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="text-xs font-semibold text-emerald-700 mb-1.5">✓ Pros</p>
                        {c.pros.slice(0, 2).map(p => (
                          <p key={p} className="text-xs text-gray-600 mb-0.5">• {p}</p>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-red-600 mb-1.5">✗ Challenges</p>
                        {c.cons.slice(0, 2).map(p => (
                          <p key={p} className="text-xs text-gray-600 mb-0.5">• {p}</p>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/explore/${c.id}`} className="btn-primary flex-1 justify-center text-sm py-2.5">
                        Explore {c.name} <ChevronRight size={14} />
                      </Link>
                      <Link to="/ai-advisor" className="btn-secondary px-4 py-2.5">
                        <Sparkles size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Industry Insights */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">🔥 Hot Industries in Europe</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {INDUSTRY_INSIGHTS.map(ind => (
                  <div key={ind.name} className="card-premium p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-3xl">{ind.icon}</span>
                      <div>
                        <h3 className="font-semibold text-navy-900">{ind.name}</h3>
                        <span className="text-emerald-600 text-xs font-bold">{ind.growth} YoY growth</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Avg Series A</span>
                        <span className="font-semibold text-navy-900">{ind.fundingAvg}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Top Markets</span>
                        <div className="flex gap-1">
                          {ind.countries.slice(0, 2).map(c => <span key={c} className="tag tag-blue text-xs">{c}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COMPARE TAB */}
        {activeTab === "compare" && (
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Market Comparison</h2>
              <p className="text-gray-500">Compare key business metrics across European countries.</p>
            </div>

            {/* Comparison Table */}
            <div className="card-premium overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-navy-900 text-white">
                    <tr>
                      <th className="text-left p-4 font-semibold">Country</th>
                      <th className="text-center p-4 font-semibold">Corp Tax</th>
                      <th className="text-center p-4 font-semibold">Setup Cost</th>
                      <th className="text-center p-4 font-semibold">Setup Time</th>
                      <th className="text-center p-4 font-semibold">Market Size</th>
                      <th className="text-center p-4 font-semibold">VC Funding</th>
                      <th className="text-center p-4 font-semibold">Biz Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {COUNTRY_BUSINESS_DATA.map((c, i) => (
                      <tr key={c.id} className={`hover:bg-gray-50 transition-colors ${i === 0 ? "bg-emerald-50" : ""}`}>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{c.flag}</span>
                            <span className="font-semibold text-navy-900">{c.name}</span>
                            {i === 0 && <span className="tag bg-emerald-100 text-emerald-700 text-xs">Best Overall</span>}
                          </div>
                        </td>
                        <td className="text-center p-4 font-semibold text-navy-900">{c.corporateTax}</td>
                        <td className="text-center p-4 font-semibold text-navy-900">{c.setupCost}</td>
                        <td className="text-center p-4 text-gray-600">{c.setupTime}</td>
                        <td className="text-center p-4 text-gray-600">{c.marketSize}</td>
                        <td className="text-center p-4 font-semibold text-emerald-600">{c.funding}</td>
                        <td className="text-center p-4">
                          <div className="flex items-center justify-center gap-1">
                            <Star size={11} className="fill-gold-400 text-gold-400" />
                            <span className="font-bold text-navy-900">{c.businessEnvironment}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lowest Tax Countries */}
              <div className="card-premium p-6">
                <h3 className="font-serif text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <DollarSign size={18} className="text-emerald-500" /> Lowest Corporate Tax
                </h3>
                <div className="space-y-3">
                  {[
                    { country: "Switzerland", flag: "🇨🇭", tax: "8.5–19%", note: "Canton dependent" },
                    { country: "Sweden", flag: "🇸🇪", tax: "20.6%", note: "Competitive rate" },
                    { country: "Portugal", flag: "🇵🇹", tax: "21%", note: "NHR regime available" },
                    { country: "Netherlands", flag: "🇳🇱", tax: "19–25%", note: "30% ruling for expats" },
                  ].map(r => (
                    <div key={r.country} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{r.flag}</span>
                        <div>
                          <p className="font-semibold text-navy-900 text-sm">{r.country}</p>
                          <p className="text-gray-400 text-xs">{r.note}</p>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-600 text-lg">{r.tax}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best for Startups */}
              <div className="card-premium p-6">
                <h3 className="font-serif text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <Zap size={18} className="text-gold-500" /> Best for Startups
                </h3>
                <div className="space-y-3">
                  {[
                    { country: "Netherlands", flag: "🇳🇱", score: "9/10", reason: "30% ruling + €0.01 setup" },
                    { country: "Sweden", flag: "🇸🇪", score: "8.8/10", reason: "Most unicorns per capita" },
                    { country: "Germany", flag: "🇩🇪", score: "8.5/10", reason: "€7B+ VC ecosystem" },
                    { country: "Portugal", flag: "🇵🇹", score: "8.2/10", reason: "Growing hub, low costs" },
                  ].map(r => (
                    <div key={r.country} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{r.flag}</span>
                        <div>
                          <p className="font-semibold text-navy-900 text-sm">{r.country}</p>
                          <p className="text-gray-400 text-xs">{r.reason}</p>
                        </div>
                      </div>
                      <span className="font-bold text-royalblue-600 text-lg">{r.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI CTA */}
            <div className="bg-navy-900 rounded-3xl p-8 text-center text-white">
              <Sparkles size={40} className="text-gold-400 mx-auto mb-3" />
              <h2 className="font-serif text-2xl font-bold mb-2">Need Personalized Market Advice?</h2>
              <p className="text-white/70 mb-5">Our AI Advisor can compare any two European markets for your specific business type and recommend the best market entry strategy.</p>
              <Link to="/ai-advisor" className="btn-gold px-8 py-3">Ask AI Advisor</Link>
            </div>
          </div>
        )}

        {/* DIRECTORY TAB */}
        {activeTab === "directory" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-900">Business Directory</h2>
                <p className="text-gray-500 text-sm mt-1">Connect with verified companies, suppliers, and partners across Europe.</p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search businesses..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="input-premium pl-9 w-64 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                    category === cat ? "bg-navy-900 text-white border-navy-900" : "bg-white text-gray-600 border-gray-200 hover:border-navy-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredListings.map(b => (
                <div key={b.id} className="card-premium p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center" style={{ background: b.colorGradient }}>
                      <Building2 size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-semibold text-navy-900">{b.name}</h3>
                            {b.verified && <BadgeCheck size={14} className="text-royalblue-500 shrink-0" />}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{b.category} · {b.city}, {b.country}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Star size={11} className="fill-gold-400 text-gold-400" />
                          <span className="text-xs font-semibold">{b.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2 leading-relaxed">{b.description}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className={`tag text-xs ${typeColors[b.type] ?? "bg-gray-100 text-gray-700"}`}>{b.type}</span>
                        {b.tags.slice(0, 2).map(t => <span key={t} className="tag tag-gray text-xs">{t}</span>)}
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50 text-xs text-gray-500">
                        <span>👥 {b.employees}</span>
                        <span>Est. {b.founded}</span>
                        <Link to={`/business/${b.id}`} className="text-royalblue-600 font-semibold hover:underline flex items-center gap-1">
                          View Profile <ChevronRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Partnership CTA */}
            <div className="bg-royalblue-50 border border-royalblue-200 rounded-3xl p-8 text-center">
              <Building2 size={40} className="text-royalblue-600 mx-auto mb-3" />
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">List Your Business</h2>
              <p className="text-gray-600 mb-5 max-w-lg mx-auto">Join 2,400+ European businesses in our directory. Get discovered by potential partners, clients, and talent.</p>
              <Link to="/employer-dashboard" className="btn-primary px-8">List Your Business</Link>
            </div>
          </div>
        )}

        {/* FUNDING TAB */}
        {activeTab === "funding" && (
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Funding & Grants</h2>
              <p className="text-gray-500">EU grants, government funding, and VC opportunities for European businesses.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FUNDING_SOURCES.map(f => (
                <div key={f.name} className="card-premium p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-navy-900">{f.name}</h3>
                      <span className={`tag text-xs mt-1 ${
                        f.type.includes("EU") ? "bg-royalblue-100 text-royalblue-700" :
                        f.type.includes("VC") ? "bg-gold-100 text-gold-700" :
                        "bg-emerald-100 text-emerald-700"
                      }`}>{f.type}</span>
                    </div>
                    <Shield size={16} className="text-emerald-500 shrink-0" />
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Funding Amount</span>
                      <span className="font-bold text-emerald-600">{f.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Deadline</span>
                      <span className="font-semibold text-navy-900">{f.deadline}</span>
                    </div>
                  </div>
                  <Link to={f.url} className="btn-secondary w-full justify-center text-sm py-2.5">
                    Learn More <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>

            {/* Funding Ecosystem */}
            <div className="card-premium p-8">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-6">European Startup Funding Ecosystem</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { label: "Total EU VC Invested", value: "€30B+", sub: "2025 record" },
                  { label: "Active Investors", value: "1,200+", sub: "EU-based VCs" },
                  { label: "EU Grants Available", value: "€50B+", sub: "Horizon Europe" },
                  { label: "Unicorns Created", value: "120+", sub: "In 2025" },
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 rounded-2xl p-5">
                    <p className="font-serif text-3xl font-bold text-navy-900">{s.value}</p>
                    <p className="text-sm font-semibold text-gray-700 mt-1">{s.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/opportunities" className="flex items-center justify-center gap-2 py-4 btn-gold w-full text-base">
              <DollarSign size={18} /> Browse All Funding Opportunities <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Employer/Employer Dashboard CTA */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-navy-900 rounded-3xl p-8 text-white">
            <Briefcase size={36} className="text-gold-400 mb-4" />
            <h2 className="font-serif text-2xl font-bold mb-2">Employer Dashboard</h2>
            <p className="text-white/70 mb-5">Post jobs, search candidates, manage applications, and build your employer brand across Europe.</p>
            <Link to="/employer-dashboard" className="btn-gold">Access Employer Dashboard</Link>
          </div>
          <div className="bg-royalblue-50 border border-royalblue-200 rounded-3xl p-8">
            <Sparkles size={36} className="text-royalblue-600 mb-4" />
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">AI Business Advisor</h2>
            <p className="text-gray-600 mb-5">Get personalized market entry strategies, competitor analysis, and growth recommendations for your European business.</p>
            <Link to="/ai-advisor" className="btn-primary">Ask AI Advisor</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
