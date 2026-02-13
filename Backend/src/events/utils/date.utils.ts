/**
 * Zwraca początek dnia (00:00:00.000) w UTC dla podanej daty.
 * Akceptuje string w formacie ISO (np. "2026-02-08") lub obiekt Date.
 */
export function startOfDay(dateInput: string | Date): Date {
  const date =
    typeof dateInput === 'string'
      ? new Date(dateInput + 'T00:00:00.000Z')
      : new Date(dateInput);
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0,
      0,
      0,
      0,
    ),
  );
}

/**
 * Zwraca koniec dnia (23:59:59.999) w UTC dla podanej daty.
 */
export function endOfDay(dateInput: string | Date): Date {
  const date =
    typeof dateInput === 'string'
      ? new Date(dateInput + 'T00:00:00.000Z')
      : new Date(dateInput);
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      23,
      59,
      59,
      999,
    ),
  );
}

/**
 * Sprawdza, czy timestamp eventu (ISO string) mieści się w zakresie [dateFrom, dateTo] (włącznie z pełnymi dniami).
 */
export function isDateInRange(
  eventTimestamp: string,
  dateFrom?: string,
  dateTo?: string,
): boolean {
  const eventTime = new Date(eventTimestamp).getTime();
  if (dateFrom !== undefined && eventTime < startOfDay(dateFrom).getTime()) {
    return false;
  }
  if (dateTo !== undefined && eventTime > endOfDay(dateTo).getTime()) {
    return false;
  }
  return true;
}
