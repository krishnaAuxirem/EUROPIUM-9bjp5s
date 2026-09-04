import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-3xl bg-navy-900 flex items-center justify-center mx-auto mb-8">
          <span className="text-gold-400 font-serif font-bold text-5xl">E</span>
        </div>
        <h1 className="font-serif text-6xl font-bold text-navy-900 mb-4">404</h1>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mb-3">Page Not Found</h2>
        <p className="text-gray-500 leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <Home size={16} /> Go Home
          </Link>
          <Link to="/explore" className="btn-outline">
            <Search size={16} /> Explore Europe
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
          {[
            { label: "Jobs", path: "/jobs" },
            { label: "Housing", path: "/housing" },
            { label: "Education", path: "/education" },
            { label: "AI Advisor", path: "/ai-advisor" },
          ].map(l => (
            <Link key={l.path} to={l.path} className="text-royalblue-600 hover:underline">{l.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
