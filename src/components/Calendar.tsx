import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, MapPin, User, CreditCard as Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAppointments } from '../hooks/useAppointments';
import AppointmentModal from './AppointmentModal';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const { user } = useAuth();
  const { appointments, addAppointment, updateAppointment, deleteAppointment } = useAppointments(user?.id || '');


  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Jours du mois précédent
    for (let i = startingDayOfWeek; i > 0; i--) {
      const prevDate = new Date(year, month, -i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    
    // Compléter avec les jours du mois suivant
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ date: new Date(year, month + 1, day), isCurrentMonth: false });
    }
    
    return days;
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateString);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const days = getDaysInMonth(selectedDate);
  const today = new Date();
  const selectedDateAppointments = getAppointmentsForDate(selectedDate);

  const handleSaveAppointment = (appointmentData: any) => {
    if (editingAppointment) {
      updateAppointment(editingAppointment.id, appointmentData);
      setEditingAppointment(null);
    } else {
      addAppointment(appointmentData);
    }
    setShowAddModal(false);
  };

  const handleEditAppointment = (appointment: any) => {
    setEditingAppointment(appointment);
    setShowAddModal(true);
  };

  const handleDeleteAppointment = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      deleteAppointment(id);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendrier</h1>
          <p className="text-gray-600">Gérez vos rendez-vous et événements importants</p>
        </div>
        <button 
          onClick={() => {
            setEditingAppointment(null);
            setShowAddModal(true);
          }}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Nouveau RDV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendrier principal */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* En-tête du calendrier */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    ←
                  </button>
                  <button 
                    onClick={() => setSelectedDate(new Date())}
                    className="px-3 py-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors text-sm"
                  >
                    Aujourd'hui
                  </button>
                  <button 
                    onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Grille du calendrier */}
            <div className="p-6">
              {/* Jours de la semaine */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grille des jours */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const isToday = day.date.toDateString() === today.toDateString();
                  const isSelected = day.date.toDateString() === selectedDate.toDateString();
                  const dayAppointments = getAppointmentsForDate(day.date);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(day.date)}
                      className={`
                        p-3 text-center relative hover:bg-pink-50 transition-colors rounded-lg
                        ${!day.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                        ${isToday ? 'bg-pink-500 text-white hover:bg-pink-600' : ''}
                        ${isSelected && !isToday ? 'bg-pink-100 text-pink-700' : ''}
                      `}
                    >
                      <span className="text-sm font-medium">{day.date.getDate()}</span>
                      {dayAppointments.length > 0 && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className={`w-2 h-2 rounded-full ${isToday ? 'bg-white' : 'bg-pink-400'}`}></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Détails du jour sélectionné */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <CalendarIcon className="h-6 w-6 text-pink-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                {formatDate(selectedDate)}
              </h3>
            </div>

            {selectedDateAppointments.length > 0 ? (
              <div className="space-y-4">
                {selectedDateAppointments.map((appointment) => (
                  <div key={appointment.id} className="border-l-4 border-pink-400 pl-4 py-3 bg-gray-50 rounded-r-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                          {appointment.doctorName && (
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{appointment.doctorName}</span>
                            </div>
                          )}
                          {appointment.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{appointment.location}</span>
                            </div>
                          )}
                          <div className={`px-2 py-1 rounded-full text-xs ${
                            appointment.type === 'medical' ? 'bg-blue-100 text-blue-800' :
                            appointment.type === 'exam' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {appointment.type === 'medical' ? 'Médical' :
                             appointment.type === 'exam' ? 'Examen' : 'Consultation'}
                          </div>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
                        )}
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        appointment.completed ? 'bg-green-400' : 'bg-gray-300'
                      }`}></div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditAppointment(appointment)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Aucun rendez-vous ce jour</p>
              </div>
            )}
          </div>

          {/* Prochains rendez-vous */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prochains rendez-vous</h3>
            <div className="space-y-3">
              {appointments.filter(apt => !apt.completed && new Date(apt.date) >= today).slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-pink-100 rounded-full p-2">
                    <User className="h-4 w-4 text-pink-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{appointment.title}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(appointment.date).toLocaleDateString('fr-FR')} - {appointment.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AppointmentModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingAppointment(null);
        }}
        onSave={handleSaveAppointment}
        appointment={editingAppointment}
        userId={user?.id || ''}
      />
    </div>
  );
};

export default Calendar;