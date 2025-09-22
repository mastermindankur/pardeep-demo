// This file is machine-generated - edit with care!
'use server';
/**
 * @fileOverview A tool for the AI agent to perform compliance-related actions.
 *
 * - createActionItemTool: A Genkit tool for creating action items.
 * - generateReviewDocumentTool: A Genkit tool for generating review documents.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { format } from 'date-fns';
import { actionItems, documents } from '@/lib/data';
import type { ActionItem, Document } from '@/lib/types';

// In a real application, these functions would interact with a database or external services.
// For this demo, we'll just modify the in-memory data arrays.

export const createActionItemTool = ai.defineTool(
    {
      name: 'createActionItemTool',
      description: 'Creates a new action item in the action tracker for the compliance team. Returns the created item.',
      inputSchema: z.object({
        description: z.string().describe('A detailed description of the action item.'),
        assignedTo: z.string().describe('The team or person this action is assigned to.'),
        priority: z.enum(['High', 'Medium', 'Low']).default('High').describe('The priority of the action item.'),
      }),
      outputSchema: z.object({
        id: z.string(),
        description: z.string(),
        assignedTo: z.string(),
        dueDate: z.string(),
        status: z.enum(['Open', 'In Progress', 'Closed']),
      }),
    },
    async (input): Promise<Omit<ActionItem, 'priority'>> => {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7); // Due in 7 days
      
        const newItem: ActionItem = {
          id: `act-${actionItems.length + 1 + Math.floor(Math.random() * 1000)}`,
          description: `(${input.priority} Priority) ${input.description}`,
          assignedTo: input.assignedTo,
          dueDate: format(dueDate, 'yyyy-MM-dd'),
          status: 'Open' as const,
        };
        
        console.log('Created new action item:', newItem);
        
        // The type definition for ActionItem in types.ts does not have a priority field.
        // We return an object that matches the ActionItem type.
        const { priority, ...returnItem } = newItem;
        return returnItem;
    }
  );
  
export const generateReviewDocumentTool = ai.defineTool(
    {
      name: 'generateReviewDocumentTool',
      description: 'Generates a draft document for formal review of a high-risk outsourcing arrangement. Returns the created document.',
      inputSchema: z.object({
        useCase: z.string().describe('The name of the use case or service being reviewed, e.g., "Customer Support Chatbot".'),
      }),
      outputSchema: z.object({
        id: z.string(),
        name: z.string(),
        type: z.string(),
        size: z.string(),
        lastModified: z.string(),
      }),
    },
    async (input) : Promise<Document> => {
        const newDoc: Document = {
            id: `doc-${documents.length + 1 + Math.floor(Math.random() * 1000)}`,
            name: `[DRAFT] Formal_Review_${input.useCase.replace(/\s/g, '_')}.docx`,
            type: 'DOCX',
            size: '15 KB',
            lastModified: format(new Date(), 'yyyy-MM-dd'),
          };
        
          console.log('Generated new document:', newDoc);
          return newDoc;
    }
);
