import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) { setError("Enter your reset token."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    setError("");
    setLoading(true);
    const ok = await resetPassword(token.trim(), password);
    setLoading(false);
    if (ok) {
      setSuccess(true);
    } else {
      setError("Invalid or expired reset token. Please request a new one.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-premium-xl p-8">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-gold-500 flex items-center justify-center">
            <span className="text-white font-serif font-bold text-lg">E</span>
          </div>
          <span className="font-serif font-bold text-xl text-navy-900">EUROPIUM</span>
        </Link>

        {success ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={36} className="text-emerald-500" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Password Reset!</h2>
            <p className="text-gray-500 text-sm mb-6">Your password has been successfully reset. You can now sign in.</p>
            <Link to="/login" className="btn-primary w-full justify-center">Sign In Now</Link>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Reset Password</h2>
            <p className="text-gray-500 text-sm mb-6">Enter your reset token and choose a new password.</p>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl mb-5 text-xs text-amber-700">
              Find your reset token in browser localStorage → key: <code>europium_reset_token</code> → field: <code>token</code>
            </div>
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700">
                <AlertCircle size={16} className="shrink-0 mt-0.5" /> {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Reset Token</label>
                <input type="text" value={token} onChange={e => setToken(e.target.value)} placeholder="RESET_XXXXXXXX" className="input-premium font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" className="input-premium pl-10 pr-10" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat password" className="input-premium" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-50">
                {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Reset Password"}
              </button>
            </form>
            <p className="text-center mt-4">
              <Link to="/login" className="text-sm text-royalblue-600 hover:underline">Back to Login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
