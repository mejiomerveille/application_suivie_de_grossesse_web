import React, { useState } from 'react';
import { 
  Heart, 
  Smartphone, 
  Calendar, 
  Video, 
  ShoppingBag, 
  Users, 
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  BookOpen,
  Clock,
  User,
  ChevronRight
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  category: string;
}

const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  const features = [
    {
      icon: Calendar,
      title: "Suivi personnalisé",
      description: "Suivez votre grossesse semaine par semaine avec du contenu adapté à votre progression",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Video,
      title: "Téléconsultations",
      description: "Consultez des professionnels de santé à distance, en toute sécurité",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: ShoppingBag,
      title: "Boutique intégrée",
      description: "Découvrez les meilleurs produits pour bébé chez nos partenaires locaux",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Échangez avec d'autres futures mamans et des experts",
      color: "from-purple-500 to-violet-500"
    }
  ];

  const benefits = [
    {
      title: "Avant Intimia",
      problems: [
        "Rendez-vous médicaux espacés",
        "Informations dispersées sur internet",
        "Difficile de trouver des produits de qualité",
        "Isolement et questions sans réponses"
      ]
    },
    {
      title: "Avec Intimia",
      solutions: [
        "Suivi quotidien personnalisé",
        "Contenu médical certifié et adapté",
        "Boutique curatée avec produits vérifiés",
        "Communauté bienveillante et experts disponibles"
      ]
    }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Les premiers signes de grossesse : ce qu\'il faut savoir',
      excerpt: 'Découvrez les signes précoces qui peuvent indiquer une grossesse et quand faire un test.',
      content: `
        <h2>Les signes précoces de grossesse</h2>
        <p>La grossesse s'accompagne de nombreux changements dans le corps de la femme. Certains signes peuvent apparaître très tôt, parfois avant même le retard de règles.</p>
        
        <h3>1. L'absence de règles</h3>
        <p>C'est souvent le premier signe qui alerte. Si vos cycles sont réguliers et que vos règles ont plus d'une semaine de retard, il peut être temps de faire un test.</p>
        
        <h3>2. Les nausées matinales</h3>
        <p>Contrairement à leur nom, les nausées peuvent survenir à tout moment de la journée. Elles touchent environ 80% des femmes enceintes.</p>
        
        <h3>3. La fatigue</h3>
        <p>Une fatigue inhabituelle peut être l'un des premiers signes. Votre corps travaille dur pour soutenir la grossesse naissante.</p>
        
        <h3>4. Les changements mammaires</h3>
        <p>Seins tendus, sensibles ou plus volumineux peuvent indiquer les changements hormonaux de début de grossesse.</p>
        
        <h3>Quand consulter ?</h3>
        <p>Dès que vous suspectez une grossesse, prenez rendez-vous avec votre médecin ou sage-femme pour confirmer et commencer le suivi prénatal.</p>
      `,
      author: 'Dr. Marie Dubois',
      date: '2025-01-15',
      readTime: 5,
      image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Grossesse'
    },
    {
      id: '2',
      title: 'Alimentation pendant la grossesse : guide complet',
      excerpt: 'Tout ce que vous devez savoir sur la nutrition pendant la grossesse pour vous et votre bébé.',
      content: `
        <h2>Une alimentation équilibrée pour deux</h2>
        <p>Pendant la grossesse, votre alimentation joue un rôle crucial dans le développement de votre bébé et votre propre santé.</p>
        
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
      author: 'Nutritionniste Sarah Martin',
      date: '2025-01-12',
      readTime: 8,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Nutrition'
    },
    {
      id: '3',
      title: 'Préparer l\'arrivée de bébé : checklist essentielle',
      excerpt: 'Une liste complète pour bien préparer l\'arrivée de votre bébé sans rien oublier.',
      content: `
        <h2>Se préparer sereinement</h2>
        <p>L'arrivée d'un bébé nécessite une certaine préparation. Voici une checklist pour vous aider à tout organiser.</p>
        
        <h3>Pour la chambre de bébé</h3>
        <ul>
          <li>Lit à barreaux conforme aux normes</li>
          <li>Matelas ferme et adapté</li>
          <li>Table à langer sécurisée</li>
          <li>Rangements pratiques</li>
        </ul>
        
        <h3>Pour les premiers soins</h3>
        <ul>
          <li>Thermomètre</li>
          <li>Produits d'hygiène doux</li>
          <li>Couches nouveau-né</li>
          <li>Vêtements de naissance</li>
        </ul>
        
        <h3>Pour l'allaitement</h3>
        <ul>
          <li>Soutiens-gorge d'allaitement</li>
          <li>Coussinets d'allaitement</li>
          <li>Tire-lait si nécessaire</li>
          <li>Biberons et tétines</li>
        </ul>
      `,
      author: 'Emma Conseillère',
      date: '2025-01-10',
      readTime: 6,
      image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Préparation'
    }
  ];

  if (selectedBlogPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setSelectedBlogPost(null)}
            className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 mb-6 transition-colors"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
            <span>Retour au blog</span>
          </button>

          <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img
                src={selectedBlogPost.image}
                alt={selectedBlogPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                  {selectedBlogPost.category}
                </span>
                <div className="flex items-center space-x-1 text-gray-500">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{selectedBlogPost.author}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{selectedBlogPost.readTime} min</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {selectedBlogPost.title}
              </h1>

              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedBlogPost.content }}
              />
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-rose-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Heart className="h-8 w-8 text-pink-500" />
                <span className="text-2xl font-bold text-gray-900">Intimia</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Votre compagnon de
                <span className="text-pink-500"> grossesse</span>
                <br />digital et sécurisé
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Suivez votre grossesse semaine après semaine, accédez à des conseils d'experts 
                et connectez-vous avec des professionnels de santé, le tout depuis votre smartphone.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Commencer gratuitement</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-pink-500 hover:text-pink-500 transition-colors flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Voir la démo</span>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Application Intimia sur smartphone"
                  className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute top-10 -right-10 w-72 h-72 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-rose-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Intimia ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une application complète qui révolutionne le suivi de grossesse avec des fonctionnalités innovantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`bg-gradient-to-r ${feature.color} rounded-full p-3 w-fit mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comment Intimia change votre quotidien
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez la différence avant et après Intimia
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {benefits.map((section, index) => (
              <div key={index} className={`rounded-2xl p-8 ${index === 0 ? 'bg-red-50 border border-red-100' : 'bg-green-50 border border-green-100'}`}>
                <h3 className={`text-2xl font-bold mb-6 ${index === 0 ? 'text-red-800' : 'text-green-800'}`}>
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {(section.problems || section.solutions)?.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      {index === 0 ? (
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={index === 0 ? 'text-red-700' : 'text-green-700'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              Trois étapes simples pour commencer votre suivi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Créez votre compte",
                description: "Inscrivez-vous gratuitement et configurez votre profil de grossesse",
                icon: User
              },
              {
                step: "2", 
                title: "Suivez votre progression",
                description: "Recevez du contenu personnalisé selon votre semaine de grossesse",
                icon: Calendar
              },
              {
                step: "3",
                title: "Connectez-vous aux experts",
                description: "Consultez des professionnels et échangez avec la communauté",
                icon: Users
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <div className="bg-pink-100 rounded-full p-4 w-fit mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Conseils et articles
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos conseils d'experts, gratuits et accessibles à tous
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedBlogPost(post)}
              >
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-pink-500 text-white rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                    <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-pink-600 font-medium text-sm">Lire l'article</span>
                      <ChevronRight className="h-4 w-4 text-pink-600" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Prête à commencer votre parcours avec Intimia ?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Rejoignez des milliers de futures mamans qui font confiance à Intimia
          </p>
          <button 
            onClick={onGetStarted}
            className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Commencer maintenant</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="text-xl font-bold">Intimia</span>
              </div>
              <p className="text-gray-400">
                Votre compagnon de grossesse digital et sécurisé
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Fonctionnalités</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Suivi de grossesse</li>
                <li>Téléconsultations</li>
                <li>Boutique</li>
                <li>Communauté</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Centre d'aide</li>
                <li>Contact</li>
                <li>FAQ</li>
                <li>Blog</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Conditions d'utilisation</li>
                <li>Politique de confidentialité</li>
                <li>Mentions légales</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Intimia. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;