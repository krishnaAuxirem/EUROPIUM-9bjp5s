import { Globe, Users, Award, Target, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

const team = [
  { name: "Isabella Rossi", role: "CEO & Co-founder", country: "Italy", initials: "IR" },
  { name: "Klaus Weber", role: "CTO & Co-founder", country: "Germany", initials: "KW" },
  { name: "Sophie Laurent", role: "Head of Product", country: "France", initials: "SL" },
  { name: "Erik Johansson", role: "Head of AI", country: "Sweden", initials: "EJ" },
];

const milestones = [
  { year: "2022", event: "EUROPIUM founded in Brussels with a mission to democratize European opportunities." },
  { year: "2023", event: "Launched in 15 EU countries, reaching 100,000 registered users." },
  { year: "2024", event: "Introduced AI Advisor, jobs platform, and housing marketplace." },
  { year: "2025", event: "Expanded to 44 countries with 1 million active users." },
  { year: "2026", event: "Launched Premium tier, business directory, and opportunity grants tracker." },
];

export default function AboutPage() {
  return (
    <div className="page-container">
      <section className="bg-navy-900 py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">Our Story</span>
          <h1 className="font-serif text-5xl font-bold text-white mb-6">We believe Europe's opportunities<br />belong to everyone</h1>
          <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
            EUROPIUM was founded by a team of European immigrants and expats who experienced firsthand how difficult it is to navigate opportunities across borders.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Globe, title: "Our Mission", text: "To make Europe's jobs, education, housing, and opportunities accessible to everyone — regardless of where they're from.", color: "bg-royalblue-100 text-royalblue-600" },
            { icon: Target, title: "Our Vision", text: "A borderless European ecosystem where talent, ambition, and opportunity meet seamlessly through intelligent technology.", color: "bg-gold-100 text-gold-600" },
            { icon: Heart, title: "Our Values", text: "Transparency, inclusion, data privacy, and unwavering commitment to user success across all 44 European countries.", color: "bg-emerald-100 text-emerald-600" },
          ].map(v => (
            <div key={v.title} className="card-premium p-6">
              <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center mb-4`}>
                <v.icon size={22} />
              </div>
              <h3 className="font-semibold text-navy-900 text-lg mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-navy-900 rounded-3xl p-10 mb-16">
          <h2 className="font-serif text-3xl font-bold text-white text-center mb-8">EUROPIUM by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: "1.2M+", l: "Active Users" },
              { n: "44", l: "Countries" },
              { n: "48K+", l: "Job Listings" },
              { n: "3,400+", l: "Opportunities" },
            ].map(s => (
              <div key={s.l}>
                <div className="text-4xl font-bold text-gold-400 font-serif mb-1">{s.n}</div>
                <div className="text-white/60 text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-navy-900 text-center mb-10">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 mb-6 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center text-gold-400 font-bold text-sm shrink-0">
                    {m.year}
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
                </div>
                <div className="card-premium p-4 flex-1 mb-2">
                  <p className="text-gray-600 text-sm leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-navy-900 text-center mb-10">Our Leadership Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(t => (
              <div key={t.name} className="card-premium p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-navy-900 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{t.initials}</span>
                </div>
                <h3 className="font-semibold text-navy-900">{t.name}</h3>
                <p className="text-gray-500 text-sm mt-0.5">{t.role}</p>
                <span className="tag tag-blue text-xs mt-2">{t.country}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-royalblue-50 border border-royalblue-200 rounded-3xl p-10 text-center">
          <Award size={48} className="text-royalblue-500 mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold text-navy-900 mb-3">Join Our Mission</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">We're building the future of European opportunity discovery. Join us as a user, partner, or team member.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary">Create Free Account</Link>
            <Link to="/contact" className="btn-outline">Partner With Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
