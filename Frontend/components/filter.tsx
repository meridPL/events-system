import type { EventLevel } from "types/events";
import { Input } from "ui/input";

const LEVEL_OPTIONS: { value: EventLevel; label: string }[] = [
  { value: "INFO", label: "INFO" },
  { value: "DEBUG", label: "DEBUG" },
  { value: "WARNING", label: "WARNING" },
  { value: "ERROR", label: "ERROR" },
];

type FilterProps = {
  dateFrom: string;
  dateTo: string;
  levelFilters: EventLevel[];
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onToggleLevel: (level: EventLevel) => void;
};

export const Filter = ({
  dateFrom,
  dateTo,
  levelFilters,
  onDateFromChange,
  onDateToChange,
  onToggleLevel,
}: FilterProps) => {
  return (
    <div className="flex flex-wrap items-end gap-4 mb-6 p-4 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-1">
        <Input
          label="Data od"
          id="date-from"
          type="date"
          value={dateFrom}
          onChange={onDateFromChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Input
          label="Data do"
          id="date-to"
          type="date"
          value={dateTo}
          onChange={onDateToChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Poziom
        </span>
        <div className="flex flex-wrap gap-3">
          {LEVEL_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={levelFilters.includes(opt.value)}
                onChange={() => onToggleLevel(opt.value)}
                className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 focus:ring-2 focus:ring-gray-500"
              />
              <span className="text-sm text-gray-900 dark:text-white">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
