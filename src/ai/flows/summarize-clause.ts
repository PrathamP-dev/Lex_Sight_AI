'use server';

/**
 * @fileOverview AI flow for summarizing a selected clause from a document.
 *
 * - summarizeClause - A function that generates a simplified summary of a given clause.
 * - SummarizeClauseInput - The input type for the summarizeClause function.
 * - SummarizeClauseOutput - The return type for the summarizeClause function.
 */

import {ai, isAIEnabled} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeClauseInputSchema = z.object({
  clauseText: z.string().describe('The text of the clause to be summarized.'),
});
export type SummarizeClauseInput = z.infer<typeof SummarizeClauseInputSchema>;

const SummarizeClauseOutputSchema = z.object({
  summary: z.string().describe('A simplified summary of the clause.'),
});
export type SummarizeClauseOutput = z.infer<typeof SummarizeClauseOutputSchema>;

export async function summarizeClause(input: SummarizeClauseInput): Promise<SummarizeClauseOutput> {
  if (!isAIEnabled || !ai || !summarizeClauseFlow) {
    // Return a placeholder response when AI is not available
    return {
      summary: "AI summarization is currently unavailable. Please configure GEMINI_API_KEY to enable AI features. For now, please review the clause manually."
    };
  }
  return summarizeClauseFlow(input);
}

// Only define AI flows if AI is enabled
const prompt = isAIEnabled && ai ? ai.definePrompt({
  name: 'summarizeClausePrompt',
  input: {schema: SummarizeClauseInputSchema},
  output: {schema: SummarizeClauseOutputSchema},
  prompt: `You are an AI assistant that specializes in summarizing legal clauses in plain language.

  Please provide a concise and easy-to-understand summary of the following clause:

  {{clauseText}}`,
}) : null;

const summarizeClauseFlow = isAIEnabled && ai ? ai.defineFlow(
  {
    name: 'summarizeClauseFlow',
    inputSchema: SummarizeClauseInputSchema,
    outputSchema: SummarizeClauseOutputSchema,
  },
  async input => {
    const {output} = await prompt!(input);
    return output!;
  }
) : null;
