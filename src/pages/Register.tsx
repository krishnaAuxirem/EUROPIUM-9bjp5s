import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye, EyeOff, Mail, Lock, User, Phone, Globe, AlertCircle,
  CheckCircle, ArrowRight, ChevronRight, ChevronLeft
} from "lucide-react";
import { useAuth, type RegisterData } from "@/contexts/AuthContext";
import type { UserRole } from "@/types";
import { useToast } from "@/hooks/useToast";

const ROLES: { role: UserRole; emoji: string; title: string; desc: string }[] = [
  { role: "traveler", emoji: "✈️", title: "Traveler", desc: "Explore destinations, plan trips, discover Europe" },
  { role: "student", emoji: "🎓", title: "Student", desc: "Find universities, scholarships, programs" },
  { role: "job_seeker", emoji: "💼", title: "Job Seeker", desc: "Discover careers, apply for jobs" },
  { role: "relocator", emoji: "🏡", title: "Relocating Individual", desc: "Move to a new European country" },
  { role: "entrepreneur", emoji: "🚀", title: "Entrepreneur", desc: "Launch or expand a business in Europe" },
  { role: "employer", emoji: "🏢", title: "Employer / Business", desc: "Hire talent, post jobs, list your business" },
  { role: "property_provider", emoji: "🏘️", title: "Property Provider", desc: "List and manage properties for rent or sale" },
];

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh",
  "Belgium", "Brazil", "Bulgaria", "Canada", "China", "Croatia", "Czech Republic",
  "Denmark", "Egypt", "Estonia", "Ethiopia", "Finland", "France", "Germany", "Ghana",
  "Greece", "Hungary", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Japan", "Jordan", "Kenya", "Latvia", "Lebanon", "Lithuania", "Malaysia",
  "Mexico", "Morocco", "Netherlands", "Nigeria", "Norway", "Pakistan", "Philippines",
  "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore",
  "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland",
  "Thailand", "Turkey", "UAE", "Ukraine", "United Kingdom", "United States", "Vietnam",
];

type Step = "role" | "details" | "otp";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, verifyOTP, resendOTP, pendingVerificationEmail } = useAuth();
  const { success, error: toastError } = useToast();

  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    phone: "", country: "", profession: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [otpResent, setOtpResent] = useState(false);

  const update = (field: string, val: string) => setForm(f => ({ ...f, [field]: val }));

  const validateDetails = () => {
    if (!form.name.trim()) return "Full name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email address.";
    if (!form.password || form.password.length < 8) return "Password must be at least 8 characters.";
    if (form.password !== form.confirmPassword) return "Passwords do not match.";
    if (!agreed) return "Please accept the Terms of Service and Privacy Policy.";
    return null;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateDetails();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);

    const data: RegisterData = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      phone: form.phone,
      role: selectedRole!,
      country: form.country,
      profession: form.profession,
    };

    const result = await register(data);
    setLoading(false);
    if (result.success) {
      setStep("otp");
    } else {
      setError(result.error || "Registration failed.");
    }
  };

  const handleOTPChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleOTPKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const code = otp.join("");
    if (code.length !== 6) { setError("Enter the complete 6-digit code."); return; }
    setError("");
    setLoading(true);
    const ok = await verifyOTP(code);
    setLoading(false);
    if (ok) {
      success("Account verified successfully! Welcome to EUROPIUM.");
      navigate("/dashboard");
    } else {
      setError("Invalid OTP code. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    await resendOTP();
    setOtpResent(true);
    setOtp(["", "", "", "", "", ""]);
    setTimeout(() => setOtpResent(false), 30000);
  };

  const handleSocialLogin = (provider: string) => {
    toastError(`${provider} registration requires backend. Use email for now.`);
  };

  // STEP: OTP
  if (step === "otp") {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-premium-xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-royalblue-100 flex items-center justify-center mx-auto mb-4">
              <Mail size={28} className="text-royalblue-600" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Verify Your Email</h2>
            <p className="text-gray-500 text-sm">
              We've sent a 6-digit verification code to<br />
              <strong className="text-navy-900">{pendingVerificationEmail || form.email}</strong>
            </p>
            <p className="text-xs text-amber-600 mt-2 bg-amber-50 rounded-lg p-2">
              Demo: Enter any 6 digits (e.g. <strong>123456</strong>)
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleOTPChange(idx, e.target.value)}
                onKeyDown={e => handleOTPKeyDown(idx, e)}
                className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-royalblue-500 focus:ring-2 focus:ring-royalblue-200 outline-none transition-all"
              />
            ))}
          </div>

          <button
            onClick={handleVerifyOTP}
            disabled={loading || otp.join("").length !== 6}
            className="btn-primary w-full justify-center py-3.5 mb-4 disabled:opacity-50"
          >
            {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Verify & Continue"}
          </button>

          <div className="text-center">
            {otpResent ? (
              <p className="text-sm text-emerald-600 flex items-center justify-center gap-1">
                <CheckCircle size={14} /> Code resent!
              </p>
            ) : (
              <button onClick={handleResendOTP} className="text-sm text-royalblue-600 hover:underline">
                Didn't receive? Resend code
              </button>
            )}
          </div>
          <div className="text-center mt-4">
            <button onClick={() => setStep("details")} className="text-xs text-gray-400 hover:text-gray-600">
              ← Back to registration
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-2/5 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 europium-pattern" />
        <Link to="/" className="relative flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center">
            <span className="text-white font-serif font-bold text-xl">E</span>
          </div>
          <span className="font-serif font-bold text-2xl text-white">EUROPIUM</span>
        </Link>
        <div className="relative space-y-6">
          <div>
            <p className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-3">Join 1.2M+ Europeans</p>
            <h1 className="font-serif text-4xl font-bold text-white leading-tight mb-4">
              Start your European<br />
              <span className="text-gold-400">journey today</span>
            </h1>
            <p className="text-white/70">Access jobs, education, housing, and endless opportunities across Europe.</p>
          </div>
          <div className="space-y-3">
            {["Free to join, premium tools available", "AI-powered personalized advice", "44 European countries covered", "Trusted by 1.2M+ members"].map(f => (
              <div key={f} className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-white/40 text-sm">© 2026 EUROPIUM.</p>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-6 lg:p-10 bg-white overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-lg bg-gold-500 flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">E</span>
            </div>
            <span className="font-serif font-bold text-xl text-navy-900">EUROPIUM</span>
          </Link>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            {[{ s: "role", n: 1, l: "Role" }, { s: "details", n: 2, l: "Details" }].map((st, idx) => (
              <div key={st.s} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step === st.s ? "bg-navy-900 text-white" :
                  (step === "details" && idx === 0) || step === "otp" ? "bg-emerald-500 text-white" :
                  "bg-gray-200 text-gray-400"
                }`}>
                  {(step === "details" && idx === 0) || step === "otp" ? <CheckCircle size={16} /> : st.n}
                </div>
                <span className={`text-sm font-medium ${step === st.s ? "text-navy-900" : "text-gray-400"}`}>{st.l}</span>
                {idx < 1 && <ChevronRight size={14} className="text-gray-300" />}
              </div>
            ))}
          </div>

          {/* STEP 1: Role */}
          {step === "role" && (
            <div className="animate-fade-in">
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">What brings you to Europe?</h2>
              <p className="text-gray-500 text-sm mb-6">Choose your primary purpose to personalize your experience.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {ROLES.map(r => (
                  <button
                    key={r.role}
                    onClick={() => setSelectedRole(r.role)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      selectedRole === r.role
                        ? "border-navy-900 bg-navy-50"
                        : "border-gray-200 hover:border-navy-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{r.emoji}</div>
                    <p className={`font-semibold text-sm ${selectedRole === r.role ? "text-navy-900" : "text-gray-800"}`}>{r.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{r.desc}</p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => { if (!selectedRole) { setError("Please select your role."); return; } setError(""); setStep("details"); }}
                disabled={!selectedRole}
                className="btn-primary w-full justify-center py-3.5 disabled:opacity-50"
              >
                Continue <ArrowRight size={16} />
              </button>
              {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-royalblue-600 font-semibold hover:underline">Sign in</Link>
              </p>
            </div>
          )}

          {/* STEP 2: Details */}
          {step === "details" && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-6">
                <button onClick={() => setStep("role")} className="p-1 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-navy-900">Create your account</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl">{ROLES.find(r => r.role === selectedRole)?.emoji}</span>
                    <span className="text-sm text-gray-500">{ROLES.find(r => r.role === selectedRole)?.title}</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-sm text-red-700">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" /> {error}
                </div>
              )}

              {/* Social */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button onClick={() => handleSocialLogin("Google")} className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-sm font-medium text-gray-700 transition-all">
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Google
                </button>
                <button onClick={() => handleSocialLogin("LinkedIn")} className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border-2 border-gray-200 hover:border-blue-200 text-sm font-medium text-gray-700 transition-all">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0077B5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </button>
              </div>
              <div className="relative flex items-center gap-4 mb-5">
                <div className="flex-1 border-t border-gray-200" />
                <span className="text-xs text-gray-400">or with email</span>
                <div className="flex-1 border-t border-gray-200" />
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" value={form.name} onChange={e => update("name", e.target.value)} placeholder="Your full name" className="input-premium pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone (optional)</label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+91 98765 43210" className="input-premium pl-10" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="your@email.com" className="input-premium pl-10" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                    <div className="relative">
                      <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                      <select value={form.country} onChange={e => update("country", e.target.value)} className="input-premium pl-10 appearance-none">
                        <option value="">Select country</option>
                        {countries.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Profession</label>
                    <input type="text" value={form.profession} onChange={e => update("profession", e.target.value)} placeholder="e.g. Software Engineer" className="input-premium" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type={showPassword ? "text" : "password"} value={form.password} onChange={e => update("password", e.target.value)} placeholder="Min. 8 characters" className="input-premium pl-10 pr-10" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password *</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type={showConfirmPassword ? "text" : "password"} value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} placeholder="Repeat password" className="input-premium pl-10 pr-10" />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                        {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>

                {form.password && (
                  <div className="flex gap-1">
                    {[
                      { check: form.password.length >= 8, label: "8+ chars" },
                      { check: /[A-Z]/.test(form.password), label: "Uppercase" },
                      { check: /[0-9]/.test(form.password), label: "Number" },
                      { check: /[^A-Za-z0-9]/.test(form.password), label: "Special" },
                    ].map(r => (
                      <div key={r.label} className={`flex-1 rounded-full h-1.5 ${r.check ? "bg-emerald-400" : "bg-gray-200"}`} />
                    ))}
                  </div>
                )}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-navy-900" />
                  <span className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link to="/terms" className="text-royalblue-600 hover:underline" target="_blank">Terms of Service</Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="text-royalblue-600 hover:underline" target="_blank">Privacy Policy</Link>
                  </span>
                </label>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-50">
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Create Account <ArrowRight size={16} /></>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-5">
                Already have an account?{" "}
                <Link to="/login" className="text-royalblue-600 font-semibold hover:underline">Sign in</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
