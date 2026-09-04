import { Link } from "react-router-dom";
import { Search, BookOpen, MessageSquare, Video, FileText, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { useState } from "react";

const guides = [
  { title: "Getting Started with EUROPIUM", icon: BookOpen, cat: "Getting Started", time: "5 min read" },
  { title: "How to Use the AI Advisor", icon: MessageSquare, cat: "AI Advisor", time: "3 min read" },
  { title: "Finding and Applying for Jobs", icon: FileText, cat: "Jobs", time: "7 min read" },
  { title: "Setting Up Your Relocation Plan", icon: Video, cat: "Relocation", time: "10 min read" },
  { title: "Understanding European Visas", icon: BookOpen, cat: "Visas", time: "15 min read" },
  { title: "Using the Cost Calculator", icon: FileText, cat: "Tools", time: "4 min read" },
  { title: "Saving and Managing Items", icon: BookOpen, cat: "Account", time: "2 min read" },
  { title: "Searching for Housing in Europe", icon: FileText, cat: "Housing", time: "6 min read" },
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");

  const filtered = guides.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.cat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <section className="bg-navy-900 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-white/70 mb-8">Find guides, tutorials, and answers to help you get the most out of EUROPIUM.</p>
          <div className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search help articles..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-gold-500 outline-none"
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {[
            { icon: BookOpen, title: "Getting Started", desc: "New to EUROPIUM? Start here.", link: "#guides" },
            { icon: MessageSquare, title: "AI Advisor Help", desc: "Learn how to use the AI Advisor.", link: "/ai-advisor" },
            { icon: FileText, title: "Contact Support", desc: "Can't find your answer? Talk to us.", link: "/contact" },
          ].map(c => (
            <Link key={c.title} to={c.link} className="card-premium p-6 group">
              <div className="w-12 h-12 rounded-xl bg-royalblue-100 text-royalblue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <c.icon size={22} />
              </div>
              <h3 className="font-semibold text-navy-900 mb-1">{c.title}</h3>
              <p className="text-gray-500 text-sm">{c.desc}</p>
            </Link>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6" id="guides">Help Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {filtered.map((g, i) => (
            <div key={i} className="card-premium p-5 flex items-center gap-4 group cursor-pointer hover:border-royalblue-300">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <g.icon size={18} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-navy-900 text-sm group-hover:text-royalblue-600 transition-colors">{g.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{g.cat} · {g.time}</p>
              </div>
              <ArrowRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-gray-500 text-sm col-span-2 text-center py-8">No articles found. <Link to="/contact" className="text-royalblue-600 hover:underline">Contact us →</Link></p>
          )}
        </div>

        <div className="bg-navy-900 rounded-2xl p-8 text-center text-white">
          <h3 className="font-serif text-2xl font-bold mb-2">Still need help?</h3>
          <p className="text-white/70 mb-5">Our AI can answer most questions instantly, or our support team is here for you.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/ai-advisor" className="btn-gold">Ask AI Advisor</Link>
            <Link to="/contact" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
