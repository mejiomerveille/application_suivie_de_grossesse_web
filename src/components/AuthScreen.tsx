import React, { useState } from 'react';
import { Mail, Lock, User, Calendar, Heart, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { apiService } from '../services/api';
import OtpVerification from './OtpVerification';
import RoleSelection from './RoleSelection';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  
  const { login, storePendingUserData, pendingEmail, verifyEmail, register } = useAuth();

   const handleVerificationSuccess = () => {
    // L'utilisateur sera automatiquement connecté après vérification
    setShowOtpVerification(false);
  };

  const handleBackFromOtp = () => {
    setShowOtpVerification(false);
    setShowRoleSelection(true);
  };

  const completePendingRegistration = async (role: string, additionalInfo?: { doctorSpecialty?: string; relationToPregnantWoman?: string; expectedDueDate?: string }) => {
    if (!pendingEmail) {
      throw new Error('Aucune donnée d\'inscription en attente');
    }

    const registerData = {
      username: pendingEmail.split('@')[0],
      email: pendingEmail,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: '',
      role: role.toUpperCase() as 'PATIENT' | 'FAMILY' | 'PROFESSIONAL' | 'ADMIN',
      specialization: additionalInfo?.doctorSpecialty,
      relationToPatient: additionalInfo?.relationToPregnantWoman,
      expectedDueDate: additionalInfo?.expectedDueDate
    };

    const response = await apiService.register(registerData);
    
    if (response.error) {
      throw new Error(response.error);
    }

    return response.data;
  };

  if (showOtpVerification && pendingEmail) {
    return (
      <OtpVerification
        email={pendingEmail}
        onVerificationSuccess={handleVerificationSuccess}
        onBack={handleBackFromOtp}
      />
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      if (isLogin) {
        const user = await login(formData.email, formData.password);
        setMessage(`Bienvenue ${user.firstName} !`);
        setMessageType('success');
        
        // Redirection automatique après 1.5 secondes
        setTimeout(() => {
          // La redirection se fera automatiquement via App.tsx quand user sera défini
        }, 1500);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setMessage('Les mots de passe ne correspondent pas');
          setMessageType('error');
          return;
        }
        
        // Stocker les données utilisateur et passer à la sélection de rôle
        storePendingUserData({
          username: formData.email.split('@')[0],
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: ''
        });
        setShowRoleSelection(true);
      }
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      setMessage(error instanceof Error ? error.message : 'Erreur d\'authentification');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = async (role: string, additionalInfo?: { doctorSpecialty?: string; relationToPregnantWoman?: string; expectedDueDate?: string }) => {
    try {
      setIsLoading(true);
      const response = await completePendingRegistration(role as any, additionalInfo);
      setShowOtpVerification(true);
      setShowRoleSelection(false);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setMessage(error instanceof Error ? error.message : 'Erreur lors de l\'inscription. Veuillez réessayer.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackFromRole = () => {
    setShowRoleSelection(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (showRoleSelection) {
    return (
      <RoleSelection 
        onRoleSelect={handleRoleSelect} 
        onBack={handleBackFromRole}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex flex-col lg:flex-row">
      {/* Section gauche - Présentation */}
      <div className="lg:w-1/2 bg-gradient-to-br from-pink-500 to-rose-600 p-8 lg:p-16 flex flex-col justify-center text-white">
        <div className="max-w-md">
          <div className="mb-8">
            <div className="bg-white bg-opacity-20 rounded-lg p-3 w-fit">
              <Heart className="h-8 w-8" />
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Intimia
            <span className="block text-2xl lg:text-3xl font-normal text-pink-200 mt-2">Votre compagnon de grossesse</span>
            <span className="block text-lg text-pink-200">digital et sécurisé</span>
          </h1>
          
          <p className="text-xl text-pink-100 mb-8 leading-relaxed">
            Suivez votre grossesse semaine après semaine, accédez à des conseils d'experts 
            et connectez-vous avec des professionnels de santé.
          </p>

          <div className="space-y-4">
            {[
              { icon: Calendar, text: "Suivi personnalisé de votre grossesse" },
              { icon: User, text: "Téléconsultations avec des spécialistes" },
              { icon: Shield, text: "Données sécurisées et confidentielles" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <feature.icon className="h-5 w-5 text-pink-200" />
                <span className="text-pink-100">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold text-lg mb-2">Modèle Freemium</h3>
            <p className="text-pink-100 text-sm">
              Commencez gratuitement avec les fonctionnalités essentielles. 
              Passez Premium pour un accompagnement complet.
            </p>
          </div>
        </div>
      </div>

      {/* Section droite - Formulaire */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Connexion' : 'Inscription'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? 'Connectez-vous à votre espace personnel' 
                : 'Créez votre compte pour commencer le suivi'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div className={`p-4 rounded-lg border ${
                messageType === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}

            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="Marie"
                      required={!isLogin}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="Dupont"
                      required={!isLogin}
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'Créer mon compte')}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
              >
                {isLogin 
                  ? "Pas encore de compte ? S'inscrire" 
                  : "Déjà un compte ? Se connecter"
                }
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              En vous connectant, vous acceptez nos{' '}
              <a href="#" className="text-pink-600 hover:underline">Conditions d'utilisation</a>
              {' '}et notre{' '}
              <a href="#" className="text-pink-600 hover:underline">Politique de confidentialité</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;