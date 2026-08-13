import { useState, useEffect } from 'react';
import { apiService, type BackendUser, type UserRole } from '../services/api';
import type { User } from '../types';

interface PendingUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingUserData, setPendingUserData] = useState<PendingUserData | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');

      if (token) {
        try {
          const sessionResponse = await apiService.validateSession();
          if (sessionResponse.data?.valid) {
            const userResponse = await apiService.getCurrentUser();
            if (userResponse.data) {
              setUser(mapBackendUserToFrontend(userResponse.data));
            }
          } else {
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('Erreur de validation de session:', error);
          localStorage.removeItem('authToken');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const mapBackendUserToFrontend = (backendUser: BackendUser): User => {
    return {
      id: backendUser.userId,
      email: backendUser.email,
      firstName: backendUser.firstName,
      lastName: backendUser.lastName,
      phone: backendUser.phone,
      role: backendUser.role as User['role'],
      doctorSpecialty: backendUser.specialization,
      relationToPregnantWoman: backendUser.relationToPatient,
      dueDate: backendUser.expectedDueDate,
      isPremium: false,
      createdAt: backendUser.createdAt,
    };
  };

  const storePendingUserData = (userData: PendingUserData) => {
    setPendingUserData(userData);
    setPendingEmail(userData.email);
  };

  const completePendingRegistration = async (
    role: User['role'],
    additionalInfo?: { doctorSpecialty?: string; relationToPregnantWoman?: string; expectedDueDate?: string }
  ) => {
    if (!pendingUserData) {
      throw new Error('Aucune donnée d\'inscription en attente');
    }

    const registerData = {
      email: pendingUserData.email,
      password: pendingUserData.password,
      firstName: pendingUserData.firstName,
      lastName: pendingUserData.lastName,
      phone: pendingUserData.phone,
      role: role as UserRole,
      specialization: additionalInfo?.doctorSpecialty,
      relationToPatient: additionalInfo?.relationToPregnantWoman,
      expectedDueDate: additionalInfo?.expectedDueDate,
    };

    const response = await apiService.register(registerData);

    if (response.error) {
      throw new Error(response.error);
    }

    return response.data;
  };

  const login = async (usernameOrEmail: string, password: string) => {
    const response = await apiService.login({ email: usernameOrEmail, password });

    if (response.error) {
      throw new Error(response.error);
    }

    if (response.data?.user) {
      const frontendUser = mapBackendUserToFrontend(response.data.user);
      setUser(frontendUser);
      setIsLoading(false);
      return frontendUser;
    }

    throw new Error('Erreur lors de la connexion');
  };

  const verifyEmail = async (email: string, otpCode: string) => {
    const response = await apiService.verifyOtp(email, otpCode);

    if (response.error) {
      throw new Error(response.error);
    }

    setPendingEmail(null);
    return response.data;
  };

  const resendOtp = async (email: string) => {
    const response = await apiService.resendOtp(email);

    if (response.error) {
      throw new Error(response.error);
    }

    return response.data;
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setUser(null);
      setPendingUserData(null);
      setPendingEmail(null);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      const response = await apiService.updateProfile({
        firstName: updates.firstName,
        lastName: updates.lastName,
        phone: updates.phone,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        const updatedUser = mapBackendUserToFrontend(response.data);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: User['role'],
    doctorSpecialty?: string,
    relationToPregnantWoman?: string
  ) => {
    const registerData = {
      email,
      password,
      firstName,
      lastName,
      role: role as UserRole,
      specialization: doctorSpecialty,
      relationToPatient: relationToPregnantWoman,
    };

    const response = await apiService.register(registerData);

    if (response.error) {
      throw new Error(response.error);
    }

    setPendingEmail(email);
    return response.data;
  };

  const hasRole = (requiredRole: User['role'] | User['role'][]): boolean => {
    if (!user) return false;

    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }

    return user.role === requiredRole;
  };

  const isDoctor = (): boolean => hasRole('professional');
  const isPregnantWoman = (): boolean => hasRole('patient');
  const isFamilyMember = (): boolean => hasRole('family');
  const isAdmin = (): boolean => hasRole('admin');
  const isMerchant = (): boolean => hasRole('merchant');

  const canAccessPremiumFeatures = (): boolean => user?.isPremium || false;
  const canAccessTeleconsultation = (): boolean => hasRole(['patient', 'family']) || isDoctor();
  const canManageAppointments = (): boolean => hasRole(['patient', 'family', 'professional']);
  const canViewHealthCenters = (): boolean => hasRole(['patient', 'family']);

  const getAvailableFeatures = () => {
    if (!user) return [];

    const features = ['dashboard'];

    if (canManageAppointments()) features.push('calendar');
    if (canViewHealthCenters()) features.push('centers');
    if (hasRole(['patient', 'family'])) { features.push('tips'); features.push('shop'); }
    if (hasRole(['patient'])) features.push('pregnancy');
    if (canAccessTeleconsultation()) features.push('consultation');
    if (isMerchant()) features.push('merchant-dashboard', 'products', 'orders');
    if (isAdmin()) features.push('admin');
    if (isDoctor()) features.push('patients', 'schedule');

    return features;
  };

  const getUserDisplayName = (): string => {
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`;
  };

  const getUserRoleDisplay = (): string => {
    if (!user) return '';

    switch (user.role) {
      case 'patient': return 'Patiente';
      case 'family': return 'Famille';
      case 'professional': return user.doctorSpecialty || 'Professionnel de santé';
      case 'admin': return 'Administrateur';
      case 'merchant': return user.businessName || 'Commerçant';
      default: return 'Utilisateur';
    }
  };

  const getDashboardConfig = () => {
    if (!user) return null;

    const baseConfig = {
      showPregnancyTracking: false,
      showAppointments: false,
      showHealthTips: false,
      showTeleconsultation: false,
      showPatientManagement: false,
      showAdminPanel: false,
    };

    switch (user.role) {
      case 'patient':
        return { ...baseConfig, showPregnancyTracking: true, showAppointments: true, showHealthTips: true, showTeleconsultation: true };
      case 'family':
        return { ...baseConfig, showAppointments: true, showHealthTips: true, showTeleconsultation: true };
      case 'professional':
        return { ...baseConfig, showAppointments: true, showTeleconsultation: true, showPatientManagement: true };
      case 'admin':
        return { ...baseConfig, showAdminPanel: true, showAppointments: true, showTeleconsultation: true };
      case 'merchant':
        return { ...baseConfig, showProductManagement: true, showOrderManagement: true, showBusinessStats: true };
      default:
        return baseConfig;
    }
  };

  return {
    user,
    isLoading,
    pendingEmail,
    pendingUserData,
    login,
    register,
    verifyEmail,
    resendOtp,
    logout,
    updateProfile,
    storePendingUserData,
    completePendingRegistration,
    hasRole,
    isDoctor,
    isPregnantWoman,
    isFamilyMember,
    isAdmin,
    isMerchant,
    canAccessPremiumFeatures,
    canAccessTeleconsultation,
    canManageAppointments,
    canViewHealthCenters,
    getAvailableFeatures,
    getUserDisplayName,
    getUserRoleDisplay,
    getDashboardConfig,
  };
};
