'use server';

/**
 * @fileOverview An AI agent that analyzes contracts for potential risks.
 *
 * - analyzeContractRisk - A function that analyzes contract text for risks.
 * - AnalyzeContractRiskInput - The input type for the analyzeContractRisk function.
 * - AnalyzeContractRiskOutput - The return type for the analyzeContractRisk function.
 */

import {ai, isAIEnabled} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContractRiskInputSchema = z.object({
  contractText: z
    .string()
    .describe('The text of the contract to analyze for potential risks.'),
});
export type AnalyzeContractRiskInput = z.infer<typeof AnalyzeContractRiskInputSchema>;

const AnalyzeContractRiskOutputSchema = z.object({
  riskSummary: z
    .string()
    .describe(
      'A summary of the potential risks identified in the contract, along with insights and warnings.'
    ),
});
export type AnalyzeContractRiskOutput = z.infer<typeof AnalyzeContractRiskOutputSchema>;

export async function analyzeContractRisk(input: AnalyzeContractRiskInput): Promise<AnalyzeContractRiskOutput> {
  if (!isAIEnabled || !ai || !analyzeContractRiskFlow) {
    // Return a placeholder response when AI is not available
    return {
      riskSummary: "AI risk analysis is currently unavailable. Please configure GEMINI_API_KEY to enable AI features. For now, please review the contract manually with a legal professional."
    };
  }
  return analyzeContractRiskFlow(input);
}

// Only define AI flows if AI is enabled
const prompt = isAIEnabled && ai ? ai.definePrompt({
  name: 'analyzeContractRiskPrompt',
  input: {schema: AnalyzeContractRiskInputSchema},
  output: {schema: AnalyzeContractRiskOutputSchema},
  prompt: `You are a legal expert specializing in contract risk analysis. You are thorough, precise, and your goal is to protect your client's interests.

You will analyze the following contract text for potential risks. Your analysis should be comprehensive and presented in a clear, structured format.

For each identified risk, provide:
1.  **Risk Category:** (e.g., Liability, Confidentiality, Termination, IP Rights, etc.)
2.  **Clause Reference:** The specific clause number or section.
3.  **Risk Description:** A clear explanation of the potential risk.
4.  **Severity Level:** (Low, Medium, High)
5.  **Suggested Mitigation:** Actionable advice on how to mitigate the risk (e.g., suggest alternative wording, recommend negotiation points).

Present your findings in a well-formatted markdown response. Start with an overall summary of the contract's risk profile.

Contract Text:
{{{contractText}}}`,
}) : null;

const analyzeContractRiskFlow = isAIEnabled && ai ? ai.defineFlow(
  {
    name: 'analyzeContractRiskFlow',
    inputSchema: AnalyzeContractRiskInputSchema,
    outputSchema: AnalyzeContractRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt!(input);
    return output!;
  }
) : null;
