import React, { createContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState();
  const [nombreUser, setNombreUser] = useState();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserType = localStorage.getItem('userType');

    if (storedIsLoggedIn && storedUserType) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }
  }, []);

  const handleSignIn = (userType) => {
    setIsLoggedIn(true);
    setUserType(userType);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userType', userType);
    resetAutoLogoutTimer();
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserType('normal');
    localStorage.clear();
    window.location.reload()
  };

  // Auto-logout timer
  const autoLogoutTime = 1 * 10 * 1000; // 5 minutes in milliseconds
  const timerIdRef = useRef();

  const resetAutoLogoutTimer = () => {
    clearTimeout(timerIdRef.current);
    timerIdRef.current = setTimeout(() => {
      handleSignOut();
      alert('You have been logged out due to inactivity.');
    }, autoLogoutTime);
  };

  const handleUserActivity = () => {
    resetAutoLogoutTimer();
  };

  useEffect(() => {
    // Set up event listeners for user activity
    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
      // Clean up event listeners when the component unmounts
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      clearTimeout(timerIdRef.current);
    };
  }, []);

  const contextValue = {
    isLoggedIn,
    userType,
    handleSignIn,
    handleSignOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
