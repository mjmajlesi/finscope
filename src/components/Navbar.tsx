import { useState } from "react";
import { Link } from "react-router";
import { Activity, LayoutDashboard, BarChart3, ArrowRightLeft, Star, Menu, X } from "lucide-react";

export default function Navbar() {
  const [MenuOpen, setMenuOpen] = useState(false);

  const navs = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Markets", href: "/markets", icon: BarChart3 },
    { name: "Converter", href: "/converter", icon: ArrowRightLeft },
    { name: "Watchlist", href: "/watchlist", icon: Star },
  ];

  return (
    <div className="w-full py-4 rounded-3xl mt-4 bg-[var(--color-bg-card)] px-6 md:px-8">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Activity className="w-7 h-7 text-[var(--color-brand)]" />
          <span className="text-xl font-bold text-[var(--color-text-primary)]">FinScope</span>
        </Link>

        <div className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navs.map((nav) => (
              <li key={nav.name}>
                <Link
                  to={nav.href}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <nav.icon className="w-4 h-4" />
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="md:hidden text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          onClick={() => setMenuOpen(!MenuOpen)}
        >
          {MenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {MenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col gap-3">
            {navs.map((nav) => (
              <li key={nav.name}>
                <Link
                  to={nav.href}
                  className="flex items-center gap-3 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <nav.icon className="w-5 h-5" />
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}