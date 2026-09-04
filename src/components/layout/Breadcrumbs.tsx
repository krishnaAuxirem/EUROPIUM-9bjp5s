import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeNames: Record<string, string> = {
  explore: "Explore Europe",
  jobs: "Jobs",
  education: "Education",
  travel: "Travel",
  housing: "Housing",
  business: "Business",
  opportunities: "Opportunities",
  "ai-advisor": "AI Advisor",
  login: "Login",
  register: "Register",
  dashboard: "Dashboard",
  profile: "Profile",
  about: "About",
  contact: "Contact",
  faq: "FAQ",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  help: "Help Center",
  "relocation-planner": "Relocation Planner",
  "cost-calculator": "Cost Calculator",
  saved: "Saved Items",
};

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => ({
    label: routeNames[seg] || decodeURIComponent(seg).replace(/-/g, " ").replace(/^\w/, c => c.toUpperCase()),
    path: "/" + segments.slice(0, i + 1).join("/"),
  }));

  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
      <Link to="/" className="flex items-center gap-1 hover:text-navy-700 transition-colors">
        <Home size={14} />
        <span>Home</span>
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={crumb.path} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-gray-300" />
          {i === crumbs.length - 1 ? (
            <span className="text-navy-800 font-medium capitalize">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="hover:text-navy-700 transition-colors capitalize">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
