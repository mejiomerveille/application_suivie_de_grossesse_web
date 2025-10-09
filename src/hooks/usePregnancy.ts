import { useState, useEffect } from 'react';
import { pregnancyApiService, type PregnancyProfile } from '../services/pregnancyApi';

export const usePregnancy = (pregnancyStartDate?: string) => {
  const [profile, setProfile] = useState<PregnancyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const profileData = await pregnancyApiService.getProfile();
      setProfile(profileData);
      // console.log (profileData.data.current_week)
      setError(null);
    } catch (err) {
      console.log('Aucun profil trouvé, création nécessaire');
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  const createProfile = async (profileData: Omit<PregnancyProfile, 'id' | 'user_id'>) => {
    try {
      const newProfile = await pregnancyApiService.createProfile(profileData);
      setProfile(newProfile);
      return newProfile;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création du profil';
      setError(errorMessage);
      throw err;
    }
  };

  const getCurrentWeek = (): number => {
  // ✅ Si le backend envoie current_week, on le prend en priorité
  if (profile?.data.current_week) {
    return profile.data.current_week;
  }

  // 🧮 Sinon, on calcule à partir de la date des dernières règles
  if (!profile?.last_menstrual_period) return 0;

  const lmpDate = new Date(profile.last_menstrual_period);
  const today = new Date();
  const diffTime = today.getTime() - lmpDate.getTime();
  const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

  return Math.max(0, Math.min(diffWeeks, 42));
};

const getDaysUntilDue = (dueDate?: string): number => {
  // Essaie d'abord d'utiliser current_week envoyé par le backend.
  // On gère plusieurs formes possibles : profile.current_week ou profile.data.current_week.
  const currentWeekFromBackend = profile?.current_week ?? profile?.data?.current_week;

  if (currentWeekFromBackend !== undefined && currentWeekFromBackend !== null && !isNaN(Number(currentWeekFromBackend))) {
    const totalWeeks = 42; // semaines totales considérées
    const currentWeekNumber = Number(currentWeekFromBackend);
    const remainingWeeks = Math.max(0, totalWeeks - currentWeekNumber);
    const daysUntilDue = remainingWeeks * 7;
    // console.log('getDaysUntilDue (from current_week):', { currentWeekNumber, remainingWeeks, daysUntilDue });
    return Math.max(0, daysUntilDue);
  }

  // Si pas de current_week disponible, on peut calculer à partir de dueDate (fallback).
  if (dueDate) {
    const due = new Date(dueDate);
    if (isNaN(due.getTime())) {
      console.log('getDaysUntilDue: dueDate invalide ->', dueDate);
      return 0;
    }
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const days = Math.max(0, diffDays);
    console.log('getDaysUntilDue (from dueDate):', { dueDate, days });
    return days;
  }

  // Aucun input disponible
  // console.log('getDaysUntilDue: no current_week and no dueDate -> 0');
  return 0;
};



  const getWeekInfo = (week: number) => {
    const weeklyInfo: { [key: number]: any } = {
      8: {
        title: "Semaine 8 - Premiers battements",
        description: "Le cœur de votre bébé bat maintenant régulièrement.",
        babySize: "Taille d'une framboise (1,6 cm)",
        motherChanges: ["Nausées matinales possibles", "Fatigue accrue", "Seins sensibles"],
        tips: ["Prenez de l'acide folique", "Évitez l'alcool et le tabac", "Reposez-vous suffisamment"]
      },
      12: {
        title: "Semaine 12 - Fin du premier trimestre",
        description: "Les organes principaux de bébé sont formés.",
        babySize: "Taille d'une prune (5,4 cm)",
        motherChanges: ["Diminution des nausées", "Regain d'énergie", "Ventre qui s'arrondit"],
        tips: ["Première échographie", "Annoncez la grossesse", "Alimentation équilibrée"]
      },
      20: {
        title: "Semaine 20 - Mi-parcours",
        description: "Vous pouvez sentir les premiers mouvements de bébé.",
        babySize: "Taille d'une banane (16,4 cm)",
        motherChanges: ["Mouvements fœtaux", "Ventre bien visible", "Prise de poids"],
        tips: ["Échographie morphologique", "Exercices prénataux", "Préparation chambre bébé"]
      },
      32: {
        title: "Semaine 32 - Troisième trimestre",
        description: "Bébé grandit rapidement et prend du poids.",
        babySize: "Taille d'un chou-fleur (42,4 cm)",
        motherChanges: ["Essoufflement", "Contractions de Braxton Hicks", "Sommeil difficile"],
        tips: ["Cours de préparation", "Valise maternité", "Repos fréquents"]
      }
    };

    return weeklyInfo[week] || {
      title: `Semaine ${week}`,
      description: "Continuez à prendre soin de vous et de votre bébé.",
      babySize: "En développement",
      motherChanges: ["Évolution normale de la grossesse"],
      tips: ["Suivez les conseils de votre médecin"]
    };
  };

  const currentWeek = getCurrentWeek();
  const weekInfo = getWeekInfo(currentWeek);
  const daysUntilDue=getDaysUntilDue();

  return {
    profile,
    isLoading,
    error,
    currentWeek,
    weekInfo,
    daysUntilDue,
    createProfile,
    loadProfile,
    getDaysUntilDue,
    getWeekInfo
  };
};