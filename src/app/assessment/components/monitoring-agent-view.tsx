
"use client";

import type { ActionItem } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Calendar, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MonitoringAgentViewProps {
  actionItem: ActionItem;
}

export function MonitoringAgentView({ actionItem }: MonitoringAgentViewProps) {
  return (
    <div className="w-full space-y-4 animate-in fade-in-50">
      <Card className="bg-secondary/50 border-dashed">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarFallback>
                <Bot />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base font-medium">Follow-up Agent</CardTitle>
              <p className="text-xs text-muted-foreground">Status: <span className="text-primary font-medium">Actively Monitoring...</span></p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
             <div className="bg-background/70 p-4 rounded-lg border">
                <p className="text-sm font-medium mb-3">Task being monitored:</p>
                <p className="text-sm text-muted-foreground mb-4">
                    {actionItem.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5" />
                        <div>
                            <p className="font-medium text-muted-foreground">Assigned To</p>
                            <p className="font-semibold">{actionItem.assignedTo}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" />
                        <div>
                            <p className="font-medium text-muted-foreground">Due Date</p>
                            <p className="font-semibold">{actionItem.dueDate}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative pl-5">
                <div className="absolute left-0 top-1.5 flex h-2 w-2 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </div>
                <p className="text-xs text-muted-foreground italic">
                    "I will monitor this action item and follow up with {actionItem.assignedTo} to ensure it is completed by the due date. I will escalate if it becomes overdue."
                </p>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
