"use server";

import { assessOutsourcingRisk, AssessOutsourcingRiskOutput } from "@/ai/flows/assess-outsourcing-risk";
import type { ActionItem, Document } from "@/lib/types";

type State = {
  result?: AssessOutsourcingRiskOutput;
  error?: string;
  message?: string;
  newActionItem?: ActionItem;
  newDocument?: Document;
};

export async function assessOutsourcingRiskAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const useCaseDetails = formData.get("useCaseDetails") as string;
  if (!useCaseDetails || useCaseDetails.trim().length < 50) {
    return { error: "Please provide detailed use case information (at least 50 characters)." };
  }

  try {
    const result = await assessOutsourcingRisk({ useCaseDetails });
    
    // This is a simplified way to handle tool outputs for the demo.
    // In a real app, you'd have a more robust way to inspect tool calls and their results.
    const agentActions = result.agentActions || [];
    let newActionItem: ActionItem | undefined = undefined;
    let newDocument: Document | undefined = undefined;

    if (agentActions.find(a => a.includes("Created high-priority action item"))) {
        // This is a mock-up. In a real scenario, the tool output would be captured and processed.
        // For the demo, we are faking the object creation. The tool *is* returning it,
        // but we are not capturing it in this server action to keep it simple.
    }
    if (agentActions.find(a => a.includes("Generated formal review document"))) {
        // This is a mock-up.
    }

    return { result };
  } catch (e) {
    console.error(e);
    // Check if the error is from Genkit and has tool outputs
    if (e.toolOutputs && Array.isArray(e.toolOutputs)) {
        let newActionItem: ActionItem | undefined = undefined;
        let newDocument: Document | undefined = undefined;

        for (const output of e.toolOutputs) {
            if (output.toolName === 'createActionItemTool') {
                newActionItem = output.output as ActionItem;
            }
            if (output.toolName === 'generateReviewDocumentTool') {
                newDocument = output.output as Document;
            }
        }

        if (newActionItem || newDocument) {
            // The flow 'errored' to return tool results. We can treat this as a success for the UI.
            const result = e.output;
            return { result, newActionItem, newDocument };
        }
    }
    return { error: "An unexpected error occurred while assessing the risk. Please try again later." };
  }
}
