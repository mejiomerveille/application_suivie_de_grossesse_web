import React, { useState, useEffect } from 'react';
import { Calendar, Baby, Heart, TrendingUp, BookOpen, Camera, Bell, Smartphone, MessageCircle, Archive, Apple, Dumbbell } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePregnancy } from '../hooks/usePregnancy';
import { pregnancyApiService, type DiaryEntry, type Symptom , type Recipe} from '../services/pregnancyApi';
import { Dialog } from "@headlessui/react";
import ArticleCard from './ArticleCard';
import ArticleDetail from './ArticleDetail';

const PregnancyTracking: React.FC = () => {
  const [editingEntry, setEditingEntry] = useState<any | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const [nutritionGuides, setNutritionGuides] = useState([]);
  const [articles, setArticles] = useState([]);  
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [arTutorials, setArTutorials] = useState([]);
  const [nutritionRestrictions, setNutritionRestrictions] = useState([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  const [activeTab, setActiveTab] = useState('journal');
  const [journalEntry, setJournalEntry] = useState('');
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  const [symptoms, setSymptoms] = useState({
    weight: '',
    bloodPressure: '',
    fetalMovements: '',
    contractions: '',
    mood: 'good'
  });
  
  const { user } = useAuth();
  
  const { 
    profile, 
    currentWeek,  
    daysUntilDue,
    isLoading: pregnancyLoading,
    error: pregnancyError,
    getWeekInfo 
  } = usePregnancy(user?.pregnancyStartDate);
  
  const progressPercentage = currentWeek > 0 ? Math.min((currentWeek / 40) * 100, 100) : 0;

  // Charger toutes les recettes au montage
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await pregnancyApiService.getRecipes();
        setRecipes(data);
      } catch (err) {
        console.error("Erreur lors du chargement des recettes :", err);
        setRecipes([]);
      }
    };

    loadRecipes();
  }, []);

  // Charger les détails d’une recette spécifique
  const openRecipeModal = async (id: number) => {
    try {
      const recipe = await pregnancyApiService.getRecipe(id.toString());
      setSelectedRecipe(recipe);
    } catch (err) {
      console.error("Erreur lors du chargement de la recette :", err);
    }
  };

  // Fonction pour modifier une entrée
  const handleEditEntry = (entry: any) => {
    setEditingEntry(entry);
    setEditedContent(entry.notes || entry.content || '');
  };

  // Fonction pour sauvegarder la modification
  const handleSaveEditedEntry = async () => {
    if (!editingEntry) return;

    try {
      const updatedEntry = {
        ...editingEntry,
        notes: editedContent,
        mood: editingEntry.mood || 'good',
      };

      const response = await pregnancyApiService.updateDiaryEntry(editingEntry.id, updatedEntry);
      if (response.success) {
        setDiaryEntries((prev) =>
          prev.map((e) => (e.id === editingEntry.id ? response.data : e))
        );
        setEditingEntry(null);
        setEditedContent('');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };

  // Fonction pour supprimer une entrée
  const handleDeleteEntry = async (id: number) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette entrée ?')) return;

    try {
      await pregnancyApiService.deleteDiaryEntry(id);
      setDiaryEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };


  // Récupérer les guides nutritionnels (selon la semaine actuelle)
  const fetchNutritionGuides = async (week?: number) => {
    try {
      const response = await pregnancyApiService.getNutritionGuides(week);
      // console.log('Guides nutritionnels:', response);

      // Extraire le tableau data
      const guidesArray = Array.isArray(response.data) ? response.data : [];
      setNutritionGuides(guidesArray);
    } catch (error) {
      console.error('Erreur lors du chargement des guides nutritionnels:', error);
      setNutritionGuides([]);
    }
  };


  const fetchArticles = async (week?: number) => {
    try {
      const response = await pregnancyApiService.getArticles(week);
      console.log('articles:', response.data);

      // ✅ Extraire le tableau data
      const guidesArray = Array.isArray(response.data) ? response.data : [];
      setArticles(guidesArray);
    } catch (error) {
      console.error('Erreur lors du chargement des guides nutritionnels:', error);
      setArticles([]);
    }
  };



  const fetExercices = async () => {
  try {
    const response = await pregnancyApiService.getARTutorials();
    console.log('exercice:', response);

    // ✅ Extraire le tableau data
    const exerciceArray = Array.isArray(response.data) ? response.data : [];
    setArTutorials(exerciceArray);
  } catch (error) {
    console.error('Erreur lors du chargement des exercice AT:', error);
    setArTutorials([]);
  }
};


  // Récupérer toutes les recettes disponibles
  const fetchRecipes = async () => {
    try {
      const response = await pregnancyApiService.getRecipes();
      // console.log('Recettes disponibles:', response);

      const recipesArray = Array.isArray(response.data) ? response.data : [];
      setRecipes(recipesArray);
    } catch (error) {
      console.error('Erreur lors du chargement des recettes:', error);
      setRecipes([]);
    }
  };


  // Récupérer une recette spécifique par ID
  const fetchRecipeById = async (id: string) => {
    try {
      const response = await pregnancyApiService.getRecipe(id);
      console.log('Détails de la recette:', response);
      setSelectedRecipe(response);
    } catch (error) {
      console.error('Erreur lors du chargement de la recette:', error);
      setSelectedRecipe(null);
    }
  };

  // Récupérer les restrictions nutritionnelles
  const fetchNutritionRestrictions = async () => {
    try {
      const response = await pregnancyApiService.getNutritionRestrictions();
      // console.log('Restrictions nutritionnelles:', response);
      setNutritionRestrictions(response?.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des restrictions nutritionnelles:', error);
      setNutritionRestrictions([]);
    }
  };


  useEffect(() => {
    fetchNutritionGuides(currentWeek);
    fetchArticles(currentWeek);
    fetchRecipes();
    fetchNutritionRestrictions();
    fetExercices();
    fetchDiaryEntries();

  }, [currentWeek]);


  const weekInfo = getWeekInfo(currentWeek);

  // Chargement des entrées du journal
  useEffect(() => {
    const loadDiaryEntries = async () => {
      try {
        const entries = await pregnancyApiService.getDiaryEntries();
        setDiaryEntries(entries);
      } catch (error) {
        console.error('Erreur lors du chargement du journal:', error);
      }
    };

    if (user) {
      loadDiaryEntries();
    }
  }, [user, pregnancyApiService]);


  const tabs = [
    { id: 'journal', name: 'Journal de bord', icon: BookOpen },
    { id: 'symptoms', name: 'Symptômes', icon: TrendingUp },
    { id: 'nutrition', name: 'Nutrition', icon: Apple },
    { id: 'recette', name: 'Recette', icon: Apple },
    { id: 'exercises', name: 'Exercices RA', icon: Dumbbell },
    { id: 'community', name: 'Communauté', icon: MessageCircle }
  ];

  const fetchDiaryEntries = async () => {
  try {
    const response = await pregnancyApiService.getDiaryEntries();
    // console.log('Réponse brute du backend :', response);
    const entries = response?.data || [];
    setDiaryEntries(Array.isArray(entries) ? entries : []);
  } catch (error) {
    console.error('Erreur lors du chargement des entrées :', error);
    setDiaryEntries([]); 
  }
};

const handleSaveJournalEntry = async () => {
  if (!journalEntry.trim()) return;

  try {
    const newEntryResponse = await pregnancyApiService.createDiaryEntry({
      entry_date: new Date().toISOString(),
      notes: journalEntry, // ✅ correspond à la clé attendue par le backend
      mood: 'good',
    });

    console.log('Nouvelle entrée sauvegardée :', newEntryResponse);

    // Si le backend renvoie { success, data }, on extrait data
    const newEntry = newEntryResponse?.data || null;
    if (newEntry) {
      setDiaryEntries((prev) => [newEntry, ...(Array.isArray(prev) ? prev : [])]);
    }

    setJournalEntry('');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde :', error);
  }
};


  const handleSaveSymptoms = async () => {
    try {
      const symptomsToSave = Object.entries(symptoms)
        .filter(([_, value]) => value && value !== '')
        .map(([type, value]) => ({
          symptom_date: new Date().toISOString(),
          symptom_type: type,
          intensity: type === 'mood' ? 0 : (typeof value === 'string' ? parseInt(value) || 0 : 0),
          notes: typeof value === 'string' ? value : ''
        }));

      await Promise.all(
        symptomsToSave.map(symptom => pregnancyApiService.createSymptom(symptom))
      );

      // Réinitialiser le formulaire
      setSymptoms({
        weight: '',
        bloodPressure: '',
        fetalMovements: '',
        contractions: '',
        mood: 'good'
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des symptômes:', error);
    }
  };

 

  const renderJournal = () => {
  const safeEntries = Array.isArray(diaryEntries) ? diaryEntries : [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Journal de bord</h2>
          <Camera className="h-6 w-6 text-pink-500" />
        </div>

        {/* Nouvelle entrée */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nouvelle entrée - {new Date().toLocaleDateString('fr-FR')}
          </label>
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="Comment vous sentez-vous aujourd'hui ?"
          />
          <div className="flex justify-between items-center mt-3">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
              <Camera className="h-4 w-4" />
              <span className="text-sm">Ajouter une photo</span>
            </button>
            <button
              onClick={handleSaveJournalEntry}
              disabled={!journalEntry.trim()}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
            >
              Enregistrer
            </button>
          </div>
        </div>

        {/* Liste des entrées */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Entrées récentes</h3>

          {safeEntries.length > 0 ? (
            safeEntries.slice(0, 5).map((entry) => (
              <div
                key={entry.id}
                className="border-l-4 border-pink-400 pl-4 py-3 bg-gray-50 rounded-r-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(entry.entry_date).toLocaleDateString('fr-FR')}
                  </span>
                  <span className="text-xs text-gray-500">
                    {entry.title || `Semaine ${currentWeek}`}
                  </span>
                </div>

                {editingEntry?.id === entry.id ? (
                  <div>
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                      rows={3}
                    />
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={handleSaveEditedEntry}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditingEntry(null)}
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700 text-sm">
                      {entry.notes || entry.content || 'Aucune note.'}
                    </p>
                    <div className="flex space-x-3 mt-2">
                      <button
                        onClick={() => handleEditEntry(entry)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Aucune entrée dans votre journal pour le moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

  const renderSymptoms = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Suivi des symptômes</h2>
          <TrendingUp className="h-6 w-6 text-pink-500" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Poids (kg)</label>
            <input
              type="number"
              value={symptoms.weight}
              onChange={(e) => setSymptoms({...symptoms, weight: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="65.5"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tension artérielle</label>
            <input
              type="text"
              value={symptoms.bloodPressure}
              onChange={(e) => setSymptoms({...symptoms, bloodPressure: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="120/80"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mouvements fœtaux</label>
            <select
              value={symptoms.fetalMovements}
              onChange={(e) => setSymptoms({...symptoms, fetalMovements: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="">Sélectionner</option>
              <option value="none">Aucun</option>
              <option value="light">Légers</option>
              <option value="normal">Normaux</option>
              <option value="active">Très actifs</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Humeur</label>
            <select
              value={symptoms.mood}
              onChange={(e) => setSymptoms({...symptoms, mood: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="excellent">Excellente</option>
              <option value="good">Bonne</option>
              <option value="neutral">Neutre</option>
              <option value="tired">Fatiguée</option>
              <option value="anxious">Anxieuse</option>
            </select>
          </div>
        </div>
        
        <button 
          onClick={handleSaveSymptoms}
          className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Enregistrer les données
        </button>

      </div>
    </div>
  );

  const renderNutrition = () => (
  <div className="space-y-8 bg-pink-50/30 p-6 rounded-3xl shadow-inner">
    <div className="bg-white rounded-3xl shadow-md border border-pink-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-pink-700">
          🍎 Guide nutritionnel — Semaine {currentWeek}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nutritionGuides.map((guide) => {
          const recommendations = Array.isArray(guide.recommendations)
            ? guide.recommendations
            : guide.recommendations
            ? guide.recommendations.split('\n').map((r) => r.trim())
            : [];

          return (
            <div
              key={guide.id}
              className="bg-gradient-to-br from-pink-50 to-green-50 rounded-2xl p-5 border border-pink-100 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-semibold text-pink-700 text-lg mb-2 flex items-center gap-2">
                <span className="bg-pink-100 p-1.5 rounded-full">💮</span>
                {guide.title}
              </h3>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {guide.description}
              </p>

              {/* 🌿 Recommandations */}
              {recommendations.length > 0 && (
                <div className="mb-4 bg-white/70 rounded-xl p-3 shadow-sm">
                  <h4 className="font-medium text-green-700 mb-2">
                    🌿 Recommandations :
                  </h4>
                  <ul className="space-y-1 text-sm text-green-800 list-disc list-inside">
                    {recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 🚫 Restrictions */}
              {nutritionRestrictions.length > 0 && (
                <div className="bg-red-50/80 rounded-xl p-3 border border-red-100">
                  <h4 className="font-medium text-red-700 mb-1">
                    🚫 Aliments à éviter :
                  </h4>
                  <ul className="space-y-1 text-sm text-red-800 list-disc list-inside">
                    {nutritionRestrictions.map((restriction) => (
                      <li key={restriction.id}>
                        <span className="font-medium">
                          {restriction.food_name}
                        </span>{' '}
                        ({restriction.severity}) — {restriction.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);


  const renderRecette = () => (
        <div>
          {/* Grid des recettes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
                onClick={() => openRecipeModal(recipe.id)}
              >
                {recipe.image_url ? (
                  <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-500">
                    Pas d'image
                  </div>
                )}
                <h4 className="font-medium text-gray-900 mb-2">{recipe.title}</h4>
                <p className="text-sm text-gray-600">{recipe.description}</p>
              </div>
            ))}
          </div>
    
          {/* Modal pour détails */}
          <Dialog open={!!selectedRecipe} onClose={() => setSelectedRecipe(null)} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <Dialog.apply className="fixed inset-0 bg-black opacity-30" />
    
              {selectedRecipe && (
                <div className="bg-white rounded-xl shadow-lg max-w-xl w-full z-50 p-6 relative">
                  <button
                    onClick={() => setSelectedRecipe(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                  >
                    &times;
                  </button>
    
                  {selectedRecipe.image_url && (
                    <img
                      src={selectedRecipe.image_url}
                      alt={selectedRecipe.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
    
                  <Dialog.Title className="text-xl font-semibold mb-2">{selectedRecipe.title}</Dialog.Title>
                  <p className="text-gray-700 mb-4">{selectedRecipe.description}</p>
    
                  <div className="mb-2"><strong>Temps de préparation:</strong> {selectedRecipe.prep_time ?? "-" } min</div>
                  <div className="mb-2"><strong>Temps de cuisson:</strong> {selectedRecipe.cook_time ?? "-" } min</div>
                  <div className="mb-4"><strong>Portions:</strong> {selectedRecipe.servings ?? "-"}</div>
    
                  <div className="mb-4">
                    <h5 className="font-medium mb-1">Ingrédients:</h5>
                    <pre className="whitespace-pre-wrap text-gray-700">{selectedRecipe.ingredients}</pre>
                  </div>
    
                  <div>
                    <h5 className="font-medium mb-1">Instructions:</h5>
                    <pre className="whitespace-pre-wrap text-gray-700">{selectedRecipe.instructions}</pre>
                  </div>
                </div>
              )}
            </div>
          </Dialog>
        </div>
  );

  const renderExercises = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Exercices en Réalité Augmentée</h2>
          <Smartphone className="h-6 w-6 text-purple-500" />
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Smartphone className="h-5 w-5 text-purple-500 mt-0.5" />
            <div className="text-sm text-purple-700">
              <p className="font-medium mb-1">Tutoriels interactifs en RA</p>
              <p>Utilisez votre smartphone pour suivre les exercices en réalité augmentée, adaptés à votre stade de grossesse.</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {arTutorials.map((tutorial) => (
            <div key={tutorial.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{tutorial.title}</h3>
                <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
                  RA
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{tutorial.description}</p>
              <div className="text-xs text-gray-500 mb-3">
                Catégorie: {tutorial.category}
                {tutorial.duration && ` • ${tutorial.duration} min`}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {tutorial.week_min && tutorial.week_max 
                    ? `Semaines ${tutorial.week_min}-${tutorial.week_max}`
                    : 'Toutes semaines'
                  }
                </span>
                <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm">
                  Démarrer en RA
                </button>
              </div>
            </div>
          ))}
          
          {arTutorials.length === 0 && (
            <div className="col-span-2 text-center py-8 text-gray-500">
              <Smartphone className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Aucun tutoriel RA disponible pour cette semaine</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Communauté & Questions</h2>
          <MessageCircle className="h-6 w-6 text-blue-500" />
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Questions fréquentes - Semaine {currentWeek}</h3>
          <div className="space-y-3">
            {[
              'Est-ce normal de ressentir des tiraillements à ce stade ?',
              'Quels exercices puis-je faire en toute sécurité ?',
              'Comment gérer les nausées matinales ?'
            ].map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <p className="text-gray-900 font-medium">{question}</p>
                <p className="text-sm text-gray-600 mt-1">Réponse certifiée par nos experts</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Poser une question</h3>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Posez votre question à nos experts..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ma Grossesse</h1>
        <p className="text-gray-600">
          Suivi personnalisé de votre grossesse avec conseils adaptés à chaque étape
        </p>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-wrap border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'journal' && renderJournal()}
          {activeTab === 'symptoms' && renderSymptoms()}
          {activeTab === 'nutrition' && renderNutrition()}
          {activeTab === 'exercises' && renderExercises()}
          {activeTab === 'community' && renderCommunity()}
          {activeTab === 'recette' && renderRecette()}
        </div>
      </div>

      {/* Notifications intelligentes */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center space-x-3 mb-4">
          <Bell className="h-6 w-6 text-blue-500" />
          <h3 className="font-semibold text-gray-900">Rappels personnalisés</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-1">Vitamines</h4>
            <p className="text-sm text-gray-600">Prendre l'acide folique - 9h00</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-1">Rendez-vous</h4>
            <p className="text-sm text-gray-600">Consultation dans 3 jours</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-1">Exercices</h4>
            <p className="text-sm text-gray-600">Yoga prénatal - 17h00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyTracking;