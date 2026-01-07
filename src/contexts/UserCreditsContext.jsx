import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getUserCredits } from "../services/UserCreditsService";

export const UserCreditsContext = createContext();

export const UserCreditsProvider = ({ children }) => {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(false);

  const { token, isAuthenticated } = useAuth();

  // Function to fetch the user credits
  const fetchUserCredits = useCallback(async () => {
    if (!token) {
      return;
    }

    setLoading(true);

    try {
      const res = await getUserCredits();
      setCredits(res.credits);
    } catch (error) {
      console.log("Error fetching the user Credits", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserCredits();
    }
  }, [fetchUserCredits, isAuthenticated]);

  const updateCredits = useCallback((newCredits) => {
    console.log("Updating the Credits", newCredits);
    setCredits(newCredits);
  }, []);

  const contextValue = {
    credits,
    loading,
    setCredits,
    updateCredits,
    fetchUserCredits,
  };

  return (
    <UserCreditsContext.Provider value={contextValue}>
      {children}
    </UserCreditsContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(UserCreditsContext);

  if (!context) {
    throw new Error("useCredits must be within an UserCreditsProvider");
  }
  return context;
}
