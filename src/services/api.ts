const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'PATIENT' | 'FAMILY' | 'PROFESSIONAL' | 'ADMIN';
  expectedDueDate?: string;
  specialization?: string;
  relationToPatient?: string;
}

export interface OtpVerificationRequest {
  email: string;
  otpCode: string;
}

export interface AuthResponse {
  token: string | null;
  type: string;
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    emailVerified: boolean;
    phone?: string;
    expectedDueDate?: string;
    specialization?: string;
    relationToPatient?: string;
  };
  sessionId: string | null;
}

class ApiService {
  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = localStorage.getItem('authToken');
      const sessionId = localStorage.getItem('sessionId');
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      if (sessionId) {
        headers['Session-Id'] = sessionId;
      }
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      const data = await response.json();
      
      if (!response.ok) {
        return {
          error: data.message || `HTTP error! status: ${response.status}`,
        };
      }

      return { data };
    } catch (error) {
      return {
        error: 'Erreur de communication avec le serveur',
      };
    }
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(userData),
      });

      return this.handleResponse<AuthResponse>(response);
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async verifyEmail(email: string, otpCode: string): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, otpCode }),
      });

      return this.handleResponse<AuthResponse>(response);
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async resendOtp(email: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email }),
      });

      return this.handleResponse<{ message: string }>(response);
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(credentials),
      });

      const result = await this.handleResponse<AuthResponse>(response);
      
      if (result.data?.token) {
        localStorage.setItem('authToken', result.data.token);
        if (result.data.sessionId) {
          localStorage.setItem('sessionId', result.data.sessionId);
        }
      }

      return result;
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async logout(): Promise<ApiResponse<void>> {
    try {
      const sessionId = localStorage.getItem('sessionId');
      const url = sessionId 
        ? `${API_BASE_URL}/auth/logout?sessionId=${sessionId}`
        : `${API_BASE_URL}/auth/logout`;

      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(true),
      });

      localStorage.removeItem('authToken');
      localStorage.removeItem('sessionId');

      return this.handleResponse<void>(response);
    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('sessionId');
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async validateSession(): Promise<ApiResponse<{ valid: boolean }>> {
    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        return { data: { valid: false } };
      }

      const response = await fetch(`${API_BASE_URL}/auth/session/validate?sessionId=${sessionId}`, {
        method: 'GET',
        headers: this.getHeaders(true),
      });

      return this.handleResponse<{ valid: boolean }>(response);
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async getCurrentUser(): Promise<ApiResponse<AuthResponse['user']>> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'GET',
        headers: this.getHeaders(true),
      });

      return this.handleResponse<AuthResponse['user']>(response);
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async updateUser(userId: number, userData: Partial<RegisterRequest>): Promise<ApiResponse<AuthResponse['user']>> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: this.getHeaders(true),
        body: JSON.stringify(userData),
      });

      return this.handleResponse<AuthResponse['user']>(response);
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }
}

export const apiService = new ApiService();