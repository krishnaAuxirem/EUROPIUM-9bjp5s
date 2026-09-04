import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/features/ProtectedRoute";

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
import ResetPasswordPage from "@/pages/ResetPassword";
import DashboardPage from "@/pages/Dashboard";
import AdminDashboard from "@/pages/AdminDashboard";
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
import BlogPage from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import UnauthorizedPage from "@/pages/Unauthorized";
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
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Admin (no main layout, has its own layout) */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Dashboard (role-based, no main layout) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

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
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />

            {/* Protected routes */}
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/saved" element={<ProtectedRoute><SavedItemsPage /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><ApplicationTrackerPage /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
            <Route path="/employer-dashboard" element={<ProtectedRoute><EmployerDashboardPage /></ProtectedRoute>} />

            {/* Public */}
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

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
