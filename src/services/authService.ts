import axios from 'axios'
import { User } from '../types/auth';

const API_URL = 'http://localhost:3000/api/auth/'


interface LoginCredentials {
    username: string
    password: string
}

interface RegisterData {
    username: string
    email: string
    password: string
    password2: string
    first_name: string
    last_name: string
    telefono?: string
}

interface AuthTokens {
    access: string
    refresh: string
}

class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthTokens> {
        const response = await axios.post(`${API_URL}token/`, credentials);
        if (response.data.access) {
            localStorage.setItem('authTokens', JSON.stringify(response.data));
        }
        return response.data;
    }

    logout(): void {
        localStorage.removeItem('authTokens');
    }

    async register(data: RegisterData): Promise<any> {
        return axios.post(`${API_URL}register/`, data);
    }

    async refreshToken(): Promise<AuthTokens> {
        const tokens = JSON.parse(localStorage.getItem('authTokens') || '{}');
        const response = await axios.post(`${API_URL}token/refresh/`, {
        refresh: tokens.refresh,
        });
        
        if (response.data.access) {
        const newTokens = {
            ...tokens,
            access: response.data.access,
        };
        localStorage.setItem('authTokens', JSON.stringify(newTokens));
        }
        
        return response.data;
    }

    async getCurrentUser(): Promise<User | null> {
        const tokens = JSON.parse(localStorage.getItem('authTokens') || '{}');
        
        if (!tokens.access) {
        return null;
        }
        
        try {
            const response = await axios.get(`${API_URL}user/`, {
                headers: {
                'Authorization': `Bearer ${tokens.access}`
                }
            });
            return response.data;
        } catch (error) {
            // Si hay un error (token expirado), intentamos refrescar el token
            try {
                await this.refreshToken();
                const newTokens = JSON.parse(localStorage.getItem('authTokens') || '{}');
                
                const response = await axios.get(`${API_URL}user/`, {
                headers: {
                    'Authorization': `Bearer ${newTokens.access}`
                }
                });
                return response.data;
            } catch (refreshError) {
                this.logout();
                return null;
            }
        }
    }

    isAuthenticated(): boolean {
        const tokens = JSON.parse(localStorage.getItem('authTokens') || '{}');
        return !!tokens.access;
    }
}

export default new AuthService();
