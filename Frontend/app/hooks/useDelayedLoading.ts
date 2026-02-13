import { useState, useEffect } from "react";

/**
 * Zwraca true tylko gdy `isLoading` jest true przez co najmniej `delayMs` ms.
 * Zapobiega migotaniu spinnera przy bardzo krótkich zapytaniach.
 */
export function useDelayedLoading(isLoading: boolean, delayMs: number): boolean {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowSpinner(false);
      return;
    }
    const timer = window.setTimeout(() => setShowSpinner(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [isLoading, delayMs]);

  return showSpinner;
}
