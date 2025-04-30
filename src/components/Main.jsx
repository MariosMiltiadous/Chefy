import { useState } from "react";
import ChefyRecipe from "./ChefyRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromChefClaude } from "../ai";
import ChefLoader from "./loader/ChefLoader";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [loadRecipe, setLoadRecipe] = useState(false);

  async function getRecipe() {
    setLoadRecipe(true);
    try {
      const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
      setRecipe(recipeMarkdown);
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
    } finally {
      setLoadRecipe(false); // Always stop loading after the fetch (success or fail)
    }
  }

  function addIngredient(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredient");
    if (newIngredient?.trim()) {
      setIngredients((prevIngredients) => [
        ...prevIngredients,
        newIngredient.trim(),
      ]);
    }

    event.currentTarget.reset();
  }

  return (
    <main>
      <form className="add-ingredient-form" onSubmit={addIngredient}>
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}

      {loadRecipe ? <ChefLoader /> : 
      <ChefyRecipe recipe={recipe} loadRecipe={loadRecipe} />}
    </main>
  );
}
