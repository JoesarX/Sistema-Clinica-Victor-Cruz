import React, { createContext, useState, useEffect } from 'react';

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
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserType('normal');
    localStorage.clear();
  };

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
