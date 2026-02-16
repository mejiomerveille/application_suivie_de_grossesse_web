const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://service-authentification-intimia.onrender.com/api';


export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'PATIENT' | 'FAMILY' | 'PROFESSIONAL' | 'ADMIN' | 'C';
  expectedDueDate?: string;
  specialization?: string;
  relationToPatient?: string;
}

export interface OtpVerificationRequest {
  email: string;
  otpCode: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'patient' | 'family' | 'professional' | 'admin';
    verified: boolean;
    phone?: string;
    createdAt: string;
  };
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
      console.log(userData)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.message || `HTTP error! status: ${response.status}`,
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  async verifyEmail(email: string, otp: string): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.message || `HTTP error! status: ${response.status}`,
        };
      }

      const data = await response.json();
      
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.message || `HTTP error! status: ${response.status}`,
        };
      }

      const data = await response.json();
      
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

      const response = await fetch(`${API_BASE_URL}/auth/validate`, {
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