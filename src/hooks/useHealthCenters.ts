import { useState, useEffect } from 'react';
import type { HealthCenter } from '../types';

export const useHealthCenters = () => {
  const [centers, setCenters] = useState<HealthCenter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler la récupération des centres de santé proches
    const mockCenters: HealthCenter[] = [
      {
        id: '1',
        name: 'Centre Médical Saint-Antoine',
        address: '15 Rue de la Santé, 75014 Paris',
        phone: '01 42 34 56 78',
        email: 'contact@saint-antoine.fr',
        specialties: ['Gynécologie', 'Obstétrique', 'Pédiatrie'],
        rating: 4.8,
        distance: 0.8,
        coordinates: { lat: 48.8566, lng: 2.3522 },
        openingHours: {
          'Lundi': '8h00 - 19h00',
          'Mardi': '8h00 - 19h00',
          'Mercredi': '8h00 - 19h00',
          'Jeudi': '8h00 - 19h00',
          'Vendredi': '8h00 - 19h00',
          'Samedi': '9h00 - 17h00',
          'Dimanche': 'Fermé'
        },
        image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '2',
        name: 'Clinique de la Maternité',
        address: '28 Avenue des Champs, 75008 Paris',
        phone: '01 45 67 89 12',
        email: 'info@maternite-clinique.fr',
        specialties: ['Obstétrique', 'Néonatologie', 'Anesthésie'],
        rating: 4.9,
        distance: 1.2,
        coordinates: { lat: 48.8738, lng: 2.2950 },
        openingHours: {
          'Lundi': '24h/24',
          'Mardi': '24h/24',
          'Mercredi': '24h/24',
          'Jeudi': '24h/24',
          'Vendredi': '24h/24',
          'Samedi': '24h/24',
          'Dimanche': '24h/24'
        },
        image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '3',
        name: 'Hôpital Général de Paris',
        address: '42 Boulevard de l\'Hôpital, 75013 Paris',
        phone: '01 56 78 90 12',
        specialties: ['Urgences', 'Gynécologie', 'Cardiologie', 'Pédiatrie'],
        rating: 4.5,
        distance: 2.1,
        coordinates: { lat: 48.8387, lng: 2.3644 },
        openingHours: {
          'Lundi': '24h/24',
          'Mardi': '24h/24',
          'Mercredi': '24h/24',
          'Jeudi': '24h/24',
          'Vendredi': '24h/24',
          'Samedi': '24h/24',
          'Dimanche': '24h/24'
        },
        image: 'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ];

    setTimeout(() => {
      setCenters(mockCenters);
      setIsLoading(false);
    }, 1000);
  }, []);

  return { centers, isLoading };
};