import { useState } from "react"
import ChefyRecipe from "./ChefyRecipe";
import IngredientsList from "./IngredientsList";

export default function Main() {

  const [ingredients, setIngredients] = useState([]);

  const [recipeShown, setRecipeShown] = useState(false)

  function toggleRecipeShown() {
    setRecipeShown(prevShown => !prevShown)
  }

  function addIngredient(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredient");
    if (newIngredient?.trim()) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient.trim()]);
    }

    event.currentTarget.reset();
  }

  return (
    <main>
      <form className="add-ingredient-form" onSubmit={addIngredient}>
        <input type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>


      {ingredients.length > 0 && <IngredientsList
        ingredients={ingredients}
        toggleRecipeShown={toggleRecipeShown} />}

      {recipeShown && <ChefyRecipe />}
    </main>
  );
}
