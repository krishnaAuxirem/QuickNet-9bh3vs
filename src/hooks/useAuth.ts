import { useState, useEffect, useCallback } from "react";
import { getCurrentUser, login, logout, register } from "@/lib/auth";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
    setLoading(false);
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }, []);

  const handleRegister = useCallback(
    async (name: string, email: string, password: string) => {
      const result = register(name, email, password);
      return result;
    },
    []
  );

  const handleLogout = useCallback(() => {
    logout();
    setUser(null);
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}
