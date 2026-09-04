import { Link } from "react-router-dom";
import { Globe, Linkedin, Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Countries", path: "/explore" },
    { label: "Cities", path: "/explore?tab=cities" },
    { label: "Jobs", path: "/jobs" },
    { label: "Universities", path: "/education" },
    { label: "Housing", path: "/housing" },
    { label: "Travel", path: "/travel" },
    { label: "Opportunities", path: "/opportunities" },
  ],
  business: [
    { label: "Business Directory", path: "/business" },
    { label: "Suppliers", path: "/business?type=supplier" },
    { label: "Partnerships", path: "/business?type=partner" },
    { label: "Employer Solutions", path: "/business?type=employer" },
  ],
  users: [
    { label: "AI Advisor", path: "/ai-advisor" },
    { label: "Relocation Planner", path: "/relocation-planner" },
    { label: "Cost of Living", path: "/cost-calculator" },
    { label: "Trip Planner", path: "/trip-planner" },
    { label: "Local Services", path: "/local-services" },
    { label: "Saved Items", path: "/saved" },
    { label: "Dashboard", path: "/dashboard" },
  ],
  company: [
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "FAQ", path: "/faq" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Help Center", path: "/help" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">E</span>
              </div>
              <span className="font-serif font-bold text-2xl text-white">EUROPIUM</span>
            </Link>
            <p className="text-navy-200 text-sm leading-relaxed mb-6 max-w-xs">
              Your gateway to opportunities across Europe. Discover jobs, education, housing, and more with AI-powered guidance.
            </p>
            <div className="space-y-2 text-sm text-navy-300">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gold-400 shrink-0" />
                <span>Rue de la Loi 200, Brussels, Belgium</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gold-400 shrink-0" />
                <a href="mailto:hello@europium.eu" className="hover:text-white transition-colors">hello@europium.eu</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gold-400 shrink-0" />
                <span>+32 2 000 0000</span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Explore</h4>
            <ul className="space-y-2.5">
              {footerLinks.explore.map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-navy-300 hover:text-gold-400 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">For Business</h4>
            <ul className="space-y-2.5">
              {footerLinks.business.map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-navy-300 hover:text-gold-400 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Users */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">For Users</h4>
            <ul className="space-y-2.5">
              {footerLinks.users.map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-navy-300 hover:text-gold-400 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-navy-300 hover:text-gold-400 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-navy-400 text-sm">
            <Globe size={14} />
            <span>© 2026 EUROPIUM. All rights reserved.</span>
          </div>
          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              { icon: Twitter, href: "https://x.com", label: "X" },
              { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-gold-500 flex items-center justify-center transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
