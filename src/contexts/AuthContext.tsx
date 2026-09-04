import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USER: User = {
  id: "u1",
  name: "Alex Müller",
  email: "alex@example.com",
  country: "Germany",
  city: "Berlin",
  profession: "Software Engineer",
  bio: "Experienced software engineer looking to grow my career across Europe.",
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
  languages: ["English", "German"],
  preferredCountries: ["Germany", "Netherlands", "Sweden"],
  preferredJobTypes: ["full-time", "remote"],
  salaryExpectation: "€80,000 – €110,000",
  experience: [
    {
      id: "e1",
      title: "Senior Frontend Developer",
      company: "Deutsche Telekom",
      location: "Berlin, Germany",
      startDate: "2023-03",
      endDate: "",
      current: true,
      description: "Building scalable React applications for millions of users across Europe."
    }
  ],
  education: [
    {
      id: "ed1",
      degree: "BSc Computer Science",
      institution: "Technical University of Munich",
      field: "Computer Science",
      startYear: "2018",
      endYear: "2022",
      grade: "3.8 GPA"
    }
  ],
  savedJobs: ["j1", "j3"],
  savedProperties: ["p1"],
  savedOpportunities: ["o2"],
  savedUniversities: [],
  jobApplications: [],
  universityApplications: [],
  joinedDate: "2026-01-15",
  plan: "premium",
  profileCompleteness: 75,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("europium_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (email && password.length >= 6) {
      const u = { ...DEMO_USER, email, name: email.split("@")[0].replace(/\./g, " ").replace(/^\w/, c => c.toUpperCase()) };
      setUser(u);
      localStorage.setItem("europium_user", JSON.stringify(u));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const u: User = {
      ...DEMO_USER,
      id: Date.now().toString(),
      name, email,
      savedJobs: [], savedProperties: [], savedOpportunities: [], savedUniversities: [],
      joinedDate: new Date().toISOString().split("T")[0],
      plan: "free",
    };
    setUser(u);
    localStorage.setItem("europium_user", JSON.stringify(u));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("europium_user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("europium_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
