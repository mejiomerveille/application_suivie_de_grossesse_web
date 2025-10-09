import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, RefreshCw, Shield, Clock } from 'lucide-react';
import { apiService } from '../services/api';

interface OtpVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  email,
  onVerificationSuccess,
  onBack
}) => {
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otpCode];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtpCode(newOtp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpCode.join('');
    
    if (code.length !== 6) {
      setError('Veuillez saisir le code complet à 6 chiffres');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await apiService.verifyEmail(email, code);
      
      if (response.error) {
        setError(response.error);
        setAttempts(prev => prev + 1);
        
        if (attempts >= 2) {
          setError('Trop de tentatives échouées. Veuillez demander un nouveau code.');
        }
        // Réinitialiser le code en cas d'erreur
        setOtpCode(['', '', '', '', '', '']);
      } else {
        onVerificationSuccess();
      }
    } catch (error) {
      setError('Erreur de vérification. Veuillez réessayer.');
      setOtpCode(['', '', '', '', '', '']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError('');

    try {
      const response = await apiService.resendOtp(email);
      
      if (response.error) {
        setError(response.error);
      } else {
        setResendCooldown(60);
        setAttempts(0);
        setOtpCode(['', '', '', '', '', '']);
      }
    } catch (error) {
      setError('Erreur lors du renvoi du code');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-full p-4 w-fit mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Vérification de votre email
            </h1>
            <p className="text-gray-600">
              Nous avons envoyé un code de vérification à
            </p>
            <p className="font-medium text-pink-600">{email}</p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Saisissez le code à 6 chiffres
              </label>
              <div className="flex justify-center space-x-3">
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || otpCode.join('').length !== 6}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Vérification...</span>
                </div>
              ) : (
                'Vérifier le code'
              )}
            </button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm mb-3">
              Vous n'avez pas reçu le code ?
            </p>
            {resendCooldown > 0 ? (
              <div className="flex items-center justify-center space-x-2 text-gray-500">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  Renvoyer dans {resendCooldown}s
                </span>
              </div>
            ) : (
              <button
                onClick={handleResendCode}
                disabled={isResending}
                className="text-pink-600 hover:text-pink-700 font-medium text-sm transition-colors disabled:opacity-50"
              >
                {isResending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Envoi en cours...</span>
                  </div>
                ) : (
                  'Renvoyer le code'
                )}
              </button>
            )}
          </div>

          {/* Back Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onBack}
              className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors w-full"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'inscription</span>
            </button>
          </div>

          {/* Info */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Conseils :</p>
                <ul className="space-y-1 text-xs">
                  <li>• Vérifiez votre dossier spam/courrier indésirable</li>
                  <li>• Le code expire après 10 minutes</li>
                  <li>• Maximum 3 tentatives par code</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;