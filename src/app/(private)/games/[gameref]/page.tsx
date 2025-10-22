import { Metadata } from "next";

import PermissionGate from "@/components/permissions/permission-gate";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import ErrorAlert from "@/components/ui/error-alert";
import { CreateGameDto } from "@/lib/games/dto/game.dto";
import { getGameAction } from "@/lib/games/games.actions";
import { getPermissions } from "@/lib/permissions/permissions";
import { getSession } from "@/lib/session/session";

import CreateGameForm from "../create/create-game-form";

export const metadata: Metadata = {
  title: "Game Details",
};

type Props = {
  params: Promise<{ gameref: string }>;
};

export default async function GameDetailsPage({ params }: Props) {
  const { gameref } = await params;
  const session = await getSession();
  const { hasPermission } = getPermissions(session);

  const res = await getGameAction(gameref);

  if (!res.success)
    return (
      <ErrorAlert
        message="Oops! Something went wrong"
        title="Game Details"
        items={[{ title: "Games", href: "/games" }]}
      />
    );

  const initialValues: CreateGameDto = res.data;

  return (
    <div className="space-y-4">
      <BreadcrumbNav
        title={res.data.gamename}
        items={[{ title: "Games", href: "/games" }]}
      />

      <div className="space-y-8 rounded-lg border border-dashed p-2 shadow-sm md:p-8">
        <div className="w-full space-y-6">
          <PermissionGate session={session} permissions={["games:view"]}>
            <CreateGameForm
              initialValues={initialValues}
              canUpdate={hasPermission("games:add")}
            />
          </PermissionGate>
        </div>
      </div>
    </div>
  );
}
