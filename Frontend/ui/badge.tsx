import type { EventLevel } from "types/events";

const BADGE_BASE =
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium";

const BADGE_COLORS: Record<EventLevel, string> = {
  ERROR: "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300",
  WARNING:
    "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300",
  DEBUG: "bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300",
  INFO: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300",
};

export const Badge = ({ children }: { children: EventLevel }) => {
  return (
    <span className={`${BADGE_BASE} ${BADGE_COLORS[children]}`}>
      {children}
    </span>
  );
};
