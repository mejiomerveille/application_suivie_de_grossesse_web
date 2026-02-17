import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import LandingPage from './components/LandingPage';
import BlogPage from './components/BlogPage';
import AuthScreen from './components/AuthScreen';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import HealthTips from './components/HealthTips';
import HealthCenters from './components/HealthCenters';
import Consultation from './components/Consultation';
import PregnancyTracking from './components/PregnancyTracking';
import Shop from './components/Shop';
import MerchantDashboard from './components/MerchantDashboard';
import ProductManagement from './components/ProductManagement';

function App() {
  const { user, isLoading, getAvailableFeatures } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showLanding, setShowLanding] = useState(true);
  const [showBlog, setShowBlog] = useState(false);
  
  const availableFeatures = getAvailableFeatures();

  // Debug logs pour comprendre l'état
  useEffect(() => {
    console.log('App state:', { user, isLoading, availableFeatures });
  }, [user, isLoading, availableFeatures]);

  // Fonction pour passer de la landing page à l'auth
  const handleGetStarted = () => {
    setShowLanding(false);
    setShowBlog(false);
  };

  // Fonction pour afficher le blog
  const handleShowBlog = () => {
    setShowBlog(true);
    setShowLanding(false);
  };

  // Fonction pour retourner à la landing
  const handleBackToLanding = () => {
    setShowBlog(false);
    setShowLanding(true);
  };

  // Vérifier si la section active est disponible pour l'utilisateur
  useEffect(() => {
    if (user && availableFeatures.length > 0 && !availableFeatures.includes(activeSection)) {
      console.log('Redirecting to dashboard, current section not available:', activeSection);
      setActiveSection('dashboard');
    }
  }, [user, availableFeatures, activeSection]);

  // Écran de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Chargement d'Intimia...</h2>
          <p className="text-gray-500">Préparation de votre espace personnel</p>
        </div>
      </div>
    );
  }

  // Afficher la landing page si pas d'utilisateur et showLanding = true
  if (!user && showLanding && !showBlog) {
    return <LandingPage onGetStarted={handleGetStarted} onShowBlog={handleShowBlog} />;
  }

  // Afficher la page blog
  if (!user && showBlog) {
    return <BlogPage onBack={handleBackToLanding} />;
  }

  // Écran d'authentification si pas d'utilisateur
  if (!user) {
    console.log('No user, showing auth screen');
    return <AuthScreen />;
  }

  console.log('User authenticated, showing main app');

  const renderActiveSection = () => {
    // Vérifier que la section est disponible
    if (!availableFeatures.includes(activeSection)) {
      console.log('Section not available, showing dashboard');
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
      case 'pregnancy':
        return <PregnancyTracking />;
      case 'shop':
        return <Shop />;
      case 'merchant-dashboard':
        return <MerchantDashboard />;
      case 'products':
        return <ProductManagement />;
      default:
        console.log('Unknown section, showing dashboard:', activeSection);
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      
      {/* Sidebar */}
      <Header 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />

      {/* Contenu principal */}
      <main className="flex-1 md:ml-64 p-6">
        {renderActiveSection()}
      </main>

    </div>
  );
}


export default App;