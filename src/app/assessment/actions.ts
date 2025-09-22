
"use server";

import { assessOutsourcingRisk, AssessOutsourcingRiskOutput } from "@/ai/flows/assess-outsourcing-risk";
import type { ActionItem, Document } from "@/lib/types";
import { format } from "date-fns";

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
  const useMockData = true; // Set to false to use the live AI agent

  if (!useCaseDetails || useCaseDetails.trim().length < 10) { // Reduced for testing
    return { error: "Please provide detailed use case information (at least 10 characters)." };
  }

  if (useMockData) {
    // Simulate a delay to make the UI feel more realistic
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (useCaseDetails.toLowerCase().includes("high-risk")) {
      // MOCK - HIGH RISK SCENARIO
      const newActionItem: ActionItem = {
        id: `act-${Math.floor(Math.random() * 1000)}`,
        description: `(High Priority) Review High-Risk Mock Service arrangement.`,
        assignedTo: 'Jane Doe (Compliance Lead)',
        dueDate: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
        status: 'Open',
      };
      const newDocument: Document = {
        id: `doc-${Math.floor(Math.random() * 1000)}`,
        name: `[DRAFT] Formal_Review_High-Risk_Mock_Service.docx`,
        type: 'DOCX',
        size: '15 KB',
        lastModified: format(new Date(), 'yyyy-MM-dd'),
      };
      const result: AssessOutsourcingRiskOutput = {
        determinationResult: 'Full Review Required',
        riskScore: 88,
        riskBreakdown: {
          operationalRisk: 90,
          complianceRisk: 85,
          dataRisk: 92,
          regulatoryRisk: 80,
        },
        recommendedNextSteps: 'A full review is required due to the high-risk nature of the service. A draft formal review document has been generated, and a high-priority action item has been created for the compliance team lead.',
        isHighRisk: true,
        agentActions: [
          `1. Created high-priority action item for Jane Doe (Compliance Lead) to review 'High-Risk Mock Service' arrangement, due on ${newActionItem.dueDate}.`,
          `2. Generated draft formal review document for 'High-Risk Mock Service'.`
        ],
      };
      return { result, newActionItem, newDocument };
    } else {
      // MOCK - LOW RISK SCENARIO
      const result: AssessOutsourcingRiskOutput = {
        determinationResult: 'Simplified',
        riskScore: 35,
        riskBreakdown: {
          operationalRisk: 30,
          complianceRisk: 40,
          dataRisk: 25,
          regulatoryRisk: 45,
        },
        recommendedNextSteps: 'The arrangement qualifies for the simplified determination process. No immediate actions are required, but standard monitoring should be maintained.',
        isHighRisk: false,
        agentActions: [],
      };
      return { result };
    }
  }


  // Live agent logic (unchanged)
  try {
    const result = await assessOutsourcingRisk({ useCaseDetails });
    // This path is taken when the agent does NOT use tools.
    return { result };
  } catch (e: any) {
    console.error("Caught error in server action:", e);

    // Genkit flows with tools can 'throw' an object containing the final output and tool outputs.
    // We check for this case to handle the results of the agent's actions.
    const finalOutput = e.output;
    const toolCalls = e.toolCalls;
    
    if (finalOutput && toolCalls && Array.isArray(toolCalls)) {
        let newActionItem: ActionItem | undefined = undefined;
        let newDocument: Document | undefined = undefined;

        for (const call of toolCalls) {
            if (call.toolName === 'createActionItemTool') {
                newActionItem = call.output as ActionItem;
            }
            if (call.toolName === 'generateReviewDocumentTool') {
                newDocument = call.output as Document;
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
