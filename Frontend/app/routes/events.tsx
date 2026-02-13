import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { EventType, EventLevel } from "types/events";
import { Filter } from "components/filter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "ui/table";
import { Badge } from "ui/badge";
import { useDelayedLoading } from "app/hooks/useDelayedLoading";

const API_BASE = "http://localhost:3000";
const pageWrapper = "max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 min-h-[60vh]";
const LOADING_DELAY_MS = 300;

type EventsFilters = {
  dateFrom?: string;
  dateTo?: string;
  levels?: EventLevel[];
  minLevel?: EventLevel;
};

async function fetchEvents(filters: EventsFilters): Promise<EventType[]> {
  const params = new URLSearchParams();
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);
  if (filters.minLevel) params.set("minLevel", filters.minLevel);
  filters.levels?.forEach((level) => params.append("level", level));
  const query = params.toString();
  const url = query ? `${API_BASE}/events?${query}` : `${API_BASE}/events`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export default function Events() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [levelFilters, setLevelFilters] = useState<EventLevel[]>([]);
  const [minLevel, setMinLevel] = useState<EventLevel | "">("");

  const {
    data: events,
    isLoading,
    error,
  } = useQuery<EventType[]>({
    queryKey: ["events", dateFrom, dateTo, levelFilters, minLevel],
    queryFn: () =>
      fetchEvents({
        dateFrom,
        dateTo,
        levels: levelFilters.length > 0 ? levelFilters : undefined,
        minLevel: minLevel || undefined,
      }),
  });

  const showSpinner = useDelayedLoading(isLoading, LOADING_DELAY_MS);

  const toggleLevel = (level: EventLevel) => {
    setLevelFilters((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
    );
  };

  if (showSpinner) {
    return (
      <div className={pageWrapper}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-8">
          Zdarzenia
        </h1>
        <div className="h-[55vh] flex flex-col items-center justify-center gap-4 shrink-0">
          <div className="size-10 border-4 border-gray-200 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Ładowanie eventów…
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={pageWrapper}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-8">
          Zdarzenia
        </h1>
        <div className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-6 text-center">
          <p className="text-red-700 dark:text-red-300 font-medium">Błąd</p>
          <p className="text-red-600 dark:text-red-400 mt-1">
            {(error as Error).message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={pageWrapper}>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-8">
        Zdarzenia
      </h1>

      <Filter
        dateFrom={dateFrom}
        dateTo={dateTo}
        levelFilters={levelFilters}
        minLevel={minLevel}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onToggleLevel={toggleLevel}
        onMinLevelChange={setMinLevel}
      />

      <div className="shrink-0">
        {Array.isArray(events) && events.length > 0 ? (
          <Table>
            <TableHead>
              <TableHeaderCell>Wiadomość</TableHeaderCell>
              <TableHeaderCell>Poziom</TableHeaderCell>
              <TableHeaderCell>Data i godzina</TableHeaderCell>
            </TableHead>
            <TableBody>
              {events.map((event: EventType) => (
                <TableRow key={event.id}>
                  <TableCell>{event.message}</TableCell>
                  <TableCell>
                    <Badge>{event.level}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(event.timestamp).toLocaleString("pl-PL", {
                      dateStyle: "short",
                      timeStyle: "medium",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Brak eventów.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
