import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Sparkles, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    const ok = await login(email, password);
    if (ok) {
      success("Welcome back to EUROPIUM!");
      navigate("/dashboard");
    } else {
      toastError("Invalid credentials. Try any email with 6+ character password.");
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-900 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, #2563EB 0%, transparent 50%), radial-gradient(circle at 75% 75%, #D4A72C 0%, transparent 50%)"
        }} />
        <div className="relative z-10 text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-gold-500 flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-serif font-bold text-3xl">E</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Welcome back to EUROPIUM</h2>
          <p className="text-white/70 leading-relaxed">Your gateway to opportunities across Europe. Jobs, education, housing, and more — all in one place.</p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { n: "48K+", l: "Active Jobs" },
              { n: "1.2M+", l: "Members" },
              { n: "44", l: "Countries" },
              { n: "3.4K+", l: "Opportunities" },
            ].map(s => (
              <div key={s.l} className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gold-400 font-serif">{s.n}</div>
                <div className="text-white/60 text-xs mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center">
              <span className="text-gold-400 font-serif font-bold text-xl">E</span>
            </div>
            <span className="font-serif font-bold text-2xl text-navy-900">EUROPIUM</span>
          </div>

          <h1 className="font-serif text-3xl font-bold text-navy-900 mb-2">Sign in</h1>
          <p className="text-gray-500 mb-8">Don't have an account? <Link to="/register" className="text-royalblue-600 font-semibold hover:underline">Create one free</Link></p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm animate-fade-in">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-premium pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <button type="button" className="text-xs text-royalblue-600 hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="input-premium pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center py-3.5 text-base">
              {isLoading ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Signing in...</span>
              ) : (
                "Sign in to EUROPIUM"
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-xs text-gray-400 bg-background px-3">Demo: any email + 6 char password</div>
          </div>

          <button
            onClick={() => { setEmail("demo@europium.eu"); setPassword("demo123"); }}
            className="w-full flex items-center justify-center gap-2 border border-border bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-xl text-sm font-medium transition-all"
          >
            <Sparkles size={16} className="text-gold-500" />
            Use Demo Account
          </button>

          <p className="text-center text-xs text-gray-400 mt-6">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-royalblue-600 hover:underline">Terms</Link> and{" "}
            <Link to="/privacy" className="text-royalblue-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
