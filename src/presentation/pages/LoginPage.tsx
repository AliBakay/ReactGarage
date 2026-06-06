import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../infrastructure/supabase/client";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Ongeldig e-mailadres of wachtwoord.");
      setLoading(false);
    } else {
      navigate("/beheerpaneel");
    }
  };

  return (
    <div className="min-h-screen bg-garage-surface flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-garage-border max-w-md w-full">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock size={28} className="text-garage-accent" />
        </div>
        <h1 className="font-display text-2xl font-bold text-center text-garage-dark mb-2">
          Beheerders Login
        </h1>
        <p className="text-center text-garage-darkSub text-sm mb-8">
          Log in om voertuigen toe te voegen en te beheren.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 text-sm rounded-xl mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-1.5">
              E-mailadres
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-garage-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-light pl-10"
                placeholder="info@garagevanhozeham.be"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-1.5">
              Wachtwoord
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-garage-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-light pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Inloggen..." : "Inloggen"} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
