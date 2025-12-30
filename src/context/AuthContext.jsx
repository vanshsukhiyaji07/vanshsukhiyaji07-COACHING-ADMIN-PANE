import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token
    const storedUser = localStorage.getItem('eduprime_user');
    const token = localStorage.getItem('eduprime_token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // In production, this hits the backend API
    // const res = await api.post('/auth/login', { email, password });
    
    // Mock login for demonstration
    if (email === 'admin@eduprime.com' && password === 'admin123') {
      const mockUser = { id: '1', name: 'Super Admin', email, role: 'admin' };
      const mockToken = 'abc-123-jwt-mock';
      
      localStorage.setItem('eduprime_user', JSON.stringify(mockUser));
      localStorage.setItem('eduprime_token', mockToken);
      setUser(mockUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('eduprime_user');
    localStorage.removeItem('eduprime_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);