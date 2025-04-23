export default function IngredientsList({ ingredients, toggleRecipeShown }) {

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ));

    return (<section>
        <ul className="ingredients-list" aria-live="polite">
            <h2>🧂 Ingredients on hand:</h2>
            {ingredientsListItems}
        </ul>

        {ingredients.length > 3 && <div className="get-recipe-container">
            <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button onClick={toggleRecipeShown}>Get a recipe</button>
        </div>
        }
    </section>)
}