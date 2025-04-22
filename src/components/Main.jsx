import { useState } from "react"

export default function Main() {

  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(event) {
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
      <form className="add-ingredient-form" onSubmit={handleSubmit}>
        <input type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      <ul className="ingredients-list">
        <h2>
          🧂 Ingredients
        </h2>
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
