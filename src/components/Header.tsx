import React, { useState } from 'react';
import { Bell, User, LogOut, Crown, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const { user, logout, getAvailableFeatures, getUserDisplayName, getUserRoleDisplay } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const availableFeatures = getAvailableFeatures();

  const allNavigation = [
    { id: 'dashboard', name: 'Tableau de bord' },
    { id: 'pregnancy', name: 'Ma Grossesse' },
    { id: 'calendar', name: 'Calendrier' },
    { id: 'centers', name: 'Centres de santé' },
    { id: 'tips', name: 'Conseils' },
    { id: 'shop', name: 'Boutique' },
    { id: 'consultation', name: 'Téléconsultation' },
    { id: 'patients', name: 'Mes Patients' },
    { id: 'merchant-dashboard', name: 'Mon Commerce' },
    { id: 'products', name: 'Mes Produits' },
    { id: 'orders', name: 'Commandes' },
    { id: 'admin', name: 'Administration' },
  ];

  const navigation = allNavigation.filter(item =>
    availableFeatures.includes(item.id)
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 shadow">
        <span className="font-bold text-pink-600 text-lg">Intimia</span>
        <button onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
{/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg 
        transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0`}
      >
        <div className="flex flex-col h-full">

          {/* Header / Logo */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-pink-600 text-xl">Intimia</span>
            <button className="md:hidden" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Navigation (SCROLLABLE) */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-pink-100 text-pink-600'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Section (toujours en bas) */}
          <div className="border-t p-4">
            {user?.isPremium && (
              <div className="flex items-center space-x-2 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
                <Crown className="h-4 w-4" />
                <span>Premium</span>
              </div>
            )}

            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-pink-100 rounded-full p-2">
                <User className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {getUserDisplayName()}
                </p>
                <p className="text-xs text-gray-500">
                  {getUserRoleDisplay()}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-500 hover:text-red-500 text-sm"
            >
              <LogOut className="h-4 w-4" />
              <span>Se déconnecter</span>
            </button>
          </div>

        </div>
      </aside>

    </>
  );
};

export default Header;
