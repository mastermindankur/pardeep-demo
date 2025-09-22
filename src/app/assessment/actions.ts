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
    console.error(e);
    // Genkit flows with tools can 'throw' an object containing tool outputs.
    // We check for this case to handle the results of the agent's actions.
    const toolOutputs = e.toolOutputs;
    const finalOutput = e.output;

    if (finalOutput && toolOutputs && Array.isArray(toolOutputs)) {
        let newActionItem: ActionItem | undefined = undefined;
        let newDocument: Document | undefined = undefined;

        for (const output of toolOutputs) {
            if (output.toolName === 'createActionItemTool') {
                newActionItem = output.output as ActionItem;
            }
            if (output.toolName === 'generateReviewDocumentTool') {
                newDocument = output.output as Document;
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
