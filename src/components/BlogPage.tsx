import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar, 
  Share2, 
  Bookmark, 
  Heart,
  Search,
  Filter,
  ChevronRight,
  Star,
  Eye,
  MessageCircle
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
  views: number;
  likes: number;
  comments: number;
  featured?: boolean;
}

interface BlogPageProps {
  onBack: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'Tous les articles', count: 24 },
    { id: 'grossesse', name: 'Grossesse', count: 8 },
    { id: 'nutrition', name: 'Nutrition', count: 6 },
    { id: 'preparation', name: 'Préparation', count: 5 },
    { id: 'sante', name: 'Santé', count: 5 }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Les premiers signes de grossesse : ce qu\'il faut savoir',
      excerpt: 'Découvrez les signes précoces qui peuvent indiquer une grossesse et quand faire un test de confirmation.',
      content: `
        <h2>Les signes précoces de grossesse</h2>
        <p>La grossesse s'accompagne de nombreux changements dans le corps de la femme. Certains signes peuvent apparaître très tôt, parfois avant même le retard de règles.</p>
        
        <h3>1. L'absence de règles</h3>
        <p>C'est souvent le premier signe qui alerte. Si vos cycles sont réguliers et que vos règles ont plus d'une semaine de retard, il peut être temps de faire un test.</p>
        
        <h3>2. Les nausées matinales</h3>
        <p>Contrairement à leur nom, les nausées peuvent survenir à tout moment de la journée. Elles touchent environ 80% des femmes enceintes et commencent généralement vers la 6ème semaine.</p>
        
        <h3>3. La fatigue inhabituelle</h3>
        <p>Une fatigue intense peut être l'un des premiers signes. Votre corps travaille dur pour soutenir la grossesse naissante, ce qui peut vous épuiser plus rapidement que d'habitude.</p>
        
        <h3>4. Les changements mammaires</h3>
        <p>Seins tendus, sensibles ou plus volumineux peuvent indiquer les changements hormonaux de début de grossesse. Les aréoles peuvent également s'assombrir.</p>
        
        <h3>5. Les envies et aversions alimentaires</h3>
        <p>Des changements soudains dans vos préférences alimentaires peuvent survenir très tôt dans la grossesse, souvent accompagnés d'une sensibilité accrue aux odeurs.</p>
        
        <h3>Quand consulter ?</h3>
        <p>Dès que vous suspectez une grossesse, prenez rendez-vous avec votre médecin ou sage-femme pour confirmer et commencer le suivi prénatal. Un test sanguin peut détecter la grossesse plus tôt qu'un test urinaire.</p>
        
        <h3>Tests de grossesse</h3>
        <p>Les tests urinaires peuvent être effectués dès le premier jour de retard des règles. Pour plus de précision, attendez une semaine après le retard. Les tests sanguins sont plus sensibles et peuvent détecter une grossesse 6 à 8 jours après l'ovulation.</p>
      `,
      author: 'Dr. Marie Dubois',
      date: '2025-01-15',
      readTime: 5,
      image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'grossesse',
      views: 2847,
      likes: 156,
      comments: 23,
      featured: true
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
          <li><strong>Acide folique :</strong> Prévient les malformations du tube neural. Trouvé dans les légumes verts, légumineuses et céréales enrichies.</li>
          <li><strong>Fer :</strong> Évite l'anémie et favorise l'oxygénation. Sources : viande rouge, épinards, lentilles.</li>
          <li><strong>Calcium :</strong> Développement des os et des dents. Produits laitiers, sardines, brocolis.</li>
          <li><strong>Protéines :</strong> Croissance des tissus. Viande, poisson, œufs, légumineuses.</li>
          <li><strong>Oméga-3 :</strong> Développement du cerveau. Poissons gras, noix, graines de lin.</li>
        </ul>
        
        <h3>Aliments à privilégier</h3>
        <p>Concentrez-vous sur des aliments riches en nutriments :</p>
        <ul>
          <li>Légumes verts à feuilles (épinards, brocolis, chou kale)</li>
          <li>Fruits frais et secs</li>
          <li>Poissons gras (saumon, sardines, maquereau)</li>
          <li>Légumineuses (lentilles, pois chiches, haricots)</li>
          <li>Produits laitiers pasteurisés</li>
          <li>Céréales complètes</li>
          <li>Œufs bien cuits</li>
        </ul>
        
        <h3>Aliments à éviter ou limiter</h3>
        <ul>
          <li><strong>Alcool :</strong> Aucune quantité n'est sûre pendant la grossesse</li>
          <li><strong>Caféine :</strong> Limitez à 200mg par jour (1-2 tasses de café)</li>
          <li><strong>Poissons riches en mercure :</strong> Requin, espadon, thon rouge</li>
          <li><strong>Fromages non pasteurisés :</strong> Risque de listériose</li>
          <li><strong>Viande et poisson crus :</strong> Sushi, tartare, charcuterie</li>
          <li><strong>Œufs crus :</strong> Mayonnaise maison, mousse au chocolat</li>
        </ul>
        
        <h3>Suppléments recommandés</h3>
        <p>Même avec une alimentation équilibrée, certains suppléments sont recommandés :</p>
        <ul>
          <li>Acide folique (400-800 μg/jour)</li>
          <li>Vitamine D (10-15 μg/jour)</li>
          <li>Fer (si carence détectée)</li>
          <li>Iode (150 μg/jour)</li>
        </ul>
      `,
      author: 'Nutritionniste Sarah Martin',
      date: '2025-01-12',
      readTime: 8,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'nutrition',
      views: 1923,
      likes: 89,
      comments: 15
    },
    {
      id: '3',
      title: 'Préparer l\'arrivée de bébé : checklist essentielle',
      excerpt: 'Une liste complète pour bien préparer l\'arrivée de votre bébé sans rien oublier.',
      content: `
        <h2>Se préparer sereinement à l'arrivée de bébé</h2>
        <p>L'arrivée d'un bébé nécessite une certaine préparation. Voici une checklist complète pour vous aider à tout organiser.</p>
        
        <h3>Pour la chambre de bébé</h3>
        <ul>
          <li><strong>Lit à barreaux :</strong> Conforme aux normes de sécurité NF</li>
          <li><strong>Matelas ferme :</strong> Adapté à la taille du lit</li>
          <li><strong>Table à langer :</strong> Avec rebords de sécurité</li>
          <li><strong>Rangements :</strong> Commode, étagères à hauteur</li>
          <li><strong>Éclairage :</strong> Veilleuse douce pour les nuits</li>
          <li><strong>Température :</strong> Thermomètre de chambre (19-20°C)</li>
        </ul>
        
        <h3>Pour les premiers soins</h3>
        <ul>
          <li>Thermomètre digital</li>
          <li>Sérum physiologique</li>
          <li>Compresses stériles</li>
          <li>Produits d'hygiène doux (savon, shampoing)</li>
          <li>Couches nouveau-né (taille 1 et 2)</li>
          <li>Lingettes sans parfum</li>
          <li>Crème pour le change</li>
        </ul>
        
        <h3>Vêtements de naissance</h3>
        <ul>
          <li>6-8 bodies manches courtes (taille naissance et 1 mois)</li>
          <li>6-8 bodies manches longues</li>
          <li>4-6 pyjamas ou grenouillères</li>
          <li>2-3 brassières en laine</li>
          <li>4-6 paires de chaussettes</li>
          <li>2-3 bonnets</li>
          <li>1-2 gigoteuses (selon la saison)</li>
        </ul>
        
        <h3>Pour l'allaitement</h3>
        <ul>
          <li>2-3 soutiens-gorge d'allaitement</li>
          <li>Coussinets d'allaitement lavables</li>
          <li>Crème pour les mamelons</li>
          <li>Tire-lait (manuel ou électrique)</li>
          <li>Biberons et tétines (même si allaitement)</li>
          <li>Coussin d'allaitement</li>
        </ul>
        
        <h3>Pour les sorties</h3>
        <ul>
          <li>Siège auto groupe 0+ (obligatoire dès la sortie de maternité)</li>
          <li>Poussette avec nacelle</li>
          <li>Porte-bébé ou écharpe de portage</li>
          <li>Sac à langer bien équipé</li>
        </ul>
        
        <h3>Valise pour la maternité</h3>
        <p>À préparer vers le 7ème mois :</p>
        <ul>
          <li><strong>Pour maman :</strong> Chemises de nuit ouvertes devant, sous-vêtements jetables, produits d'hygiène</li>
          <li><strong>Pour bébé :</strong> 2-3 tenues de sortie, bodies, chaussettes, bonnet</li>
          <li><strong>Documents :</strong> Carte vitale, mutuelle, livret de famille, projet de naissance</li>
        </ul>
      `,
      author: 'Emma Conseillère',
      date: '2025-01-10',
      readTime: 6,
      image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'preparation',
      views: 1456,
      likes: 67,
      comments: 12
    },
    {
      id: '4',
      title: 'Exercices sécurisés pendant la grossesse',
      excerpt: 'Guide complet des activités physiques recommandées pour rester en forme pendant la grossesse.',
      content: `
        <h2>Rester active pendant la grossesse</h2>
        <p>L'exercice physique pendant la grossesse présente de nombreux avantages pour la mère et le bébé, à condition d'être pratiqué de manière sécurisée.</p>
        
        <h3>Bénéfices de l'exercice pendant la grossesse</h3>
        <ul>
          <li>Améliore la circulation sanguine</li>
          <li>Réduit les douleurs dorsales</li>
          <li>Prépare le corps à l'accouchement</li>
          <li>Améliore l'humeur et réduit le stress</li>
          <li>Aide à contrôler la prise de poids</li>
          <li>Améliore la qualité du sommeil</li>
          <li>Réduit le risque de diabète gestationnel</li>
        </ul>
        
        <h3>Exercices recommandés</h3>
        <h4>Marche</h4>
        <p>Activité douce et accessible à tous les niveaux de forme physique. 30 minutes par jour sont idéales.</p>
        
        <h4>Natation</h4>
        <p>Excellent exercice cardiovasculaire sans impact sur les articulations. L'eau soutient le poids du corps.</p>
        
        <h4>Yoga prénatal</h4>
        <p>Améliore la flexibilité, aide à la relaxation et prépare à l'accouchement. Évitez les positions sur le dos après le 1er trimestre.</p>
        
        <h4>Pilates adapté</h4>
        <p>Renforce les muscles profonds, améliore la posture et prépare le périnée.</p>
        
        <h3>Exercices à éviter</h3>
        <ul>
          <li>Sports de contact (football, basketball)</li>
          <li>Sports à risque de chute (équitation, ski)</li>
          <li>Plongée sous-marine</li>
          <li>Exercices en position allongée sur le dos (après 20 SA)</li>
          <li>Exercices abdominaux intenses</li>
          <li>Activités en altitude (>2500m)</li>
        </ul>
        
        <h3>Signaux d'alarme - Arrêtez l'exercice si :</h3>
        <ul>
          <li>Saignements vaginaux</li>
          <li>Contractions douloureuses</li>
          <li>Essoufflement excessif</li>
          <li>Douleurs thoraciques</li>
          <li>Maux de tête intenses</li>
          <li>Vertiges ou évanouissements</li>
          <li>Douleurs au mollet ou gonflement</li>
        </ul>
      `,
      author: 'Coach Sarah Fitness',
      date: '2025-01-08',
      readTime: 7,
      image: 'https://images.pexels.com/photos/396133/pexels-photo-396133.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'sante',
      views: 1234,
      likes: 78,
      comments: 9
    },
    {
      id: '5',
      title: 'Gérer le stress et les émotions pendant la grossesse',
      excerpt: 'Techniques et conseils pour maintenir un équilibre émotionnel pendant cette période de changements.',
      content: `
        <h2>L'équilibre émotionnel pendant la grossesse</h2>
        <p>La grossesse est une période de grands changements physiques et émotionnels. Il est normal de ressentir une gamme d'émotions variées.</p>
        
        <h3>Changements émotionnels normaux</h3>
        <ul>
          <li>Sautes d'humeur dues aux hormones</li>
          <li>Anxiété concernant l'accouchement et la parentalité</li>
          <li>Joie et excitation</li>
          <li>Fatigue émotionnelle</li>
          <li>Sensibilité accrue</li>
        </ul>
        
        <h3>Techniques de gestion du stress</h3>
        <h4>Respiration profonde</h4>
        <p>Inspirez lentement par le nez pendant 4 secondes, retenez 4 secondes, expirez par la bouche pendant 6 secondes.</p>
        
        <h4>Méditation et pleine conscience</h4>
        <p>10 minutes par jour peuvent considérablement réduire le stress et améliorer le bien-être.</p>
        
        <h4>Visualisation positive</h4>
        <p>Imaginez des scènes apaisantes ou visualisez un accouchement serein.</p>
        
        <h3>Soutien social</h3>
        <ul>
          <li>Partagez vos préoccupations avec votre partenaire</li>
          <li>Rejoignez des groupes de futures mamans</li>
          <li>Maintenez le contact avec famille et amis</li>
          <li>Consultez un professionnel si nécessaire</li>
        </ul>
        
        <h3>Quand consulter ?</h3>
        <p>Si vous ressentez :</p>
        <ul>
          <li>Tristesse persistante</li>
          <li>Anxiété excessive</li>
          <li>Troubles du sommeil importants</li>
          <li>Perte d'appétit</li>
          <li>Pensées négatives récurrentes</li>
        </ul>
      `,
      author: 'Dr. Claire Psychologue',
      date: '2025-01-05',
      readTime: 6,
      image: 'https://images.pexels.com/photos/3984824/pexels-photo-3984824.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'sante',
      views: 987,
      likes: 45,
      comments: 7
    },
    {
      id: '6',
      title: 'Les examens médicaux essentiels pendant la grossesse',
      excerpt: 'Calendrier complet des consultations et examens à ne pas manquer pendant votre grossesse.',
      content: `
        <h2>Suivi médical de la grossesse</h2>
        <p>Un suivi médical régulier est essentiel pour s'assurer du bon déroulement de la grossesse.</p>
        
        <h3>Premier trimestre (0-12 SA)</h3>
        <h4>Première consultation (avant 10 SA)</h4>
        <ul>
          <li>Confirmation de la grossesse</li>
          <li>Calcul de la date d'accouchement</li>
          <li>Examen clinique complet</li>
          <li>Prescription des examens de laboratoire</li>
          <li>Conseils hygiéno-diététiques</li>
        </ul>
        
        <h4>Examens biologiques</h4>
        <ul>
          <li>Groupe sanguin, Rhésus</li>
          <li>Sérologies (toxoplasmose, rubéole, syphilis, VIH, hépatite B)</li>
          <li>Numération formule sanguine</li>
          <li>Glycémie à jeun</li>
          <li>Examen cytobactériologique des urines</li>
        </ul>
        
        <h4>Première échographie (11-13 SA)</h4>
        <ul>
          <li>Datation précise de la grossesse</li>
          <li>Vérification de la vitalité fœtale</li>
          <li>Dépistage de la trisomie 21</li>
          <li>Mesure de la clarté nucale</li>
        </ul>
        
        <h3>Deuxième trimestre (14-27 SA)</h3>
        <h4>Consultations mensuelles</h4>
        <ul>
          <li>Surveillance du poids et de la tension</li>
          <li>Mesure de la hauteur utérine</li>
          <li>Écoute des bruits du cœur fœtal</li>
          <li>Recherche d'albumine et de sucre dans les urines</li>
        </ul>
        
        <h4>Échographie morphologique (20-24 SA)</h4>
        <ul>
          <li>Étude détaillée de l'anatomie fœtale</li>
          <li>Détermination du sexe (si souhaité)</li>
          <li>Localisation du placenta</li>
          <li>Mesure de la croissance fœtale</li>
        </ul>
        
        <h3>Troisième trimestre (28-40 SA)</h3>
        <h4>Consultations bimensuelles puis hebdomadaires</h4>
        <ul>
          <li>Surveillance accrue de la tension</li>
          <li>Dépistage du diabète gestationnel (24-28 SA)</li>
          <li>Prélèvement vaginal (streptocoque B)</li>
          <li>Préparation à l'accouchement</li>
        </ul>
        
        <h4>Troisième échographie (30-34 SA)</h4>
        <ul>
          <li>Évaluation de la croissance fœtale</li>
          <li>Position du bébé</li>
          <li>Quantité de liquide amniotique</li>
          <li>État du placenta</li>
        </ul>
      `,
      author: 'Dr. Martin Gynécologue',
      date: '2025-01-03',
      readTime: 9,
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'sante',
      views: 1567,
      likes: 92,
      comments: 18
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.button
            onClick={() => setSelectedPost(null)}
            className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 mb-6 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour aux articles</span>
          </motion.button>

          <motion.article
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-64 md:h-80">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-3 py-1 bg-pink-500 text-white rounded-full text-sm font-medium mb-2">
                  {categories.find(c => c.id === selectedPost.category)?.name}
                </span>
                <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                  {selectedPost.title}
                </h1>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{selectedPost.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(selectedPost.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedPost.readTime} min de lecture</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{selectedPost.views} vues</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
                <motion.button
                  onClick={() => toggleLike(selectedPost.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    likedPosts.includes(selectedPost.id)
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`h-4 w-4 ${likedPosts.includes(selectedPost.id) ? 'fill-current' : ''}`} />
                  <span>{selectedPost.likes + (likedPosts.includes(selectedPost.id) ? 1 : 0)}</span>
                </motion.button>
                
                <motion.button
                  onClick={() => toggleBookmark(selectedPost.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    bookmarkedPosts.includes(selectedPost.id)
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bookmark className={`h-4 w-4 ${bookmarkedPosts.includes(selectedPost.id) ? 'fill-current' : ''}`} />
                  <span>Sauvegarder</span>
                </motion.button>
                
                <motion.button
                  onClick={() => handleShare(selectedPost)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="h-4 w-4" />
                  <span>Partager</span>
                </motion.button>
              </div>

              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
          </motion.article>

          {/* Articles similaires */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Articles similaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter(post => post.id !== selectedPost.id && post.category === selectedPost.category)
                .slice(0, 2)
                .map((post) => (
                  <motion.div
                    key={post.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedPost(post)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                        <span>{post.author}</span>
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.button
            onClick={onBack}
            className="flex items-center space-x-2 text-pink-100 hover:text-white mb-6 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour à l'accueil</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              Blog Intimia
            </h1>
            <p className="text-xl text-pink-100 max-w-3xl">
              Conseils d'experts, guides pratiques et témoignages pour vous accompagner 
              tout au long de votre grossesse
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Articles en vedette */}
        {featuredPosts.length > 0 && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Articles en vedette</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedPost(post)}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="relative h-64">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                        ⭐ En vedette
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-medium">
                        {categories.find(c => c.id === post.category)?.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-pink-500" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Filtres et recherche */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name} ({category.count})
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grille des articles */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => setSelectedPost(post)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-pink-500 text-white rounded-full text-xs font-medium">
                    {categories.find(c => c.id === post.category)?.name}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-pink-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <motion.div
                    className="text-pink-600"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;