"use server";

import { assessOutsourcingRisk, AssessOutsourcingRiskOutput } from "@/ai/flows/assess-outsourcing-risk";

type State = {
  result?: AssessOutsourcingRiskOutput;
  error?: string;
  message?: string;
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
    return { result };
  } catch (e) {
    console.error(e);
    return { error: "An unexpected error occurred while assessing the risk. Please try again later." };
  }
}
