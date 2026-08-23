import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { isAdminAuthed, loginAdmin, DEMO_PASSCODE } from "../lib/adminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  if (isAdminAuthed()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (loginAdmin(passcode)) {
      const dest = location.state?.from || "/admin/dashboard";
      navigate(dest, { replace: true });
    } else {
      setError("That passcode doesn't match. Try the demo passcode below.");
    }
  }

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center bg-soil-deep bg-village-weave px-6 py-16">
      <Link
        to="/"
        className="absolute left-6 top-6 font-sans text-[11px] uppercase tracking-widest-3 text-husk-dim/60 transition-colors hover:text-turmeric"
      >
        ← Palakollu Trails
      </Link>

      <div className="flex flex-col items-center leading-none">
        <span className="font-display text-[26px] tracking-widest-2 text-husk">PALAKOLLU</span>
        <span className="mt-1 font-sans text-[10px] tracking-widest-2 text-turmeric/90">
          TRAILS · WEST GODAVARI
        </span>
      </div>

      <p className="mt-4 font-sans text-[11px] uppercase tracking-widest-3 text-terracotta">
        Admin
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-sm rounded-sm border border-turmeric/15 bg-soil-2/70 p-8"
      >
        <label htmlFor="passcode" className="font-sans text-[11px] font-semibold uppercase tracking-widest-3 text-husk-dim">
          Passcode
        </label>
        <input
          id="passcode"
          type="password"
          autoFocus
          value={passcode}
          onChange={(e) => {
            setPasscode(e.target.value);
            setError("");
          }}
          placeholder="Enter admin passcode"
          className="mt-3 w-full rounded-sm border border-turmeric/20 bg-soil-deep px-4 py-3 text-[14px] text-husk placeholder:text-husk-dim/50 focus:border-turmeric focus:outline-none"
        />
        {error && <p className="mt-2 text-[12.5px] text-terracotta">{error}</p>}

        <button
          type="submit"
          className="mt-5 w-full rounded-sm bg-terracotta py-3 font-sans text-[13px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-turmeric hover:text-soil-deep"
        >
          Enter Admin
        </button>

        <p className="mt-5 border-t border-dashed border-husk/15 pt-4 text-[12px] leading-relaxed text-husk-dim/70">
          Demo passcode: <span className="text-turmeric-soft">{DEMO_PASSCODE}</span>
          <br />
          This is a frontend-only prototype login — no server, no real accounts. It exists so
          the admin UI can be reviewed before real authentication is built.
        </p>
      </form>
    </section>
  );
}
