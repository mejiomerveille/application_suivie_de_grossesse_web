import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { pregnancyApiService, type Recipe } from "../../services/pregnancyApi";

export default function RecipesSection() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

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

  return (
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
}
