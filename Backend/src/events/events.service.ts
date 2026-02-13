import { readFile } from 'fs/promises';
import { join } from 'path';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryEventDto } from './dto/query-event.dto';
import { Event, EventLevel } from './entities/event.entity';
import { isDateInRange } from './utils/date.utils';

const LEVEL_SEVERITY: Record<EventLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARNING: 2,
  ERROR: 3,
};

@Injectable()
export class EventsService {
  constructor(private readonly configService: ConfigService) {}

  async findAll(query: QueryEventDto): Promise<Event[]> {
    const events = await this.loadEventsFromFile();
    return events.filter((event) => {
      const matchLevel =
        !query.level?.length || query.level.includes(event.level);
      const matchMinLevel =
        query.minLevel == null ||
        LEVEL_SEVERITY[event.level] >= LEVEL_SEVERITY[query.minLevel];
      const matchDate = isDateInRange(
        event.timestamp,
        query.dateFrom,
        query.dateTo,
      );
      return matchLevel && matchMinLevel && matchDate;
    });
  }

  private async loadEventsFromFile(): Promise<Event[]> {
    const dataPath: string =
      this.configService.get<string>('EVENTS_DATA_PATH') ?? 'data/events.json';
    const filePath = join(process.cwd(), dataPath);

    let raw: string;
    try {
      raw = await readFile(filePath, 'utf-8');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown filesystem error';
      throw new InternalServerErrorException(
        `Cannot read events file at ${filePath}: ${message}`,
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid JSON';
      throw new InternalServerErrorException(
        `Events file is not valid JSON: ${message}`,
      );
    }

    if (!Array.isArray(parsed)) {
      throw new InternalServerErrorException(
        'Events file must contain a JSON array',
      );
    }

    return parsed as Event[];
  }
}
