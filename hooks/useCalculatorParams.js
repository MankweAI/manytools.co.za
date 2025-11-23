// FILE: hooks/useCalculatorParams.js
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, usePathname } from "next/navigation";

/**
 * Custom hook to sync calculator state with URL query parameters.
 * HYDRATION SAFE: Initializes with default value, then syncs with URL on client.
 */
export function useCalculatorParams(
  key,
  defaultValue,
  type = "number",
  delay = 500
) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 1. Initialize STRICTLY with defaultValue to ensure Server/Client match on first render.
  const [innerValue, setInnerValue] = useState(defaultValue);
  const isMounted = useRef(false);

  // 2. Hydrate state from URL query params (Client-Side Only)
  useEffect(() => {
    if (!isMounted.current) {
      const param = searchParams.get(key);
      if (param !== null && param !== undefined) {
        if (type === "number") {
          const num = Number(param);
          if (!isNaN(num)) setInnerValue(num);
        } else if (type === "boolean") {
          setInnerValue(param === "true");
        } else {
          setInnerValue(param);
        }
      }
      isMounted.current = true;
    }
  }, [searchParams, key, type]);

  // 3. Sync state changes back to URL (Write)
  useEffect(() => {
    // Skip the write-back on the very first render/hydration to prevent overwriting URL
    if (!isMounted.current) return;

    const timer = setTimeout(() => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      const strValue = String(innerValue);

      // Optimization: Don't write if the URL already matches the state
      if (current.get(key) === strValue) return;

      // Logic: Remove param if it matches default (clean URL), else set it
      if (
        innerValue === defaultValue ||
        innerValue === "" ||
        innerValue === 0
      ) {
        current.delete(key);
      } else {
        current.set(key, strValue);
      }

      const search = current.toString();
      const query = search ? `?${search}` : "";
      const newUrl = `${pathname}${query}`;

      window.history.replaceState(null, "", newUrl);
    }, delay);

    return () => clearTimeout(timer);
  }, [innerValue, key, defaultValue, pathname, searchParams, delay]);

  return [innerValue, setInnerValue];
}
