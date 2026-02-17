import React from 'react';
import { Clock, User, ArrowRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  published_date: string;
  image_url?: string;
  read_time?: number;
}

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
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

  // Extraire les premiers mots du contenu pour l'aperçu
  const getPreview = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  const formatDate = (dateStr?: string) => {
  if (!dateStr) return '---';
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('fr-FR');
};


  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(article)}
    >
      {/* Image de l'article */}
      <div className="relative h-48 overflow-hidden">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center">
            <div className="text-4xl">📖</div>
          </div>
        )}
        
        {/* Badge catégorie */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
            {getCategoryName(article.category)}
          </span>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="p-6">
        {/* Titre */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors">
          {article.title}
        </h3>

        {/* Aperçu du contenu */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {getPreview(article.content)}
        </p>

        {/* Métadonnées */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{article.author}</span>
            </div>
            {article.read_time && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{article.read_time} min</span>
              </div>
            )}
          </div>
          <span>{formatDate(article.published_date)}</span>

        </div>

        {/* Bouton de lecture */}

        <div className="flex items-center justify-between">
          <button 
            className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium text-sm group-hover:translate-x-1 transition-transform"
            onClick={() => onClick(article)} 
            >
              <span>Lire l'article</span>
              <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;