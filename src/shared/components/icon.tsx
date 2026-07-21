import { cn } from "@/shared/utils";

interface IconProps {
  name: IconName;
  className?: string;
}

/* prettier-ignore */
export const Icon = ({ name, className = "size-4" }: IconProps) => {
  return (
    <svg className={cn("bi size-full shrink-0", className)} viewBox="0 0 16 16" fill="currentColor">
      <use xlinkHref={`/images/icons-sprite.svg#${iconName[name]}`} />
    </svg>
  );
};

export const iconName = {
  add: "plus",
  alert: "exclamation-triangle",
  arrow_down: "arrow-down",
  arrow_left: "arrow-left",
  arrow_right: "arrow-right",
  arrow_up: "arrow-up",
  arrow_up_right: "arrow-up-right",
  arrow_down_right: "arrow-down-right",
  caret_down: "caret-down",
  caret_up: "caret-up",
  check: "check2",
  chevron_down: "chevron-down",
  chevron_left: "chevron-left",
  chevron_right: "chevron-right",
  chevron_up: "chevron-up",
  close: "x",
  eye_close: "eye-slash",
  eye_open: "eye",
  file: "file-earmark",
  moon: "moon-stars",
  more: "three-dots",
  options: "three-dots-vertical",
  refresh: "arrow-clockwise",
  search: "search",
  sun: "sun",
  google: "google",
  email: "envelope",
  otp: "123",
  person: "person",
  camera: "camera",
  home: "house",
  bell: "bell",
  sidebar: "layout-sidebar-inset",
  logout: "box-arrow-left",
  save: "save2",
  edit: "pencil",
  delete: "trash",
  info: "info-circle",
  repeat: "repeat",
  persons: "people",
  globe: "globe",
  ia: "magic",
  calendar: "calendar",
  email_send: "envelope-paper",
  inbox: "inbox",
  password: "key",
  shield: "shield-lock",
};

export type IconName = keyof typeof iconName;
