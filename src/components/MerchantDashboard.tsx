import React, { useState } from 'react';
import { Package, ShoppingCart, TrendingUp, Users, Plus, Eye, CreditCard as Edit, Trash2, Phone, MessageCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const MerchantDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Produits actifs',
      value: '24',
      icon: Package,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Commandes ce mois',
      value: '18',
      icon: ShoppingCart,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Chiffre d\'affaires',
      value: '125,000 FCFA',
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Clients fidèles',
      value: '12',
      icon: Users,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentOrders = [
    {
      id: '1',
      customer: 'Marie Diop',
      product: 'Body bébé coton bio - Lot de 3',
      amount: '25,000 FCFA',
      status: 'pending',
      date: '2025-01-15',
      phone: '+221771234567'
    },
    {
      id: '2',
      customer: 'Fatou Sall',
      product: 'Lit bébé évolutif',
      amount: '189,000 FCFA',
      status: 'confirmed',
      date: '2025-01-14',
      phone: '+221772345678'
    },
    {
      id: '3',
      customer: 'Aissatou Ba',
      product: 'Kit de soins bébé',
      amount: '42,000 FCFA',
      status: 'delivered',
      date: '2025-01-13',
      phone: '+221773456789'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'confirmed':
        return 'Confirmée';
      case 'delivered':
        return 'Livrée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tableau de bord - {user?.businessName || 'Mon Commerce'}
        </h1>
        <p className="text-gray-600">
          Gérez vos produits, commandes et suivez vos performances
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-2xl p-6 border border-gray-100`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`bg-gradient-to-r ${stat.color} rounded-full p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Commandes récentes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Commandes récentes</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Voir toutes
              </button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{order.customer}</h3>
                      <p className="text-sm text-gray-600 mt-1">{order.product}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{order.amount}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm">
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp</span>
                    </button>
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                      <Phone className="h-4 w-4" />
                      <span>Appeler</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm">
                      <Eye className="h-4 w-4" />
                      <span>Détails</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Actions rapides</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                <Plus className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-700">Ajouter un produit</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-700">Gérer les commandes</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-700">Voir les statistiques</span>
              </button>
            </div>
          </div>

          {/* Informations du commerce */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Mon commerce</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Nom :</span>
                <p className="text-gray-600">{user?.businessName}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Adresse :</span>
                <p className="text-gray-600">{user?.businessAddress}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Téléphone :</span>
                <p className="text-gray-600">{user?.businessPhone}</p>
              </div>
              {user?.businessWhatsapp && (
                <div>
                  <span className="font-medium text-gray-700">WhatsApp :</span>
                  <p className="text-gray-600">{user?.businessWhatsapp}</p>
                </div>
              )}
            </div>
            <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors">
              Modifier les informations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;