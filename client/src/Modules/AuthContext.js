import React, { createContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState();
  const [isAlertShown, setIsAlertShown] = useState(false); // New state variable

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserType = localStorage.getItem('userType');

    if (storedIsLoggedIn && storedUserType) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      if (isLoggedIn) {
        const lastActivityTime = new Date().getTime();
        localStorage.setItem('lastActivityTime', lastActivityTime);
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [isLoggedIn]);

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
    setIsAlertShown(false); // Reset the alert flag when the user logs out
    localStorage.clear();
    clearTimeout(timerIdRef.current); // Clear the auto-logout timer when the user logs out
    window.location.reload();
  };

  // Auto-logout timer
  const autoLogoutTime = 10 * 60 * 1000; // 10 seconds for testing (change to 5 minutes in production)
  const timerIdRef = useRef();

  const resetAutoLogoutTimer = () => {
    clearTimeout(timerIdRef.current);
    timerIdRef.current = setTimeout(() => {
      handleSignOut();
      if (!isAlertShown) {
        setIsAlertShown(true);
        alert('You have been logged out due to inactivity.');
      }
    }, autoLogoutTime);
  };

  const handleUserActivity = () => {
    resetAutoLogoutTimer();
  };

  useEffect(() => {
    const lastActivityTime = localStorage.getItem('lastActivityTime');
    if (lastActivityTime && isLoggedIn) {
      const currentTime = new Date().getTime();
      const timeSinceLastActivity = currentTime - parseInt(lastActivityTime, 10);
      if (timeSinceLastActivity > autoLogoutTime) {
        handleSignOut();
        if (!isAlertShown) {
          setIsAlertShown(true);
          alert('You have been logged out due to inactivity.');
        }
      }
    }

    // Set up event listeners for user activity
    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
      // Clean up event listeners when the component unmounts
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      clearTimeout(timerIdRef.current);
    };
  }, [isLoggedIn, isAlertShown]); 

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
