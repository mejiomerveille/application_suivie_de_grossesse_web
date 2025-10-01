import { useState, useEffect } from 'react';
import type { Appointment } from '../types';

export const useAppointments = (userId: string) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des rendez-vous
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        userId,
        title: 'Consultation prénatale',
        date: '2025-01-20',
        time: '10:30',
        location: 'Cabinet Dr. Martin',
        doctorName: 'Dr. Sarah Martin',
        type: 'medical',
        completed: false,
        notes: 'Contrôle de routine'
      },
      {
        id: '2',
        userId,
        title: 'Échographie morphologique',
        date: '2025-02-05',
        time: '14:00',
        location: 'Centre d\'imagerie médicale',
        doctorName: 'Dr. Pierre Dubois',
        type: 'exam',
        completed: false
      }
    ];

    const savedAppointments = localStorage.getItem(`appointments_${userId}`);
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      setAppointments(mockAppointments);
      localStorage.setItem(`appointments_${userId}`, JSON.stringify(mockAppointments));
    }
    setIsLoading(false);
  }, [userId]);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString()
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem(`appointments_${userId}`, JSON.stringify(updatedAppointments));
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === id ? { ...apt, ...updates } : apt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem(`appointments_${userId}`, JSON.stringify(updatedAppointments));
  };

  const deleteAppointment = (id: string) => {
    const updatedAppointments = appointments.filter(apt => apt.id !== id);
    setAppointments(updatedAppointments);
    localStorage.setItem(`appointments_${userId}`, JSON.stringify(updatedAppointments));
  };

  return {
    appointments,
    isLoading,
    addAppointment,
    updateAppointment,
    deleteAppointment
  };
};