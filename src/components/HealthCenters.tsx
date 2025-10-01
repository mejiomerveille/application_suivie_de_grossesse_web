import React, { useState } from 'react';
import { MapPin, Phone, Mail, Star, Clock, Navigation, Filter } from 'lucide-react';
import { useHealthCenters } from '../hooks/useHealthCenters';

const HealthCenters: React.FC = () => {
  const { centers, isLoading } = useHealthCenters();
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('distance');

  const specialties = [
    { id: 'all', name: 'Toutes spécialités' },
    { id: 'gynecology', name: 'Gynécologie' },
    { id: 'obstetrics', name: 'Obstétrique' },
    { id: 'pediatrics', name: 'Pédiatrie' },
    { id: 'emergency', name: 'Urgences' }
  ];

  const filteredCenters = centers.filter(center => {
    if (selectedSpecialty === 'all') return true;
    return center.specialties.some(specialty => 
      specialty.toLowerCase().includes(selectedSpecialty.replace('gynecology', 'gynéco').replace('obstetrics', 'obstét').replace('pediatrics', 'pédiat').replace('emergency', 'urgence'))
    );
  });

  const sortedCenters = [...filteredCenters].sort((a, b) => {
    if (sortBy === 'distance') return a.distance - b.distance;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  const handleGetDirections = (center: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(center.address)}`;
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Centres de santé proches</h1>
        <p className="text-gray-600">
          Trouvez les établissements de santé les plus proches de vous
        </p>
      </div>

      {/* Filtres et tri */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Spécialité :</span>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="distance">Distance</option>
              <option value="rating">Note</option>
              <option value="name">Nom</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des centres */}
      <div className="grid gap-6">
        {sortedCenters.map((center) => (
          <div key={center.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="md:flex">
              {/* Image */}
              <div className="md:w-1/3">
                <div className="h-48 md:h-full">
                  {center.image ? (
                    <img
                      src={center.image}
                      alt={center.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center">
                      <MapPin className="h-16 w-16 text-pink-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Contenu */}
              <div className="md:w-2/3 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {center.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{center.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{center.distance} km</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{center.address}</p>
                  </div>
                </div>

                {/* Spécialités */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {center.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Horaires */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>
                      Aujourd'hui : {center.openingHours[new Date().toLocaleDateString('fr-FR', { weekday: 'long' })] || 'Fermé'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleGetDirections(center)}
                    className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>Itinéraire</span>
                  </button>
                  
                  <a
                    href={`tel:${center.phone}`}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Appeler</span>
                  </a>
                  
                  {center.email && (
                    <a
                      href={`mailto:${center.email}`}
                      className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </a>
                  )}
                </div>

                {/* Horaires détaillés (collapsible) */}
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-pink-600 hover:text-pink-700 font-medium">
                    Voir tous les horaires
                  </summary>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(center.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-medium">{day} :</span>
                        <span className="text-gray-600">{hours}</span>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedCenters.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun centre trouvé</h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </div>
  );
};

export default HealthCenters;