const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type UserRole = 'patient' | 'family' | 'professional' | 'admin';

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  expectedDueDate?: string;
  specialization?: string;
  relationToPatient?: string;
}

export interface RegisterResponse {
  message: string;
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  userId: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface BackendUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  verified: boolean;
  suspended?: boolean;
  phone?: string;
  expectedDueDate?: string;
  specialization?: string;
  relationToPatient?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: BackendUser;
}

export interface ProfileResponse {
  user: BackendUser;
}

class ApiService {
  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || data.message || `HTTP error! status: ${response.status}`,
        };
      }

      return { data };
    } catch (error) {
      return {
        error: 'Erreur de communication avec le serveur',
      };
    }
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(userData),
      });

      return this.handleResponse<RegisterResponse>(response);
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async verifyOtp(email: string, otp: string): Promise<ApiResponse<VerifyOtpResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, otp }),
      });

      return this.handleResponse<VerifyOtpResponse>(response);
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

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          error: data.error || data.message || `HTTP error! status: ${response.status}`,
        };
      }

      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      return { data };
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getHeaders(true),
      });

      localStorage.removeItem('authToken');

      return this.handleResponse<void>(response);
    } catch (error) {
      localStorage.removeItem('authToken');
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async validateSession(): Promise<ApiResponse<{ valid: boolean }>> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return { data: { valid: false } };
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: this.getHeaders(true),
      });

      if (!response.ok) {
        localStorage.removeItem('authToken');
        return { data: { valid: false } };
      }

      return { data: { valid: true } };
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async getCurrentUser(): Promise<ApiResponse<BackendUser>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: this.getHeaders(true),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          error: data.error || data.message || `HTTP error! status: ${response.status}`,
        };
      }

      return { data: data.user };
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async updateProfile(updates: { firstName?: string; lastName?: string; phone?: string }): Promise<ApiResponse<BackendUser>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: this.getHeaders(true),
        body: JSON.stringify(updates),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          error: data.error || data.message || `HTTP error! status: ${response.status}`,
        };
      }

      return { data: data.user };
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
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

  async resetPassword(email: string, otp: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, otp, newPassword }),
      });

      return this.handleResponse<{ message: string }>(response);
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }
}

export const apiService = new ApiService();
