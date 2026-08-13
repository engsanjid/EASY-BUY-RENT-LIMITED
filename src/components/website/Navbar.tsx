"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  Menu,
  X,
  Phone,
  LogIn,
  LayoutDashboard,
  User as UserIcon,
  LogOut,
  ChevronDown,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Vehicles", href: "/vehicles" },
  { name: "Cars", href: "/cars" },
  { name: "Bikes", href: "/bikes" },
  { name: "Contact", href: "/contact" },
];

type UserData = {
  name: string;
  phone: string;
  role: "admin" | "customer";
  profileImage?: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check stored user on route change
  useEffect(() => {
    const storedUser = localStorage.getItem("ebr_user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("ebr_user");
      }
    } else {
      setUser(null);
    }
    setDropdownOpen(false);
  }, [pathname]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ebr_user");
    setUser(null);
    setDropdownOpen(false);
    router.push("/");
  };

  const dashboardLink =
    user?.role === "admin" ? "/dashboard" : "/customer/dashboard";

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-slate-950/95 backdrop-blur-xl shadow-xl border-b border-slate-800"
          : "bg-slate-950"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
              <span className="text-black font-black text-xl">EBR</span>
            </div>

            <div className="hidden sm:block">
              <h1 className="text-white text-lg font-bold tracking-wide">
                EASY BUY & RENT
              </h1>
              <p className="text-yellow-500 text-xs uppercase tracking-[4px]">
                LIMITED
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    "relative py-7 text-sm font-medium transition-colors",
                    active
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  )}
                >
                  {item.name}
                  {active && (
                    <span className="absolute left-0 right-0 bottom-3 h-0.5 bg-yellow-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              /* User Dropdown Section */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/80 pl-2 pr-4 py-1.5 text-white hover:bg-slate-800 transition focus:outline-none"
                >
                  {/* Profile Image or Default Avatar */}
                  <div className="h-8 w-8 overflow-hidden rounded-full border border-yellow-500/50 bg-slate-800 flex items-center justify-center">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <UserIcon size={16} className="text-yellow-400" />
                    )}
                  </div>

                  <span className="font-medium text-sm">
                    {user.name || "My Account"}
                  </span>
                  <ChevronDown
                    size={15}
                    className={clsx(
                      "transition-transform duration-200 text-gray-400",
                      dropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown Menu Popup */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 backdrop-blur-xl">
                    <div className="px-4 py-2.5 border-b border-slate-800 flex items-center gap-3">
                      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-yellow-500/50 bg-slate-800 flex items-center justify-center">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <UserIcon size={18} className="text-yellow-400" />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                          Signed in as
                        </p>
                        <p className="text-sm font-bold text-white truncate">
                          {user.name}
                        </p>
                      </div>
                    </div>

                    <div className="p-1 space-y-1">
                      <Link
                        href={dashboardLink}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-200 hover:bg-slate-800 hover:text-yellow-400 transition"
                      >
                        <LayoutDashboard size={16} />
                        <span>
                          {user.role === "admin"
                            ? "Admin Dashboard"
                            : "Dashboard"}
                        </span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Guest User: Show Login Button */
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-full border border-slate-600 px-5 py-2.5 text-white hover:bg-slate-800 transition"
              >
                <LogIn size={17} />
                <span className="text-sm font-medium">Login</span>
              </Link>
            )}

            <a
              href="tel:+441516397799"
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-full px-6 py-3 transition"
            >
              <Phone size={17} />
              <span>+44 151 639 7799</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800">
          <div className="px-5 py-6 space-y-2">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    "block rounded-xl px-4 py-3 text-base transition",
                    active
                      ? "bg-yellow-500 text-black font-semibold"
                      : "text-gray-300 hover:bg-slate-800 hover:text-yellow-400"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Mobile Auth Items */}
            {user ? (
              <div className="border-t border-slate-800 pt-3 mt-3 space-y-2">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-yellow-500 bg-slate-800 flex items-center justify-center">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserIcon size={20} className="text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{user.name}</p>
                    <p className="text-xs text-gray-400 uppercase">
                      {user.role}
                    </p>
                  </div>
                </div>

                <Link
                  href={dashboardLink}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl bg-slate-800 px-4 py-3 text-white font-medium"
                >
                  <LayoutDashboard size={18} className="text-yellow-400" />
                  <span>
                    {user.role === "admin"
                      ? "Admin Dashboard"
                      : "Dashboard"}
                  </span>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 rounded-xl bg-red-500/10 px-4 py-3 text-red-400 font-medium"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl bg-slate-800 px-4 py-3 text-white font-medium mt-2"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Phone Link */}
            <a
              href="tel:+441516397799"
              className="flex items-center justify-center gap-2 bg-yellow-500 text-black rounded-full px-5 py-3 mt-4 font-medium"
            >
              <Phone size={18} />
              <span>+44 151 639 7799</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}