import { ModuleItem } from "@/data/modules";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { ScrollArea } from "./scroll-area";

interface Props {
  value: string | string[];
  onChange: (modules: string[]) => void;
  options: ModuleItem[];
  height: string;
  disabled?: boolean;
}

export function ModuleSelector({
  value,
  onChange,
  options,
  height,
  disabled,
}: Props) {
  // Ensure value is always a proper array of strings
  const normalizedValue: string[] = Array.isArray(value)
    ? // If it's already an array but contains a JSON string, parse it
      value.length === 1 &&
      typeof value[0] === "string" &&
      value[0].startsWith("[")
      ? JSON.parse(value[0])
      : // Handle the case where it's an array of characters from a JSON string
        value.length > 0 && value[0] === "["
        ? JSON.parse(value.join(""))
        : value
    : // If it's a string (JSON), parse it
      typeof value === "string" && value.startsWith("[")
      ? JSON.parse(value)
      : [];

  const isModuleSelected = (module: ModuleItem) =>
    module.children?.every((child) => normalizedValue.includes(child.id));

  const isModuleIndeterminate = (module: ModuleItem) =>
    module.children?.some((child) => normalizedValue.includes(child.id)) &&
    !isModuleSelected(module);

  const handleModuleChange = (
    actionName: string,
    isChecked: boolean,
    module?: ModuleItem
  ) => {
    let newSelected: string[];

    if (module) {
      if (isChecked) {
        // Add all children that aren't already in value
        const childrenIds = (module.children || []).map((child) => child.id);
        const actionsToAdd = childrenIds.filter(
          (id) => !normalizedValue.includes(id)
        );
        newSelected = [...normalizedValue, ...actionsToAdd];
      } else {
        // Remove only this module's children, keep everything else
        const childrenIds = (module.children || []).map((child) => child.id);
        newSelected = normalizedValue.filter((id) => !childrenIds.includes(id));
      }
    } else {
      if (isChecked) {
        newSelected = [...normalizedValue, actionName];
      } else {
        newSelected = normalizedValue.filter((name) => name !== actionName);
      }
    }

    // Return the result as a proper array, not a JSON string
    onChange(newSelected);
  };

  return (
    <ScrollArea
      className={cn(
        "w-full rounded-md border p-4",
        height ? `h-${height}` : "h-96"
      )}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {options.map((module) => (
            <Card key={module.id} className="w-full">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={module.id}
                      checked={isModuleSelected(module)}
                      onCheckedChange={(checked) =>
                        handleModuleChange("", checked as boolean, module)
                      }
                      className={cn(
                        isModuleIndeterminate(module) && "bg-primary/50"
                      )}
                      disabled={disabled}
                    />
                    <Label htmlFor={module.id} className="flex flex-col">
                      <span>{module.name}</span>
                    </Label>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {module.children?.map((child) => (
                    <div
                      key={child.id}
                      className="ml-4 flex items-center space-x-2"
                    >
                      <Checkbox
                        id={child.id}
                        checked={normalizedValue.includes(child.id)}
                        onCheckedChange={(checked) =>
                          handleModuleChange(child.id, checked as boolean)
                        }
                        disabled={disabled}
                      />
                      <Label
                        htmlFor={child.id}
                        className="flex flex-col text-sm"
                      >
                        <span className="text-sm text-muted-foreground">
                          {child.name}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
