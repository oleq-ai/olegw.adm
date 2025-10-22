import { AlertTriangle } from "lucide-react";

import PermissionGate from "@/components/permissions/permission-gate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Session } from "@/lib/session/session.types";

type Props = {
  data: {
    id: number;
    type: string;
    user: string;
    amount: number;
    event: string;
  }[];
  session: Session | null;
};

export default function RiskManagement({ data, session }: Props) {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between px-6">
        <div className="flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
          <CardTitle>Risk Alerts</CardTitle>
        </div>
        {data.length > 0 && (
          <Button variant="link" className="text-sm">
            View All Alerts
          </Button>
        )}
      </CardHeader>
      <CardContent className="px-6">
        {data.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {data.map((alert) => (
              <Alert
                key={alert.id}
                variant="destructive"
                className="border-destructive/50 bg-destructive/10"
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="font-semibold">{alert.type}</AlertTitle>
                <AlertDescription className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p>
                      User <span className="font-medium">{alert.user}</span>{" "}
                      placed a ${alert.amount.toLocaleString()} bet on{" "}
                      {alert.event}.
                    </p>
                  </div>

                  <PermissionGate
                    session={session}
                    permissions={["manage:risk-mitigation"]}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button variant="outline" size="sm">
                        Investigate
                      </Button>
                      <Button variant="destructive" size="sm">
                        Lock Account
                      </Button>
                    </div>
                  </PermissionGate>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        ) : (
          <p className="py-4 text-center text-muted-foreground">
            No risk alerts at this time.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
