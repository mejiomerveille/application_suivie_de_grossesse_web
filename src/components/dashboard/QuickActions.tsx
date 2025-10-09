import React from 'react';

interface QuickActionsProps {
  onConfigureProfile: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onConfigureProfile }) => {
  const actions = [
    { title: 'Téléconsultation', desc: '2 gratuites restantes' },
    { title: 'Ajouter un symptôme', desc: 'Suivi quotidien' },
    { title: 'Mesures santé', desc: 'Poids, tension...' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Actions rapides</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="font-medium text-gray-900">{action.title}</div>
            <div className="text-sm text-gray-600">{action.desc}</div>
          </button>
        ))}
        <button 
          onClick={onConfigureProfile}
          className="w-full bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition-colors font-medium"
        >
          Configurer mon profil
        </button>
      </div>
    </div>
  );
};

export default QuickActions;