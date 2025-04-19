"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth-client";
import type { UserPayloadData } from "@/lib/auth";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  permissions: string[];
};

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  hasPermission: () => false,
  hasAnyPermission: () => false,
  refresh: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserPayloadData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const userData = await getCurrentUser();
      if (userData) {
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          permissions: userData.permissions || [],
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Check if user has a specific permission
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  // Check if user has any of the provided permissions
  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!user) return false;
    return permissions.some(permission => user.permissions.includes(permission));
  };

  const refresh = async () => {
    await fetchUser();
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      hasPermission,
      hasAnyPermission,
      refresh
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);