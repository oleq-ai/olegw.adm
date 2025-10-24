import PermissionGate from "@/components/permissions/permission-gate";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { countries } from "@/data/countries";
import { getSession } from "@/lib/session/session";
import {
  CURRENCIES,
  LANGUAGES,
} from "@/lib/settings/constants/settings.constant";
import { getSettingsActions } from "@/lib/settings/settings.action";

import UpdateSettingsForm from "./update-settings-form";

export default async function SettingsPage() {
  const session = await getSession();

  const res = await getSettingsActions();

  const settings = res.success
    ? res.data
    : {
        country: "",
        operator: "",
        lang: "",
        currency: "",
        allowedAge: "",
      };

  const getLabelByValue = (
    options: { value: string; label: string }[],
    value: string
  ) => {
    return options.find((option) => option.value === value)?.label || value;
  };

  const countriesLabel = getLabelByValue(
    countries.map((c) => ({
      value: c.iso2,
      label: c.name,
    })),
    settings.country
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            View and manage your platform settings
          </p>
        </div>
        <PermissionGate session={session} permissions={["dashboard:view"]}>
          <UpdateSettingsForm defaultValues={settings} />
        </PermissionGate>
      </div>

      <PermissionGate session={session} permissions={["dashboard:view"]}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Platform Configuration</CardTitle>
              <CardDescription>
                Core settings for your gaming platform
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Country</Label>
                    <p className="font-medium">{countriesLabel}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Operator</Label>
                    <p className="font-medium">{settings.operator}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Language</Label>
                    <p className="font-medium">
                      {getLabelByValue(LANGUAGES, settings.lang)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Currency</Label>
                    <p className="font-medium">
                      {getLabelByValue(CURRENCIES, settings.currency)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Minimum Age</Label>
                    <p className="font-medium">{settings.allowedAge} years</p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="justify-between bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Last updated: March 22, 2025
              </p>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Settings Impact</CardTitle>
              <CardDescription>
                How your current settings affect the platform
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Regional Compliance</h3>
                  <p className="text-sm text-muted-foreground">
                    Your platform is configured for {countriesLabel}{" "}
                    regulations. Age verification is set to{" "}
                    {settings.allowedAge}+ years.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">User Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Default language is set to{" "}
                    {getLabelByValue(LANGUAGES, settings.lang)}. All
                    transactions will be processed in{" "}
                    {getLabelByValue(CURRENCIES, settings.currency)}.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Operation</h3>
                  <p className="text-sm text-muted-foreground">
                    Platform is operated by {settings.operator}, licensed for
                    operation in {countriesLabel}.
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-muted/50">
              <p className="text-xs text-muted-foreground">
                Note: Changes to these settings may require regulatory approval
                in some jurisdictions.
              </p>
            </CardFooter>
          </Card>
        </div>
      </PermissionGate>
    </div>
  );
}
