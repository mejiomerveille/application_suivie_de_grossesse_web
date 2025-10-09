import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, Star, MessageCircle, Phone, MapPin, Heart, Share2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  store: {
    name: string;
    location: string;
    rating: number;
    whatsapp: string;
  };
  description: string;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
}

interface Store {
  id: string;
  name: string;
  description: string;
  location: string;
  phone: string;
  whatsapp: string;
  rating: number;
  reviewCount: number;
  image: string;
  specialties: string[];
}

const Shop: React.FC = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'Tous les produits', count: 156 },
    { id: 'clothing', name: 'Vêtements bébé', count: 45 },
    { id: 'furniture', name: 'Mobilier', count: 23 },
    { id: 'toys', name: 'Jouets', count: 34 },
    { id: 'care', name: 'Soins & Hygiène', count: 28 },
    { id: 'feeding', name: 'Alimentation', count: 26 }
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Body bébé coton bio - Lot de 3',
      price: 25.99,
      originalPrice: 32.99,
      image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'clothing',
      store: {
        name: 'Bébé Tendresse',
        location: 'Dakar, Plateau',
        rating: 4.8,
        whatsapp: '+221771234567'
      },
      description: 'Bodies en coton bio, doux et confortables pour bébé. Disponibles en plusieurs coloris.',
      inStock: true,
      isNew: true,
      discount: 21
    },
    {
      id: '2',
      name: 'Lit bébé évolutif en bois',
      price: 189.99,
      image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'furniture',
      store: {
        name: 'Mobilier Enfant Plus',
        location: 'Dakar, Almadies',
        rating: 4.9,
        whatsapp: '+221772345678'
      },
      description: 'Lit évolutif qui grandit avec votre enfant. Matériaux de qualité, normes de sécurité respectées.',
      inStock: true
    },
    {
      id: '3',
      name: 'Peluche doudou lapin',
      price: 15.50,
      image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'toys',
      store: {
        name: 'Jouets & Merveilles',
        location: 'Dakar, Mermoz',
        rating: 4.6,
        whatsapp: '+221773456789'
      },
      description: 'Doudou tout doux pour accompagner bébé. Matières hypoallergéniques.',
      inStock: false
    },
    {
      id: '4',
      name: 'Kit de soins bébé complet',
      price: 42.00,
      originalPrice: 55.00,
      image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'care',
      store: {
        name: 'Pharmacie Bébé Santé',
        location: 'Dakar, Point E',
        rating: 4.7,
        whatsapp: '+221774567890'
      },
      description: 'Kit complet avec thermomètre, brosse, ciseaux, produits de soins naturels.',
      inStock: true,
      discount: 24
    }
  ];

  const stores: Store[] = [
    {
      id: '1',
      name: 'Bébé Tendresse',
      description: 'Spécialiste des vêtements et accessoires pour bébés et enfants',
      location: 'Rue 10, Plateau, Dakar',
      phone: '+221338234567',
      whatsapp: '+221771234567',
      rating: 4.8,
      reviewCount: 127,
      image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Vêtements bio', 'Accessoires', 'Chaussures bébé']
    },
    {
      id: '2',
      name: 'Mobilier Enfant Plus',
      description: 'Mobilier de qualité pour chambres d\'enfants et bébés',
      location: 'Route des Almadies, Dakar',
      phone: '+221338345678',
      whatsapp: '+221772345678',
      rating: 4.9,
      reviewCount: 89,
      image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Lits évolutifs', 'Commodes', 'Décoration']
    },
    {
      id: '3',
      name: 'Jouets & Merveilles',
      description: 'Large sélection de jouets éducatifs et ludiques',
      location: 'Mermoz, Dakar',
      phone: '+221338456789',
      whatsapp: '+221773456789',
      rating: 4.6,
      reviewCount: 156,
      image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Jouets éducatifs', 'Peluches', 'Jeux d\'éveil']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.store.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleWhatsAppContact = (whatsapp: string, productName?: string) => {
    const message = productName 
      ? `Bonjour, je suis intéressée par le produit: ${productName}`
      : 'Bonjour, je souhaiterais avoir des informations sur vos produits.';
    
    const url = `https://wa.me/${whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const renderProducts = () => (
    <div className="space-y-6">
      {/* Filtres et recherche */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit ou magasin..."
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
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grille des produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Nouveau
                </span>
              )}
              {product.discount && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  -{product.discount}%
                </span>
              )}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">{product.name}</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">{product.store.rating}</span>
                </div>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-600">{product.store.name}</span>
              </div>

              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">{product.price.toFixed(2)} FCFA</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice.toFixed(2)} FCFA</span>
                  )}
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  product.inStock 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.inStock ? 'En stock' : 'Rupture'}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleWhatsAppContact(product.store.whatsapp, product.name)}
                  disabled={!product.inStock}
                  className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Phone className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </div>
  );

  const renderStores = () => (
    <div className="space-y-6">
      <div className="grid gap-6">
        {stores.map((store) => (
          <div key={store.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              
              <div className="md:w-2/3 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{store.name}</h3>
                    <p className="text-gray-600 mb-2">{store.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{store.rating}</span>
                        <span>({store.reviewCount} avis)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{store.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Spécialités</h4>
                  <div className="flex flex-wrap gap-2">
                    {store.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleWhatsAppContact(store.whatsapp)}
                    className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </button>
                  
                  <a
                    href={`tel:${store.phone}`}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Appeler</span>
                  </a>
                  
                  <button className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                    <MapPin className="h-4 w-4" />
                    <span>Localiser</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Boutique Layette</h1>
        <p className="text-gray-600">
          Découvrez les meilleurs produits pour bébé chez nos partenaires locaux
        </p>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'products'
                ? 'text-pink-600 border-b-2 border-pink-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Produits</span>
          </button>
          <button
            onClick={() => setActiveTab('stores')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'stores'
                ? 'text-pink-600 border-b-2 border-pink-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MapPin className="h-5 w-5" />
            <span>Magasins</span>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'stores' && renderStores()}
        </div>
      </div>

      {/* Section d'information */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-pink-100 rounded-full p-3 w-fit mx-auto mb-3">
                <Search className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">1. Parcourez</h3>
              <p className="text-sm text-gray-600">Découvrez les produits de nos partenaires locaux</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-fit mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">2. Contactez</h3>
              <p className="text-sm text-gray-600">Échangez directement via WhatsApp avec le vendeur</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-3">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">3. Commandez</h3>
              <p className="text-sm text-gray-600">Finalisez votre achat et organisez la livraison</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;