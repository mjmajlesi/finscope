import { useState } from "react";
import { Link } from "react-router";
import { Activity, LayoutDashboard, BarChart3, ArrowRightLeft, Star, LogIn, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const [MenuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navs = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Markets", href: "/markets", icon: BarChart3 },
    { name: "Converter", href: "/converter", icon: ArrowRightLeft },
    ...(user ? [{ name: "Watchlist", href: "/watchlist", icon: Star }] : []),
  ];

  return (
    <div className="w-full py-4 rounded-3xl mt-4 bg-bg-card px-6 md:px-8">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Activity className="w-7 h-7 text-brand" />
          <span className="text-xl font-bold text-text-primary">FinScope</span>
        </Link>

        <div className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navs.map((nav) => (
              <li key={nav.name}>
                <Link
                  to={nav.href}
                  className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
                >
                  <nav.icon className="w-4 h-4" />
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-text-muted">{user}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-status-down transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-brand hover:opacity-80 transition-opacity"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}

          <button
            className="md:hidden text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            onClick={() => setMenuOpen(!MenuOpen)}
          >
            {MenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {MenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-bg-card-hover">
          <ul className="flex flex-col gap-3 mb-4">
            {navs.map((nav) => (
              <li key={nav.name}>
                <Link
                  to={nav.href}
                  className="flex items-center gap-3 text-sm font-medium text-text-muted hover:text-text-primary transition-colors py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <nav.icon className="w-5 h-5" />
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>

          {user ? (
            <div className="flex items-center justify-between py-2 border-t border-bg-card-hover">
              <span className="text-sm text-text-muted">{user}</span>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="flex items-center gap-2 text-sm font-medium text-status-down hover:opacity-80 transition-opacity cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-3 text-sm font-medium text-brand py-2"
              onClick={() => setMenuOpen(false)}
            >
              <LogIn className="w-5 h-5" />
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
