// This file is machine-generated - edit with care!
'use server';
/**
 * @fileOverview A flow to generate a concise summary of SLA performance and risk metrics for monthly review meetings with Outsourced Service Providers.
 *
 * - generateSlaSummary - A function that generates the SLA summary.
 * - GenerateSlaSummaryInput - The input type for the generateSlaSummary function.
 * - GenerateSlaSummaryOutput - The return type for the generateSlaSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSlaSummaryInputSchema = z.object({
  slaPerformanceData: z.string().describe('SLA performance data in JSON format.'),
  riskMetricsData: z.string().describe('Risk metrics data in JSON format.'),
});
export type GenerateSlaSummaryInput = z.infer<typeof GenerateSlaSummaryInputSchema>;

const GenerateSlaSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of SLA performance and risk metrics.'),
});
export type GenerateSlaSummaryOutput = z.infer<typeof GenerateSlaSummaryOutputSchema>;

export async function generateSlaSummary(input: GenerateSlaSummaryInput): Promise<GenerateSlaSummaryOutput> {
  return generateSlaSummaryFlow(input);
}

const generateSlaSummaryPrompt = ai.definePrompt({
  name: 'generateSlaSummaryPrompt',
  input: {schema: GenerateSlaSummaryInputSchema},
  output: {schema: GenerateSlaSummaryOutputSchema},
  prompt: `You are an AI assistant helping compliance officers prepare for monthly review meetings with Outsourced Service Providers (OSPs).

  Generate a concise summary of SLA performance and risk metrics based on the provided data.
  The summary should highlight key performance indicators (KPIs), any breaches of Service Level Agreements (SLAs), and significant risks identified.
  The summary should be no more than 3 paragraphs.

  SLA Performance Data: {{{slaPerformanceData}}}
  Risk Metrics Data: {{{riskMetricsData}}}
  `,
});

const generateSlaSummaryFlow = ai.defineFlow(
  {
    name: 'generateSlaSummaryFlow',
    inputSchema: GenerateSlaSummaryInputSchema,
    outputSchema: GenerateSlaSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateSlaSummaryPrompt(input);
    return output!;
  }
);
