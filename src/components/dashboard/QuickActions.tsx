import React from 'react';
import { Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';

interface QuickActionsProps {
  onConfigureProfile: () => void;
}

const QuickActions: React.FC = () => {
    
  const { user } = useAuth();
  const { appointments } = useAppointments(user?.id || '');
  
    const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateString);
  };


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Prochains rendez-vous</h2>
      
      <div className="space-y-4">
        {appointments.map((appointment, index) => (
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
  );
};

export default QuickActions;