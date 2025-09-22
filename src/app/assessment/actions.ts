
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
    // This path is taken when the agent does NOT use tools.
    return { result };
  } catch (e: any) {
    console.error("Caught error in server action:", e);

    // Genkit flows with tools can 'throw' an object containing the final output and tool outputs.
    // We check for this case to handle the results of the agent's actions.
    const finalOutput = e.output;
    // The actual tool call results are in e.toolCalls
    const toolCalls = e.toolCalls;
    
    if (finalOutput && toolCalls && Array.isArray(toolCalls)) {
        let newActionItem: ActionItem | undefined = undefined;
        let newDocument: Document | undefined = undefined;

        for (const call of toolCalls) {
            if (call.toolName === 'createActionItemTool') {
                newActionItem = call.output as ActionItem;
                console.log('Found new action item from tool:', newActionItem);
            }
            if (call.toolName === 'generateReviewDocumentTool') {
                newDocument = call.output as Document;
                console.log('Found new document from tool:', newDocument);
            }
        }

        if (newActionItem || newDocument) {
            // The flow 'errored' to return tool results. We treat this as a success for the UI.
            return { result: finalOutput, newActionItem, newDocument };
        }
    }
    
    return { error: "An unexpected error occurred while assessing the risk. Please try again later." };
  }
}
