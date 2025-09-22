
"use client";

import { useActionState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AssessmentForm } from "./components/assessment-form";
import { AssessmentResults } from "./components/assessment-results";
import { assessOutsourcingRiskAction } from "./actions";
import type { AssessOutsourcingRiskOutput } from "@/ai/flows/assess-outsourcing-risk";
import { User, Bot, ClipboardCheck, Eye } from "lucide-react";
import type { ActionItem, Document } from "@/lib/types";

type State = {
  result?: AssessOutsourcingRiskOutput;
  error?: string;
  message?: string;
  newActionItem?: ActionItem;
  newDocument?: Document;
};

const initialState: State = {};

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

export default function AssessmentPage() {
  const [state, formAction, isPending] = useActionState(assessOutsourcingRiskAction, initialState);

  const workflowSteps = [
    {
      icon: User,
      title: "1. Delegate Task to Agent",
      description: "Provide the agent with the details of the outsourcing arrangement. This is the only manual step in the process.",
      content: <AssessmentForm formAction={formAction} error={state?.error} isPending={isPending} />,
      isConnector: true,
    },
    {
      icon: Bot,
      title: "Agent Analyzes Risk",
      description: "The agent autonomously performs a comprehensive risk assessment, quantifying operational, compliance, data, and regulatory risks.",
      content: isPending && !state.result ? <LoadingSpinner /> : null,
      isConnector: true,
    },
    {
      icon: ClipboardCheck,
      title: "Agent Takes Action",
      description: "If high-risk is detected, the agent automatically creates action items and generates draft review documents, ensuring compliance.",
      content: isPending && !state.result ? <LoadingSpinner /> : null,
      isConnector: true,
    },
    {
      icon: Eye,
      title: "2. Review Agent's Work",
      description: "The agent's complete analysis and all automated actions are presented for your review. Your role is to simply oversee the completed work.",
      content: <AssessmentResults result={state?.result} isPending={isPending} newActionItem={state?.newActionItem} newDocument={state?.newDocument} />,
      isConnector: false,
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Autonomous Risk Assessment Agent
        </h1>
      </div>
      <p className="text-muted-foreground">
        Delegate your complex outsourcing risk assessments to an autonomous AI agent. Simply provide the details of an outsourcing arrangement, and the agent will execute a comprehensive, multi-step workflow. It analyzes the use case, quantifies risks, determines the necessary level of review, and takes proactive compliance actions—all while providing a transparent audit trail for executive oversight. This is agentic AI in action: from analysis to action, completely autonomously.
      </p>

      <div className="mt-8">
        <div className="relative">
          {workflowSteps.map((step, index) => (
            <div key={index} className="relative pl-12 pb-8">
              {step.isConnector && (
                <div className="absolute left-[22px] top-5 h-full w-0.5 bg-border" />
              )}
              <div className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-card border">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <Card className="ml-4">
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                {(step.content) && (
                  <CardContent className="flex-1 flex items-center justify-center">
                    {step.content}
                  </CardContent>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
