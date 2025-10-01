import React, { useState } from 'react';
import { User, Heart, Stethoscope, Users, ArrowRight } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: string, additionalInfo?: { doctorSpecialty?: string; relationToPregnantWoman?: string; expectedDueDate?: string }) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect, onBack, isLoading = false }) => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [doctorSpecialty, setDoctorSpecialty] = useState('');
  const [relationToPregnantWoman, setRelationToPregnantWoman] = useState('');
  const [expectedDueDate, setExpectedDueDate] = useState('');

  const roles = [
    {
      id: 'patient',
      title: 'Femme enceinte',
      description: 'Je suis enceinte et je souhaite suivre ma grossesse',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50'
    },
    {
      id: 'family',
      title: 'Membre de la famille',
      description: 'Je suis le/la partenaire ou un proche d\'une femme enceinte',
      icon: Users,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'professional',
      title: 'Professionnel de santé',
      description: 'Je suis médecin, sage-femme ou autre professionnel médical',
      icon: Stethoscope,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 'admin',
      title: 'Patient général',
      description: 'Je souhaite accéder aux téléconsultations',
      icon: User,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50'
    }
  ];

  const doctorSpecialties = [
    'Gynécologue-Obstétricien',
    'Sage-femme',
    'Médecin généraliste',
    'Pédiatre',
    'Nutritionniste',
    'Psychologue périnatal',
    'Anesthésiste',
    'Radiologue',
    'Autre'
  ];

  const familyRelations = [
    'Conjoint/Partenaire',
    'Mère',
    'Père',
    'Sœur',
    'Frère',
    'Belle-mère',
    'Beau-père',
    'Ami(e) proche',
    'Autre'
  ];

  const handleContinue = () => {
    if (!selectedRole) return;

    const additionalInfo: { doctorSpecialty?: string; relationToPregnantWoman?: string; expectedDueDate?: string } = {};
    
    if (selectedRole === 'professional' && doctorSpecialty) {
      additionalInfo.doctorSpecialty = doctorSpecialty;
    }
    
    if (selectedRole === 'family' && relationToPregnantWoman) {
      additionalInfo.relationToPregnantWoman = relationToPregnantWoman;
    }
    
    if (selectedRole === 'patient' && expectedDueDate) {
      additionalInfo.expectedDueDate = expectedDueDate;
    }

    onRoleSelect(selectedRole, additionalInfo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-lg p-3 w-fit mx-auto mb-6">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Bienvenue sur Intimia
          </h1>
          <p className="text-gray-600 text-lg">
            Pour personnaliser votre expérience, dites-nous qui vous êtes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`${role.bgColor} rounded-2xl p-6 border-2 transition-all duration-300 text-left hover:shadow-lg ${
                selectedRole === role.id 
                  ? 'border-pink-500 shadow-lg transform scale-105' 
                  : 'border-transparent hover:border-pink-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`bg-gradient-to-r ${role.color} rounded-full p-3`}>
                  <role.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {role.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Informations supplémentaires pour médecin */}
        {selectedRole === 'professional' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quelle est votre spécialité ?
            </h3>
            <select
              value={doctorSpecialty}
              onChange={(e) => setDoctorSpecialty(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="">Sélectionnez votre spécialité</option>
              {doctorSpecialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Informations supplémentaires pour membre de famille */}
        {selectedRole === 'family' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quel est votre lien avec la femme enceinte ?
            </h3>
            <select
              value={relationToPregnantWoman}
              onChange={(e) => setRelationToPregnantWoman(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="">Sélectionnez votre relation</option>
              {familyRelations.map((relation) => (
                <option key={relation} value={relation}>
                  {relation}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Informations supplémentaires pour femme enceinte */}
        {selectedRole === 'patient' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quelle est votre date d'accouchement prévue ?
            </h3>
            <input
              type="date"
              value={expectedDueDate}
              onChange={(e) => setExpectedDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-2">
              Cette information nous aidera à personnaliser votre suivi de grossesse
            </p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={isLoading || !selectedRole || 
              (selectedRole === 'professional' && !doctorSpecialty) ||
              (selectedRole === 'family' && !relationToPregnantWoman)
            }
            className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Inscription...</span>
              </>
            ) : (
              <>
                <span>Continuer</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
          
          {onBack && (
            <button
              onClick={onBack}
              disabled={isLoading}
              className="mt-4 text-gray-600 hover:text-gray-700 transition-colors disabled:opacity-50"
            >
              Retour à l'inscription
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;