import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, LoginCredentials } from '../types/auth';
import authService from '../services/authService.ts';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Verificar si hay un usuario al cargar la aplicación
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const user = await authService.getCurrentUser();
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
      } finally {
        setLoading(false);
      }
    };
    
    verifyAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      await authService.login(credentials);
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const checkAuth = async (): Promise<boolean> => {
    if (!authService.isAuthenticated()) {
      setCurrentUser(null);
      return false;
    }
    
    try {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
      return !!user;
    } catch (error) {
      setCurrentUser(null);
      return false;
    }
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};