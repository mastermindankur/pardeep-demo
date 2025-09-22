"use client";

import { useFormState } from "react-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AssessmentForm } from "./components/assessment-form";
import { AssessmentResults } from "./components/assessment-results";
import { assessOutsourcingRiskAction } from "./actions";
import type { AssessOutsourcingRiskOutput } from "@/ai/flows/assess-outsourcing-risk";

type State = {
  result?: AssessOutsourcingRiskOutput;
  error?: string;
  message?: string;
};

const initialState: State = {};

export default function AssessmentPage() {
  const [state, formAction] = useFormState(assessOutsourcingRiskAction, initialState);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Autonomous Risk Assessment Agent
        </h1>
      </div>
      <p className="text-muted-foreground max-w-4xl">
        Delegate your complex outsourcing risk assessments to an autonomous AI agent. Simply provide the details of an outsourcing arrangement, and the agent will execute a comprehensive, multi-step workflow. It analyzes the use case, quantifies risks, determines the necessary level of review, and takes proactive compliance actions—all while providing a transparent audit trail for executive oversight. This is agentic AI in action: from analysis to action, completely autonomously.
      </p>

      <div className="grid gap-8 lg:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Delegate Task to Agent</CardTitle>
            <CardDescription>
              Provide the agent with the details of the outsourcing arrangement. This is the only manual step in the process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AssessmentForm formAction={formAction} error={state?.error} />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>2. Review Agent's Work</CardTitle>
            <CardDescription>
              The agent autonomously performs the analysis and takes the required actions. Your role is simply to review the completed work.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
             <AssessmentResults result={state?.result} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
