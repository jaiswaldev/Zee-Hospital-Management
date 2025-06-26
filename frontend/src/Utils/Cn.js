// cn.js

import clsx from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to combine and merge Tailwind class names.
 * - clsx: handles conditional and dynamic className logic
 * - twMerge: resolves conflicting Tailwind classes
 *
 * @param  {...any} inputs - class names or conditionals
 * @returns {string} - merged className string
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs))
}
