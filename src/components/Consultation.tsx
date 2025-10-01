import React, { useState } from 'react';
import { Video, Phone, Clock, Star, Calendar, Crown, Users, Heart } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: number;
  avatar: string;
  available: boolean;
  languages: string[];
  isPremium?: boolean;
}

const Consultation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('book');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Martin',
      specialty: 'Gynécologue-Obstétricienne',
      rating: 4.9,
      reviews: 127,
      price: 0,
      avatar: '👩‍⚕️',
      available: true,
      languages: ['Français', 'Anglais']
    },
    {
      id: '2',
      name: 'Dr. Pierre Dubois',
      specialty: 'Sage-femme',
      rating: 4.8,
      reviews: 89,
      price: 0,
      avatar: '👨‍⚕️',
      available: true,
      languages: ['Français']
    },
    {
      id: '3',
      name: 'Dr. Marie Leroy',
      specialty: 'Nutritionniste',
      rating: 4.9,
      reviews: 156,
      price: 45,
      avatar: '👩‍⚕️',
      available: false,
      languages: ['Français', 'Espagnol'],
      isPremium: true
    },
    {
      id: '4',
      name: 'Dr. Jean Moreau',
      specialty: 'Psychologue périnatal',
      rating: 4.7,
      reviews: 203,
      price: 60,
      avatar: '👨‍⚕️',
      available: true,
      languages: ['Français'],
      isPremium: true
    }
  ];

  const specialties = [
    { id: 'all', name: 'Toutes spécialités' },
    { id: 'gynecology', name: 'Gynécologie' },
    { id: 'midwife', name: 'Sage-femme' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'psychology', name: 'Psychologie' }
  ];

  const upcomingConsultations = [
    {
      id: '1',
      doctor: 'Dr. Sarah Martin',
      date: '2025-01-20',
      time: '14:30',
      type: 'video',
      status: 'confirmed'
    }
  ];

  const tabs = [
    { id: 'book', name: 'Réserver', icon: Calendar },
    { id: 'history', name: 'Historique', icon: Clock },
    { id: 'upcoming', name: 'À venir', icon: Heart }
  ];

  const renderBookingTab = () => (
    <div className="space-y-6">
      {/* Consultations gratuites restantes */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-green-800">Consultations gratuites</h3>
            <p className="text-green-600">Il vous reste 2 consultations gratuites ce mois-ci</p>
          </div>
          <div className="bg-green-100 rounded-full p-3">
            <Video className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {specialties.map((specialty) => (
          <button
            key={specialty.id}
            onClick={() => setSelectedSpecialty(specialty.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSpecialty === specialty.id
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {specialty.name}
          </button>
        ))}
      </div>

      {/* Liste des médecins */}
      <div className="grid gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{doctor.avatar}</div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <span>{doctor.name}</span>
                      {doctor.isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
                    </h3>
                    <p className="text-gray-600">{doctor.specialty}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    doctor.available 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {doctor.available ? 'Disponible' : 'Occupé'}
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-sm text-gray-500">({doctor.reviews} avis)</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {doctor.languages.join(', ')}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">
                    {doctor.price === 0 ? (
                      <span className="text-green-600">Gratuit</span>
                    ) : (
                      <span>{doctor.price}€</span>
                    )}
                    {doctor.isPremium && (
                      <span className="text-sm text-yellow-600 ml-2">Premium uniquement</span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {doctor.available && (
                      <>
                        <button 
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            doctor.isPremium 
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                          disabled={doctor.isPremium}
                        >
                          <Phone className="h-4 w-4" />
                          <span>Audio</span>
                        </button>
                        <button 
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            doctor.isPremium 
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-pink-500 text-white hover:bg-pink-600'
                          }`}
                          disabled={doctor.isPremium}
                        >
                          <Video className="h-4 w-4" />
                          <span>Vidéo</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {doctor.isPremium && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      Cette consultation nécessite un abonnement Premium. 
                      <button className="font-medium underline ml-1">Passer Premium</button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUpcomingTab = () => (
    <div className="space-y-6">
      {upcomingConsultations.length > 0 ? (
        <div className="space-y-4">
          {upcomingConsultations.map((consultation) => (
            <div key={consultation.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-pink-100 rounded-full p-3">
                    {consultation.type === 'video' ? 
                      <Video className="h-6 w-6 text-pink-600" /> :
                      <Phone className="h-6 w-6 text-pink-600" />
                    }
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{consultation.doctor}</h3>
                    <p className="text-gray-600">
                      {new Date(consultation.date).toLocaleDateString('fr-FR')} à {consultation.time}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        consultation.type === 'video' 
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {consultation.type === 'video' ? 'Vidéo' : 'Audio'}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Confirmé
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Annuler
                  </button>
                  <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                    Rejoindre
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune consultation prévue</h3>
          <p className="text-gray-600 mb-6">Réservez votre première consultation avec un professionnel de santé</p>
          <button 
            onClick={() => setActiveTab('book')}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Réserver une consultation
          </button>
        </div>
      )}
    </div>
  );

  const renderHistoryTab = () => (
    <div className="text-center py-12">
      <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun historique</h3>
      <p className="text-gray-600">Vos consultations passées apparaîtront ici</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Téléconsultation</h1>
        <p className="text-gray-600">
          Consultez des professionnels de santé à distance, en toute sécurité
        </p>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'book' && renderBookingTab()}
          {activeTab === 'upcoming' && renderUpcomingTab()}
          {activeTab === 'history' && renderHistoryTab()}
        </div>
      </div>

      {/* Section Premium */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full p-4 w-fit mx-auto mb-6">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Accès Premium : Consultations illimitées
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Avec Premium, bénéficiez de consultations illimitées avec tous nos spécialistes, 
            du suivi IA personnalisé et de l'accès prioritaire aux créneaux.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Video, title: 'Consultations illimitées', desc: 'Tous spécialistes inclus' },
              { icon: Users, title: 'Accès prioritaire', desc: 'Créneaux en avant-première' },
              { icon: Heart, title: 'Suivi personnalisé', desc: 'IA santé et recommandations' }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full p-3 w-fit mx-auto mb-3">
                  <feature.icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 font-semibold">
            Passer Premium - 29€/mois
          </button>
        </div>
      </div>
    </div>
  );
};

export default Consultation;