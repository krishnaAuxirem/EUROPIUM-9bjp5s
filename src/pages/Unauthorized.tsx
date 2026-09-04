import { Link } from "react-router-dom";
import { ShieldOff, Home, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-red-100 flex items-center justify-center mx-auto mb-6">
          <ShieldOff size={40} className="text-red-500" />
        </div>
        <h1 className="font-serif text-4xl font-bold text-navy-900 mb-3">Access Denied</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          You don't have permission to access this page. This area requires a different account role.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard" className="btn-primary">
            <Home size={16} /> My Dashboard
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
