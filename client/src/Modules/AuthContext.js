import React, { createContext, useState, useEffect, useRef } from 'react';
import swal from 'sweetalert';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState();
  const [isAlertShown, setIsAlertShown] = useState(false);
  
  const autoLogoutTime = 20 * 60 * 1000; // 5 minutes in milliseconds
  const timerIdRef = useRef();

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
    setIsAlertShown(false);
    localStorage.clear();
    clearTimeout(timerIdRef.current);
    window.location.reload(); // Reload the page after signing out
  };

  const resetAutoLogoutTimer = () => {
    clearTimeout(timerIdRef.current);
    timerIdRef.current = setTimeout(() => {
      if (!isAlertShown) {
        setIsAlertShown(true);
        swal("Ha sido desconectado de su sesión por inactividad!", {
          icon: "warning",
        }).then(() => {
          handleSignOut();
        });
      }
    }, autoLogoutTime);
  };

  const handleUserActivity = () => {
    resetAutoLogoutTimer();
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserType = localStorage.getItem('userType');

    if (storedIsLoggedIn && storedUserType) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }

    const lastActivityTime = localStorage.getItem('lastActivityTime');
    if (lastActivityTime && isLoggedIn) {
      const currentTime = new Date().getTime();
      const timeSinceLastActivity = currentTime - parseInt(lastActivityTime, 10);
      if (timeSinceLastActivity > autoLogoutTime) {
        handleSignOut();
        if (!isAlertShown) {
          setIsAlertShown(true);
          swal("Ha sido desconectado de su sesión por inactividad!", {
            icon: "warning",
          }).then(() => {
            handleSignOut();
          });
        }
      }
    }

    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
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
