import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { isAdminAuthed, logoutAdmin } from "../lib/adminAuth";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/packages", label: "Packages" },
  { to: "/admin/places", label: "Places" },
  { to: "/admin/enquiries", label: "Enquiries" },
  { to: "/admin/settings", label: "Settings" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  if (!isAdminAuthed()) {
    return <Navigate to="/admin" replace />;
  }

  function handleLogout() {
    logoutAdmin();
    navigate("/admin", { replace: true });
  }

  return (
    <div className="flex min-h-screen w-full bg-husk text-soil">
      <aside className="hidden w-60 shrink-0 flex-col justify-between bg-soil-deep px-6 py-8 md:flex">
        <div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-widest-2 text-husk">PALAKOLLU</span>
            <span className="mt-1 font-sans text-[9px] tracking-widest-2 text-turmeric/90">
              TRAILS · ADMIN
            </span>
          </div>

          <nav className="mt-10 flex flex-col gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-sm px-3 py-2.5 font-sans text-[13px] uppercase tracking-widest-3 transition-colors ${
                    isActive
                      ? "bg-turmeric/15 text-turmeric-soft"
                      : "text-husk-dim hover:bg-turmeric/5 hover:text-husk"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <NavLink
            to="/"
            className="font-sans text-[11px] uppercase tracking-widest-3 text-husk-dim/60 transition-colors hover:text-turmeric"
          >
            ← View site
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-sm border border-terracotta/50 px-3 py-2 text-left font-sans text-[11.5px] uppercase tracking-widest-3 text-terracotta transition-colors hover:bg-terracotta hover:text-husk"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-soil-deep px-5 py-4 md:hidden">
        <span className="font-display text-[15px] tracking-widest-2 text-husk">PALAKOLLU · ADMIN</span>
        <button
          type="button"
          onClick={handleLogout}
          className="p-2 font-sans text-[11px] uppercase tracking-widest-3 text-terracotta"
        >
          Log out
        </button>
      </div>

      <div className="min-w-0 flex-1 md:pt-0 pt-16">
        <nav className="flex gap-1 overflow-x-auto border-b border-soil/10 bg-soil-2/30 px-4 py-2 md:hidden">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `shrink-0 rounded-sm px-3 py-2 font-sans text-[11px] uppercase tracking-widest-3 ${
                  isActive ? "bg-terracotta text-husk" : "text-soil/60"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="px-6 py-10 md:px-12 md:py-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
