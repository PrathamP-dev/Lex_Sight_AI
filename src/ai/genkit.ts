import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Check if Gemini API key is available
const isAIEnabled = !!process.env.GEMINI_API_KEY;

// Only initialize AI if API key is present
export const ai = isAIEnabled ? genkit({
  plugins: [googleAI({apiVersion: 'v1'})],
  model: 'googleai/gemini-1.5-flash',
}) : null;

// Export flag to check AI availability
export { isAIEnabled };
