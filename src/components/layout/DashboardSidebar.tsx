import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LucideIcon, LogOut, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string | number;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  theme?: "light" | "dark";
}

export default function DashboardSidebar({ items, theme = "light" }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isDark = theme === "dark";

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "h-screen sticky top-0 flex flex-col border-r overflow-hidden flex-shrink-0",
        isDark
          ? "bg-charcoal border-white/10"
          : "bg-white border-gray-200"
      )}
    >
      {/* Logo */}
      <div className={cn("p-4 flex items-center gap-3 border-b", isDark ? "border-white/10" : "border-gray-200")}>
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm", isDark ? "bg-mint" : "bg-mint")}>
          <Zap className="w-5 h-5 text-navy" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn("font-display font-bold text-lg", isDark ? "text-white" : "text-navy")}
          >
            Quick<span className="text-mint">Net</span>
          </motion.span>
        )}
      </div>

      {/* User Info */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn("px-4 py-4 border-b", isDark ? "border-white/10" : "border-gray-200")}
        >
          <div className={cn("flex items-center gap-3 p-3 rounded-xl", isDark ? "bg-white/5" : "bg-gray-50")}>
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0",
              isDark ? "bg-mint/20 text-mint" : "bg-navy text-white"
            )}>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className={cn("text-sm font-semibold truncate", isDark ? "text-white" : "text-navy")}>{user?.name}</p>
              <p className={cn("text-xs truncate", isDark ? "text-white/40" : "text-gray-500")}>{user?.email}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.href ||
            (item.href !== "/dashboard" && item.href !== "/business" && item.href !== "/admin" && location.pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                isActive
                  ? isDark
                    ? "bg-mint/20 text-mint"
                    : "bg-navy text-white"
                  : isDark
                  ? "text-white/60 hover:bg-white/10 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-navy"
              )}
            >
              <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && isDark ? "text-mint" : "")} />
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between flex-1 min-w-0"
                >
                  <span className="text-sm font-medium truncate">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-semibold",
                      isDark ? "bg-mint/20 text-mint" : "bg-navy/10 text-navy"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle & Logout */}
      <div className={cn("p-3 border-t space-y-1", isDark ? "border-white/10" : "border-gray-200")}>
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
            isDark ? "text-red-400 hover:bg-red-500/10" : "text-red-600 hover:bg-red-50"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs transition-all",
            isDark ? "text-white/30 hover:bg-white/5" : "text-gray-400 hover:bg-gray-100"
          )}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>}
        </button>
      </div>
    </motion.aside>
  );
}
