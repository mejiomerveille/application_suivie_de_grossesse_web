import React from 'react';

const AdminPanel: React.FC = () => {
  const stats = [
    { label: 'Utilisateurs actifs', value: '1,247', color: 'blue' },
    { label: 'Professionnels', value: '89', color: 'green' },
    { label: 'Consultations ce mois', value: '456', color: 'purple' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Administration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-${stat.color}-50 rounded-lg p-4 text-center`}>
            <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
            <div className={`text-sm text-${stat.color}-700`}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;