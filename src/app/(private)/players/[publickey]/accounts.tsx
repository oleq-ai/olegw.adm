import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { accountType } from "@/lib/accounts/constants/constants.type";
import { PlayerDetails } from "@/lib/players/types/user.types";
import { formatAmount } from "@/lib/utils";

type Props = {
  accounts: PlayerDetails["accounts"];
  publickey: string;
  canViewTransactions: boolean;
};

export default function Accounts({
  accounts,
  publickey,
  canViewTransactions,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Balance</TableHead>
              {canViewTransactions && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => {
              const group = accountType[account.groupid] ?? "Unknown";

              return (
                <TableRow key={account.account}>
                  <TableCell className="flex flex-col gap-2">
                    <span className="text-sm font-medium">
                      {account.account}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">
                      {group}
                    </span>
                  </TableCell>
                  <TableCell>{account.currency}</TableCell>
                  <TableCell>{formatAmount(account.balance)}</TableCell>
                  {canViewTransactions && (
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/players/${publickey}/statements/${account.account}`}
                        >
                          View Statements
                        </Link>
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
