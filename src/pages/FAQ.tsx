import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Link } from "react-router-dom";

const faqs = [
  { q: "Is EUROPIUM free to use?", a: "Yes! EUROPIUM has a free tier that gives you access to job listings, university information, housing, and opportunities. Our Premium plan unlocks AI Advisor advanced features, unlimited saves, and early access to new listings.", cat: "General" },
  { q: "What is the AI Advisor?", a: "Our AI Advisor is a conversational AI trained on European opportunities, visa regulations, university programs, housing markets, and relocation guidance. It can answer personalized questions 24/7.", cat: "AI Advisor" },
  { q: "Can I apply for jobs directly on EUROPIUM?", a: "Yes! You can submit applications directly through our platform for many listings. Some employers will redirect you to their own application portal.", cat: "Jobs" },
  { q: "Do I need a visa to work in Europe?", a: "If you're an EU/EEA citizen, you have freedom of movement. Non-EU citizens typically need a work permit. The requirements vary by country. We recommend using our AI Advisor to get country-specific guidance.", cat: "Visas & Immigration" },
  { q: "What is the EU Blue Card?", a: "The EU Blue Card is a work and residence permit for non-EU highly skilled workers. It's valid in 25 EU member states and requires a university degree and a job offer above a salary threshold (~€43,992/year).", cat: "Visas & Immigration" },
  { q: "Which European countries have free university tuition?", a: "Germany, Norway, and Finland offer free tuition for both EU and non-EU students at public universities. Austria, Denmark, and Sweden are free for EU/EEA students. Check individual university pages for specifics.", cat: "Education" },
  { q: "How does the Cost Calculator work?", a: "Our Cost Calculator lets you estimate monthly living expenses in any European city based on rent, food, transport, entertainment, and utilities. You can compare multiple cities side by side.", cat: "Tools" },
  { q: "What is the Golden Visa?", a: "Several EU countries (Portugal, Greece, Spain, Malta) offer Golden Visa programs that grant residency through qualifying investments, usually real estate purchases starting from €250,000.", cat: "Visas & Immigration" },
  { q: "How do I list my property on EUROPIUM?", a: "Click 'Contact Us' and select 'Advertising' to reach our partnerships team. We work with agents, landlords, and developers across Europe.", cat: "Housing" },
  { q: "Is my personal data safe with EUROPIUM?", a: "Absolutely. We are GDPR compliant and never sell personal data. We use industry-standard encryption and you can delete your account and data at any time.", cat: "Privacy & Security" },
];

const categories = ["All", ...new Set(faqs.map(f => f.cat))];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = faqs.filter(f => {
    const matchSearch = f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === "All" || f.cat === cat;
    return matchSearch && matchCat;
  });

  return (
    <div className="page-container">
      <section className="bg-navy-900 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-white/70 mb-8">Find answers to common questions about EUROPIUM and European opportunities.</p>
          <div className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-0 bg-white text-gray-900 focus:ring-2 focus:ring-gold-500 outline-none text-base"
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                cat === c ? "bg-navy-900 text-white" : "bg-white border border-border text-gray-600 hover:border-navy-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {filtered.map((faq, i) => (
            <div key={i} className="card-premium overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="tag tag-gray text-xs shrink-0 mt-0.5">{faq.cat}</span>
                  <span className="font-semibold text-navy-900">{faq.q}</span>
                </div>
                {open === i ? <ChevronUp size={18} className="text-gray-400 shrink-0 ml-3" /> : <ChevronDown size={18} className="text-gray-400 shrink-0 ml-3" />}
              </button>
              {open === i && (
                <div className="px-5 pb-5 pt-0 border-t border-gray-100 animate-fade-in">
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-3">No matching questions found.</p>
              <Link to="/contact" className="text-royalblue-600 hover:underline text-sm">Contact us directly →</Link>
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto mt-12 bg-navy-50 border border-navy-200 rounded-2xl p-8 text-center">
          <h3 className="font-serif text-xl font-bold text-navy-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4 text-sm">Our AI Advisor can answer specific questions instantly, or contact our support team.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/ai-advisor" className="btn-primary text-sm">Ask AI Advisor</Link>
            <Link to="/contact" className="btn-outline text-sm">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
