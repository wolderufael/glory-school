import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { billing } from "../../../app/dashboard/grades-trascripts/mock-data";

export function Billing() {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getAmountColor = (type: string) => {
    return type.toLowerCase() === "credit"
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
              Current Balance
            </p>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
              ETB {billing.currentBalance.toLocaleString()}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billing.transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className="font-medium">
                      {transaction.description}
                    </TableCell>
                    <TableCell className={getAmountColor(transaction.type)}>
                      ETB {transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
