import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Heart, Baby } from 'lucide-react';
import ArticleCard from '../ArticleCard';
import { pregnancyApiService } from '../../services/pregnancyApi';
import { usePregnancy } from '../../hooks/usePregnancy';
import { useAuth } from '../../hooks/useAuth';

const UpcomingAppointments: React.FC = () => {
  const { user } =  useAuth();
  const { 
    profile, 
    currentWeek,  
    daysUntilDue,
    isLoading: pregnancyLoading,
    error: pregnancyError,
    getWeekInfo 
  } = usePregnancy(user?.pregnancyStartDate);

  const [articles, setArticles] = useState<any[]>([]);  
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const appointments = [
    { title: 'Consultation prénatale', date: '2025-01-20', time: '10:30', type: 'medical' },
    { title: 'Échographie T2', date: '2025-02-05', time: '14:00', type: 'exam' }
  ];

  const fetchArticles = async (week?: number) => {
    try {
      const response = await pregnancyApiService.getArticles(week);
      const guidesArray = Array.isArray(response.data) ? response.data : [];
      setArticles(guidesArray);
    } catch (error) {
      console.error('Erreur lors du chargement des guides nutritionnels:', error);
      setArticles([]);
    }
  };

  useEffect(() => {
    if (currentWeek) {
      fetchArticles(currentWeek);
    }
  }, [currentWeek]);

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
  };

  const handleBackFromArticle = () => {
    setSelectedArticle(null);
  };

  if (pregnancyLoading) return <p>Chargement des données de grossesse...</p>;
  if (pregnancyError) return <p>Erreur : {pregnancyError.message}</p>;

  return (
    <div className="space-y-6">
      {/* Informations principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border border-pink-200">
          <div className="flex items-center justify-between mb-4">
            <Baby className="h-8 w-8 text-pink-600" />
            <span className="text-2xl font-bold text-pink-700">{currentWeek}</span>
          </div>
          <h3 className="font-semibold text-pink-900 mb-1">Semaine de grossesse</h3>
          <p className="text-pink-700 text-sm">{profile?.babySize || 'Taille du bébé en développement'}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-700">{daysUntilDue || '---'}</span>
          </div>
          <h3 className="font-semibold text-blue-900 mb-1">Jours restants</h3>
          <p className="text-blue-700 text-sm">Jusqu'à la date prévue</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <Heart className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-700">{profile?.trimester || 1}</span>
          </div>
          <h3 className="font-semibold text-green-900 mb-1">Trimestre</h3>
          <p className="text-green-700 text-sm">Étape actuelle</p>
        </div>
      </div>

      {/* Développement du bébé */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Développement cette semaine</h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>{profile?.weeklyDevelopment || 'Informations sur le développement du bébé pour cette semaine.'}</p>
        </div>
      </div>

      {/* Articles recommandés */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Articles recommandés</h2>
          <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
            Voir tout →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.length > 0 ? (
            articles.slice(0, 4).map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => handleArticleClick(article)}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-8">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun article disponible</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointments;
