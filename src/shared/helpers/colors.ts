import { memoize } from "@/shared/utils";

export const baseColors = {
  black: "bg-black ring-black dark:bg-stone-900 dark:ring-stone-900",
  gray: "bg-gray-300 ring-gray-300 dark:bg-gray-700 dark:ring-gray-700",
  blue: "bg-blue-500 ring-blue-500 dark:bg-blue-900 dark:ring-blue-900",
  green: "bg-green-600 ring-green-600 dark:bg-green-900 dark:ring-green-900",
  red: "bg-red-500 ring-red-500 dark:bg-red-900 dark:ring-red-900",
  purple: "bg-purple-500 ring-purple-500 dark:bg-purple-900 dark:ring-purple-900",
  fuchsia: "bg-fuchsia-500 ring-fuchsia-500 dark:bg-fuchsia-900 dark:ring-fuchsia-900",
  yellow: "bg-yellow-400 ring-yellow-400 dark:bg-yellow-700 dark:ring-yellow-700",
};

export const colors = {
  gray: "bg-gray-200 text-gray-800 ring-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:ring-gray-700",
  black: "bg-black text-white ring-black dark:bg-stone-900 dark:ring-stone-900 dark:text-stone-200",
  blue: "bg-blue-500 text-blue-100 ring-blue-500 dark:text-blue-200 dark:bg-blue-900 dark:ring-blue-900",
  green: "bg-green-600 text-green-100 ring-green-600 dark:text-green-200 dark:bg-green-900 dark:ring-green-900",
  red: "bg-red-500 text-red-100 ring-red-500 dark:text-red-200 dark:bg-red-900 dark:ring-red-900",
  purple: "bg-purple-500 text-purple-100 ring-purple-500 dark:text-purple-200 dark:bg-purple-900 dark:ring-purple-900",
  fuchsia:
    "bg-fuchsia-500 text-fuchsia-100 ring-fuchsia-500 dark:text-fuchsia-200 dark:bg-fuchsia-900 dark:ring-fuchsia-900",
  yellow: "bg-yellow-400 text-yellow-800 ring-yellow-400 dark:text-yellow-200 dark:bg-yellow-700 dark:ring-yellow-700",
};

export type Color = keyof typeof colors;

export const getColor = memoize((color: Color) => colors[color]);
