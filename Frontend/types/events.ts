export type EventLevel = "INFO" | "DEBUG" | "WARNING" | "ERROR";

export interface EventType {
  id: string;
  level: EventLevel;
  message: string;
  timestamp: string;
}
