import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, ArrowRight, Chrome } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const { error: toastError, success } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const { forgotPassword } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      redirectByRole(user.role);
    }
  }, [isAuthenticated, user]);

  const redirectByRole = (role: string) => {
    if (role === "admin") navigate("/admin");
    else navigate("/dashboard");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      success("Welcome back!");
    } else {
      setError(result.error || "Login failed.");
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) { setError("Enter your email address."); return; }
    setLoading(true);
    const ok = await forgotPassword(forgotEmail);
    setLoading(false);
    if (ok) {
      setForgotSent(true);
    } else {
      setError("No account found with that email.");
    }
  };

  const handleSocialLogin = (provider: string) => {
    toastError(`${provider} login requires backend integration. Use email/password for now.`);
  };

  if (forgotMode) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-premium-xl p-8">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-lg bg-gold-500 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">E</span>
              </div>
              <span className="font-serif font-bold text-xl text-navy-900">EUROPIUM</span>
            </Link>

            {forgotSent ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={36} className="text-emerald-500" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Check Your Email</h2>
                <p className="text-gray-500 text-sm mb-6">
                  We've sent a password reset link to <strong>{forgotEmail}</strong>.
                  Check your inbox (and spam folder).
                </p>
                <p className="text-xs text-gray-400 mb-4">Demo: Use token from localStorage → europium_reset_token</p>
                <Link to="/reset-password" className="btn-primary w-full justify-center mb-3">
                  Reset Password
                </Link>
                <button onClick={() => { setForgotMode(false); setForgotSent(false); }} className="text-sm text-royalblue-600 hover:underline">
                  Back to Login
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Forgot Password?</h2>
                <p className="text-gray-500 text-sm mb-6">Enter your email and we'll send you a reset link.</p>
                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}
                <form onSubmit={handleForgot} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={e => setForgotEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="input-premium pl-10"
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                    {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Send Reset Link"}
                  </button>
                </form>
                <button onClick={() => { setForgotMode(false); setError(""); }} className="mt-4 text-sm text-royalblue-600 hover:underline block text-center">
                  Back to Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 europium-pattern" />
        <div className="relative">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl">E</span>
            </div>
            <span className="font-serif font-bold text-2xl text-white">EUROPIUM</span>
          </Link>
        </div>
        <div className="relative space-y-8">
          <div>
            <h1 className="font-serif text-5xl font-bold text-white leading-tight mb-4">
              Your gateway to<br />
              <span className="text-gold-400">European opportunities</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Join 1.2M+ people discovering jobs, education, housing, and investment opportunities across 44 European countries.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "1.2M+", l: "Active Users" },
              { n: "44", l: "Countries" },
              { n: "48K+", l: "Job Listings" },
              { n: "3,400+", l: "Opportunities" },
            ].map(s => (
              <div key={s.l} className="bg-white/10 rounded-2xl p-4">
                <p className="text-gold-400 font-serif font-bold text-2xl">{s.n}</p>
                <p className="text-white/60 text-sm">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <p className="text-white/40 text-sm">© 2026 EUROPIUM. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-lg bg-gold-500 flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">E</span>
            </div>
            <span className="font-serif font-bold text-xl text-navy-900">EUROPIUM</span>
          </Link>

          <h2 className="font-serif text-3xl font-bold text-navy-900 mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-8">Sign in to your account to continue</p>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-sm text-red-700">
              <AlertCircle size={16} className="shrink-0 mt-0.5" /> {error}
            </div>
          )}

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm font-medium text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialLogin("LinkedIn")}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-sm font-medium text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0077B5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Continue with LinkedIn
            </button>
          </div>

          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or sign in with email</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-premium pl-10"
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <button type="button" onClick={() => setForgotMode(true)} className="text-xs text-royalblue-600 hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="input-premium pl-10 pr-10"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-base"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><ArrowRight size={18} /> Sign In</>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-5 p-4 bg-royalblue-50 border border-royalblue-100 rounded-xl">
            <p className="text-xs font-semibold text-royalblue-700 mb-2">Demo Credentials</p>
            <div className="space-y-1">
              <p className="text-xs text-royalblue-600">Admin: <code className="bg-royalblue-100 px-1 rounded">admin@europium.eu</code> / <code className="bg-royalblue-100 px-1 rounded">Admin@1234</code></p>
              <p className="text-xs text-royalblue-600">Register a new account to test other roles</p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-royalblue-600 font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
