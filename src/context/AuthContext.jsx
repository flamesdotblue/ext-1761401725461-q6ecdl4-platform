import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiLogin, apiRegister } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('auth_token');
    const u = localStorage.getItem('auth_user');
    if (t && u) {
      setToken(t);
      try { setUser(JSON.parse(u)); } catch {}
    }
  }, []);

  const login = async (email, password) => {
    const res = await apiLogin(email, password);
    localStorage.setItem('auth_token', res.token);
    localStorage.setItem('auth_user', JSON.stringify(res.user));
    setToken(res.token);
    setUser(res.user);
  };

  const register = async (name, email, password) => {
    const res = await apiRegister(name, email, password);
    localStorage.setItem('auth_token', res.token);
    localStorage.setItem('auth_user', JSON.stringify(res.user));
    setToken(res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, token, login, register, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
