import type { PrivateRoute } from "@/routes/types";
import type { IconName } from "@/shared/components";

export interface Item {
  name: string;
  path: Exclude<PrivateRoute, "workspace">;
  icon?: IconName;
}

export interface MenuItem extends Item {
  render: "link" | "divider" | "group";
  subitems?: Item[];
  place: "main" | "platform";
}

export interface Segment {
  group: "main" | "platform" | "component";
  title?: string;
  styles: string;
  child?: React.ReactNode;
}
