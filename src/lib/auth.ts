import type { User } from "@/types";

const STORAGE_KEY = "quicknet_user";
const USERS_KEY = "quicknet_users";

const DEFAULT_ADMIN: User = {
  id: "admin-001",
  name: "Admin User",
  email: "admin@quicknet.com",
  role: "admin",
  plan: "enterprise",
  storageUsed: 1024,
  storageLimit: 102400,
  joinedAt: "2024-01-01",
};

const DEFAULT_USER: User = {
  id: "user-001",
  name: "Demo User",
  email: "user@quicknet.com",
  role: "user",
  plan: "pro",
  storageUsed: 512,
  storageLimit: 10240,
  joinedAt: "2024-02-15",
};

const DEFAULT_BUSINESS: User = {
  id: "biz-001",
  name: "Business Demo",
  email: "business@quicknet.com",
  role: "business",
  plan: "enterprise",
  storageUsed: 2048,
  storageLimit: 51200,
  joinedAt: "2024-01-20",
};

const DEFAULT_USERS: User[] = [DEFAULT_ADMIN, DEFAULT_USER, DEFAULT_BUSINESS];

function initUsers(): void {
  const existing = localStorage.getItem(USERS_KEY);
  if (!existing) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
  }
}

function getUsers(): User[] {
  initUsers();
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : DEFAULT_USERS;
}

function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const normalizedEmail = email.toLowerCase().trim();

  // Demo credentials shortcuts
  if (normalizedEmail === "user@quicknet.com" && password === "123456") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USER));
    return { success: true, user: DEFAULT_USER };
  }
  if (normalizedEmail === "admin@quicknet.com" && password === "password123") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ADMIN));
    return { success: true, user: DEFAULT_ADMIN };
  }
  if (normalizedEmail === "business@quicknet.com" && password === "123456") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BUSINESS));
    return { success: true, user: DEFAULT_BUSINESS };
  }

  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!user) return { success: false, error: "No account found with this email." };

  // Mock password check
  const storedPw = localStorage.getItem(`quicknet_pw_${normalizedEmail}`);
  if (storedPw !== password) {
    return { success: false, error: "Incorrect password." };
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function register(name: string, email: string, password: string): { success: boolean; error?: string } {
  const users = getUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) return { success: false, error: "An account with this email already exists." };

  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    role: "user",
    plan: "free",
    storageUsed: 0,
    storageLimit: 1024,
    joinedAt: new Date().toISOString().split("T")[0],
  };

  users.push(newUser);
  saveUsers(users);
  localStorage.setItem(`quicknet_pw_${email}`, password);

  return { success: true };
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function getAllUsers(): User[] {
  return getUsers();
}

export function deleteUser(id: string): void {
  const users = getUsers().filter((u) => u.id !== id);
  saveUsers(users);
}

export function updateUser(updated: User): void {
  const users = getUsers().map((u) => (u.id === updated.id ? updated : u));
  saveUsers(users);
  const current = getCurrentUser();
  if (current?.id === updated.id) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}
