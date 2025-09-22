
"use client";

import type { AssessOutsourcingRiskOutput } from "@/ai/flows/assess-outsourcing-risk";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from "recharts";
import { AlertTriangle, CheckCircle, FileText, Sparkles, Bot, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ActionItem, Document } from "@/lib/types";

interface AssessmentResultsProps {
  result?: AssessOutsourcingRiskOutput;
  isPending: boolean;
  newActionItem?: ActionItem;
  newDocument?: Document;
}

export function AssessmentResults({ result, isPending, newActionItem, newDocument }: AssessmentResultsProps) {
  if (isPending && !result) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!result) {
    return (
      <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg w-full">
        <Sparkles className="mx-auto h-12 w-12" />
        <p>The agent's analysis and actions will appear here once the task is delegated.</p>
      </div>
    );
  }

  const riskData = [
    { name: "Operational", score: result.riskBreakdown.operationalRisk },
    { name: "Compliance", score: result.riskBreakdown.complianceRisk },
    { name: "Data", score: result.riskBreakdown.dataRisk },
    { name: "Regulatory", score: result.riskBreakdown.regulatoryRisk },
  ];

  const isFullReview = result.determinationResult === 'Full Review Required';

  const actionItemQuery = newActionItem ? `?newActionItem=${encodeURIComponent(JSON.stringify(newActionItem))}` : '';
  const documentQuery = newDocument ? `?newDocument=${encodeURIComponent(JSON.stringify(newDocument))}` : '';

  return (
    <div className="w-full space-y-4 animate-in fade-in-50">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Determination</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {isFullReview ? (
                 <AlertTriangle className="h-6 w-6 text-destructive" />
              ) : (
                 <CheckCircle className="h-6 w-6 text-green-600" />
              )}
              <span className="text-lg font-semibold">{result.determinationResult}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${result.isHighRisk ? 'text-destructive' : 'text-green-600'}`}>
                    {result.riskScore}
                </span>
                <Badge variant={result.isHighRisk ? "destructive" : "secondary"}>
                    {result.isHighRisk ? "High Risk" : "Low Risk"}
                </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Risk Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={riskData} layout="vertical" margin={{ left: 10, right: 30 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} width={80} />
              <Bar dataKey="score" background={{ fill: 'hsl(var(--muted))', radius: 4 }} radius={4} fill="hsl(var(--primary))">
                 <LabelList dataKey="score" position="right" offset={8} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{result.recommendedNextSteps}</p>
        </CardContent>
      </Card>

      {result.agentActions && result.agentActions.length > 0 && (
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
            <div className="text-sm mt-4 space-y-2 flex flex-col items-start">
                {newActionItem && (
                    <Button asChild variant="link" className="p-0 h-auto">
                        <Link href={`/actions${actionItemQuery}`}>
                            View new item in Action Tracker <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
                {newDocument && (
                    <Button asChild variant="link" className="p-0 h-auto">
                        <Link href={`/documents${documentQuery}`}>
                            View new file in Document Hub <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
