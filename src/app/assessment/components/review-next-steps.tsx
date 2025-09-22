
"use client";

import type { AssessOutsourcingRiskOutput } from "@/ai/flows/assess-outsourcing-risk";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ActionItem, Document } from "@/lib/types";

interface ReviewAndNextStepsProps {
  result: AssessOutsourcingRiskOutput;
  newActionItem?: ActionItem;
  newDocument?: Document;
}

export function ReviewAndNextSteps({ result, newActionItem, newDocument }: ReviewAndNextStepsProps) {
    const actionItemQuery = newActionItem ? `?newActionItem=${encodeURIComponent(JSON.stringify(newActionItem))}` : '';
    const documentQuery = newDocument ? `?newDocument=${encodeURIComponent(JSON.stringify(newDocument))}` : '';

  return (
    <div className="w-full space-y-4 animate-in fade-in-50">
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
      
      {(newActionItem || newDocument) && (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">Review Created Assets</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-sm space-y-2 flex flex-col items-start">
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
