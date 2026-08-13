import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark, Heart } from 'lucide-react';
import { pregnancyApiService } from '../services/pregnancyApi';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  author?: string;
  published_date?: string;
  image_url?: string;
  read_time?: number;
}

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onArticleClick?: (article: Article) => void;
  onUpgradeToPremium?: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack, onArticleClick }) => {
  const [similarArticles, setSimilarArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    loadSimilarArticles();
  }, [article.id]);

  const loadSimilarArticles = async () => {
    try {
      setIsLoading(true);
      // Charger des articles de la même catégorie
      const articles = await pregnancyApiService.getArticles();
      const similar = articles
        .filter(a => a.id !== article.id && a.category === article.category)
        .slice(0, 4);
      setSimilarArticles(similar);
    } catch (error) {
      console.error('Erreur lors du chargement des articles similaires:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'medical':
        return 'bg-blue-100 text-blue-700';
      case 'nutrition':
        return 'bg-green-100 text-green-700';
      case 'exercise':
        return 'bg-purple-100 text-purple-700';
      case 'wellness':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category.toLowerCase()) {
      case 'medical':
        return 'Médical';
      case 'nutrition':
        return 'Nutrition';
      case 'exercise':
        return 'Exercices';
      case 'wellness':
        return 'Bien-être';
      default:
        return category;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Retour aux articles</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Contenu principal */}
        <div className="lg:col-span-3">
          <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Image de l'article */}
            {article.image_url && (
              <div className="relative h-64 md:h-80">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 md:p-8">
              {/* Métadonnées */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                  {getCategoryName(article.category)}
                </span>
                <div className="flex items-center space-x-1 text-gray-500">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{article.author}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {article.published_date && new Date(article.published_date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                {article.read_time && (
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{article.read_time} min de lecture</span>
                  </div>
                )}
              </div>

              {/* Titre */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Actions */}
              <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>J'aime</span>
                </button>
                
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isBookmarked 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span>Sauvegarder</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Partager</span>
                </button>
              </div>

              {/* Contenu de l'article */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {article.content}
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar avec articles similaires */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Articles similaires
              </h3>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-gray-200 rounded-lg mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : similarArticles.length > 0 ? (
                <div className="space-y-4">
                  {similarArticles.map((similarArticle) => (
                    <div
                      key={similarArticle.id}
                      onClick={() => onArticleClick?.(similarArticle)}
                      className="cursor-pointer group"
                    >
                      <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0">
                          {similarArticle.image_url ? (
                            <img
                              src={similarArticle.image_url}
                              alt={similarArticle.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-lg">📖</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-pink-600 transition-colors">
                            {similarArticle.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">{similarArticle.author}</span>
                            {similarArticle.read_time && (
                              <>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">{similarArticle.read_time} min</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Aucun article similaire trouvé.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;