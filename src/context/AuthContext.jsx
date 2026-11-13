
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load administrator profile from Supabase
  const loadProfile = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Profile loading error:", error.message);
      setProfile(null);
      return;
    }

    setProfile(data);
  };

  // Monitor authentication changes
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error.message);
      }

      if (!mounted) return;

      const currentUser = data?.session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await loadProfile(currentUser.id);
      }

      if (mounted) setLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        const currentUser = session?.user ?? null;

        setUser(currentUser);

        if (currentUser) {
          await loadProfile(currentUser.id);
        } else {
          setProfile(null);
        }

        if (mounted) setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Sign in
  const signIn = async (email, password) => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) throw error;

    return data;
  };

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  };

  // Password reset
  const resetPassword = async (email) => {
    const { error } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

    if (error) throw error;
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signOut,
    resetPassword,
    isAdmin: profile?.role === "super_admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom authentication hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
