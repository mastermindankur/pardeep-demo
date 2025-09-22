// Assess outsourcing arrangement risks and compliance.
'use server';
/**
 * @fileOverview Assesses outsourcing arrangement risks and compliance.
 *
 * - assessOutsourcingRisk - A function that handles the outsourcing risk assessment process.
 * - AssessOutsourcingRiskInput - The input type for the assessOutsourcingRisk function.
 * - AssessOutsourcingRiskOutput - The return type for the assessOutsourcingRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { createActionItemTool, generateReviewDocumentTool } from '../tools/compliance-actions';

const AssessOutsourcingRiskInputSchema = z.object({
  useCaseDetails: z
    .string()
    .describe('Details of the outsourcing use case, including a description of the services being outsourced, the data involved, and the third-party provider.'),
});
export type AssessOutsourcingRiskInput = z.infer<typeof AssessOutsourcingRiskInputSchema>;

const AssessOutsourcingRiskOutputSchema = z.object({
  determinationResult: z
    .enum(['Simplified', 'Full Review Required'])
    .describe('Whether the use case qualifies for simplified outsourcing determination or requires a full review.'),
  riskScore: z.number().describe('Overall risk score for the outsourcing arrangement (0-100).'),
  riskBreakdown: z
    .object({
      operationalRisk: z.number().describe('Risk score for operational risks (0-100).'),
      complianceRisk: z.number().describe('Risk score for compliance risks (0-100).'),
      dataRisk: z.number().describe('Risk score for data risks (0-100).'),
      regulatoryRisk: z.number().describe('Risk score for regulatory risks (0-100).'),
    })
    .describe('Breakdown of risk scores by category.'),
  recommendedNextSteps: z
    .string()
    .describe('Recommended next steps based on the risk assessment, such as further review, mitigation strategies, or escalation.'),
  isHighRisk: z.boolean().describe('Whether this outsourcing arrangement is flagged as high risk'),
  agentActions: z.array(z.string()).optional().describe('A list of actions the agent performed automatically.'),
});
export type AssessOutsourcingRiskOutput = z.infer<typeof AssessOutsourcingRiskOutputSchema>;

export async function assessOutsourcingRisk(input: AssessOutsourcingRiskInput): Promise<AssessOutsourcingRiskOutput> {
  return assessOutsourcingRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessOutsourcingRiskPrompt',
  input: {schema: AssessOutsourcingRiskInputSchema},
  output: {schema: AssessOutsourcingRiskOutputSchema},
  tools: [createActionItemTool, generateReviewDocumentTool],
  prompt: `You are an expert in outsourcing risk and compliance management. Analyze the provided outsourcing use case details to determine if it qualifies for the simplified outsourcing determination process and perform an AI-driven risk assessment considering operational, compliance, data, and regulatory risks.

  Provide a determination result, overall risk score, risk breakdown, and recommended next steps.

  Use Case Details: {{{useCaseDetails}}}

  Ensure the determination and recommendations align with regulatory and internal governance requirements. The risk scores should be between 0 and 100, with higher scores indicating higher risk.

  Consider these factors when determining the determination result:

  -Simplified: Low complexity, minimal data involved, well-established processes, and low regulatory impact.
  -Full Review Required: High complexity, significant data involved, novel processes, and high regulatory impact.
  
  Set reasonable values for the other fields.

  If the risk score is 75 or above, or the determination result is "Full Review Required", then set the isHighRisk boolean to true.
  If isHighRisk is true, you MUST use the createActionItemTool to create a high-priority action item for the compliance team and the generateReviewDocumentTool to generate a draft formal review document. The description for these actions must be specific to the use case. For example, if the use case is about a "Customer Support Chatbot", the action item description should be "Create high-priority action to review Customer Support Chatbot arrangement." and the review document should be for "Customer Support Chatbot". When creating an action item, assign it to 'Jane Doe (Compliance Lead)'.
  
  Record the actions you've taken in the agentActions field. The actions should be specific and descriptive. For example: "Created high-priority action item for Jane Doe (Compliance Lead) to review 'Customer Support Chatbot' arrangement" or "Generated draft formal review document for 'Customer Support Chatbot'".

  Ensure that the output is valid JSON matching the schema.`,
});

const assessOutsourcingRiskFlow = ai.defineFlow(
  {
    name: 'assessOutsourcingRiskFlow',
    inputSchema: AssessOutsourcingRiskInputSchema,
    outputSchema: AssessOutsourcingRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
