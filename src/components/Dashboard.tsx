import React from 'react';
import { Calendar, Baby, Heart, TrendingUp, Clock, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePregnancy } from '../hooks/usePregnancy';

const Dashboard: React.FC = () => {
  const { user, getDashboardConfig, getUserDisplayName, isPregnantWoman } = useAuth();
  const { currentWeek, weekInfo, getDaysUntilDue } = usePregnancy(user?.pregnancyStartDate);
  
  const dashboardConfig = getDashboardConfig();
  if (!dashboardConfig) return null;

  const daysUntilDue = user?.dueDate ? getDaysUntilDue(user.dueDate) : 0;
  const progressPercentage = currentWeek > 0 ? Math.min((currentWeek / 40) * 100, 100) : 0;

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300`}>
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

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progression de la grossesse - Seulement pour les femmes enceintes */}
          {dashboardConfig.showPregnancyTracking && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Progression de votre grossesse</h2>
                <Baby className="h-6 w-6 text-pink-500" />
              </div>
              
              {currentWeek > 0 ? (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Semaine {currentWeek} / 40</span>
                      <span>{Math.round(progressPercentage)}% complété</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {weekInfo && (
                    <div className="bg-pink-50 rounded-lg p-4 mt-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{weekInfo.title}</h3>
                      <p className="text-gray-700 mb-3">{weekInfo.description}</p>
                      <div className="text-sm text-gray-600">
                        <strong>Taille de bébé :</strong> {weekInfo.babySize}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <Baby className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Configurez votre date de grossesse pour voir votre progression</p>
                  <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                    Configurer mon profil
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Gestion des patients - Pour les professionnels */}
          {dashboardConfig.showPatientManagement && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Mes Patients</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Marie Dupont</h3>
                    <p className="text-sm text-gray-600">32 SA - Prochaine consultation: 20/01/2025</p>
                  </div>
                  <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                    Voir le dossier
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Sophie Martin</h3>
                    <p className="text-sm text-gray-600">28 SA - Prochaine consultation: 22/01/2025</p>
                  </div>
                  <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                    Voir le dossier
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Panel d'administration */}
          {dashboardConfig.showAdminPanel && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Administration</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-blue-700">Utilisateurs actifs</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">89</div>
                  <div className="text-sm text-green-700">Professionnels</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">456</div>
                  <div className="text-sm text-purple-700">Consultations ce mois</div>
                </div>
              </div>
            </div>
          )}

          {/* Prochains rendez-vous */}
          {dashboardConfig.showAppointments && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Prochains rendez-vous</h2>
              
              <div className="space-y-4">
                {[
                  { title: 'Consultation prénatale', date: '2025-01-20', time: '10:30', type: 'medical' },
                  { title: 'Échographie T2', date: '2025-02-05', time: '14:00', type: 'exam' }
                ].map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{appointment.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(appointment.date).toLocaleDateString('fr-FR')} à {appointment.time}
                        </p>
                      </div>
                    </div>
                    <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                      Modifier
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {/* Conseil du jour */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="h-6 w-6 text-yellow-500" />
              <h3 className="font-semibold text-gray-900">Conseil du jour</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Prenez 10 minutes chaque jour pour vous détendre et parler à votre bébé. 
              Il peut entendre votre voix et cela renforce votre lien.
            </p>
            <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">
              Voir plus de conseils →
            </button>
          </div>

          {/* Upgrade Premium */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full p-3 w-fit mx-auto mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Passez Premium</h3>
              <p className="text-gray-600 text-sm mb-4">
                Téléconsultations illimitées, IA santé, suivi personnalisé et bien plus.
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 text-sm font-medium">
                Découvrir Premium
              </button>
            </div>
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
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="font-medium text-gray-900">{action.title}</div>
                  <div className="text-sm text-gray-600">{action.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;