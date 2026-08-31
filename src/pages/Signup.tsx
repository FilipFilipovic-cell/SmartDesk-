import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PlaceholderLayout from "./PlaceholderLayout";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Lozinke se ne poklapaju.");
      return;
    }
    if (password.length < 6) {
      setError("Lozinka mora imati bar 6 karaktera.");
      return;
    }
    setLoading(true);
    try {
      await signUp(email.trim(), password);
      setDone(true);
      // Ako je email potvrda isključena u Supabase Auth Settings, korisnik je odmah ulogovan
      setTimeout(() => navigate("/prijava"), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <PlaceholderLayout
        title="Proverite email"
        subtitle="Poslali smo vam link za potvrdu na email. Nakon potvrde možete se prijaviti i dodati svoj salon."
        footer={
          <Link to="/prijava" className="text-[--accent-2] font-medium">
            Idite na prijavu
          </Link>
        }
      >
        <div className="rounded-xl bg-[--success-soft] border border-[--success]/30 px-4 py-4 text-sm text-[--success]">
          Nalog kreiran za <b>{email}</b>. Proverite inbox (i spam).
        </div>
      </PlaceholderLayout>
    );
  }

  return (
    <PlaceholderLayout
      title="Registrujte salon — vlasnik"
      subtitle="Napravite nalog vlasnika. Nakon prijave možete dodati samo svoj salon — niko drugi ne može da ga menja."
      footer={
        <>
          Već imate nalog?{" "}
          <Link to="/prijava" className="text-[--accent-2] font-medium">
            Prijavite se
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-200">{error}</div>
        )}
        <div>
          <label htmlFor="email" className="block text-[13px] font-medium text-[--text-muted] mb-1.5">
            Email adresa *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ime@salon.com"
            className="w-full rounded-xl bg-[--surface-2] border border-white/10 px-4 py-3 text-[14px] text-white placeholder:text-[--text-faint] focus:border-[--accent] outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-[13px] font-medium text-[--text-muted] mb-1.5">
            Lozinka *
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl bg-[--surface-2] border border-white/10 px-4 py-3 text-[14px] text-white placeholder:text-[--text-faint] focus:border-[--accent] outline-none"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="block text-[13px] font-medium text-[--text-muted] mb-1.5">
            Potvrdite lozinku *
          </label>
          <input
            id="confirm"
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl bg-[--surface-2] border border-white/10 px-4 py-3 text-[14px] text-white placeholder:text-[--text-faint] focus:border-[--accent] outline-none"
          />
        </div>
        <p className="text-xs text-[--text-faint]">
          Jedan nalog = jedan salon. Nakon registracije idite na <b>/admin/saloni</b> da dodate svoj salon.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="mt-1 rounded-full bg-white text-[#0b0d16] font-semibold text-[14.5px] py-3.5 hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Kreiranje..." : "Kreirajte nalog"}
        </button>
      </form>
    </PlaceholderLayout>
  );
}
