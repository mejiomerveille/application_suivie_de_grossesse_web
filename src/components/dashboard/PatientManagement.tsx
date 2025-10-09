import React from 'react';

const PatientManagement: React.FC = () => {
  const patients = [
    { name: 'Marie Dupont', week: 32, nextConsultation: '20/01/2025' },
    { name: 'Sophie Martin', week: 28, nextConsultation: '22/01/2025' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Mes Patients</h2>
      
      <div className="space-y-4">
        {patients.map((patient, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">{patient.name}</h3>
              <p className="text-sm text-gray-600">{patient.week} SA - Prochaine consultation: {patient.nextConsultation}</p>
            </div>
            <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
              Voir le dossier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientManagement;