// This file is machine-generated - edit with care!
'use server';
/**
 * @fileOverview A tool for the AI agent to perform compliance-related actions.
 *
 * - complianceActionsTool: A Genkit tool that provides functions for creating action items and generating documents.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { actionItems, documents } from '@/lib/data';
import { format } from 'date-fns';

// In a real application, these functions would interact with a database or external services.
// For this demo, we'll just modify the in-memory data arrays.

async function createActionItem(input: { description: string; assignedTo: string; priority: 'High' | 'Medium' | 'Low' }): Promise<string> {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7); // Due in 7 days

  const newItem = {
    id: `act-${actionItems.length + 1}`,
    description: `(${input.priority} Priority) ${input.description}`,
    assignedTo: input.assignedTo,
    dueDate: format(dueDate, 'yyyy-MM-dd'),
    status: 'Open' as const,
  };
  
  actionItems.unshift(newItem); // Add to the beginning of the array
  console.log('Created new action item:', newItem);
  return `Successfully created action item with ID ${newItem.id}.`;
}

async function generateReviewDocument(input: { useCase: string; riskScore: number }): Promise<string> {
  const newDoc = {
    id: `doc-${documents.length + 1}`,
    name: `[DRAFT] Formal_Review_${input.useCase.replace(/\s/g, '_')}.docx`,
    type: 'DOCX',
    size: '15 KB',
    lastModified: format(new Date(), 'yyyy-MM-dd'),
  };

  documents.unshift(newDoc); // Add to the beginning of the array
  console.log('Generated new document:', newDoc);
  return `Successfully generated document: ${newDoc.name}.`;
}

export const complianceActionsTool = ai.defineTool(
  {
    name: 'complianceActionsTool',
    description: 'A tool to perform compliance actions like creating action items and generating review documents based on risk assessments.',
    tools: {
      createActionItem: {
        description: 'Creates a new action item in the action tracker for the compliance team.',
        inputSchema: z.object({
          description: z.string().describe('A detailed description of the action item.'),
          assignedTo: z.string().default('Compliance Team').describe('The team or person this action is assigned to.'),
          priority: z.enum(['High', 'Medium', 'Low']).default('High').describe('The priority of the action item.'),
        }),
        outputSchema: z.string(),
      },
      generateReviewDocument: {
        description: 'Generates a draft document for formal review of a high-risk outsourcing arrangement.',
        inputSchema: z.object({
          useCase: z.string().describe('The name of the use case or service being reviewed, e.g., "Customer Support Chatbot".'),
          riskScore: z.number().describe('The overall risk score of the assessment.'),
        }),
        outputSchema: z.string(),
      },
    },
  },
  async (input, tools) => {
    let result = '';
    for (const tool of tools) {
      switch (tool.toolName) {
        case 'createActionItem':
          result += await createActionItem(tool.input as any);
          break;
        case 'generateReviewDocument':
          result += await generateReviewDocument(tool.input as any);
          break;
      }
    }
    return result;
  }
);
