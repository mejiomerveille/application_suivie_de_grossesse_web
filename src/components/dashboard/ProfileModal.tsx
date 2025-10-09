import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profileData: any) => Promise<void>;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSave }) => {
  const [profileForm, setProfileForm] = useState({
    last_menstrual_period: '',
    blood_type: '',
    weight_before_pregnancy: '',
    medical_history: '',
    allergies: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      const profileData = {
        last_menstrual_period: profileForm.last_menstrual_period,
        blood_type: profileForm.blood_type,
        weight_before_pregnancy: profileForm.weight_before_pregnancy ? parseFloat(profileForm.weight_before_pregnancy) : undefined,
        medical_history: profileForm.medical_history,
        allergies: profileForm.allergies
      };
      
      await onSave(profileData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la création du profil:', error);
      alert('Erreur lors de la sauvegarde du profil');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Configuration du profil de grossesse
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date des dernières règles *
            </label>
            <input
              type="date"
              value={profileForm.last_menstrual_period}
              onChange={(e) => setProfileForm({...profileForm, last_menstrual_period: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Groupe sanguin
            </label>
            <select
              value={profileForm.blood_type}
              onChange={(e) => setProfileForm({...profileForm, blood_type: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="">Sélectionnez votre groupe sanguin</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Poids avant grossesse (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={profileForm.weight_before_pregnancy}
              onChange={(e) => setProfileForm({...profileForm, weight_before_pregnancy: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="65.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Antécédents médicaux
            </label>
            <textarea
              value={profileForm.medical_history}
              onChange={(e) => setProfileForm({...profileForm, medical_history: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              placeholder="Décrivez vos antécédents médicaux..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergies
            </label>
            <textarea
              value={profileForm.allergies}
              onChange={(e) => setProfileForm({...profileForm, allergies: e.target.value})}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              placeholder="Listez vos allergies connues..."
            />
          </div>
        </div>

        <div className="flex space-x-3 pt-6 mt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={handleSaveProfile}
            disabled={isLoading || !profileForm.last_menstrual_period}
            className="flex-1 bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 transition-colors font-medium disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Sauvegarde...</span>
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                <span>Sauvegarder</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;