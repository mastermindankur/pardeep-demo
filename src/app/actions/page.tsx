import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActionsTable } from "./components/actions-table";
import { actionItems as initialActionItems } from "@/lib/data";

export default function ActionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let actionItems = [...initialActionItems];
  if (searchParams?.newActionItem) {
    try {
      const newItem = JSON.parse(
        Array.isArray(searchParams.newActionItem)
          ? searchParams.newActionItem[0]
          : searchParams.newActionItem
      );
      actionItems.unshift(newItem);
    } catch (e) {
      console.error("Failed to parse new action item from URL", e);
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
