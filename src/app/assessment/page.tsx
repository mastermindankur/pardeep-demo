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
        This page demonstrates an AI agent that automates the complex process of outsourcing risk assessment. By simply providing the use case details, you activate an autonomous workflow. The agent analyzes the information, quantifies various risk factors, determines the required level of review, and if necessary, automatically creates action items and generates draft documentation for the compliance team. This end-to-end process is designed to be transparent and efficient for executive oversight.
      </p>

      <div className="grid gap-8 lg:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Initiate Agent Task</CardTitle>
            <CardDescription>
              Provide the agent with the details of the outsourcing arrangement to begin the assessment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AssessmentForm formAction={formAction} error={state?.error} />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>2. Review Agent's Findings & Actions</CardTitle>
            <CardDescription>
              The agent will analyze the details, generate a risk report, and take automated next steps.
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
