import React, { createContext, useState, useContext, useEffect } from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * Top-level provider for authentication state.
   */
  const [user, setUser] = useState(AuthService.getUser());

  // On user change, store in localStorage to persist session
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Keep user state in sync with AuthService
  useEffect(() => {
    const listener = (u) => setUser(u);
    AuthService.subscribe(listener);
    return () => AuthService.unsubscribe(listener);
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /**
   * Hook to access authentication state.
   */
  return useContext(AuthContext);
}
