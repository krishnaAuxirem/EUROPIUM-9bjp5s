import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin, Briefcase, GraduationCap, Home as HomeIcon, Globe, Star, Shield,
  ArrowRight, Bookmark, Share2, ChevronRight, TrendingUp, Users, DollarSign,
  Building2, Plane, Heart, Check, AlertCircle, Info, Bus, Cpu, Leaf,
  Euro, Clock, ExternalLink, Sparkles, Scale
} from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { countries, jobs, universities, properties, travelDestinations } from "@/lib/mockData";
import { useToast } from "@/hooks/useToast";

const COUNTRY_FLAGS: Record<string, string> = {
  de: "🇩🇪", fr: "🇫🇷", nl: "🇳🇱", se: "🇸🇪", es: "🇪🇸", it: "🇮🇹",
  pt: "🇵🇹", ch: "🇨🇭", no: "🇳🇴", pl: "🇵🇱", dk: "🇩🇰", at: "🇦🇹"
};

// Extended country data
const COUNTRY_EXTENDED: Record<string, {
  costBreakdown: { item: string; range: string }[];
  economy: string;
  healthcare: string;
  transportation: string;
  businessEnv: string;
  lifestyle: string;
  infrastructure: string;
  majorCities: { name: string; pop: string; desc: string }[];
  avgSalary: string;
  taxRate: string;
  visaTypes: string[];
  internetSpeed: string;
  happinessIndex: number;
}> = {
  de: {
    avgSalary: "€43,000 / year", taxRate: "30–45%", internetSpeed: "89 Mbps",
    happinessIndex: 7.2,
    costBreakdown: [
      { item: "1BR Apartment (City)", range: "€900–€1,600/month" },
      { item: "Monthly Transport Pass", range: "€49–€86" },
      { item: "Groceries", range: "€200–€350/month" },
      { item: "Restaurant Meal", range: "€12–€25" },
      { item: "Health Insurance", range: "€150–€300/month" },
    ],
    economy: "Germany is Europe's largest and the world's 4th-largest economy, driven by manufacturing, automotive, chemicals, and increasingly by tech. The Mittelstand (SME sector) is a global model for industrial excellence.",
    healthcare: "Universal healthcare via statutory health insurance (GKV). Employers contribute 50%. Quality is world-class with short wait times. EU citizens have reciprocal access.",
    transportation: "Excellent public transit with S-Bahn and U-Bahn networks. €49 Deutschland-Ticket offers unlimited public transport nationwide. High-speed ICE trains connect major cities.",
    businessEnv: "Strong legal framework, access to EU single market, excellent infrastructure. Germany offers EXIST startup program, tax incentives for R&D, and robust IP protection.",
    lifestyle: "High quality of life with excellent work-life balance, 30+ vacation days standard. Rich cultural scene, outdoor sports, strong beer and food culture. English widely spoken in major cities.",
    infrastructure: "World-class infrastructure — 4G/5G coverage 96%, autobahn network, 30+ international airports. Renewable energy accounts for 50%+ of electricity.",
    majorCities: [
      { name: "Berlin", pop: "3.8M", desc: "Capital, tech startup hub, arts & culture" },
      { name: "Munich", pop: "1.5M", desc: "Bavaria, automotive, high quality of life" },
      { name: "Hamburg", pop: "1.8M", desc: "Port city, media, logistics" },
      { name: "Frankfurt", pop: "760K", desc: "Financial center, EU banking hub" },
    ],
    visaTypes: ["EU Blue Card", "Job Seeker Visa", "Student Visa", "Freelancer Visa", "Skilled Worker Act"],
  },
  fr: {
    avgSalary: "€38,000 / year", taxRate: "25–45%", internetSpeed: "92 Mbps",
    happinessIndex: 6.7,
    costBreakdown: [
      { item: "1BR Apartment (Paris)", range: "€1,200–€2,200/month" },
      { item: "Metro Pass (Paris)", range: "€86/month" },
      { item: "Groceries", range: "€250–€400/month" },
      { item: "Restaurant Meal", range: "€15–€35" },
      { item: "Health Insurance", range: "€50–€150 (co-pay)" },
    ],
    economy: "France is the 7th-largest economy globally, with strengths in aerospace, luxury goods, agriculture, nuclear energy, and a booming tech scene (La French Tech) in Paris.",
    healthcare: "Universal healthcare (Sécurité Sociale) covers 70–80% of medical costs. France consistently ranks among the best healthcare systems globally.",
    transportation: "TGV high-speed rail connects all major cities. Paris has an extensive metro. SNCF national rail network is comprehensive.",
    businessEnv: "France offers the French Tech Visa for startup founders, the R&D Tax Credit (CIR), and strong IP protection. Paris is Europe's 2nd-largest startup hub.",
    lifestyle: "35-hour work week, 5 weeks mandatory vacation, excellent cuisine, world-class museums, and a deeply embedded café culture.",
    infrastructure: "Advanced nuclear grid (75% of electricity), TGV rail, Charles de Gaulle airport (EU's 2nd largest), 5G rollout ongoing.",
    majorCities: [
      { name: "Paris", pop: "2.1M", desc: "Capital, fashion, tech, culture" },
      { name: "Lyon", pop: "520K", desc: "Gastronomy, biotech, finance" },
      { name: "Marseille", pop: "870K", desc: "Mediterranean port, diverse culture" },
      { name: "Bordeaux", pop: "260K", desc: "Wine, aerospace, lifestyle" },
    ],
    visaTypes: ["French Tech Visa", "Talent Passport", "Student Visa", "Long-stay Work Visa", "Entrepreneur Visa"],
  },
  nl: {
    avgSalary: "€44,000 / year", taxRate: "37–50%", internetSpeed: "103 Mbps",
    happinessIndex: 7.5,
    costBreakdown: [
      { item: "1BR Apartment (Amsterdam)", range: "€1,500–€2,500/month" },
      { item: "OV-chipkaart (transport)", range: "€120–€160/month" },
      { item: "Groceries", range: "€250–€380/month" },
      { item: "Restaurant Meal", range: "€15–€30" },
      { item: "Health Insurance (zvw)", range: "€120–€180/month" },
    ],
    economy: "Netherlands has the 17th-largest economy globally, a major logistics hub (Rotterdam is Europe's largest port), strong finance sector, and high tech multinationals like ASML, Philips, and Shell.",
    healthcare: "Mandatory private health insurance with government subsidies. Quality is excellent; Dutch healthcare system ranked 3rd in Europe.",
    transportation: "Best cycling infrastructure in the world. Excellent NS rail network, extensive highway system, Amsterdam Schiphol is Europe's 3rd busiest airport.",
    businessEnv: "30% ruling tax advantage for expats, favorable holding company regime, English widely spoken. Netherlands is Europe's top business destination for foreign companies.",
    lifestyle: "Very international, liberal, and open culture. Cycling is the primary mode of transport. Amsterdam's canal belt is a UNESCO World Heritage site.",
    infrastructure: "Highest internet speeds in Europe, smart city initiatives, advanced flood management system, excellent bike infrastructure.",
    majorCities: [
      { name: "Amsterdam", pop: "873K", desc: "Capital, finance, tech, culture" },
      { name: "Rotterdam", pop: "651K", desc: "Port, architecture, logistics" },
      { name: "The Hague", pop: "547K", desc: "Government, international courts" },
      { name: "Eindhoven", pop: "235K", desc: "Tech, ASML, design" },
    ],
    visaTypes: ["Highly Skilled Migrant Visa", "Startup Visa", "Orientation Visa", "Student Visa", "DAFT Treaty"],
  },
  pt: {
    avgSalary: "€22,000 / year", taxRate: "15–48%", internetSpeed: "81 Mbps",
    happinessIndex: 6.1,
    costBreakdown: [
      { item: "1BR Apartment (Lisbon)", range: "€900–€1,600/month" },
      { item: "Monthly Transport Pass", range: "€40–€50" },
      { item: "Groceries", range: "€150–€250/month" },
      { item: "Restaurant Meal", range: "€8–€20" },
      { item: "Health Insurance", range: "€30–€100/month" },
    ],
    economy: "Portugal's economy is growing steadily, driven by tourism, tech, real estate, and financial services. Lisbon is one of Europe's fastest-growing startup ecosystems.",
    healthcare: "Universal NHS-style system (SNS) with free care for residents. Private insurance is affordable (€30–100/month) and widely used.",
    transportation: "Good public transit in Lisbon and Porto, CP national rail, Lisbon international airport (TAP hub). Country is small and driveable.",
    businessEnv: "NHR tax regime (10% flat tax for 10 years), Golden Visa, Digital Nomad Visa, startup ecosystem, RTP incentives. Lowest corporate tax burden in Western Europe.",
    lifestyle: "Warm climate 300+ days of sun, low cost of living, safe, seafood culture, fado music, surf beaches, welcoming to expats.",
    infrastructure: "Good but developing. Fiber internet rollout, improving rail, Lisbon airport upgrade planned. Porto–Lisbon high-speed rail under development.",
    majorCities: [
      { name: "Lisbon", pop: "505K", desc: "Capital, tech hub, tourism" },
      { name: "Porto", pop: "231K", desc: "Wine, textiles, growing tech" },
      { name: "Faro", pop: "65K", desc: "Algarve tourism, expat haven" },
      { name: "Braga", pop: "193K", desc: "University town, tech startups" },
    ],
    visaTypes: ["Digital Nomad Visa (D8)", "Golden Visa", "Passive Income Visa (D7)", "Student Visa", "Job Seeker Visa"],
  },
  ch: {
    avgSalary: "CHF 78,000 / year", taxRate: "15–25%", internetSpeed: "116 Mbps",
    happinessIndex: 7.6,
    costBreakdown: [
      { item: "1BR Apartment (Zurich)", range: "CHF 2,000–3,500/month" },
      { item: "Half-fare rail card", range: "CHF 190/year + travel" },
      { item: "Groceries", range: "CHF 400–700/month" },
      { item: "Restaurant Meal", range: "CHF 25–50" },
      { item: "Health Insurance", range: "CHF 300–500/month" },
    ],
    economy: "Switzerland has the world's most competitive economy with the highest nominal wages in Europe. Finance (UBS, Credit Suisse), pharma (Novartis, Roche), and watchmaking are key sectors.",
    healthcare: "Mandatory private health insurance. While expensive (CHF 300–500/month), quality is world-class. No wait times for specialists.",
    transportation: "Best public transport system in the world. Swiss Federal Railways (SBB) is punctual to the second. Dense tram networks in Zurich and Basel.",
    businessEnv: "Low corporate taxes (12–15%), political stability, strong IP protection, bilateral agreements with EU, access to Swiss financial system.",
    lifestyle: "Outdoor paradise (skiing, hiking, lakes), multilingual (German/French/Italian), very safe, clean, and organized. Work-life balance is strongly valued.",
    infrastructure: "World's best infrastructure — highest internet speed in EU, top roads, immaculate railways, Zurich airport ranks consistently #1 in Europe.",
    majorCities: [
      { name: "Zurich", pop: "421K", desc: "Finance, tech, most livable city" },
      { name: "Geneva", pop: "203K", desc: "UN/diplomacy, luxury, watchmaking" },
      { name: "Basel", pop: "180K", desc: "Pharma, art fair, Rhine port" },
      { name: "Bern", pop: "134K", desc: "Federal capital, government" },
    ],
    visaTypes: ["L Permit", "B Permit", "C Permit", "G Cross-border Permit", "Student Permit"],
  },
  se: {
    avgSalary: "SEK 420,000 / year", taxRate: "30–55%", internetSpeed: "108 Mbps",
    happinessIndex: 7.4,
    costBreakdown: [
      { item: "1BR Apartment (Stockholm)", range: "SEK 12,000–20,000/month" },
      { item: "Monthly SL Card", range: "SEK 875/month" },
      { item: "Groceries", range: "SEK 3,000–4,500/month" },
      { item: "Restaurant Meal", range: "SEK 150–300" },
      { item: "Health Insurance (public)", range: "Via taxation" },
    ],
    economy: "Sweden is a highly innovative economy, home to Spotify, IKEA, H&M, Volvo, Ericsson, and a thriving startup scene. Stockholm is the 2nd-largest startup hub per capita globally.",
    healthcare: "Universal public healthcare. Small patient fees (SEK 200–400). All residents entitled to care regardless of income.",
    transportation: "SL transit in Stockholm is excellent. Extensive rail network. Stockholm Arlanda is the main international hub.",
    businessEnv: "Strong innovation ecosystem, favorable startup environment, access to Nordic markets, strong worker protections but high productivity.",
    lifestyle: "Iconic work-life balance, 'lagom' culture (just enough), gender equality leader, excellent parental leave (480 days), outdoor culture, midnight sun.",
    infrastructure: "World-class digital infrastructure, 5G leader in Europe, comprehensive public services, electric vehicle adoption leader.",
    majorCities: [
      { name: "Stockholm", pop: "975K", desc: "Capital, tech, innovation" },
      { name: "Gothenburg", pop: "590K", desc: "Auto industry, shipping, Volvo" },
      { name: "Malmö", pop: "350K", desc: "University, cross-border with Copenhagen" },
      { name: "Uppsala", pop: "230K", desc: "University town, pharma research" },
    ],
    visaTypes: ["Work Permit", "Self-employment Permit", "ICT Permit", "Job Seeker Permit", "Student Permit"],
  },
};

const DEFAULT_EXTENDED = {
  avgSalary: "€35,000 / year", taxRate: "25–45%", internetSpeed: "85 Mbps",
  happinessIndex: 6.8,
  costBreakdown: [
    { item: "1BR Apartment (Capital)", range: "€800–€1,500/month" },
    { item: "Monthly Transport Pass", range: "€50–€100" },
    { item: "Groceries", range: "€200–€350/month" },
    { item: "Restaurant Meal", range: "€10–€25" },
    { item: "Health Insurance", range: "€100–€250/month" },
  ],
  economy: "A growing European economy with diverse sectors, increasingly attracting international businesses and talent.",
  healthcare: "Universal or near-universal healthcare coverage for residents. Quality medical care available in major cities.",
  transportation: "Improving public transport infrastructure with rail, bus, and urban transit networks.",
  businessEnv: "Favorable regulatory environment with access to the EU single market and growing startup ecosystems.",
  lifestyle: "Rich cultural heritage, quality cuisine, outdoor activities, and welcoming attitude toward international residents.",
  infrastructure: "Developing modern infrastructure with improving broadband and transport connectivity.",
  majorCities: [{ name: "Capital City", pop: "1M+", desc: "Main hub for business and culture" }],
  visaTypes: ["EU Blue Card", "Work Visa", "Student Visa", "Family Reunification"],
};

export default function CountryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { success } = useToast();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const country = countries.find(c => c.id === id);
  if (!country) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-3">Country not found</h2>
          <Link to="/explore" className="btn-primary">Back to Explore</Link>
        </div>
      </div>
    );
  }

  const ext = COUNTRY_EXTENDED[id!] || DEFAULT_EXTENDED;
  const flag = COUNTRY_FLAGS[id!] || "🇪🇺";
  const countryJobs = jobs.filter(j => j.country === country.name).slice(0, 3);
  const countryUniversities = universities.filter(u => u.country === country.name).slice(0, 3);
  const countryProperties = properties.filter(p => p.country === country.name).slice(0, 3);
  const countryTravel = travelDestinations.filter(t => t.country === country.name).slice(0, 2);

  const costColor: Record<string, string> = {
    low: "text-emerald-600", medium: "text-gold-600", high: "text-orange-500", "very-high": "text-red-500"
  };
  const costLabel: Record<string, string> = {
    low: "Low Cost", medium: "Medium Cost", high: "High Cost", "very-high": "Very High Cost"
  };

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "economy", label: "Economy & Jobs" },
    { id: "education", label: "Education" },
    { id: "housing", label: "Housing" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "relocation", label: "Relocation" },
  ];

  return (
    <div className="page-container">
      {/* Hero */}
      <section className={`${country.colorClass} relative py-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-7xl">{flag}</span>
                <div>
                  <h1 className="font-serif text-5xl font-bold text-white">{country.name}</h1>
                  <p className="text-white/70 text-lg">{country.region}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-sm">
                  <MapPin size={13} /> {country.capital}
                </span>
                <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-sm">
                  <Users size={13} /> {country.population}
                </span>
                <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-sm">
                  <Euro size={13} /> {country.currency}
                </span>
                <span className={`flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-semibold text-white`}>
                  <Star size={13} className="text-gold-400 fill-gold-400" /> {country.rating}
                </span>
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => { setSaved(!saved); success(saved ? "Removed from saved" : `${country.name} saved!`); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${saved ? "bg-gold-500 text-white" : "bg-white/15 border border-white/30 text-white hover:bg-white/25"}`}>
                <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
                {saved ? "Saved" : "Save Country"}
              </button>
              <Link to={`/explore`} className="flex items-center gap-2 px-5 py-2.5 bg-white/15 border border-white/30 text-white rounded-xl font-semibold text-sm hover:bg-white/25 transition-all">
                <Scale size={15} /> Compare
              </Link>
              <Link to="/ai-advisor" className="flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-white rounded-xl font-semibold text-sm transition-all">
                <Sparkles size={15} /> Ask AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Nav */}
      <div className="sticky top-16 bg-white border-b border-border z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-5 py-4 text-sm font-semibold border-b-2 transition-all ${activeTab === tab.id ? "border-navy-900 text-navy-900" : "border-transparent text-gray-500 hover:text-navy-700"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {/* Quick action buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { label: "Find Jobs", path: `/jobs`, icon: Briefcase, color: "bg-navy-900 text-white hover:bg-navy-800" },
            { label: "Universities", path: `/education`, icon: GraduationCap, color: "bg-royalblue-600 text-white hover:bg-royalblue-700" },
            { label: "Housing", path: `/housing`, icon: HomeIcon, color: "bg-gold-500 text-white hover:bg-gold-600" },
            { label: "Travel", path: `/travel`, icon: Plane, color: "bg-emerald-600 text-white hover:bg-emerald-700" },
            { label: "Opportunities", path: `/opportunities`, icon: TrendingUp, color: "bg-orange-500 text-white hover:bg-orange-600" },
            { label: "Plan Relocation", path: `/relocation-planner`, icon: MapPin, color: "bg-royalblue-900 text-white hover:bg-royalblue-950" },
          ].map(btn => (
            <Link key={btn.label} to={btn.path}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${btn.color}`}>
              <btn.icon size={15} /> {btn.label}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Overview Section */}
            <div className="card-premium p-6">
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-4">About {country.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-5">{country.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                {[
                  { label: "Capital", value: country.capital, icon: MapPin },
                  { label: "Language", value: country.language, icon: Globe },
                  { label: "Currency", value: country.currency, icon: DollarSign },
                  { label: "Cost Level", value: costLabel[country.costOfLiving], icon: TrendingUp },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <item.icon size={16} className="text-royalblue-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="font-semibold text-navy-900 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-3">Key Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {country.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-500 shrink-0" />
                      <span className="text-gray-600 text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Major Cities */}
            {ext.majorCities.length > 0 && (
              <div className="card-premium p-6">
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-4">Major Cities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ext.majorCities.map(city => (
                    <div key={city.name} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 rounded-xl bg-navy-100 text-navy-700 flex items-center justify-center font-bold text-sm shrink-0">
                        {city.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-navy-900">{city.name}</p>
                        <p className="text-xs text-gray-400">Population: {city.pop}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{city.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cost of Living */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-2xl font-bold text-navy-900">Cost of Living</h2>
                <span className={`tag font-bold ${costColor[country.costOfLiving]}`}>
                  {costLabel[country.costOfLiving]}
                </span>
              </div>
              <div className="space-y-3">
                {ext.costBreakdown.map(item => (
                  <div key={item.item} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600 text-sm">{item.item}</span>
                    <span className="font-semibold text-navy-900 text-sm">{item.range}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-gold-50 border border-gold-200 rounded-xl">
                <p className="text-gold-700 text-sm flex items-start gap-2">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  Average salary in {country.name}: <strong className="ml-1">{ext.avgSalary}</strong>. Tax rate: <strong className="ml-1">{ext.taxRate}</strong>.
                </p>
              </div>
            </div>

            {/* Economy */}
            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-royalblue-100 text-royalblue-600 flex items-center justify-center">
                  <TrendingUp size={18} />
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-900">Economy</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">{ext.economy}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Avg. Salary", value: ext.avgSalary, color: "bg-emerald-50 text-emerald-700" },
                  { label: "Tax Rate", value: ext.taxRate, color: "bg-orange-50 text-orange-700" },
                  { label: "Job Count", value: country.jobCount.toLocaleString() + "+", color: "bg-royalblue-50 text-royalblue-700" },
                  { label: "Visa Friendly", value: country.visaFriendly ? "Yes" : "Strict", color: country.visaFriendly ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700" },
                ].map(s => (
                  <div key={s.label} className={`${s.color} rounded-xl p-3 text-center`}>
                    <p className="font-bold text-base">{s.value}</p>
                    <p className="text-xs opacity-70">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Jobs in Country */}
            {countryJobs.length > 0 && (
              <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-2xl font-bold text-navy-900">Popular Jobs</h2>
                  <Link to="/jobs" className="text-royalblue-600 hover:text-royalblue-700 text-sm font-semibold flex items-center gap-1">
                    View all <ChevronRight size={14} />
                  </Link>
                </div>
                <div className="space-y-3">
                  {countryJobs.map(job => (
                    <Link key={job.id} to={`/jobs/${job.id}`} className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                      <div className={`w-10 h-10 rounded-xl ${job.logo} text-white flex items-center justify-center font-bold text-sm shrink-0`}>
                        {job.company.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-navy-900 text-sm">{job.title}</p>
                        <p className="text-gray-400 text-xs">{job.company} · {job.city}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-navy-900 text-sm">{job.salary}</p>
                        <p className="text-gray-400 text-xs">{job.type}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-navy-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center">
                  <GraduationCap size={18} />
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-900">Education</h2>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center px-4 py-3 bg-gray-50 rounded-xl">
                  <p className="font-bold text-2xl text-navy-900">{country.universityCount}</p>
                  <p className="text-xs text-gray-400">Universities</p>
                </div>
              </div>
              {countryUniversities.length > 0 ? (
                <div className="space-y-3">
                  {countryUniversities.map(u => (
                    <Link key={u.id} to={`/education/${u.id}`} className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                      <div className={`w-10 h-10 rounded-xl ${u.colorClass} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
                        #{u.ranking}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-navy-900 text-sm">{u.name}</p>
                        <p className="text-gray-400 text-xs">{u.city} · EU: {u.tuitionEU}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-navy-500" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Browse universities in {country.name} on our Education page.</p>
              )}
              <Link to="/education" className="mt-4 btn-outline w-full justify-center py-2.5 text-sm block">
                Explore All Universities
              </Link>
            </div>

            {/* Healthcare */}
            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Heart size={18} />
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-900">Healthcare</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{ext.healthcare}</p>
            </div>

            {/* Housing */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <HomeIcon size={18} />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-navy-900">Housing</h2>
                </div>
                <Link to="/housing" className="text-royalblue-600 text-sm font-semibold flex items-center gap-1">
                  Browse <ChevronRight size={14} />
                </Link>
              </div>
              {countryProperties.length > 0 ? (
                <div className="space-y-3">
                  {countryProperties.map(p => (
                    <Link key={p.id} to={`/housing/${p.id}`} className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                      <div className={`w-12 h-12 rounded-xl ${p.colorClass} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-navy-900 text-sm line-clamp-1">{p.title}</p>
                        <p className="text-gray-400 text-xs">{p.city} · {p.bedrooms || "Studio"} bed · {p.area}m²</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-navy-900 text-sm">{p.currency === "EUR" ? "€" : p.currency + " "}{p.price.toLocaleString()}{p.period ? `/${p.period}` : ""}</p>
                        <p className="text-gray-400 text-xs capitalize">{p.listingType}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-navy-500" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Explore available properties in {country.name}.</p>
              )}
            </div>

            {/* Transportation */}
            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-royalblue-100 text-royalblue-600 flex items-center justify-center">
                  <Bus size={18} />
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-900">Transportation</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{ext.transportation}</p>
            </div>

            {/* Business Environment */}
            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-navy-100 text-navy-700 flex items-center justify-center">
                  <Building2 size={18} />
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-900">Business Environment</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">{ext.businessEnv}</p>
              <Link to="/business" className="btn-outline text-sm px-4 py-2">
                Explore Business Directory <ArrowRight size={14} />
              </Link>
            </div>

            {/* Lifestyle */}
            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Leaf size={18} />
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-900">Lifestyle</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{ext.lifestyle}</p>
            </div>

            {/* Infrastructure */}
            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-royalblue-100 text-royalblue-600 flex items-center justify-center">
                  <Cpu size={18} />
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-900">Infrastructure</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">{ext.infrastructure}</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Internet Speed", value: ext.internetSpeed },
                  { label: "Happiness Index", value: `${ext.happinessIndex}/10` },
                  { label: "EU Member", value: ["ch", "no", "se"].includes(id!) ? "Assoc." : "Yes" },
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="font-bold text-navy-900 text-sm">{s.value}</p>
                    <p className="text-xs text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel */}
            {countryTravel.length > 0 && (
              <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-2xl font-bold text-navy-900">Travel Destinations</h2>
                  <Link to="/travel" className="text-royalblue-600 text-sm font-semibold flex items-center gap-1">
                    More <ChevronRight size={14} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {countryTravel.map(t => (
                    <Link key={t.id} to={`/travel/${t.id}`} className="block">
                      <div className={`h-32 ${t.colorClass} rounded-xl relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                        <div className="absolute bottom-3 left-3">
                          <p className="text-white font-bold">{t.name}</p>
                          <p className="text-white/70 text-xs">{t.bestSeason}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Relocation Overview */}
            <div className="card-premium p-6 bg-navy-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center">
                  <Plane size={18} />
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-900">Relocation Overview</h2>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-navy-900 mb-2 text-sm">Available Visa Types</h3>
                <div className="flex flex-wrap gap-2">
                  {ext.visaTypes.map(v => (
                    <span key={v} className="tag tag-blue text-xs">{v}</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-5">
                {country.visaFriendly
                  ? `${country.name} is generally visa-friendly for skilled workers and students. The application process is straightforward with dedicated processing centers.`
                  : `${country.name} has stricter immigration policies. Employment contracts and language skills are typically required. Processing times can be longer.`}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/relocation-planner" className="btn-primary text-sm px-5 py-2.5">
                  <MapPin size={14} /> Plan Relocation to {country.name}
                </Link>
                <Link to="/opportunities" className="btn-outline text-sm px-5 py-2.5">
                  <TrendingUp size={14} /> Find Visa Programs
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Country Stats Card */}
            <div className="card-premium p-5 bg-navy-900 text-white">
              <h3 className="font-semibold mb-4 text-gold-400 text-sm uppercase tracking-wide">Country Profile</h3>
              <div className="space-y-3">
                {[
                  { label: "Capital", value: country.capital },
                  { label: "Region", value: country.region },
                  { label: "Population", value: country.population },
                  { label: "Language", value: country.language },
                  { label: "Currency", value: country.currency },
                  { label: "Avg Salary", value: ext.avgSalary },
                  { label: "Internet", value: ext.internetSpeed },
                  { label: "Happiness", value: `${ext.happinessIndex}/10` },
                ].map(item => (
                  <div key={item.label} className="flex justify-between py-1.5 border-b border-white/10 last:border-0">
                    <span className="text-white/50 text-sm">{item.label}</span>
                    <span className="text-white text-sm font-semibold text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ratings */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-4 text-sm">Ratings</h3>
              <div className="space-y-3">
                {[
                  { label: "Overall", value: country.rating, max: 5, color: "bg-gold-400" },
                  { label: "Cost Affordability", value: country.costOfLiving === "low" ? 4.5 : country.costOfLiving === "medium" ? 3.5 : country.costOfLiving === "high" ? 2.5 : 1.5, max: 5, color: "bg-emerald-500" },
                  { label: "Job Market", value: (country.jobCount / 800), max: 5, color: "bg-royalblue-500" },
                  { label: "Quality of Life", value: ext.happinessIndex / 2, max: 5, color: "bg-navy-500" },
                ].map(r => (
                  <div key={r.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">{r.label}</span>
                      <span className="font-semibold text-navy-900">{Math.min(r.value, 5).toFixed(1)}/5</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className={`h-full ${r.color} rounded-full`} style={{ width: `${(Math.min(r.value, 5) / 5) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-3 text-sm">Quick Links</h3>
              <div className="space-y-1">
                {[
                  { label: `Jobs in ${country.name}`, path: "/jobs", count: country.jobCount + "+" },
                  { label: "Universities", path: "/education", count: country.universityCount },
                  { label: "Properties", path: "/housing", count: "Browse" },
                  { label: "Travel Destinations", path: "/travel", count: "Explore" },
                  { label: "Business Listings", path: "/business", count: "View" },
                  { label: "Cost Calculator", path: "/cost-calculator", count: "Try" },
                ].map(l => (
                  <Link key={l.label} to={l.path} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 hover:text-royalblue-600 text-sm text-gray-700 transition-colors">
                    <span>{l.label}</span>
                    <span className="text-gray-400 text-xs">{l.count} <ChevronRight size={12} className="inline" /></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Advisor CTA */}
            <div className="card-premium p-5 bg-gradient-to-br from-navy-900 to-royalblue-900">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-gold-400" />
                <h3 className="font-semibold text-white text-sm">AI Advisor</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">
                Get personalized advice about moving to {country.name} — jobs, visas, housing, costs and more.
              </p>
              <Link to="/ai-advisor" className="w-full btn-gold justify-center py-2.5 text-sm block text-center">
                Ask About {country.name}
              </Link>
            </div>

            {/* Tags */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-3 text-sm">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {country.tags.map(t => <span key={t} className="tag tag-blue text-xs">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
