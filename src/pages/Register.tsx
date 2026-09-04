import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";

const countries = [
  "Select your country", "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Belgium",
  "Brazil", "Canada", "China", "Colombia", "Czech Republic", "Denmark", "Egypt", "Finland", "France",
  "Germany", "Greece", "Hungary", "India", "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Jordan",
  "Kenya", "Lebanon", "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan",
  "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia", "Singapore", "South Africa",
  "South Korea", "Spain", "Sweden", "Switzerland", "Turkey", "UAE", "UK", "Ukraine", "USA", "Vietnam"
];

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const { success } = useToast();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.includes("@")) errs.email = "Valid email required";
    if (password.length < 6) errs.password = "Minimum 6 characters";
    if (!agreed) errs.agreed = "Please accept the terms";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const ok = await register(name, email, password);
    if (ok) {
      success("Welcome to EUROPIUM! 🎉 Your account is ready.");
      navigate("/dashboard");
    }
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ["", "bg-red-400", "bg-gold-400", "bg-emerald-500"];
  const strengthLabels = ["", "Weak", "Good", "Strong"];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-900 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 25% 75%, #2563EB 0%, transparent 50%), radial-gradient(circle at 75% 25%, #D4A72C 0%, transparent 50%)"
        }} />
        <div className="relative z-10 max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-gold-500 flex items-center justify-center mb-6">
            <span className="text-white font-serif font-bold text-3xl">E</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Join 1.2M+ Europeans</h2>
          <p className="text-white/70 mb-8 leading-relaxed">Create your free EUROPIUM account and access thousands of opportunities across Europe.</p>
          <div className="space-y-3">
            {[
              "Access 48,000+ job listings across Europe",
              "Get AI-powered relocation guidance",
              "Save jobs, properties & opportunities",
              "Receive personalized recommendations",
              "Track visa & scholarship applications",
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-white" />
                </div>
                <span className="text-white/80 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center">
              <span className="text-gold-400 font-serif font-bold text-xl">E</span>
            </div>
            <span className="font-serif font-bold text-2xl text-navy-900">EUROPIUM</span>
          </div>

          <h1 className="font-serif text-3xl font-bold text-navy-900 mb-2">Create your account</h1>
          <p className="text-gray-500 mb-8">Already have an account? <Link to="/login" className="text-royalblue-600 font-semibold hover:underline">Sign in</Link></p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  className={`input-premium pl-10 ${errors.name ? "border-red-400 focus:ring-red-400" : ""}`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`input-premium pl-10 ${errors.email ? "border-red-400 focus:ring-red-400" : ""}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Country of Origin</label>
              <select value={country} onChange={e => setCountry(e.target.value)} className="input-premium">
                {countries.map(c => <option key={c} value={c === "Select your country" ? "" : c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className={`input-premium pl-10 pr-10 ${errors.password ? "border-red-400" : ""}`}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : "bg-gray-200"}`} />
                    ))}
                  </div>
                  <p className={`text-xs ${strength === 1 ? "text-red-500" : strength === 2 ? "text-gold-600" : "text-emerald-600"}`}>
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    agreed ? "bg-navy-900 border-navy-900" : "border-gray-300 hover:border-navy-400"
                  }`}
                >
                  {agreed && <Check size={11} className="text-white" />}
                </div>
                <span className="text-sm text-gray-600">
                  I agree to the <Link to="/terms" className="text-royalblue-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-royalblue-600 hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreed && <p className="text-red-500 text-xs mt-1 ml-8">{errors.agreed}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center py-3.5 text-base">
              {isLoading ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Creating account...</span>
              ) : (
                "Create Free Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
