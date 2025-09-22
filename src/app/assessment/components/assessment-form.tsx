
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, AlertCircle } from "lucide-react";

interface AssessmentFormProps {
  formAction: (payload: FormData) => void;
  error?: string;
  isPending: boolean;
}

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending} className="w-full">
      {isPending ? (
        "Agent is Working..."
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Delegate to Agent
        </>
      )}
    </Button>
  );
}

export function AssessmentForm({ formAction, error, isPending }: AssessmentFormProps) {
  return (
    <form action={formAction} className="space-y-4 w-full">
      <Textarea
        name="useCaseDetails"
        placeholder="e.g., We are outsourcing our customer support to 'HelpDeskPro' in the Philippines. They will access customer PII like names, emails, and purchase history to handle support tickets via email and chat."
        className="min-h-[150px]"
        required
      />
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <SubmitButton isPending={isPending} />
    </form>
  );
}
