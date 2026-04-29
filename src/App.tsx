import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { getCurrentUser } from "@/lib/auth";

const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const UserDashboard = lazy(() => import("@/pages/UserDashboard"));
const BusinessDashboard = lazy(() => import("@/pages/BusinessDashboard"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const TransferPage = lazy(() => import("@/pages/TransferPage"));
const FeaturesPage = lazy(() => import("@/pages/FeaturesPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 border-4 border-navy/10 border-t-navy rounded-full animate-spin" />
        <p className="text-navy/50 text-sm font-medium font-display">Loading QuickNet...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "business") return <Navigate to="/business" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser();
  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "business") return <Navigate to="/business" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          style: { fontFamily: "Inter, sans-serif", borderRadius: "12px" },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

          {/* User Dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute roles={["user"]}><UserDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/:tab" element={<ProtectedRoute roles={["user"]}><UserDashboard /></ProtectedRoute>} />

          {/* Business Dashboard */}
          <Route path="/business" element={<ProtectedRoute roles={["business"]}><BusinessDashboard /></ProtectedRoute>} />
          <Route path="/business/:tab" element={<ProtectedRoute roles={["business"]}><BusinessDashboard /></ProtectedRoute>} />

          {/* Admin Dashboard */}
          <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/:tab" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />

          {/* Transfer page — accessible to all logged-in users */}
          <Route
            path="/transfer/:id"
            element={
              <ProtectedRoute roles={["user", "business", "admin"]}>
                <TransferPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
