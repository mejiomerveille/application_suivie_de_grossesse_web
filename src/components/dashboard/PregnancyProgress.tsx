import React from 'react';
import { Baby } from 'lucide-react';

interface PregnancyProgressProps {
  currentWeek: number;
  progressPercentage: number;
  weekInfo: any;
  onConfigureProfile: () => void;
}

const PregnancyProgress: React.FC<PregnancyProgressProps> = ({
  currentWeek,
  progressPercentage,
  weekInfo,
  onConfigureProfile
}) => {
  return (
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
          <button 
            onClick={onConfigureProfile}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Configurer mon profil
          </button>
        </div>
      )}
    </div>
  );
};

export default PregnancyProgress;