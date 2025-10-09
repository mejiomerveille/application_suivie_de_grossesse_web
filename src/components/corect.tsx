import React, { useState } from 'react';
import { Calendar, Baby, Heart, TrendingUp, Clock, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePregnancy } from '../hooks/usePregnancy';

const Dashboard: React.FC = () => {
  const { user, getDashboardConfig, getUserDisplayName, isPregnantWoman } = useAuth();
  const { currentWeek, weekInfo, getDaysUntilDue } = usePregnancy(user?.pregnancyStartDate);

  // 🧠 États manquants
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    last_menstrual_period: '',
    blood_type: '',
    weight_before_pregnancy: '',
    medical_history: '',
    allergies: ''
  });

  // 🔧 Fonction simulée pour enregistrer le profil
  const createProfile = async (data: any) => {
    console.log('Profil sauvegardé (simulation):', data);
    return Promise.resolve();
  };

  const dashboardConfig = getDashboardConfig();
  if (!dashboardConfig) return null;

  const daysUntilDue = user?.dueDate ? getDaysUntilDue(user.dueDate) : 0;
  const progressPercentage = currentWeek > 0 ? Math.min((currentWeek / 40) * 100, 100) : 0;

  const handleSaveProfile = async () => {
    try {
      const profileData = {
        last_menstrual_period: profileForm.last_menstrual_period,
        blood_type: profileForm.blood_type,
        weight_before_pregnancy: profileForm.weight_before_pregnancy
          ? parseFloat(profileForm.weight_before_pregnancy)
          : undefined,
        medical_history: profileForm.medical_history,
        allergies: profileForm.allergies
      };

      await createProfile(profileData);
      setShowProfileModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la création du profil:', error);
      alert('Erreur lors de la sauvegarde du profil');
    }
  };

  const quickStats = [
    {
      title: 'Semaine de grossesse',
      value: currentWeek > 0 ? `${currentWeek} SA` : 'Non défini',
      icon: Calendar,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'Jours restants',
      value: daysUntilDue > 0 ? `${daysUntilDue} jours` : 'Non défini',
      icon: Clock,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Progression',
      value: `${Math.round(progressPercentage)}%`,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Rendez-vous',
      value: '2 à venir',
      icon: Heart,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bonjour {getUserDisplayName()} ! 👋
        </h1>
        <p className="text-gray-600">
          {isPregnantWoman() && currentWeek > 0
            ? `Vous êtes à ${currentWeek} semaines de grossesse. Voici votre suivi aujourd'hui.`
            : user?.role === 'professional'
            ? "Bienvenue dans votre espace professionnel."
            : user?.role === 'family'
            ? "Suivez et accompagnez votre proche dans sa grossesse."
            : "Bienvenue sur Intimia."}
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`bg-gradient-to-r ${stat.color} rounded-full p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="space-y-3">
          {[
            { title: 'Téléconsultation', desc: '2 gratuites restantes' },
            { title: 'Ajouter un symptôme', desc: 'Suivi quotidien' },
            { title: 'Mesures santé', desc: 'Poids, tension...' }
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => setShowProfileModal(true)}
              className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="font-medium text-gray-900">{action.title}</div>
              <div className="text-sm text-gray-600">{action.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Configuration du profil de grossesse
              </h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <button
              onClick={handleSaveProfile}
              className="w-full bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Sauvegarder le profil
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
