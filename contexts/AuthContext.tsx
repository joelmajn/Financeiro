import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  isPinLocked: boolean;
  login: () => void;
  logout: () => void;
  completeOnboarding: () => void;
  unlockPin: () => void;
  lockPin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isPinLocked, setIsPinLocked] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
    setIsPinLocked(false);
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  const unlockPin = () => {
    setIsPinLocked(false);
  };

  const lockPin = () => {
    setIsPinLocked(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        hasCompletedOnboarding,
        isPinLocked,
        login,
        logout,
        completeOnboarding,
        unlockPin,
        lockPin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
