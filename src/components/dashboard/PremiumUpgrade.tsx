import React from 'react';
import { Star } from 'lucide-react';

const PremiumUpgrade: React.FC = () => {
  return (
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
  );
};

export default PremiumUpgrade;