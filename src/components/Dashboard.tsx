import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePregnancy } from '../hooks/usePregnancy';

// Import des composants modulaires
import QuickStats from './dashboard/QuickStats';
import PregnancyProgress from './dashboard/PregnancyProgress';
import UpcomingAppointments from './dashboard/UpcomingAppointments';
import PatientManagement from './dashboard/PatientManagement';
import AdminPanel from './dashboard/AdminPanel';
import DailyTip from './dashboard/DailyTip';
import PremiumUpgrade from './dashboard/PremiumUpgrade';
import QuickActions from './dashboard/QuickActions';
import ProfileModal from './dashboard/ProfileModal';

const Dashboard: React.FC = () => {
  const { user, getDashboardConfig, getUserDisplayName, isPregnantWoman } = useAuth();
  const { currentWeek,daysUntilDue, weekInfo, createProfile } = usePregnancy();
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const dashboardConfig = getDashboardConfig();
  if (!dashboardConfig) return null;

  const progressPercentage = currentWeek > 0 ? Math.min((currentWeek / 40) * 100, 100) : 0;

  const handleSaveProfile = async (profileData: any) => {
    try {
      await createProfile(profileData);
      setShowProfileModal(false);
      // Recharger la page pour mettre à jour les données
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la création du profil:', error);
      throw error;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* En-tête de bienvenue */}
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
                : "Bienvenue sur Intimia."
          }
        </p>
      </div>

      {/* Statistiques rapides */}
      <QuickStats 
        currentWeek={currentWeek}
        daysUntilDue={daysUntilDue}
        progressPercentage={progressPercentage}
      />

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progression de la grossesse - Seulement pour les femmes enceintes */}
          {dashboardConfig.showPregnancyTracking && (
            <PregnancyProgress
              currentWeek={currentWeek}
              progressPercentage={progressPercentage}
              weekInfo={weekInfo}
              onConfigureProfile={() => setShowProfileModal(true)}
            />
          )}

          {/* Gestion des patients - Pour les professionnels */}
          {dashboardConfig.showPatientManagement && (
            <PatientManagement />
          )}

          {/* Panel d'administration */}
          {dashboardConfig.showAdminPanel && (
            <AdminPanel />
          )}

          {/* Prochains rendez-vous */}
          {dashboardConfig.showAppointments && (
            <UpcomingAppointments />
          )}
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {/* Conseil du jour */}
          <DailyTip />

          {/* Upgrade Premium */}
          <PremiumUpgrade />

          {/* Actions rapides */}
          <QuickActions onConfigureProfile={() => setShowProfileModal(true)} />
        </div>
      </div>

      {/* Modal de configuration du profil */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Dashboard;