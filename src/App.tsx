import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";

// Pages
import HomePage from "@/pages/Home";
import ExplorePage from "@/pages/Explore";
import JobsPage from "@/pages/Jobs";
import EducationPage from "@/pages/Education";
import TravelPage from "@/pages/Travel";
import HousingPage from "@/pages/Housing";
import BusinessPage from "@/pages/Business";
import OpportunitiesPage from "@/pages/Opportunities";
import AIAdvisorPage from "@/pages/AIAdvisor";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import DashboardPage from "@/pages/Dashboard";
import ProfilePage from "@/pages/Profile";
import SavedItemsPage from "@/pages/SavedItems";
import CountryDetailPage from "@/pages/CountryDetail";
import JobDetailPage from "@/pages/JobDetail";
import UniversityDetailPage from "@/pages/UniversityDetail";
import PropertyDetailPage from "@/pages/PropertyDetail";
import OpportunityDetailPage from "@/pages/OpportunityDetail";
import TravelDetailPage from "@/pages/TravelDetail";
import TripPlannerPage from "@/pages/TripPlanner";
import BusinessDetailPage from "@/pages/BusinessDetail";
import CommunityPage from "@/pages/Community";
import NotificationsPage from "@/pages/Notifications";
import MessagesPage from "@/pages/Messages";
import EmployerDashboardPage from "@/pages/EmployerDashboard";
import AboutPage from "@/pages/About";
import ContactPage from "@/pages/Contact";
import FAQPage from "@/pages/FAQ";
import PrivacyPage from "@/pages/Privacy";
import TermsPage from "@/pages/Terms";
import HelpCenterPage from "@/pages/HelpCenter";
import RelocationPlannerPage from "@/pages/RelocationPlanner";
import CostCalculatorPage from "@/pages/CostCalculator";
import ApplicationTrackerPage from "@/pages/ApplicationTracker";
import LocalServicesPage from "@/pages/LocalServices";
import NotFoundPage from "@/pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          expand={false}
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: "Inter, system-ui, sans-serif",
              borderRadius: "12px",
            },
          }}
        />
        <Routes>
          {/* Auth pages (no navbar/footer) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Main layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/explore/:id" element={<CountryDetailPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/education/:id" element={<UniversityDetailPage />} />
            <Route path="/travel" element={<TravelPage />} />
            <Route path="/travel/:id" element={<TravelDetailPage />} />
            <Route path="/trip-planner" element={<TripPlannerPage />} />
            <Route path="/housing" element={<HousingPage />} />
            <Route path="/housing/:id" element={<PropertyDetailPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/business/:id" element={<BusinessDetailPage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
            <Route path="/ai-advisor" element={<AIAdvisorPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/saved" element={<SavedItemsPage />} />
            <Route path="/applications" element={<ApplicationTrackerPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/relocation-planner" element={<RelocationPlannerPage />} />
            <Route path="/cost-calculator" element={<CostCalculatorPage />} />
            <Route path="/local-services" element={<LocalServicesPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/employer-dashboard" element={<EmployerDashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
