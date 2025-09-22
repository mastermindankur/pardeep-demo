
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, Bot } from "lucide-react";

interface PromptInfoProps {
  title: string;
  prompt: string;
}

export function PromptInfo({ title, prompt }: PromptInfoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 ml-2 shrink-0">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Show prompt info</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot />
            {title}
          </DialogTitle>
          <DialogDescription>
            This is the prompt used to instruct the AI agent. It defines its persona, task, and the tools it can use.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-secondary/50 p-4 rounded-lg text-sm max-h-[50vh] overflow-y-auto">
          <pre className="whitespace-pre-wrap font-code text-secondary-foreground">
            <code>{prompt}</code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
