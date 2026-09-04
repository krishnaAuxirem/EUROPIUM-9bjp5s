import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, UserRole, RegisteredUser } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  verifyOTP: (otp: string) => Promise<boolean>;
  resendOTP: () => Promise<boolean>;
  pendingVerificationEmail: string | null;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  country?: string;
  profession?: string;
}

// Simple hash for demo (NOT for production)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return "H_" + Math.abs(hash).toString(16);
}

const ADMIN_USER: User = {
  id: "admin_001",
  name: "Admin EUROPIUM",
  email: "admin@europium.eu",
  role: "admin",
  country: "Belgium",
  city: "Brussels",
  profession: "Platform Administrator",
  bio: "EUROPIUM platform administrator with full access to all systems.",
  skills: ["Administration", "Analytics", "Content Management"],
  languages: ["English", "French", "German"],
  preferredCountries: [],
  preferredJobTypes: [],
  savedJobs: [],
  savedProperties: [],
  savedOpportunities: [],
  savedUniversities: [],
  joinedDate: "2022-01-01",
  plan: "premium",
  profileCompleteness: 100,
  isActive: true,
  verified: true,
  emailVerified: true,
};

const DEFAULT_DEMO_USERS: RegisteredUser[] = [
  {
    id: "admin_001",
    name: "Admin EUROPIUM",
    email: "admin@europium.eu",
    passwordHash: simpleHash("Admin@1234"),
    role: "admin",
    createdAt: "2022-01-01",
  },
];

const AuthContext = createContext<AuthContextType | null>(null);

function getUserData(registered: RegisteredUser): User {
  const base: User = {
    id: registered.id,
    name: registered.name,
    email: registered.email,
    role: registered.role,
    savedJobs: [],
    savedProperties: [],
    savedOpportunities: [],
    savedUniversities: [],
    joinedDate: registered.createdAt,
    plan: "free",
    profileCompleteness: 30,
    isActive: true,
    emailVerified: true,
  };
  if (registered.role === "admin") return { ...ADMIN_USER, ...base };
  return base;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);

  // Load registered users from localStorage
  const getRegisteredUsers = (): RegisteredUser[] => {
    try {
      const stored = localStorage.getItem("europium_registered_users");
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_DEMO_USERS;
  };

  const saveRegisteredUsers = (users: RegisteredUser[]) => {
    localStorage.setItem("europium_registered_users", JSON.stringify(users));
  };

  // Initialize registered users if not present
  useEffect(() => {
    const existing = localStorage.getItem("europium_registered_users");
    if (!existing) {
      saveRegisteredUsers(DEFAULT_DEMO_USERS);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("europium_session");
    if (stored) {
      try {
        const sessionData = JSON.parse(stored);
        // Validate session expiry
        if (sessionData.expiresAt && new Date(sessionData.expiresAt) > new Date()) {
          // Re-load latest user data
          const storedUser = localStorage.getItem(`europium_user_${sessionData.userId}`);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } else {
          // Session expired
          localStorage.removeItem("europium_session");
        }
      } catch {}
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 900));

    const registeredUsers = getRegisteredUsers();
    const found = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      setIsLoading(false);
      return { success: false, error: "No account found with this email. Please register first." };
    }

    const hash = simpleHash(password);
    if (found.passwordHash !== hash) {
      setIsLoading(false);
      return { success: false, error: "Incorrect password. Please try again." };
    }

    // Load user profile
    let userData: User;
    const storedUser = localStorage.getItem(`europium_user_${found.id}`);
    if (storedUser) {
      userData = JSON.parse(storedUser);
    } else {
      userData = getUserData(found);
    }

    // Update last active
    userData.lastActive = new Date().toISOString();
    userData.isActive = true;

    setUser(userData);
    localStorage.setItem(`europium_user_${found.id}`, JSON.stringify(userData));

    // Create session (7 days)
    const session = {
      userId: found.id,
      email: found.email,
      role: found.role,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    localStorage.setItem("europium_session", JSON.stringify(session));

    setIsLoading(false);
    return { success: true };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));

    const registeredUsers = getRegisteredUsers();
    const existing = registeredUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      setIsLoading(false);
      return { success: false, error: "An account with this email already exists. Please login." };
    }

    const newRegistered: RegisteredUser = {
      id: `user_${Date.now()}`,
      name: data.name,
      email: data.email,
      passwordHash: simpleHash(data.password),
      role: data.role,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const newUser: User = {
      id: newRegistered.id,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      country: data.country,
      profession: data.profession,
      savedJobs: [],
      savedProperties: [],
      savedOpportunities: [],
      savedUniversities: [],
      jobApplications: [],
      universityApplications: [],
      joinedDate: new Date().toISOString().split("T")[0],
      plan: "free",
      profileCompleteness: 25,
      isActive: true,
      emailVerified: true,
    };

    saveRegisteredUsers([...registeredUsers, newRegistered]);
    localStorage.setItem(`europium_user_${newRegistered.id}`, JSON.stringify(newUser));

    // Set pending verification
    setPendingVerificationEmail(data.email);

    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    if (user) {
      localStorage.setItem(`europium_user_${user.id}`, JSON.stringify({ ...user, isActive: false }));
    }
    setUser(null);
    localStorage.removeItem("europium_session");
    setPendingVerificationEmail(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    // Recalculate profile completeness
    let completeness = 20;
    if (updated.name) completeness += 10;
    if (updated.bio) completeness += 10;
    if (updated.country) completeness += 10;
    if (updated.city) completeness += 5;
    if (updated.phone) completeness += 5;
    if (updated.skills?.length) completeness += 10;
    if (updated.languages?.length) completeness += 5;
    if (updated.experience?.length) completeness += 15;
    if (updated.education?.length) completeness += 10;
    updated.profileCompleteness = Math.min(completeness, 100);

    setUser(updated);
    localStorage.setItem(`europium_user_${user.id}`, JSON.stringify(updated));

    // Update session
    const session = localStorage.getItem("europium_session");
    if (session) {
      const s = JSON.parse(session);
      localStorage.setItem("europium_session", JSON.stringify({ ...s, role: updated.role }));
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    const registeredUsers = getRegisteredUsers();
    const found = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return false;
    // Store reset token
    localStorage.setItem("europium_reset_token", JSON.stringify({
      email,
      token: "RESET_" + Math.random().toString(36).slice(2, 10).toUpperCase(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    }));
    return true;
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    const storedToken = localStorage.getItem("europium_reset_token");
    if (!storedToken) return false;
    const parsed = JSON.parse(storedToken);
    if (parsed.token !== token) return false;
    if (new Date(parsed.expiresAt) < new Date()) return false;

    const registeredUsers = getRegisteredUsers();
    const updated = registeredUsers.map(u =>
      u.email === parsed.email ? { ...u, passwordHash: simpleHash(newPassword) } : u
    );
    saveRegisteredUsers(updated);
    localStorage.removeItem("europium_reset_token");
    return true;
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 600));
    // Demo: any 6-digit OTP works
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      if (pendingVerificationEmail) {
        // Find user and create session
        const registeredUsers = getRegisteredUsers();
        const found = registeredUsers.find(u => u.email === pendingVerificationEmail);
        if (found) {
          const storedUser = localStorage.getItem(`europium_user_${found.id}`);
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            userData.emailVerified = true;
            setUser(userData);
            localStorage.setItem(`europium_user_${found.id}`, JSON.stringify(userData));
            const session = {
              userId: found.id,
              email: found.email,
              role: found.role,
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            };
            localStorage.setItem("europium_session", JSON.stringify(session));
            setPendingVerificationEmail(null);
          }
        }
      }
      return true;
    }
    return false;
  };

  const resendOTP = async (): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 500));
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated: !!user, isLoading,
      login, register, logout, updateUser,
      forgotPassword, resetPassword, verifyOTP, resendOTP,
      pendingVerificationEmail,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
