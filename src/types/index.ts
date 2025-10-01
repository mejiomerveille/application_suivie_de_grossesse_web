export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'patient' | 'family' | 'professional' | 'admin';
  doctorSpecialty?: string;
  relationToPregnantWoman?: string;
  pregnancyStartDate?: string;
  dueDate?: string;
  isPremium: boolean;
  createdAt: string;
}

export interface PregnancyWeek {
  week: number;
  title: string;
  description: string;
  babySize: string;
  motherChanges: string[];
  tips: string[];
}

export interface Appointment {
  id: string;
  userId: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  doctorName?: string;
  type: 'medical' | 'consultation' | 'exam';
  completed: boolean;
  notes?: string;
}

export interface HealthTip {
  id: string;
  title: string;
  category: 'nutrition' | 'exercise' | 'wellness' | 'preparation';
  content: string;
  fullContent: string;
  image?: string;
  videoUrl?: string;
  isVideo: boolean;
  isPremium: boolean;
  readTime: number;
  author: string;
  publishedDate: string;
}

export interface HealthCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  specialties: string[];
  rating: number;
  distance: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: {
    [key: string]: string;
  };
  image?: string;
}