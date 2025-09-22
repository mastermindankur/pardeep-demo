"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, AlertCircle } from "lucide-react";

interface AssessmentFormProps {
  formAction: (payload: FormData) => void;
  error?: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        "Assessing..."
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Assess Risk
        </>
      )}
    </Button>
  );
}

export function AssessmentForm({ formAction, error }: AssessmentFormProps) {
  return (
    <form action={formAction} className="space-y-4">
      <Textarea
        name="useCaseDetails"
        placeholder="e.g., We are outsourcing our customer support to 'HelpDeskPro' in the Philippines. They will access customer PII like names, emails, and purchase history to handle support tickets via email and chat."
        className="min-h-[200px]"
        required
      />
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <SubmitButton />
    </form>
  );
}
