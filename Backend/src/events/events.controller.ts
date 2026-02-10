import { Controller, Get, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { QueryEventDto } from './dto/query-event.dto';
import { Event } from './entities/event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(@Query() query: QueryEventDto): Promise<Event[]> {
    return this.eventsService.findAll(query);
  }
}
