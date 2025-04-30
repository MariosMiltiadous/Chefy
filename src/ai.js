// import Anthropic from "@anthropic-ai/sdk";
// import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

export async function getRecipeFromChefClaude(ingredientsArr) {
  try {
    const response = await fetch('/api/get-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();
    return data.recipe;
  } catch (error) {
    console.error("Error calling Netlify function:", error);
    return "Sorry, Chefy couldn't generate a recipe right now.";
  }
}

// Make sure you set an environment variable in Scrimba
// for HF_ACCESS_TOKEN
// const hf = new HfInference("");

// export async function getRecipeFromMistral(ingredientsArr) {
//   const ingredientsString = ingredientsArr.join(", ");
  
//   const prompt = `I have ${ingredientsString}. Suggest a recipe I can make.`;

//   try {
//     const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${hf}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         inputs: {
//           past_user_inputs: [],
//           generated_responses: [],
//           text: prompt,
//         }
//       }),
//     });

//     const data = await response.json();
//     console.log(data);
//     return data.generated_text || "No recipe found.";
//   } catch (error) {
//     console.error("Hugging Face fetch error:", error.message);
//     return "Sorry, Chefy couldn't get a recipe!";
//   }
// }
