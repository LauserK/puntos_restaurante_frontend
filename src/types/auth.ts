export interface User {
  id: string
  username: string
  email: string
  first_name: string
  last_name?: string
  telefono?: string
  puntos:number
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
