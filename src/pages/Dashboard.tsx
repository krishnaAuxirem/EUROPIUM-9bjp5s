import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

// Role-based dashboard router
import TravelerDashboard from "./dashboards/TravelerDashboard";
import StudentDashboard from "./dashboards/StudentDashboard";
import JobSeekerDashboard from "./dashboards/JobSeekerDashboard";
import RelocatorDashboard from "./dashboards/RelocatorDashboard";
import EntrepreneurDashboard from "./dashboards/EntrepreneurDashboard";
import EmployerDashboardNew from "./dashboards/EmployerDashboardNew";
import PropertyProviderDashboard from "./dashboards/PropertyProviderDashboard";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-navy-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  switch (user.role) {
    case "traveler": return <TravelerDashboard />;
    case "student": return <StudentDashboard />;
    case "job_seeker": return <JobSeekerDashboard />;
    case "relocator": return <RelocatorDashboard />;
    case "entrepreneur": return <EntrepreneurDashboard />;
    case "employer": return <EmployerDashboardNew />;
    case "property_provider": return <PropertyProviderDashboard />;
    case "admin": navigate("/admin"); return null;
    default: return <JobSeekerDashboard />;
  }
}
