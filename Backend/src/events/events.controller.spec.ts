import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { QueryEventDto } from './dto/query-event.dto';
import type { Event } from './entities/event.entity';

describe('EventsController', () => {
  let controller: EventsController;
  let eventsService: EventsService;

  const mockEvents: Event[] = [
    {
      id: 'evt-001',
      level: 'INFO',
      message: 'Test',
      timestamp: '2026-02-09T10:00:00.000Z',
    },
  ];

  beforeEach(async () => {
    const mockEventsService = {
      findAll: jest.fn().mockResolvedValue(mockEvents),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('calls service.findAll with query and returns events', async () => {
      const query: QueryEventDto = { level: ['DEBUG'] };
      const result = await controller.findAll(query);

      expect(eventsService.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockEvents);
    });

    it('returns empty array when service returns no events', async () => {
      jest.spyOn(eventsService, 'findAll').mockResolvedValue([]);
      const query: QueryEventDto = {};

      const result = await controller.findAll(query);

      expect(result).toEqual([]);
    });
  });
});
