import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PlaceholderLayout from "./PlaceholderLayout";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      navigate("/admin/saloni");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlaceholderLayout
      title="Prijavite se — vlasnik salona"
      subtitle="Ulogujte se da biste upravljali svojim salonom. Samo vlasnik može da uređuje svoj salon."
      footer={
        <>
          Nemate nalog?{" "}
          <Link to="/registracija" className="text-[--accent-2] font-medium">
            Registrujte salon
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
        <div>
          <label htmlFor="password" className="block text-[13px] font-medium text-[--text-muted] mb-1.5">
            Lozinka
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
        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-white text-[#0b0d16] font-semibold text-[14.5px] py-3.5 hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Prijavljivanje..." : "Prijavite se"}
        </button>
      </form>
    </PlaceholderLayout>
  );
}
