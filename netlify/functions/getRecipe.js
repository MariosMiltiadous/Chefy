import { Handler } from '@netlify/functions';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const handler = async (event) => {
  try {
    const { ingredients } = JSON.parse(event.body || '{}');
    const cleanedIngredients = ingredients.map(i => i.trim());

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid ingredients array.' }),
      };
    }

    const SYSTEM_PROMPT = `
    You are an assistant that receives a list of ingredients and suggests a recipe...`;

    const msg = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `I have ${cleanedIngredients.join(', ')}. Please give me a recipe you'd recommend I make!`,
        },
      ],
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipe: msg.content[0].text }),
    };
  } catch (error) {
    console.error("Anthropic API error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error generating recipe.' }),
    };
  }
};

export { handler };