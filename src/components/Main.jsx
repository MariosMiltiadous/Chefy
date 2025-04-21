export default function Main() {

  const ingredients = ["Chicken", "Oregano", "Tomatoes"]

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newIngredient = formData.get("ingredient")
    alert(newIngredient)
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
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
