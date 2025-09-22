import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ShieldCheck className="h-6 w-6 text-accent" />
      <h2 className="text-lg font-bold text-primary-foreground font-headline tracking-tight">
        RiskCheck AI
      </h2>
    </div>
  );
}
