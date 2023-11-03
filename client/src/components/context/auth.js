import React, { createContext, useContext, useEffect, useState } from 'react';

// creating the context for user details 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  });

  // trying to retrieve the user and token from local storage
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const newData = JSON.parse(storedAuth);
      setAuth({...auth,
        user:newData.user,
        token:newData.token});
    }
  }, []);

  // storing user and token in local storage whenever they change
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
