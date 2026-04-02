import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS class names safely.
 *
 * Combines `clsx` (conditional class joining) with `tailwind-merge` (conflict
 * resolution). Later classes override earlier ones when they target the same
 * CSS property — e.g. `cn("px-4", "px-6")` resolves to `"px-6"`.
 *
 * Use this everywhere classes are conditionally or dynamically composed instead
 * of string concatenation or template literals.
 *
 * @param inputs - Any number of class values: strings, arrays, or condition objects.
 * @returns A single merged class string safe to pass to `className`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}
