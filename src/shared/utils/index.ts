import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ColumnConfig, ColumnsConfig } from "@/shared/types";

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function baseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.APP_URL) return process.env.APP_URL as string;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const capitalize = (str: string) => {
  if (!str) return "";
  const textToCapitalize = str.toLowerCase();
  return textToCapitalize.charAt(0).toUpperCase() + textToCapitalize.slice(1);
};

export const formatCurrency = (amount: number, currency: string = "USD", decimalPlaces: number = 0): string => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    minimumFractionDigits: decimalPlaces,
  }).format(amount);
};

export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

export const slugSanitize = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/'s\b/g, "")
    .replace(/[áàäâ]/g, "a")
    .replace(/[éèëê]/g, "e")
    .replace(/[íìïî]/g, "i")
    .replace(/[óòöô]/g, "o")
    .replace(/[úùüû]/g, "u")
    .replace(/ñ/g, "n")
    .replace(/[^a-z\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export const slugToTitle = (slug: string): string => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const fallbackName = (text: string, separator = " ") => {
  const names = text.split(separator);
  const namesLength = names.length;

  if (namesLength > 1) {
    return `${names[0].charAt(0).toUpperCase()}${names[namesLength - 1].charAt(0).toUpperCase()}`;
  }

  return names[0].charAt(0).toUpperCase();
};

export const fallbackAvatar = (text: string) => {
  return `https://ui-avatars.com/api/?name=${text}&background=171717&color=ffffff`;
};

export const getRandomAvatar = () => {
  const randomGender = Math.random() < 0.5 ? "male" : "female";
  const randomIndex = Math.floor(Math.random() * (30 - 1 + 1)) + 1;

  const urlAvatarPlaceholder = `https://d2u8k2ocievbld.cloudfront.net/memojis/${randomGender}/${randomIndex}.png`;
  return urlAvatarPlaceholder;
};

export const shuffleArray = <T>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const randomPassword = (length: number = 16) => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "@$!%*?&";

  const allCharacters = lowercase + uppercase + numbers + symbols;

  const randomChar = (pool: string) => {
    const index = crypto.getRandomValues(new Uint32Array(1))[0] % pool.length;
    return pool[index];
  };

  const required = [randomChar(lowercase), randomChar(uppercase), randomChar(numbers), randomChar(symbols)];
  const rest = Array.from({ length: length - required.length }, () => randomChar(allCharacters));

  return [...required, ...rest].sort(() => (crypto.getRandomValues(new Uint32Array(1))[0] % 2 === 0 ? 1 : -1)).join("");
};

export const generateTokenCode = () => crypto.randomUUID();

export const generateRandomString = (length: number = 6): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length)))
    .map((x) => x.toString())
    .join("");
};

export const tryCatch = async <T>(promise: Promise<T>): Promise<Partial<APIResult<T>>> => {
  try {
    const data = await promise;
    return { data, status: "success", error: null };
  } catch (error) {
    return { data: null, status: "error", error: error as Error };
  }
};

export const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.onerror = (error) => reject(error);
  });
};

export const base64ToFile = async (base64: string, fileName?: string): Promise<File> => {
  const response = await fetch(base64);
  const blob = await response.blob();
  const randomName = generateRandomString();

  return new File([blob], !fileName ? randomName : fileName, {
    type: blob.type,
  });
};

export const isBase64Image = (value: string): boolean => {
  const regex = /^data:image\/[a-zA-Z]+;base64,/;
  return regex.test(value);
};

export function defineColumns<T>(config: ColumnsConfig<T>) {
  return Object.entries(config).map(([name, options]) => ({
    column: name as keyof T,
    ...(options as ColumnConfig),
  }));
}
