import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
  Shield,
  Zap,
  Award,
  Globe,
  TrendingUp,
  MessageCircle,
  Camera,
  Bell,
  Lock,
  Sparkles,
  Target,
  Lightbulb,
  Gift,
  Crown,
  Headphones,
  MapPin,
  Clock,
  BookOpen,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

// const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
const LandingPage: React.FC<{ onGetStarted: () => void; onShowBlog: () => void }> = ({ onGetStarted, onShowBlog }) => {

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const features = [
    {
      icon: Calendar,
      title: "Suivi personnalisé IA",
      description: "Intelligence artificielle qui s'adapte à votre grossesse unique avec des recommandations personnalisées",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      stats: "98% de précision"
    },
    {
      icon: Video,
      title: "Téléconsultations 24/7",
      description: "Accès immédiat à des spécialistes certifiés, consultations vidéo HD avec dossier médical intégré",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      stats: "Réponse en < 5min"
    },
    {
      icon: ShoppingBag,
      title: "Marketplace Premium",
      description: "Produits certifiés pour bébé, livraison express, garantie qualité avec avis vérifiés",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      stats: "500+ produits"
    },
    {
      icon: Users,
      title: "Communauté Active",
      description: "Réseau de 50,000+ mamans, groupes privés, événements exclusifs et support 24/7",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      stats: "50k+ membres"
    },
    {
      icon: Shield,
      title: "Sécurité Médicale",
      description: "Données cryptées, conformité RGPD, validation médicale par des experts certifiés",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      stats: "100% sécurisé"
    },
    {
      icon: Zap,
      title: "Notifications Intelligentes",
      description: "Rappels personnalisés, alertes médicales, suivi automatique des rendez-vous",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      stats: "Temps réel"
    }
  ];

  const testimonials = [
    {
      name: "Marie Diallo",
      role: "Maman de 2 enfants",
      image: "👩‍💼",
      content: "Intimia a révolutionné ma grossesse ! Le suivi IA est incroyable, j'ai eu des conseils personnalisés chaque jour. Les téléconsultations m'ont sauvé plusieurs fois.",
      rating: 5,
      location: "Dakar, Sénégal"
    },
    {
      name: "Dr. Fatou Sow",
      role: "Gynécologue-Obstétricienne",
      image: "👩‍⚕️",
      content: "En tant que professionnelle, je recommande Intimia à toutes mes patientes. La qualité du suivi et la précision des informations sont exceptionnelles.",
      rating: 5,
      location: "Abidjan, Côte d'Ivoire"
    },
    {
      name: "Aissatou Ba",
      role: "Première grossesse",
      image: "👩",
      content: "J'étais stressée pour ma première grossesse, mais Intimia m'a accompagnée à chaque étape. La communauté est bienveillante et les conseils précieux.",
      rating: 5,
      location: "Bamako, Mali"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Mamans accompagnées", icon: Heart },
    { number: "98%", label: "Satisfaction client", icon: Star },
    { number: "24/7", label: "Support disponible", icon: Headphones },
    { number: "15+", label: "Pays couverts", icon: Globe },
    { number: "15+", label: "Pays couverts", icon: TrendingUp }
  ];

  const beforeAfter = [
    {
      title: "Avant Intimia",
      problems: [
        "Rendez-vous médicaux espacés et stressants",
        "Informations contradictoires sur internet",
        "Difficile de trouver des produits de qualité",
        "Isolement et questions sans réponses",
        "Suivi papier difficile à maintenir",
        "Pas d'accès aux spécialistes"
      ],
      color: "red"
    },
    {
      title: "Avec Intimia",
      solutions: [
        "Suivi quotidien personnalisé par IA",
        "Contenu médical certifié et adapté",
        "Marketplace curatée avec produits vérifiés",
        "Communauté active et experts disponibles",
        "Dossier numérique automatique",
        "Téléconsultations instantanées"
      ],
      color: "green"
    }
  ];

  const pricingPlans = [
    {
      name: "Gratuit",
      price: "0",
      period: "Toujours",
      features: [
        "Suivi de grossesse basique",
        "2 téléconsultations/mois",
        "Accès communauté",
        "Articles de base",
        "Support email"
      ],
      color: "gray",
      popular: false
    },
    {
      name: "Premium",
      price: "2000",
      period: "/mois",
      features: [
        "Suivi IA personnalisé",
        "Téléconsultations illimitées",
        "Accès VIP communauté",
        "Contenu exclusif premium",
        "Support prioritaire 24/7",
        "Marketplace avec réductions",
        "Dossier médical complet"
      ],
      color: "pink",
      popular: true
    },
    {
      name: "Famille",
      price: "3500",
      period: "/mois",
      features: [
        "Tout Premium inclus",
        "Comptes multiples (5)",
        "Suivi post-natal",
        "Coaching personnalisé",
        "Événements exclusifs",
        "Concierge médical",
        "Garantie satisfaction"
      ],
      color: "purple",
      popular: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section avec animations 3D */}
      <section className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 overflow-hidden">
        {/* Éléments flottants animés */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex items-center space-x-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-full p-2"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Heart className="h-6 w-6 text-white" />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
                  Intimia
                </span>
                {/* <motion.span
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  IA Powered
                </motion.span> */}
              </motion.div>
              
              <motion.h1
                className="text-4xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Votre compagnon de
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {" "}grossesse
                </motion.span>
                <br />
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  intelligent
                </motion.span>
              </motion.h1>
              
              <motion.p
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Révolutionnez votre grossesse avec l'IA, des téléconsultations 24/7, 
                une communauté de 50,000+ mamans et un suivi personnalisé unique.
                <motion.span
                  className="block mt-2 text-pink-600 font-semibold"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨ Déjà 50,000+ mamans nous font confiance
                </motion.span>
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Commencer gratuitement</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </motion.button>
                
                <motion.button
                  onClick={() => setIsVideoPlaying(true)}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-pink-500 hover:text-pink-500 transition-all flex items-center justify-center space-x-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="h-5 w-5" />
                  </motion.div>
                  <span>Voir la démo (2min)</span>
                </motion.button>
                  {/*  Nouveau bouton Blog */}
                <motion.button
                  onClick={onShowBlog}
                  className="border-2 border-pink-500 text-pink-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-pink-50 transition-all flex items-center justify-center space-x-2 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Voir le Blog</span>
                </motion.button>
              </motion.div>

              {/* Stats animées */}
              <motion.div
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="h-6 w-6 text-pink-500 mr-2" />
                      <motion.span
                        className="text-2xl font-bold text-gray-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        {stat.number}
                      </motion.span>
                    </div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Smartphone avec app */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ y: y1 }}
            >
              <motion.div
                className="relative z-10 max-w-sm mx-auto"
                animate={{ rotateY: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                {/* Smartphone mockup */}
                <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="bg-gray-900 h-8 flex items-center justify-between px-6 text-white text-xs">
                      <span>9:41</span>
                      <div className="flex space-x-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-1 h-2 bg-white rounded-sm"></div>
                        <div className="w-6 h-2 bg-white rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* App content */}
                    <div className="h-[600px] bg-gradient-to-br from-pink-50 to-rose-50 p-4">
                      <motion.div
                        className="text-center mb-6"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-full p-3 w-fit mx-auto mb-3">
                          <Heart className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900">Semaine 24</h3>
                        <p className="text-sm text-gray-600">Votre bébé fait la taille d'un épi de maïs</p>
                      </motion.div>
                      
                      <motion.div
                        className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="bg-blue-100 rounded-full p-2">
                            <Video className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">Téléconsultation</h4>
                            <p className="text-xs text-gray-500">Dr. Martin - 14h30</p>
                          </div>
                        </div>
                        <motion.button
                          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg text-sm font-medium"
                          whileHover={{ scale: 1.02 }}
                        >
                          Rejoindre la consultation
                        </motion.button>
                      </motion.div>
                      
                      <motion.div
                        className="grid grid-cols-2 gap-3"
                        variants={containerVariants}
                        animate="visible"
                      >
                        {[
                          { icon: Calendar, label: "Calendrier", color: "pink" },
                          { icon: ShoppingBag, label: "Boutique", color: "green" },
                          { icon: Users, label: "Communauté", color: "purple" },
                          { icon: BookOpen, label: "Conseils", color: "orange" }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className={`bg-${item.color}-50 rounded-xl p-3 text-center`}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                          >
                            <item.icon className={`h-6 w-6 text-${item.color}-600 mx-auto mb-2`} />
                            <p className="text-xs font-medium text-gray-700">{item.label}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Éléments décoratifs flottants */}
              <motion.div
                className="absolute -top-10 -right-10 bg-yellow-400 rounded-full p-4 shadow-lg"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <Sparkles className="h-6 w-6 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-10 -left-10 bg-purple-500 rounded-full p-4 shadow-lg"
                animate={{ rotate: -360, y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Crown className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-gray-400" />
        </motion.div>
      </section>

      {/* Features Section avec animations avancées */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-100 via-transparent to-blue-100 opacity-30"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Fonctionnalités
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {" "}révolutionnaires
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Découvrez comment l'intelligence artificielle et la technologie de pointe 
              transforment l'expérience de la grossesse
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`${feature.bgColor} rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div
                  className={`bg-gradient-to-r ${feature.color} rounded-2xl p-4 w-fit mb-6 relative z-10`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                
                <motion.div
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-xs font-bold text-gray-700">{feature.stats}</span>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10">
                  {feature.description}
                </p>
                
                <motion.div
                  className="mt-6 flex items-center text-pink-600 font-semibold group-hover:text-pink-700 transition-colors relative z-10"
                  whileHover={{ x: 10 }}
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section avec animations 3D */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Comment Intimia
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-500"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {" "}transforme
              </motion.span>
              <br />votre grossesse
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez la différence révolutionnaire entre l'ancien et le nouveau monde de la grossesse
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {beforeAfter.map((section, index) => (
              <motion.div
                key={index}
                className={`rounded-3xl p-8 ${
                  index === 0 
                    ? 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-100' 
                    : 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100'
                }`}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02, rotateY: index === 0 ? -5 : 5 }}
              >
                <motion.h3
                  className={`text-3xl font-bold mb-8 ${
                    index === 0 ? 'text-red-800' : 'text-green-800'
                  }`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {section.title}
                </motion.h3>
                
                <ul className="space-y-4">
                  {(section.problems || section.solutions)?.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIndex * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      {index === 0 ? (
                        <motion.div
                          className="w-6 h-6 bg-red-400 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center"
                          animate={{ rotate: [0, 180, 360] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                        </motion.div>
                      )}
                      <span className={`${index === 0 ? 'text-red-700' : 'text-green-700'} font-medium`}>
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section avec carousel animé */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ 
            background: [
              "linear-gradient(45deg, #f3e8ff, #fce7f3)",
              "linear-gradient(45deg, #fce7f3, #f3e8ff)",
              "linear-gradient(45deg, #f3e8ff, #fce7f3)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              50,000+ mamans
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {" "}nous adorent
              </motion.span>
            </h2>
          </motion.div>

          <motion.div
            className="relative"
            key={currentTestimonial}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <motion.div
                  className="text-6xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {testimonials[currentTestimonial].image}
                </motion.div>
                
                <div className="flex-1 text-center md:text-left">
                  <motion.div
                    className="flex justify-center md:justify-start mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Star className="h-6 w-6 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.p
                    className="text-xl text-gray-700 mb-6 italic leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    "{testimonials[currentTestimonial].content}"
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="font-bold text-gray-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                    <p className="text-sm text-gray-500">{testimonials[currentTestimonial].location}</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Indicateurs */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial ? 'bg-purple-500' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Choisissez votre
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {" "}formule
              </motion.span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Des options flexibles pour accompagner chaque étape de votre grossesse
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative rounded-3xl p-8 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-pink-500 to-purple-600 transform scale-105' 
                    : 'bg-gray-800'
                } border-2 ${
                  plan.popular ? 'border-yellow-400' : 'border-gray-700'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: plan.popular ? 1.08 : 1.05, rotateY: 5 }}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-sm"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⭐ PLUS POPULAIRE
                  </motion.div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold">{plan.price}FCFA</span>
                    <span className="text-gray-300">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * featureIndex }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    plan.popular
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onGetStarted}
                >
                  {plan.name === 'Gratuit' ? 'Commencer gratuitement' : 'Choisir ce plan'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section finale */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ 
            background: [
              "linear-gradient(45deg, #ec4899, #8b5cf6, #6366f1)",
              "linear-gradient(45deg, #8b5cf6, #6366f1, #ec4899)",
              "linear-gradient(45deg, #6366f1, #ec4899, #8b5cf6)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-4xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Prête à révolutionner
            <br />votre grossesse ?
          </motion.h2>
          
          <motion.p
            className="text-xl text-pink-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Rejoignez 50,000+ futures mamans qui ont déjà transformé leur expérience
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={onGetStarted}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ["0 0 20px rgba(255,255,255,0.3)", "0 0 40px rgba(255,255,255,0.5)", "0 0 20px rgba(255,255,255,0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Commencer maintenant - GRATUIT
            </motion.button>
            
            <motion.button
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Parler à un expert
            </motion.button>
          </motion.div>
          
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Shield, text: "100% Sécurisé" },
              { icon: Award, text: "Certifié Médical" },
              { icon: Headphones, text: "Support 24/7" },
              { icon: Gift, text: "Essai Gratuit" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-white"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
              >
                <item.icon className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="text-xl font-bold">Intimia</span>
              </div>
              <p className="text-gray-400 mb-4">
                Votre compagnon de grossesse intelligent et sécurisé
              </p>
              <div className="flex space-x-4">
                {[Phone, Mail, MapPin].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {[
              {
                title: "Fonctionnalités",
                links: ["Suivi IA", "Téléconsultations", "Boutique", "Communauté"]
              },
              {
                title: "Support",
                links: ["Centre d'aide", "Contact", "FAQ", "Blog"]
              },
              {
                title: "Légal",
                links: ["CGU", "Confidentialité", "Mentions légales", "Cookies"]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      whileHover={{ x: 5, color: "#ffffff" }}
                      className="cursor-pointer transition-colors"
                      onClick={typeof link === 'object' ? link.onClick : undefined}
                    >
                      {typeof link === 'object' ? link.text : link}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p>&copy; 2025 Intimia. Tous droits réservés. Fait avec ❤️ pour les futures mamans.</p>
          </motion.div>
        </div>
      </footer>

      {/* Modal vidéo */}
      {isVideoPlaying && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsVideoPlaying(false)}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center mb-4">
              <Play className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">Découvrez Intimia en 2 minutes</h3>
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors"
            >
              Fermer
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;