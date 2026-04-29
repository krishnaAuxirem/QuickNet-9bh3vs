import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, LogOut, User, LayoutDashboard, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants";
import logoImg from "@/assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname.includes("dashboard");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const getDashboardPath = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/admin";
    if (user.role === "business") return "/business";
    return "/dashboard";
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setUserMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isDashboard
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-mint flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5 text-navy" />
            </div>
            <span className="font-display font-700 text-xl">
              <span className="text-gray-700">Quick</span><span className="text-mint font-extrabold">Net</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => handleNavClick()}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-navy text-white"
                      : "text-gray-700 hover:text-navy hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy text-white hover:bg-navy/90 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-mint/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-mint" />
                  </div>
                  <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <div className="p-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-navy">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        to={getDashboardPath()}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-navy font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-navy hover:bg-navy-light text-white font-medium px-6 rounded-xl">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-navy hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => handleNavClick()}
                  className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                {user ? (
                  <>
                    <Link
                      to={getDashboardPath()}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 bg-navy text-white rounded-xl font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-navy text-navy">Sign In</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-navy text-white">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
