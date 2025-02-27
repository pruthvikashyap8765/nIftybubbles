import React, { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userId: number | null;
  login: (token: { access_token: string; user_id: number }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const storedUserId = sessionStorage.getItem('user_id');
    const loginTime = sessionStorage.getItem('login_time'); // Store login time

    if (token && storedUserId && loginTime) {
      const timeElapsed = Date.now() - Number(loginTime);
      const expiryTime = 30 * 60 * 1000; // 30 minutes in milliseconds

      if (timeElapsed >= expiryTime) {
        logout(); // If already expired, log out
      } else {
        setIsLoggedIn(true);
        setUserId(Number(storedUserId));

        // Set timeout for automatic logout
        const timeout = setTimeout(() => logout(), expiryTime - timeElapsed);
        return () => clearTimeout(timeout); // Clear timeout on component unmount
      }
    }
  }, []);

  const login = (token: { access_token: string; user_id: number }) => {
    if (token && token.access_token && token.user_id !== undefined) {
      const loginTimestamp = Date.now();
      sessionStorage.setItem('token', token.access_token);
      sessionStorage.setItem('user_id', token.user_id.toString());
      sessionStorage.setItem('login_time', loginTimestamp.toString()); // Store login time
      setIsLoggedIn(true);
      setUserId(token.user_id);

      // Auto logout after 30 min
      setTimeout(() => logout(), 30 * 60 * 1000);
    } else {
      console.error("Invalid token data");
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('login_time');
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
