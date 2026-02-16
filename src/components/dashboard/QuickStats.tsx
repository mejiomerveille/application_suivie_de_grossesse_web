import React from 'react';
import { Calendar, Clock, TrendingUp, Heart } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface QuickStatsProps {
  currentWeek: number;
  daysUntilDue: number;
  progressPercentage: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({ 
  currentWeek, 
  daysUntilDue, 
  progressPercentage 
}) => {
  const { getAvailableFeatures } = useAuth();
  const availableFeatures = getAvailableFeatures();

  const allStats = [
    {
      id: 'pregnancy-week',
      title: 'Semaine de grossesse',
      value: currentWeek > 0 ? `${currentWeek} SA` : 'Non défini',
      icon: Calendar,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      // rôles ou features autorisés
      roles: ['patient'],
    },
    {
      id: 'days-until-due',
      title: 'Jours restants',
      value: daysUntilDue > 0 ? `${daysUntilDue} jours` : 'Non défini',
      icon: Clock,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      roles: ['patient'],
    },
    {
      id: 'pregnancy-progress',
      title: 'Progression',
      value: `${Math.round(progressPercentage)}%`,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      roles: ['patient'],
    },
    {
      id: 'appointments',
      title: 'Rendez-vous',
      value: '2 à venir',
      icon: Heart,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      roles: ['patient', 'professional'],
    },
  ];

  // si tu utilises les mêmes ids que dans ton header (dashboard, pregnancy, etc.)
  // tu peux aussi te baser sur `availableFeatures` comme pour la navigation
  const stats = allStats.filter(stat => {
    // si tu veux par feature
    if (availableFeatures.includes(stat.id)) return true;
    // ou par rôle (si tu as le rôle courant)
    return false;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
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
  );
};

export default QuickStats;
