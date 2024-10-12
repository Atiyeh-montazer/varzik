"use client"

import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for initial fetch

  // On mount, check if user info exists in localStorage and set it to context
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUser(JSON.parse(storedUserInfo));
    }
    setLoading(false); // Loading complete
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null); // Clear the context
    localStorage.removeItem('userInfo'); // Clear user data in localStorage
    localStorage.removeItem('jwtToken'); // Clear token
    localStorage.removeItem('userWorkoutInfo'); // Clear workout info
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking user info
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
