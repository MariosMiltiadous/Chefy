//import 'dotenv/config'; // for local testing - must have .env configuration
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const handler = async (event) => {
  try {
    const { ingredients } = JSON.parse(event.body || '{}');

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid ingredients array.' }),
      };
    }

    const cleanedIngredients = ingredients.map((i) => i.trim());

    const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention. The recipe can include extra ingredients, but try not to include too many. Format your response in markdown.
`;

    const msg = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `I have ${cleanedIngredients.join(', ')}. Please suggest a recipe!`,
        },
      ],
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipe: msg.content[0].text }),
    };
  } catch (error) {
    console.error('❌ Anthropic API error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error generating recipe.' }),
    };
  }
};

// eslint-disable-next-line no-undef
const _handler = handler;
export { _handler as handler };