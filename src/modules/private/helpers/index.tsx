import type { MenuItem, Segment } from "@/modules/private/types";

export const menuSegments: Segment[] = [
  {
    group: "main",
    styles: "mt-5",
  },
  {
    group: "platform",
    styles: "mt-10",
    title: "Platform",
  },
];

export const menuItems: MenuItem[] = [
  {
    name: "overview",
    path: "overview",
    render: "link",
    place: "main",
    icon: "home",
  },
];
