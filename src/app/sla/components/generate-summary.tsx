"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, AlertCircle } from "lucide-react";
import { generateSlaSummaryAction } from "../actions";

export function GenerateSummary() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setIsOpen(true);
    setError(null);
    setSummary(null);

    const result = await generateSlaSummaryAction();
    if (result.summary) {
      setSummary(result.summary);
    } else {
      setError(result.error || "An unknown error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? (
          "Generating..."
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Monthly Summary
          </>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles />
              AI-Generated SLA & Risk Summary
            </DialogTitle>
            <DialogDescription>
              A concise summary for your monthly review meetings with Outsourced Service Providers (OSPs).
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {isLoading && (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {summary && (
              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                {summary.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
