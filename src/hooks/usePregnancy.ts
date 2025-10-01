import { useState, useEffect } from 'react';
import type { PregnancyWeek } from '../types';

const pregnancyWeeks: PregnancyWeek[] = [
  {
    week: 12,
    title: "Fin du premier trimestre",
    description: "Félicitations ! Vous entrez dans une période plus sereine.",
    babySize: "Taille d'une prune (environ 5,4 cm)",
    motherChanges: [
      "Diminution des nausées matinales",
      "Regain d'énergie",
      "Ventre qui commence à s'arrondir"
    ],
    tips: [
      "Annoncez votre grossesse à vos proches",
      "Continuez la prise d'acide folique",
      "Planifiez votre échographie du 2e trimestre"
    ]
  },
  {
    week: 20,
    title: "Mi-parcours de la grossesse",
    description: "Vous êtes à mi-chemin ! Une étape importante.",
    babySize: "Taille d'une banane (environ 16,4 cm)",
    motherChanges: [
      "Premiers mouvements du bébé perceptibles",
      "Prise de poids visible",
      "Peau qui s'étire sur le ventre"
    ],
    tips: [
      "Échographie morphologique importante",
      "Commencez à penser à l'aménagement de la nurserie",
      "Hydratez bien votre peau"
    ]
  },
  {
    week: 32,
    title: "Troisième trimestre avancé",
    description: "Votre bébé grandit rapidement maintenant.",
    babySize: "Taille d'un chou-fleur (environ 42,4 cm)",
    motherChanges: [
      "Essoufflement plus fréquent",
      "Contractions de Braxton-Hicks",
      "Sommeil parfois difficile"
    ],
    tips: [
      "Préparez votre valise de maternité",
      "Cours de préparation à l'accouchement",
      "Repos et détente essentiels"
    ]
  }
];

export const usePregnancy = (pregnancyStartDate?: string) => {
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [weekInfo, setWeekInfo] = useState<PregnancyWeek | null>(null);

  useEffect(() => {
    if (pregnancyStartDate) {
      const start = new Date(pregnancyStartDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - start.getTime());
      const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
      
      setCurrentWeek(diffWeeks);
      
      // Trouver les informations de la semaine la plus proche
      const closestWeek = pregnancyWeeks.find(week => week.week >= diffWeeks) || pregnancyWeeks[pregnancyWeeks.length - 1];
      setWeekInfo(closestWeek);
    }
  }, [pregnancyStartDate]);

  const calculateDueDate = (startDate: string): string => {
    const start = new Date(startDate);
    const due = new Date(start.getTime() + (40 * 7 * 24 * 60 * 60 * 1000));
    return due.toISOString().split('T')[0];
  };

  const getDaysUntilDue = (dueDate: string): number => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return {
    currentWeek,
    weekInfo,
    calculateDueDate,
    getDaysUntilDue,
    allWeeks: pregnancyWeeks
  };
};