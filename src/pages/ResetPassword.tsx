import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PlaceholderLayout from "./PlaceholderLayout";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    // Supabase nakon klika na email link postavlja sesiju preko hash-a
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setHasSession(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("Lozinka mora imati bar 6 karaktera.");
      return;
    }
    if (password !== confirm) {
      setError("Lozinke se ne poklapaju.");
      return;
    }
    setLoading(true);
    try {
      await updatePassword(password);
      navigate("/prijava");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  if (hasSession === false) {
    return (
      <PlaceholderLayout
        title="Link je istekao"
        subtitle="Link za reset lozinke je istekao ili je već iskorišćen. Pošaljite novi zahtev."
        footer={
          <Link to="/zaboravljena-lozinka" className="text-[--accent-2] font-medium">
            Pošalji novi link
          </Link>
        }
      >
        <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-sm text-amber-200">
          Otvorite email ponovo i kliknite na najnoviji link (važi 60 min). Ako ste već promenili lozinku, prijavite se.
        </div>
      </PlaceholderLayout>
    );
  }

  return (
    <PlaceholderLayout
      title="Nova lozinka"
      subtitle="Unesite novu lozinku za vaš nalog. Nakon čuvanja bićete preusmereni na prijavu."
      footer={
        <Link to="/prijava" className="text-[--accent-2] font-medium">
          Nazad na prijavu
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-200">{error}</div>}
        <div>
          <label htmlFor="newpass" className="block text-[13px] font-medium text-[--text-muted] mb-1.5">
            Nova lozinka
          </label>
          <input
            id="newpass"
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
            Potvrdite lozinku
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
        <button type="submit" disabled={loading || hasSession === null} className="mt-2 rounded-full bg-white text-[#0b0d16] font-semibold text-[14.5px] py-3.5 hover:bg-white/90 disabled:opacity-50">
          {loading ? "Čuvanje..." : "Sačuvaj novu lozinku"}
        </button>
      </form>
    </PlaceholderLayout>
  );
}
