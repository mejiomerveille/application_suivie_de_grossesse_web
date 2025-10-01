import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import AuthScreen from './components/AuthScreen';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import HealthTips from './components/HealthTips';
import HealthCenters from './components/HealthCenters';
import Consultation from './components/Consultation';

function App() {
  const { user, isLoading, getAvailableFeatures } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  
  const availableFeatures = getAvailableFeatures();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  // Vérifier si la section active est disponible pour l'utilisateur
  React.useEffect(() => {
    if (user && !availableFeatures.includes(activeSection)) {
      setActiveSection('dashboard');
    }
  }, [user, availableFeatures, activeSection]);

  const renderActiveSection = () => {
    if (!availableFeatures.includes(activeSection)) {
      return <Dashboard />;
    }

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'calendar':
        return <Calendar />;
      case 'centers':
        return <HealthCenters />;
      case 'tips':
        return <HealthTips />;
      case 'consultation':
        return <Consultation />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      <main>
        {renderActiveSection()}
      </main>
    </div>
  );
}

export default App;