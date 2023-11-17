import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleAuth = () => {
    if (isAuthenticated) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', 'dummy_token');
    }
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const LoggedIn = () => <div>Hello, user!</div>;
const LoggedOut = () => <div>Please, login!</div>;

const App = () => {
  const { isAuthenticated, toggleAuth } = useContext(AuthContext);

  return (
    <div>
      <button className="button" onClick={toggleAuth}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
      {isAuthenticated ? <LoggedIn /> : <LoggedOut />}
    </div>
  );
};

const Root = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default Root;
