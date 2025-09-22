
"use client";

import { useActionState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AssessmentForm } from "./components/assessment-form";
import { RiskAnalysisResults } from "./components/risk-analysis-results";
import { AgentActionResults } from "./components/agent-action-results";
import { ReviewAndNextSteps } from "./components/review-next-steps";
import { MonitoringAgentView } from "./components/monitoring-agent-view";
import { PromptInfo } from "./components/prompt-info";
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

const assessmentAgentPrompt = `You are an expert in outsourcing risk and compliance management. Analyze the provided outsourcing use case details to determine if it qualifies for the simplified outsourcing determination process and perform an AI-driven risk assessment considering operational, compliance, data, and regulatory risks.

  Provide a determination result, overall risk score, risk breakdown, and recommended next steps.

  Use Case Details: {{{useCaseDetails}}}

  Ensure the determination and recommendations align with regulatory and internal governance requirements. The risk scores should be between 0 and 100, with higher scores indicating higher risk.

  Consider these factors when determining the determination result:

  -Simplified: Low complexity, minimal data involved, well-established processes, and low regulatory impact.
  -Full Review Required: High complexity, significant data involved, novel processes, and high regulatory impact.
  
  Set reasonable values for the other fields.

  If the risk score is 75 or above, or the determination result is "Full Review Required", then set the isHighRisk boolean to true.
  If isHighRisk is true, you MUST use the createActionItemTool to create a high-priority action item for the compliance team and the generateReviewDocumentTool to generate a draft formal review document. The description for these actions must be specific to the use case. For example, if the use case is about a "Customer Support Chatbot", the action item description should be "Review Customer Support Chatbot arrangement." and the review document should be for "Customer Support Chatbot". When creating an action item, assign it to 'Jane Doe (Compliance Lead)'.
  
  Record the actions you've taken in the agentActions field. The actions should be specific, numbered, and broken down into clear steps. For example: 
  1. Created high-priority action item for Jane Doe (Compliance Lead) to review 'Customer Support Chatbot' arrangement, due on YYYY-MM-DD.
  2. Generated draft formal review document for 'Customer Support Chatbot'.

  Ensure that the output is valid JSON matching the schema.`;

const monitoringAgentPrompt = `You are a proactive monitoring agent responsible for ensuring compliance action items are completed on time.

You will be given an action item with its current status, due date, and assignee.

Your tasks are:
1. Check the current date against the action item's due date.
2. If the due date is approaching (within 3 days), generate a polite reminder to the assignee.
3. If the due date has passed, generate an escalation notice to the assignee's manager and the compliance lead.
4. If the action item is marked as 'Closed', provide a confirmation message.

Action Item: {{{actionItemJson}}}
Current Date: {{{currentDate}}}`;

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
      title: "1. Delegate to Risk Assessment Agent",
      description: "Provide the agent with the details of the outsourcing arrangement. This is the only manual step in the process.",
      content: <AssessmentForm formAction={formAction} error={state?.error} isPending={isPending} />,
      isConnector: true,
      promptInfo: null,
    },
    {
      icon: Bot,
      title: "2. Risk Assessment Agent's Autonomous Workflow",
      description: "The agent is now working autonomously. It's performing a risk assessment, taking actions, and preparing a report for your review.",
      content: isPending && !state.result ? <LoadingSpinner /> : (state.result ? <p className="text-sm text-muted-foreground">Workflow Completed.</p> : <p className="text-sm text-muted-foreground">Awaiting delegation...</p>),
      isConnector: true,
      promptInfo: {
        title: "Risk Assessment Agent Prompt",
        prompt: assessmentAgentPrompt
      }
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
      promptInfo: null,
    },
    {
      icon: ClipboardCheck,
      title: "4. Monitor and Follow-up Agent",
      description: "A second autonomous agent monitors the status of the created action items, sending reminders and escalating if necessary to ensure timely completion.",
      content: state.result && state.newActionItem ? (
        <MonitoringAgentView actionItem={state.newActionItem} />
      ) : null,
      isConnector: false,
      promptInfo: {
        title: "Monitoring Agent Prompt",
        prompt: monitoringAgentPrompt
      }
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
        This page showcases two autonomous AI agents working in tandem. First, delegate your outsourcing risk assessment to the Risk Assessment Agent. It will analyze the arrangement, quantify risks, determine the review level, and autonomously creates compliance actions. Then, a second Monitoring Agent takes over, tracking any created action items to ensure completion. This is agentic AI in action: from analysis to action to follow-up, all with your oversight.
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
                  <div className="flex items-center">
                    <CardTitle>{step.title}</CardTitle>
                    {step.promptInfo && (
                        <PromptInfo title={step.promptInfo.title} prompt={step.promptInfo.prompt} />
                    )}
                  </div>
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
