import { useState, useMemo } from "react";
import { Calculator, ArrowRight, TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

const EUR_TO_INR = 90;

interface CityData {
  rent1br: number;
  food: number;
  transport: number;
  utilities: number;
  entertainment: number;
  healthcare: number;
  currency: string;
  sym: string;
  country: string;
  toEUR: number;
}

const cityData: Record<string, CityData> = {
  "Amsterdam": { rent1br: 1900, food: 480, transport: 105, utilities: 180, entertainment: 250, healthcare: 140, currency: "EUR", sym: "€", country: "Netherlands", toEUR: 1 },
  "Berlin": { rent1br: 1500, food: 400, transport: 90, utilities: 160, entertainment: 220, healthcare: 120, currency: "EUR", sym: "€", country: "Germany", toEUR: 1 },
  "Paris": { rent1br: 1800, food: 520, transport: 85, utilities: 200, entertainment: 280, healthcare: 160, currency: "EUR", sym: "€", country: "France", toEUR: 1 },
  "Barcelona": { rent1br: 1200, food: 380, transport: 70, utilities: 140, entertainment: 200, healthcare: 100, currency: "EUR", sym: "€", country: "Spain", toEUR: 1 },
  "Lisbon": { rent1br: 1100, food: 320, transport: 55, utilities: 130, entertainment: 180, healthcare: 90, currency: "EUR", sym: "€", country: "Portugal", toEUR: 1 },
  "Stockholm": { rent1br: 1600, food: 550, transport: 120, utilities: 120, entertainment: 270, healthcare: 80, currency: "SEK", sym: "kr", country: "Sweden", toEUR: 1 },
  "Vienna": { rent1br: 1400, food: 430, transport: 80, utilities: 150, entertainment: 200, healthcare: 110, currency: "EUR", sym: "€", country: "Austria", toEUR: 1 },
  "Zurich": { rent1br: 2200, food: 700, transport: 140, utilities: 250, entertainment: 350, healthcare: 300, currency: "CHF", sym: "Fr", country: "Switzerland", toEUR: 1.05 },
  "Copenhagen": { rent1br: 1700, food: 600, transport: 130, utilities: 160, entertainment: 280, healthcare: 100, currency: "DKK", sym: "kr", country: "Denmark", toEUR: 0.13 },
  "Warsaw": { rent1br: 700, food: 250, transport: 40, utilities: 100, entertainment: 120, healthcare: 60, currency: "PLN", sym: "zł", country: "Poland", toEUR: 0.23 },
  "Milan": { rent1br: 1600, food: 460, transport: 95, utilities: 170, entertainment: 240, healthcare: 130, currency: "EUR", sym: "€", country: "Italy", toEUR: 1 },
  "Rome": { rent1br: 1300, food: 400, transport: 80, utilities: 150, entertainment: 210, healthcare: 110, currency: "EUR", sym: "€", country: "Italy", toEUR: 1 },
  "Oslo": { rent1br: 1800, food: 650, transport: 120, utilities: 200, entertainment: 300, healthcare: 80, currency: "NOK", sym: "kr", country: "Norway", toEUR: 0.088 },
  "Prague": { rent1br: 900, food: 300, transport: 50, utilities: 120, entertainment: 150, healthcare: 70, currency: "CZK", sym: "Kč", country: "Czech Republic", toEUR: 0.04 },
};

const cities = Object.keys(cityData);

type RowKey = keyof Omit<CityData, "currency" | "sym" | "country" | "toEUR">;

const rows: { label: string; key: RowKey; icon: string }[] = [
  { label: "1BR Apartment Rent", key: "rent1br", icon: "🏠" },
  { label: "Food & Groceries", key: "food", icon: "🛒" },
  { label: "Transport (Monthly)", key: "transport", icon: "🚇" },
  { label: "Utilities", key: "utilities", icon: "💡" },
  { label: "Entertainment", key: "entertainment", icon: "🎭" },
  { label: "Healthcare", key: "healthcare", icon: "🏥" },
];

export default function CostCalculatorPage() {
  const [city1, setCity1] = useState("Berlin");
  const [city2, setCity2] = useState("Lisbon");
  const [inrSalary, setInrSalary] = useState(8000000); // ₹80L annual
  const [customRent, setCustomRent] = useState<number | null>(null);

  const c1 = cityData[city1];
  const c2 = cityData[city2];

  // Convert to EUR for fair comparison
  const toEURAmount = (val: number, city: CityData) => val * city.toEUR;
  const toINRFromEUR = (eur: number) => eur * EUR_TO_INR;

  const getTotal = (city: CityData) => rows.reduce((s, r) => s + city[r.key], 0);
  const total1 = getTotal(c1);
  const total2 = getTotal(c2);

  const monthlyInrSalary = inrSalary / 12;
  const total1InEUR = rows.reduce((s, r) => s + toEURAmount(c1[r.key], c1), 0);
  const total2InEUR = rows.reduce((s, r) => s + toEURAmount(c2[r.key], c2), 0);
  const total1InINR = toINRFromEUR(total1InEUR);
  const total2InINR = toINRFromEUR(total2InEUR);

  const savings1INR = monthlyInrSalary - total1InINR;
  const savings2INR = monthlyInrSalary - total2InINR;

  const cheaperCity = total1InEUR < total2InEUR ? city1 : city2;
  const savingsDiff = Math.abs(total1InINR - total2InINR);

  return (
    <div className="page-container">
      <section className="bg-navy-900 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shrink-0">
              <Calculator size={28} className="text-white" />
            </div>
            <div>
              <h1 className="font-serif text-4xl font-bold text-white mb-2">Cost of Living Calculator</h1>
              <p className="text-white/70 text-lg">Compare monthly expenses across European cities. All costs shown in ₹ INR + EUR.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {/* Salary Input */}
        <div className="card-premium p-6 mb-8">
          <h2 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
            <span>💰</span> Your Annual Salary (for savings estimate)
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-navy-900">₹</span>
              <input
                type="number"
                value={inrSalary}
                onChange={e => setInrSalary(Number(e.target.value))}
                className="input-premium w-44 text-lg font-bold"
                step={100000}
                min={0}
              />
              <span className="text-gray-400 text-sm">/ year</span>
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <div className="bg-gray-50 rounded-xl px-3 py-2">
                <span className="text-gray-400">Monthly:</span>
                <span className="font-bold text-navy-900 ml-1">₹{Math.round(inrSalary / 12).toLocaleString("en-IN")}</span>
              </div>
              <div className="bg-gray-50 rounded-xl px-3 py-2">
                <span className="text-gray-400">In EUR:</span>
                <span className="font-bold text-navy-900 ml-1">€{Math.round(inrSalary / 12 / EUR_TO_INR).toLocaleString()}/mo</span>
              </div>
            </div>
          </div>

          {/* Salary slider */}
          <div className="mt-4">
            <input
              type="range"
              min={1000000}
              max={50000000}
              step={500000}
              value={inrSalary}
              onChange={e => setInrSalary(Number(e.target.value))}
              className="w-full accent-navy-900"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>₹10L/yr</span>
              <span>₹5Cr/yr</span>
            </div>
          </div>
        </div>

        {/* City Selector */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="card-premium p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">📍 City 1</label>
            <select value={city1} onChange={e => setCity1(e.target.value)} className="input-premium">
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
            <p className="text-xs text-gray-400 mt-1">{c1.country}</p>
          </div>
          <div className="card-premium p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">📍 City 2</label>
            <select value={city2} onChange={e => setCity2(e.target.value)} className="input-premium">
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
            <p className="text-xs text-gray-400 mt-1">{c2.country}</p>
          </div>
        </div>

        {/* Insight Banner */}
        <div className="bg-royalblue-50 border border-royalblue-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <Info size={16} className="text-royalblue-500 mt-0.5 shrink-0" />
          <p className="text-sm text-royalblue-800">
            <strong>{cheaperCity}</strong> is <strong>₹{Math.round(savingsDiff).toLocaleString("en-IN")} cheaper per month</strong> than {cheaperCity === city1 ? city2 : city1}.
            {savings1INR > 0 || savings2INR > 0 ? ` At your salary, you'd save ₹${Math.round(Math.max(savings1INR, savings2INR)).toLocaleString("en-IN")}/month in ${savings1INR > savings2INR ? city1 : city2}.` : ""}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="card-premium overflow-hidden mb-8">
          <div className="grid grid-cols-3 bg-navy-900 text-white p-4">
            <div className="text-sm font-medium text-white/60">Category</div>
            <div className="text-center">
              <p className="font-bold">{city1}</p>
              <p className="text-xs text-white/50">{c1.country}</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{city2}</p>
              <p className="text-xs text-white/50">{c2.country}</p>
            </div>
          </div>

          {rows.map(r => {
            const v1 = c1[r.key];
            const v2 = c2[r.key];
            const v1EUR = toEURAmount(v1, c1);
            const v2EUR = toEURAmount(v2, c2);
            const diff = v1EUR > v2EUR ? 1 : v1EUR < v2EUR ? -1 : 0;
            const v1INR = toINRFromEUR(v1EUR);
            const v2INR = toINRFromEUR(v2EUR);
            return (
              <div key={r.label} className="grid grid-cols-3 p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>{r.icon}</span>
                  <span>{r.label}</span>
                </div>
                <div className="text-center">
                  <p className={`font-semibold text-sm ${diff === 1 ? "text-red-600" : diff === -1 ? "text-emerald-600" : "text-navy-900"}`}>
                    {c1.sym}{v1.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">₹{Math.round(v1INR).toLocaleString("en-IN")}</p>
                </div>
                <div className="text-center">
                  <p className={`font-semibold text-sm ${diff === -1 ? "text-red-600" : diff === 1 ? "text-emerald-600" : "text-navy-900"}`}>
                    {c2.sym}{v2.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">₹{Math.round(v2INR).toLocaleString("en-IN")}</p>
                </div>
              </div>
            );
          })}

          {/* Total */}
          <div className="grid grid-cols-3 p-4 bg-navy-50">
            <div className="font-bold text-navy-900 text-sm flex items-center gap-1">💰 Total / Month</div>
            <div className="text-center">
              <p className="font-bold text-navy-900">{c1.sym}{total1.toLocaleString()}</p>
              <p className="text-sm font-semibold text-emerald-700">₹{Math.round(total1InINR).toLocaleString("en-IN")}</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-navy-900">{c2.sym}{total2.toLocaleString()}</p>
              <p className="text-sm font-semibold text-emerald-700">₹{Math.round(total2InINR).toLocaleString("en-IN")}</p>
            </div>
          </div>

          {/* Savings */}
          <div className="grid grid-cols-3 p-4 bg-emerald-50">
            <div className="font-semibold text-emerald-800 text-sm flex items-center gap-1">
              <TrendingUp size={14} /> Monthly Savings
            </div>
            <div className="text-center">
              <p className={`font-bold text-sm ${savings1INR >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                {savings1INR >= 0 ? <TrendingUp size={12} className="inline mr-1" /> : <TrendingDown size={12} className="inline mr-1" />}
                ₹{Math.abs(Math.round(savings1INR)).toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-500">€{Math.abs(Math.round(savings1INR / EUR_TO_INR)).toLocaleString()}/mo</p>
            </div>
            <div className="text-center">
              <p className={`font-bold text-sm ${savings2INR >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                {savings2INR >= 0 ? <TrendingUp size={12} className="inline mr-1" /> : <TrendingDown size={12} className="inline mr-1" />}
                ₹{Math.abs(Math.round(savings2INR)).toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-500">€{Math.abs(Math.round(savings2INR / EUR_TO_INR)).toLocaleString()}/mo</p>
            </div>
          </div>
        </div>

        {/* Annual Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            { city: city1, data: c1, totalINR: total1InINR, savingsINR: savings1INR },
            { city: city2, data: c2, totalINR: total2InINR, savingsINR: savings2INR },
          ].map(({ city, data, totalINR, savingsINR }) => (
            <div key={city} className="card-premium p-6">
              <h3 className="font-serif text-xl font-bold text-navy-900 mb-1">{city}</h3>
              <p className="text-sm text-gray-500 mb-4">{data.country}</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Monthly Expenses</span>
                  <div className="text-right">
                    <p className="font-bold text-navy-900">₹{Math.round(totalINR).toLocaleString("en-IN")}</p>
                    <p className="text-xs text-gray-400">{data.sym}{getTotal(data).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Annual Expenses</span>
                  <p className="font-bold text-navy-900">₹{Math.round(totalINR * 12).toLocaleString("en-IN")}</p>
                </div>
                <div className="flex justify-between text-sm border-t pt-3">
                  <span className="font-semibold text-gray-700">Monthly Savings</span>
                  <p className={`font-bold ${savingsINR >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {savingsINR >= 0 ? "+" : ""}₹{Math.round(savingsINR).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Annual Savings</span>
                  <p className={`font-semibold ${savingsINR >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {savingsINR >= 0 ? "+" : ""}₹{Math.round(savingsINR * 12).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
              {savingsINR > 0 && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-700">
                  ✅ You'd save ₹{Math.round(savingsINR * 12).toLocaleString("en-IN")} per year in {city}
                </div>
              )}
              {savingsINR < 0 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-700">
                  ⚠️ Living in {city} exceeds your salary by ₹{Math.abs(Math.round(savingsINR)).toLocaleString("en-IN")}/month
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">Estimates based on average costs for a single person. Actual costs vary by lifestyle.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/ai-advisor" className="btn-primary">
              Get Personalized Budget Advice <ArrowRight size={14} />
            </Link>
            <Link to="/relocation-planner" className="btn-secondary">
              Start Relocation Planner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
