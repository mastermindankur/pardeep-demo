
"use client";

import { useActionState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AssessmentForm } from "./components/assessment-form";
import { RiskAnalysisResults } from "./components/risk-analysis-results";
import { AgentActionResults } from "./components/agent-action-results";
import { ReviewAndNextSteps } from "./components/review-next-steps";
import { MonitoringAgentView } from "./components/monitoring-agent-view";
import { assessOutsourcingRiskAction } from "./actions";
import type { AssessOutsourcingRiskOutput } from "@/ai/flows/assess-outsourcing-risk";
import { User, Bot, Eye, ClipboardCheck } from "lucide-react";
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
      title: "1. Delegate to Agent",
      description: "Provide the agent with the details of the outsourcing arrangement. This is the only manual step in the process.",
      content: <AssessmentForm formAction={formAction} error={state?.error} isPending={isPending} />,
      isConnector: true,
    },
    {
      icon: Bot,
      title: "2. Agent's Autonomous Workflow",
      description: "The agent is now working autonomously. It's performing a risk assessment, taking actions, and preparing a report for your review.",
      content: isPending && !state.result ? <LoadingSpinner /> : (state.result ? <p className="text-sm text-muted-foreground">Workflow Completed.</p> : <p className="text-sm text-muted-foreground">Awaiting delegation...</p>),
      isConnector: true,
    },
    {
      icon: Eye,
      title: "3. Review Agent's Completed Work",
      description: "The agent's complete analysis and all automated actions are presented for your review. Your role is to simply oversee the completed work.",
      content: isPending && !state.result ? <LoadingSpinner /> : (state.result ? (
        <div className="space-y-4 w-full">
            <RiskAnalysisResults result={state.result} />
            <AgentActionResults result={state.result} />
            <ReviewAndNextSteps result={state.result} newActionItem={state.newActionItem} newDocument={state.newDocument} />
        </div>
      ) : null),
      isConnector: true,
    },
    {
      icon: ClipboardCheck,
      title: "4. Monitor and Follow-up Agent",
      description: "A second autonomous agent monitors the status of the created action items, sending reminders and escalating if necessary to ensure timely completion.",
      content: state.result && state.newActionItem ? (
        <MonitoringAgentView actionItem={state.newActionItem} />
      ) : null,
      isConnector: false,
    }
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
              <Card className="ml-4 border-2">
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                {step.content && (
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
