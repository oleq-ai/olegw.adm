"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import FormButton from "@/components/ui/form-button";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import FormSwitch from "@/components/ui/form-switch";
import FormTextarea from "@/components/ui/form-textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateGameDto, createGameSchema } from "@/lib/games/dto/game.dto";
import { createGameAction } from "@/lib/games/games.actions";
import { GameCategory } from "@/lib/games/types/game.types";
import { TAGS } from "@/lib/shared/constants";

interface Props {
  initialValues?: CreateGameDto;
  canUpdate: boolean;
}

export default function CreateGameForm({ initialValues, canUpdate }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const defaultValues = initialValues ?? {
    gamename: "",
    gamecode: "",
    active: true,
    // deleted: false,
    description: "",
    featured: false,
    hot: false,
    tag: "",
    category: GameCategory.Virtual,
    gamedata: {
      banner: "",
      funnydemourl: "",
      funnyprodurl: "",
      demourl: "",
      produrl: "",
    },
  };

  const form = useForm<CreateGameDto>({
    resolver: zodResolver(createGameSchema),
    defaultValues,
  });

  const { control, handleSubmit } = form;

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: CreateGameDto) => {
      const method = canUpdate ? "update" : "create";
      if (!canUpdate)
        throw new Error(`You are not authorized to ${method} this game`);

      // const data = diff(defaultValues, values) as CreateGameDto;
      // const res = await createGameAction({
      //   ...data,
      //   gameref: initialValues?.gameref,
      // });
      const res = await createGameAction(values);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    onError: ({ message }) => toast.error(message),
    onSuccess: () => {
      toast.success(
        `Game ${defaultValues ? "updated" : "created"} successfully`
      );
      router.push("/games");
      queryClient.invalidateQueries({ queryKey: [TAGS.GAMES] });
    },
  });

  return (
    <div className="mx-auto max-w-7xl bg-background p-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary py-4 text-primary-foreground">
          <CardTitle className="text-2xl font-bold">
            {defaultValues ? "Update Game" : "Create New Game"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form
              onSubmit={handleSubmit((values) => mutate(values))}
              className="space-y-6"
              noValidate
            >
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Information</TabsTrigger>
                  <TabsTrigger value="details">Game Details</TabsTrigger>
                  <TabsTrigger value="urls">Game URLs</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormInput
                      control={control}
                      name="gamename"
                      label="Game Name"
                      placeholder="Enter game name"
                      className="w-full"
                      required
                      disabled={!canUpdate}
                    />
                    <FormInput
                      control={control}
                      name="gamecode"
                      label="Game Code"
                      placeholder="Enter game code"
                      className="w-full"
                      required
                      disabled={!canUpdate}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-1">
                    <FormTextarea
                      control={control}
                      name="description"
                      label="Description"
                      placeholder="Enter game description"
                      className="w-full"
                      rows={4}
                      disabled={!canUpdate}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormSelect
                      control={control}
                      name="category"
                      label="Game Category"
                      placeholder="Select a category"
                      options={Object.entries(GameCategory).map(
                        ([key, value]) => ({
                          label: key,
                          value,
                        })
                      )}
                      disabled={!canUpdate}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormSwitch
                      control={control}
                      name="active"
                      label="Active Status"
                      description="Is this game currently active?"
                      disabled={!canUpdate}
                    />
                    <FormSwitch
                      control={control}
                      name="featured"
                      label="Featured Game"
                      description="Display this game as featured"
                      disabled={!canUpdate}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormSwitch
                      control={control}
                      name="hot"
                      label="Hot Game"
                      description="Mark this game as a hot/trending game"
                      disabled={!canUpdate}
                    />
                    {/* <FormSwitch
                      control={control}
                      name="hot"
                      label="Hot Game"
                      description="Mark this game as a hot/trending game"
                    /> */}
                  </div>

                  <div className="grid gap-6 md:grid-cols-1">
                    <FormInput
                      control={control}
                      name="gamedata.banner"
                      label="Banner Image URL"
                      placeholder="Enter banner image URL"
                      className="w-full"
                      disabled={!canUpdate}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="urls" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Demo Environment</h3>
                      <FormInput
                        control={control}
                        name="gamedata.demourl"
                        label="Demo URL"
                        placeholder="Enter demo URL"
                        className="w-full"
                        disabled={!canUpdate}
                      />
                      <FormInput
                        control={control}
                        name="gamedata.funnydemourl"
                        label="Funny Demo URL"
                        placeholder="Enter funny demo URL"
                        className="w-full"
                        disabled={!canUpdate}
                      />
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">
                        Production Environment
                      </h3>
                      <FormInput
                        control={control}
                        name="gamedata.produrl"
                        label="Production URL"
                        placeholder="Enter production URL"
                        className="w-full"
                        disabled={!canUpdate}
                      />
                      <FormInput
                        control={control}
                        name="gamedata.funnyprodurl"
                        label="Funny Production URL"
                        placeholder="Enter funny production URL"
                        className="w-full"
                        disabled={!canUpdate}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-4 border-t border-border pt-6">
                <FormButton
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/games")}
                  className="px-6"
                >
                  Cancel
                </FormButton>
                <FormButton
                  isLoading={isPending}
                  className="bg-primary px-6 text-primary-foreground hover:bg-primary/90"
                  disabled={!canUpdate}
                >
                  {defaultValues ? "Update Game" : "Create Game"}
                </FormButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
