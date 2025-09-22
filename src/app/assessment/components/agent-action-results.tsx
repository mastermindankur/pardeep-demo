
"use client";

import type { AssessOutsourcingRiskOutput } from "@/ai/flows/assess-outsourcing-risk";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Bot } from "lucide-react";

interface AgentActionResultsProps {
  result: AssessOutsourcingRiskOutput;
}

export function AgentActionResults({ result }: AgentActionResultsProps) {
  if (!result.agentActions || result.agentActions.length === 0) {
    return (
        <div className="w-full text-center text-muted-foreground p-4 border-dashed border-2 rounded-lg">
            <Bot className="mx-auto h-8 w-8 mb-2" />
            <p className="text-sm">No automated actions were required for this low-risk assessment.</p>
        </div>
    );
  }

  return (
    <div className="w-full space-y-4 animate-in fade-in-50">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Automated Agent Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {result.agentActions.map((action, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
    </div>
  );
}
