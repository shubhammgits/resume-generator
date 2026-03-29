import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toBullets(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.replace(/^[-•\s]+/, "").trim())
    .filter(Boolean);
}

export function splitCommaValues(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function removeCommaValue(source: string, valueToRemove: string): string {
  const next = splitCommaValues(source).filter((item) => item !== valueToRemove);
  return next.join(", ");
}

export function sanitizeFileName(name: string): string {
  const cleaned = name.trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
  return cleaned || "My";
}
