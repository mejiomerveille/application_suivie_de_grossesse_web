import React from 'react';
import { Star } from 'lucide-react';

const DailyTip: React.FC = () => {
  return (
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
  );
};

export default DailyTip;