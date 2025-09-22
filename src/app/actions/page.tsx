import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActionsTable } from "./components/actions-table";
import { actionItems as initialActionItems } from "@/lib/data";
import type { ActionItem } from "@/lib/types";

export default function ActionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let actionItems: ActionItem[] = [...initialActionItems];

  const newActionItemParam = searchParams?.newActionItem;

  if (newActionItemParam) {
    try {
      // The parameter might be an array if it appears multiple times, so we take the first element.
      const jsonString = Array.isArray(newActionItemParam)
        ? newActionItemParam[0]
        : newActionItemParam;
      
      const newItem = JSON.parse(jsonString);

      // Validate that the new item has the required properties of an ActionItem
      if (newItem && newItem.id && newItem.description && newItem.assignedTo && newItem.dueDate && newItem.status) {
        // Add the new item to the beginning of the array so it appears at the top of the table.
        actionItems.unshift(newItem as ActionItem);
      } else {
        console.error("Parsed action item is missing required properties.");
      }
    } catch (e) {
      console.error("Failed to parse new action item from URL search parameter:", e);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Action Tracker
        </h1>
      </div>
      <p className="text-muted-foreground">
        Track actions for observation closure and audit readiness.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>All Action Items</CardTitle>
          <CardDescription>A centralized view of all compliance activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <ActionsTable data={actionItems} />
        </CardContent>
      </Card>
    </div>
  );
}
