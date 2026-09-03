import { useState } from "react";
import { Link } from "react-router-dom";
import PlaceholderLayout from "./PlaceholderLayout";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Unesite email adresu.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <PlaceholderLayout
        title="Proverite email"
        subtitle={`Poslali smo link za reset lozinke na ${email}. Otvorite email i kliknite na link (važi 1h). Proverite i spam folder.`}
        footer={
          <Link to="/prijava" className="text-[--accent-2] font-medium">
            Nazad na prijavu
          </Link>
        }
      >
        <div className="rounded-xl bg-[--success-soft] border border-[--success]/30 px-4 py-4 text-sm text-[--success]">
          Ako nalog postoji, dobićete email sa linkom za promenu lozinke.
        </div>
      </PlaceholderLayout>
    );
  }

  return (
    <PlaceholderLayout
      title="Zaboravili ste lozinku?"
      subtitle="Unesite email vašeg salona i poslaćemo vam link za resetovanje lozinke. Link važi 60 minuta."
      footer={
        <>
          Setili ste se?{" "}
          <Link to="/prijava" className="text-[--accent-2] font-medium">
            Nazad na prijavu
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-200">{error}</div>}
        <div>
          <label htmlFor="email" className="block text-[13px] font-medium text-[--text-muted] mb-1.5">
            Email adresa
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
        <button type="submit" disabled={loading} className="mt-2 rounded-full bg-white text-[#0b0d16] font-semibold text-[14.5px] py-3.5 hover:bg-white/90 disabled:opacity-50">
          {loading ? "Slanje..." : "Pošalji link za reset"}
        </button>
      </form>
    </PlaceholderLayout>
  );
}
