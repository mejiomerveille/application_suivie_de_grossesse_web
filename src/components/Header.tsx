import React from 'react';
import { Bell, User, LogOut, Crown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const { user, logout, getAvailableFeatures, getUserDisplayName, getUserRoleDisplay } = useAuth();

  const availableFeatures = getAvailableFeatures();

  const allNavigation = [
    { id: 'dashboard', name: 'Tableau de bord', roles: ['patient', 'family', 'professional', 'admin'] },
    { id: 'pregnancy', name: 'Ma Grossesse', roles: ['patient'] },
    { id: 'calendar', name: 'Calendrier', roles: ['patient', 'family', 'professional'] },
    { id: 'centers', name: 'Centres de santé', roles: ['patient', 'family'] },
    { id: 'tips', name: 'Conseils', roles: ['patient', 'family'] },
    { id: 'shop', name: 'Boutique', roles: ['patient', 'family'] },
    { id: 'consultation', name: 'Téléconsultation', roles: ['patient', 'family', 'professional'] },
    { id: 'patients', name: 'Mes Patients', roles: ['professional'] },
    { id: 'merchant-dashboard', name: 'Mon Commerce', roles: ['merchant'] },
    { id: 'products', name: 'Mes Produits', roles: ['merchant'] },
    { id: 'orders', name: 'Commandes', roles: ['merchant'] },
    { id: 'admin', name: 'Administration', roles: ['admin'] },
  ];

  const navigation = allNavigation.filter(item => availableFeatures.includes(item.id));

  return (
    <header className="bg-white shadow-sm border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-lg p-2">
                <span className="text-white font-bold text-lg">Intimia</span>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-pink-600 bg-pink-50'
                      : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user?.isPremium && (
              <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                <Crown className="h-4 w-4" />
                <span>Premium</span>
              </div>
            )}
            
            <button className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-pink-400"></span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="bg-pink-100 rounded-full p-2">
                  <User className="h-5 w-5 text-pink-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs text-gray-500">{getUserRoleDisplay()}</p>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Se déconnecter"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;