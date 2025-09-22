"use server";

import { generateSlaSummary } from "@/ai/flows/generate-sla-summary";
import { slas, assessments } from "@/lib/data";

type State = {
  summary?: string;
  error?: string;
};

export async function generateSlaSummaryAction(): Promise<State> {
  try {
    // In a real app, you would fetch live data here.
    const slaPerformanceData = JSON.stringify(slas, null, 2);
    
    const riskMetrics = assessments.map(a => ({ 
      provider: a.provider,
      riskScore: a.riskScore,
      isHighRisk: a.isHighRisk
    }));
    const riskMetricsData = JSON.stringify(riskMetrics, null, 2);
    
    const result = await generateSlaSummary({
      slaPerformanceData,
      riskMetricsData,
    });
    
    return { summary: result.summary };
  } catch (e) {
    console.error(e);
    return { error: "Failed to generate summary. Please try again." };
  }
}
