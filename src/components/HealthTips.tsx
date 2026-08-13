import React, { useState } from 'react';
import { BookOpen, Clock, Star, Lock, Search, ListFilter as Filter, Play } from 'lucide-react';
import type { HealthTip } from '../types';
import ArticleDetail from './ArticleDetail';

const HealthTips: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<HealthTip | null>(null);

  const healthTips: HealthTip[] = [
    {
      id: '1',
      title: 'L\'alimentation pendant la grossesse',
      category: 'nutrition',
      content: 'Une alimentation équilibrée est essentielle pour le développement de votre bébé. Privilégiez les fruits, légumes, protéines et évitez l\'alcool.',
      fullContent: `
        <h2>L'importance d'une alimentation équilibrée</h2>
        <p>Pendant la grossesse, votre alimentation joue un rôle crucial dans le développement de votre bébé. Une nutrition adéquate contribue à la formation des organes, du système nerveux et à la croissance générale du fœtus.</p>
        
        <h3>Les nutriments essentiels</h3>
        <ul>
          <li><strong>Acide folique :</strong> Prévient les malformations du tube neural</li>
          <li><strong>Fer :</strong> Évite l'anémie et favorise l'oxygénation</li>
          <li><strong>Calcium :</strong> Développement des os et des dents</li>
          <li><strong>Protéines :</strong> Croissance des tissus</li>
        </ul>
        
        <h3>Aliments à privilégier</h3>
        <p>Concentrez-vous sur des aliments riches en nutriments : légumes verts, fruits frais, poissons gras, légumineuses, produits laitiers et céréales complètes.</p>
        
        <h3>Aliments à éviter</h3>
        <p>Évitez l'alcool, limitez la caféine, évitez les poissons riches en mercure et les fromages non pasteurisés.</p>
      `,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      isVideo: false,
      isPremium: false,
      readTime: 5,
      author: 'Dr. Marie Nutritionniste',
      publishedDate: '2025-01-10'
    },
    {
      id: '2',
      title: 'Exercices sécurisés pour femmes enceintes',
      category: 'exercise',
      content: 'La marche, la natation et le yoga prénatal sont d\'excellents exercices pendant la grossesse.',
      fullContent: `
        <h2>Rester active pendant la grossesse</h2>
        <p>L'exercice physique pendant la grossesse présente de nombreux avantages pour la mère et le bébé, à condition d'être pratiqué de manière sécurisée.</p>
        
        <h3>Bénéfices de l'exercice</h3>
        <ul>
          <li>Améliore la circulation sanguine</li>
          <li>Réduit les douleurs dorsales</li>
          <li>Prépare le corps à l'accouchement</li>
          <li>Améliore l'humeur et réduit le stress</li>
        </ul>
        
        <h3>Exercices recommandés</h3>
        <p><strong>Marche :</strong> Activité douce et accessible à tous les niveaux de forme physique.</p>
        <p><strong>Natation :</strong> Excellent exercice cardiovasculaire sans impact sur les articulations.</p>
        <p><strong>Yoga prénatal :</strong> Améliore la flexibilité et aide à la relaxation.</p>
      `,
      image: 'https://images.pexels.com/photos/396133/pexels-photo-396133.jpeg?auto=compress&cs=tinysrgb&w=800',
      isVideo: false,
      isPremium: false,
      readTime: 7,
      author: 'Sarah Coach Sportif',
      publishedDate: '2025-01-08'
    },
    {
      id: '3',
      title: 'Gestion du stress et relaxation',
      category: 'wellness',
      content: 'Techniques de respiration, méditation et relaxation pour un bien-être optimal pendant la grossesse.',
      fullContent: `
        <h2>Gérer le stress pendant la grossesse</h2>
        <p>Le stress peut avoir des effets négatifs sur la grossesse. Apprendre à le gérer est essentiel pour votre bien-être et celui de votre bébé.</p>
        
        <h3>Techniques de relaxation</h3>
        <p><strong>Respiration profonde :</strong> Inspirez lentement par le nez, retenez quelques secondes, expirez par la bouche.</p>
        <p><strong>Méditation :</strong> 10 minutes par jour peuvent considérablement réduire le stress.</p>
        <p><strong>Visualisation positive :</strong> Imaginez des scènes apaisantes et positives.</p>
      `,
      image: 'https://images.pexels.com/photos/3984824/pexels-photo-3984824.jpeg?auto=compress&cs=tinysrgb&w=800',
      isVideo: false,
      isPremium: false,
      readTime: 6,
      author: 'Dr. Claire Psychologue',
      publishedDate: '2025-01-05'
    },
    {
      id: '4',
      title: 'Préparation de la chambre de bébé',
      category: 'preparation',
      content: 'Guide complet pour préparer l\'arrivée de bébé : mobilier, sécurité et essentiels.',
      fullContent: `
        <h2>Préparer l'arrivée de bébé</h2>
        <p>La préparation de la chambre de bébé est un moment excitant. Voici nos conseils pour créer un environnement sûr et accueillant.</p>
        
        <h3>Éléments essentiels</h3>
        <ul>
          <li>Lit à barreaux conforme aux normes de sécurité</li>
          <li>Matelas ferme et adapté</li>
          <li>Table à langer sécurisée</li>
          <li>Rangements pratiques</li>
        </ul>
        
        <h3>Sécurité avant tout</h3>
        <p>Vérifiez que tous les meubles sont fixés au mur, que les prises électriques sont protégées et que la peinture utilisée est non toxique.</p>
      `,
      image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
      isVideo: false,
      isPremium: false,
      readTime: 10,
      author: 'Emma Décoratrice',
      publishedDate: '2025-01-03'
    },
    {
      id: '5',
      title: 'Vidéo : Nutrition personnalisée par IA',
      category: 'nutrition',
      content: 'Recommandations alimentaires personnalisées basées sur votre profil et vos besoins spécifiques.',
      fullContent: 'Contenu vidéo premium avec recommandations IA personnalisées.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video1.mp4',
      isVideo: true,
      isPremium: true,
      readTime: 8,
      author: 'IA Nutritionnelle',
      publishedDate: '2025-01-12'
    },
    {
      id: '6',
      title: 'Vidéo : Programme d\'exercices adapté',
      category: 'exercise',
      content: 'Programme d\'exercices personnalisé selon votre trimestre et condition physique, avec suivi intelligent.',
      fullContent: 'Vidéo d\'exercices personnalisés avec suivi IA.',
      image: 'https://images.pexels.com/photos/396133/pexels-photo-396133.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video2.mp4',
      isVideo: true,
      isPremium: true,
      readTime: 12,
      author: 'Coach IA Fitness',
      publishedDate: '2025-01-11'
    },
    {
      id: '7',
      title: 'Coaching bien-être premium',
      category: 'wellness',
      content: 'Accompagnement personnalisé avec conseils d\'experts et suivi psychologique.',
      fullContent: `
        <h2>Accompagnement personnalisé Premium</h2>
        <p>Notre service premium vous offre un accompagnement complet avec des experts en périnatalité.</p>
        
        <h3>Services inclus</h3>
        <ul>
          <li>Consultations illimitées avec psychologues périnataux</li>
          <li>Suivi personnalisé par IA</li>
          <li>Plans de bien-être sur mesure</li>
          <li>Accès prioritaire aux spécialistes</li>
        </ul>
        
        <h3>Votre coach dédié</h3>
        <p>Un professionnel vous accompagne tout au long de votre grossesse avec des conseils adaptés à votre situation unique.</p>
      `,
      image: 'https://images.pexels.com/photos/3984824/pexels-photo-3984824.jpeg?auto=compress&cs=tinysrgb&w=800',
      isVideo: false,
      isPremium: true,
      readTime: 15,
      author: 'Équipe Premium',
      publishedDate: '2025-01-09'
    },
    {
      id: '8',
      title: 'Vidéo : Checklist naissance intelligente',
      category: 'preparation',
      content: 'Liste personnalisée et interactive pour préparer l\'accouchement et les premiers jours.',
      fullContent: 'Vidéo interactive avec checklist personnalisée.',
      image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video3.mp4',
      isVideo: true,
      isPremium: true,
      readTime: 20,
      author: 'Assistant IA',
      publishedDate: '2025-01-07'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous les conseils', color: 'bg-gray-100 text-gray-700' },
    { id: 'nutrition', name: 'Nutrition', color: 'bg-green-100 text-green-700' },
    { id: 'exercise', name: 'Exercices', color: 'bg-blue-100 text-blue-700' },
    { id: 'wellness', name: 'Bien-être', color: 'bg-purple-100 text-purple-700' },
    { id: 'preparation', name: 'Préparation', color: 'bg-orange-100 text-orange-700' }
  ];

  const filteredTips = healthTips.filter(tip => {
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const freeTips = filteredTips.filter(tip => !tip.isPremium);
  const premiumTips = filteredTips.filter(tip => tip.isPremium);

  const handleReadArticle = (tip: HealthTip) => {
    setSelectedArticle(tip);
  };

  const handleUpgradeToPremium = () => {
    alert('Redirection vers la page d\'abonnement Premium...');
  };

  if (selectedArticle) {
    return (
      <ArticleDetail
        article={selectedArticle}
        onBack={() => setSelectedArticle(null)}
        onUpgradeToPremium={handleUpgradeToPremium}
      />
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Conseils santé</h1>
        <p className="text-gray-600">
          Découvrez nos conseils d'experts pour une grossesse sereine et épanouie
        </p>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un conseil..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? category.color.replace('100', '200')
                      : category.color + ' hover:' + category.color.replace('100', '200')
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Conseils gratuits */}
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="h-6 w-6 text-pink-500" />
            <h2 className="text-xl font-semibold text-gray-900">Conseils gratuits</h2>
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
              {freeTips.length} articles
            </span>
          </div>

          <div className="grid gap-6">
            {freeTips.map((tip) => (
              <article key={tip.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                {tip.image && (
                  <div className="relative mb-4 h-48 rounded-lg overflow-hidden">
                    <img
                      src={tip.image}
                      alt={tip.title}
                      className="w-full h-full object-cover"
                    />
                    {tip.isVideo && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="bg-white rounded-full p-3">
                          <Play className="h-6 w-6 text-gray-900" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      categories.find(c => c.id === tip.category)?.color || 'bg-gray-100 text-gray-700'
                    }`}>
                      {categories.find(c => c.id === tip.category)?.name || tip.category}
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{tip.readTime} min</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Par {tip.author}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {tip.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {tip.content}
                </p>

                <button 
                  onClick={() => handleReadArticle(tip)}
                  className="text-pink-600 hover:text-pink-700 font-medium text-sm transition-colors"
                >
                  Lire l'article complet →
                </button>
              </article>
            ))}
          </div>
        </div>

        {/* Section Premium */}
        <div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100 mb-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 w-fit mx-auto mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Accès Premium</h3>
              <p className="text-gray-600 text-sm mb-4">
                Débloquez tous les conseils personnalisés, programmes sur mesure et accompagnement d'experts.
              </p>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 text-sm font-medium">
                Passer Premium
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="h-5 w-5 text-yellow-500" />
              <h3 className="font-semibold text-gray-900">Conseils Premium</h3>
            </div>

            <div className="space-y-4">
              {premiumTips.slice(0, 4).map((tip) => (
                <div key={tip.id} className="relative">
                  {tip.image && (
                    <div className="relative mb-3 h-32 rounded-lg overflow-hidden opacity-60">
                      <img
                        src={tip.image}
                        alt={tip.title}
                        className="w-full h-full object-cover"
                      />
                      {tip.isVideo && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <div className="bg-white rounded-full p-2">
                            <Play className="h-4 w-4 text-gray-900" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="opacity-60 pointer-events-none">
                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${
                      categories.find(c => c.id === tip.category)?.color || 'bg-gray-100 text-gray-700'
                    }`}>
                      {categories.find(c => c.id === tip.category)?.name}
                      {tip.isVideo && <span className="ml-1">📹</span>}
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{tip.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {tip.content.substring(0, 100)}...
                    </p>
                    <div className="flex items-center space-x-1 text-gray-500 mt-2">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{tip.readTime} min</span>
                      <span className="text-xs">• {tip.author}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleReadArticle(tip)}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="bg-white rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform">
                      {tip.isVideo ? (
                        <div className="flex items-center space-x-2">
                          <Lock className="h-5 w-5 text-yellow-500" />
                          <Play className="h-4 w-4 text-gray-600" />
                        </div>
                      ) : (
                        <Lock className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Votre progression</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Articles lus</span>
                  <span className="font-medium">12/24</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>🏆 Bravo ! Vous avez lu 12 articles ce mois-ci</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;