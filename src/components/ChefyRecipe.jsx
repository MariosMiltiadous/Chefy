import ReactMarkdown from "react-markdown";
import ChefLoader from "./loader/ChefLoader";

export default function ChefyRecipe({ recipe, loadRecipe }) {
  if (loadRecipe) {
    return <ChefLoader />; // Replace with your spinner component
  }

  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2>Chefy Recommends:</h2>
      {!recipe && <p>Please add at least 4 ingredients</p>}
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </section>
  );
}
