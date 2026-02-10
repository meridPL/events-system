import { IsIn, IsOptional, IsDateString, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import type { EventLevel } from '../entities/event.entity';

const EVENT_LEVELS: EventLevel[] = ['INFO', 'DEBUG', 'WARNING', 'ERROR'];

export class QueryEventDto {
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined || value === null
      ? undefined
      : Array.isArray(value)
        ? value
        : [value],
  )
  @IsArray()
  @IsIn(EVENT_LEVELS, { each: true })
  level?: EventLevel[];

  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @IsOptional()
  @IsDateString()
  dateTo?: string;
}
