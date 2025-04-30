import ReactMarkdown from "react-markdown";
import ChefLoader from "./loader/ChefLoader";

export default function ChefyRecipe({ recipe, loadRecipe }) {
  return (
    <>
      {loadRecipe ? (
        <ChefLoader />
      ) : (
        <section className="suggested-recipe-container" aria-live="polite">
          <h2>Chefy Recommends:</h2>
          <ReactMarkdown>{recipe}</ReactMarkdown>
        </section>
      )}
    </>
  );
}
