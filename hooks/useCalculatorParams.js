// FILE: hooks/useCalculatorParams.js
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

/**
 * Custom hook to sync calculator state with URL query parameters.
 * * @param {string} key - The query parameter key (e.g., 'price', 'deposit')
 * @param {any} defaultValue - The default value if param is missing
 * @param {string} type - 'number' | 'string' | 'boolean'
 * @param {number} delay - Debounce delay in ms (default 500ms)
 * @returns {[any, Function]} - [value, setValue] interface compatible with useState
 */
export function useCalculatorParams(
  key,
  defaultValue,
  type = "number",
  delay = 500
) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 1. Initialize state from URL if present, else default
  const [innerValue, setInnerValue] = useState(() => {
    if (typeof window === "undefined") return defaultValue; // SSR safety

    const param = searchParams.get(key);
    if (param === null || param === undefined) return defaultValue;

    if (type === "number") {
      const num = Number(param);
      return isNaN(num) ? defaultValue : num;
    }
    if (type === "boolean") return param === "true";

    return param;
  });

  // 2. Sync state to URL with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      // Create new URLSearchParams object based on current params
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      // Update or Delete the specific key
      // We remove the param if it matches the default to keep URLs clean
      if (
        innerValue === defaultValue ||
        innerValue === "" ||
        innerValue === 0
      ) {
        current.delete(key);
      } else {
        current.set(key, String(innerValue));
      }

      // Construct new query string
      const search = current.toString();
      const query = search ? `?${search}` : "";

      // Update URL without navigation (prevents flicker and history stack bloat)
      const newUrl = `${pathname}${query}`;
      window.history.replaceState(null, "", newUrl);
    }, delay);

    return () => clearTimeout(timer);
  }, [innerValue, key, defaultValue, pathname, searchParams, delay]);

  return [innerValue, setInnerValue];
}
