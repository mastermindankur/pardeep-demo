
"use client";

import type { AssessOutsourcingRiskOutput } from "@/ai/flows/assess-outsourcing-risk";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from "recharts";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface RiskAnalysisResultsProps {
  result: AssessOutsourcingRiskOutput;
}

export function RiskAnalysisResults({ result }: RiskAnalysisResultsProps) {
  const riskData = [
    { name: "Operational", score: result.riskBreakdown.operationalRisk },
    { name: "Compliance", score: result.riskBreakdown.complianceRisk },
    { name: "Data", score: result.riskBreakdown.dataRisk },
    { name: "Regulatory", score: result.riskBreakdown.regulatoryRisk },
  ];

  const isFullReview = result.determinationResult === 'Full Review Required';

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
    </div>
  );
}
