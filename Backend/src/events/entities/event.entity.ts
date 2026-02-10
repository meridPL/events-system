export type EventLevel = 'INFO' | 'DEBUG' | 'WARNING' | 'ERROR';

export interface Event {
  id: string;
  level: EventLevel;
  message: string;
  timestamp: string;
}
