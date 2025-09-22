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
          Outsourcing Risk Assessment
        </h1>
      </div>
      <p className="text-muted-foreground">
        Use our AI-driven tool to evaluate outsourcing arrangements and determine compliance requirements.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>1. Provide Use Case Details</CardTitle>
            <CardDescription>
              Describe the services being outsourced, the data involved, and the third-party provider.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AssessmentForm formAction={formAction} error={state?.error} />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>2. Review AI-Powered Assessment</CardTitle>
            <CardDescription>
              The AI will analyze the details and generate a risk report.
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
