import React from 'react';
import { ArrowLeft, Clock, User, Calendar, Play, Lock, Crown } from 'lucide-react';
import type { HealthTip } from '../types';

interface ArticleDetailProps {
  article: HealthTip;
  onBack: () => void;
  onUpgradeToPremium?: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack, onUpgradeToPremium }) => {
  const handleVideoPlay = () => {
    if (article.isPremium) {
      onUpgradeToPremium?.();
    } else {
      // Logique pour lire la vidéo
      console.log('Lecture de la vidéo:', article.videoUrl);
    }
  };

  const categoryColors = {
    nutrition: 'bg-green-100 text-green-700',
    exercise: 'bg-blue-100 text-blue-700',
    wellness: 'bg-purple-100 text-purple-700',
    preparation: 'bg-orange-100 text-orange-700'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Retour aux conseils</span>
      </button>

      {/* En-tête de l'article */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        {/* Image de l'article */}
        {article.image && (
          <div className="relative h-64 md:h-80">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            {article.isVideo && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <button
                  onClick={handleVideoPlay}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    article.isPremium
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {article.isPremium ? <Lock className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  <span>{article.isPremium ? 'Premium requis' : 'Lire la vidéo'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Métadonnées */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[article.category]}`}>
              {article.category === 'nutrition' ? 'Nutrition' :
               article.category === 'exercise' ? 'Exercices' :
               article.category === 'wellness' ? 'Bien-être' : 'Préparation'}
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{article.readTime} min de lecture</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <User className="h-4 w-4" />
              <span className="text-sm">{article.author}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {new Date(article.publishedDate).toLocaleDateString('fr-FR')}
              </span>
            </div>
            {article.isPremium && (
              <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                <Crown className="h-4 w-4" />
                <span className="text-sm font-medium">Premium</span>
              </div>
            )}
          </div>

          {/* Titre */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Résumé */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article.content}
          </p>
        </div>
      </div>

      {/* Contenu de l'article */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        {article.isPremium && !article.isVideo ? (
          // Contenu premium verrouillé (articles texte)
          <div className="relative">
            <div className="opacity-30 pointer-events-none">
              <div className="prose prose-lg max-w-none">
                <p>{article.fullContent.substring(0, 300)}...</p>
                <h3>Section suivante</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                <h3>Conseils pratiques</h3>
                <ul>
                  <li>Conseil numéro 1</li>
                  <li>Conseil numéro 2</li>
                  <li>Conseil numéro 3</li>
                </ul>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-4 w-fit mx-auto mb-4">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contenu Premium</h3>
                <p className="text-gray-600 mb-6">
                  Accédez à l'article complet avec nos conseils d'experts et recommandations personnalisées.
                </p>
                <button
                  onClick={onUpgradeToPremium}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 font-semibold"
                >
                  Passer Premium
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Contenu gratuit ou premium déverrouillé
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.fullContent }} />
          </div>
        )}
      </div>

      {/* Articles similaires */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles similaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Placeholder pour articles similaires */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="font-semibold text-gray-900 mb-2">Article similaire 1</h3>
            <p className="text-gray-600 text-sm">Description de l'article similaire...</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="font-semibold text-gray-900 mb-2">Article similaire 2</h3>
            <p className="text-gray-600 text-sm">Description de l'article similaire...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;