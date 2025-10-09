import React, { useState, useEffect } from 'react';
import { Baby, Calendar, BookOpen, Heart, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';
import { usePregnancy } from '../hooks/usePregnancy';
import { pregnancyApiService } from '../services/pregnancyApi';
import ArticleCard from './ArticleCard';
import ArticleDetail from './ArticleDetail';

const PregnancyTracking: React.FC = () => {
  const { pregnancyData, updatePregnancyData } = usePregnancy();
  const [activeTab, setActiveTab] = useState('overview');
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMood, setSelectedMood] = useState('');
  const [diaryNote, setDiaryNote] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const currentWeek = pregnancyData?.currentWeek || 1;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const weekArticles = await pregnancyApiService.getWeeklyContent(currentWeek);
        setArticles(weekArticles);
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
      }
    };

    fetchArticles();
  }, [currentWeek]);

  useEffect(() => {
    const loadDiaryEntry = async () => {
      try {
        const entry = await pregnancyApiService.getDiaryEntry(selectedDate);
        if (entry) {
          setSelectedMood(entry.mood || '');
          setDiaryNote(entry.note || '');
        } else {
          setSelectedMood('');
          setDiaryNote('');
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'entrée du journal:', error);
      }
    };

    loadDiaryEntry();
  }, [selectedDate]);

  useEffect(() => {
    const saveDiaryEntry = async () => {
      if (selectedMood || diaryNote) {
        try {
          await pregnancyApiService.saveDiaryEntry({
            date: selectedDate,
            mood: selectedMood,
            note: diaryNote
          });
        } catch (error) {
          console.error('Erreur lors de la sauvegarde:', error);
        }
      }
    };

    const timeoutId = setTimeout(saveDiaryEntry, 1000);
    return () => clearTimeout(timeoutId);
  }, [selectedDate, selectedMood, diaryNote]);

  useEffect(() => {
    const fetchPregnancyData = async () => {
      try {
        const data = await pregnancyApiService.getPregnancyData();
        if (data) {
          updatePregnancyData(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données de grossesse:', error);
      }
    };

    fetchPregnancyData();
  }, []);

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
  };

  const handleBackFromArticle = () => {
    setSelectedArticle(null);
  };

  // Si un article est sélectionné, afficher la page de détail
  if (selectedArticle) {
    return (
      <ArticleDetail
        article={selectedArticle}
        onBack={handleBackFromArticle}
        onArticleClick={handleArticleClick}
      />
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Informations principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border border-pink-200">
          <div className="flex items-center justify-between mb-4">
            <Baby className="h-8 w-8 text-pink-600" />
            <span className="text-2xl font-bold text-pink-700">{currentWeek}</span>
          </div>
          <h3 className="font-semibold text-pink-900 mb-1">Semaine de grossesse</h3>
          <p className="text-pink-700 text-sm">
            {pregnancyData?.babySize || 'Taille du bébé en développement'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-700">
              {pregnancyData?.daysRemaining || '---'}
            </span>
          </div>
          <h3 className="font-semibold text-blue-900 mb-1">Jours restants</h3>
          <p className="text-blue-700 text-sm">Jusqu'à la date prévue</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <Heart className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-700">
              {pregnancyData?.trimester || 1}
            </span>
          </div>
          <h3 className="font-semibold text-green-900 mb-1">Trimestre</h3>
          <p className="text-green-700 text-sm">Étape actuelle</p>
        </div>
      </div>

      {/* Développement du bébé */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Développement cette semaine</h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>{pregnancyData?.weeklyDevelopment || 'Informations sur le développement du bébé pour cette semaine.'}</p>
        </div>
      </div>

      {/* Articles recommandés */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Articles recommandés</h2>
          <button 
            onClick={() => setActiveTab('content')}
            className="text-pink-600 hover:text-pink-700 font-medium text-sm"
          >
            Voir tout →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.length > 0 ? (
            articles.slice(0, 4).map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={handleArticleClick}
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

  const renderDiary = () => (
    <div className="space-y-6">
      {/* Sélecteur de date */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Journal de grossesse</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        {/* Sélecteur d'humeur */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Comment vous sentez-vous aujourd'hui ?
          </label>
          <div className="grid grid-cols-5 gap-3">
            {[
              { emoji: '😊', label: 'Très bien', value: 'great' },
              { emoji: '🙂', label: 'Bien', value: 'good' },
              { emoji: '😐', label: 'Neutre', value: 'neutral' },
              { emoji: '😔', label: 'Pas bien', value: 'bad' },
              { emoji: '😰', label: 'Très mal', value: 'terrible' }
            ].map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedMood === mood.value
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <div className="text-xs text-gray-600">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Zone de texte pour les notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes personnelles
          </label>
          <textarea
            value={diaryNote}
            onChange={(e) => setDiaryNote(e.target.value)}
            placeholder="Décrivez votre journée, vos sensations, vos questions..."
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
          />
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      {/* Contenu personnalisé de la semaine */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Contenu de la semaine {currentWeek}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={handleArticleClick}
            />
          ))}
        </div>
        
        {articles.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun article disponible pour cette semaine</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Suivi de grossesse</h1>
        <p className="text-gray-600">Suivez votre parcours de grossesse semaine par semaine</p>
      </div>

      {/* Navigation par onglets */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
            { id: 'diary', label: 'Journal', icon: BookOpen },
            { id: 'content', label: 'Contenu', icon: Heart }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'diary' && renderDiary()}
      {activeTab === 'content' && renderContent()}
    </div>
  );
};

export default PregnancyTracking;