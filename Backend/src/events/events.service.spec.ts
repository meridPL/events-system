import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { EventsService } from './events.service';
import type { Event } from './entities/event.entity';
import type { QueryEventDto } from './dto/query-event.dto';

const mockEvents: Event[] = [
  {
    id: 'evt-001',
    level: 'INFO',
    message: 'User login',
    timestamp: '2026-02-09T10:15:23.000Z',
  },
  {
    id: 'evt-002',
    level: 'DEBUG',
    message: 'Config loaded',
    timestamp: '2026-02-09T09:00:00.000Z',
  },
  {
    id: 'evt-003',
    level: 'ERROR',
    message: 'Connection failed',
    timestamp: '2026-02-08T14:00:00.000Z',
  },
  {
    id: 'evt-004',
    level: 'INFO',
    message: 'Backup done',
    timestamp: '2026-02-07T08:00:00.000Z',
  },
];

const mockReadFile = jest.fn().mockResolvedValue(JSON.stringify(mockEvents));
jest.mock('fs/promises', () => ({
  readFile: (...args: unknown[]) => mockReadFile(...args) as Promise<string>,
}));

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    mockReadFile.mockResolvedValue(JSON.stringify(mockEvents));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) =>
              key === 'EVENTS_DATA_PATH' ? 'data/events.json' : undefined,
            ),
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll returns all events when query is empty', async () => {
    const query: QueryEventDto = {};
    const result = await service.findAll(query);
    expect(result).toHaveLength(4);
    expect(result).toEqual(mockEvents);
  });

  it('findAll filters by level when level array is provided', async () => {
    const query: QueryEventDto = { level: ['DEBUG', 'ERROR'] };
    const result = await service.findAll(query);
    expect(result).toHaveLength(2);
    expect(result.map((e) => e.level)).toEqual(['DEBUG', 'ERROR']);
  });

  it('findAll filters by single level', async () => {
    const query: QueryEventDto = { level: ['INFO'] };
    const result = await service.findAll(query);
    expect(result).toHaveLength(2);
    expect(result.every((e) => e.level === 'INFO')).toBe(true);
  });

  it('findAll filters by dateFrom', async () => {
    const query: QueryEventDto = { dateFrom: '2026-02-08' };
    const result = await service.findAll(query);
    expect(result).toHaveLength(3);
    expect(result.map((e) => e.id)).toEqual(['evt-001', 'evt-002', 'evt-003']);
  });

  it('findAll filters by dateTo', async () => {
    const query: QueryEventDto = { dateTo: '2026-02-08' };
    const result = await service.findAll(query);
    expect(result).toHaveLength(2);
    expect(result.map((e) => e.id)).toEqual(['evt-003', 'evt-004']);
  });

  it('findAll filters by dateFrom and dateTo', async () => {
    const query: QueryEventDto = {
      dateFrom: '2026-02-08',
      dateTo: '2026-02-08',
    };
    const result = await service.findAll(query);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('evt-003');
  });

  it('findAll combines level and date filters', async () => {
    const query: QueryEventDto = {
      level: ['INFO'],
      dateFrom: '2026-02-09',
    };
    const result = await service.findAll(query);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('evt-001');
  });

  it('findAll throws when file cannot be read', async () => {
    mockReadFile.mockRejectedValue(new Error('ENOENT: no such file'));
    const query: QueryEventDto = {};

    await expect(service.findAll(query)).rejects.toThrow(
      /Cannot read events file at .+: ENOENT: no such file/,
    );
  });

  it('findAll throws when file is not valid JSON', async () => {
    mockReadFile.mockResolvedValue('not json {');
    const query: QueryEventDto = {};

    await expect(service.findAll(query)).rejects.toThrow(
      /Events file is not valid JSON/,
    );
  });

  it('findAll throws when file content is not a JSON array', async () => {
    mockReadFile.mockResolvedValue('{"foo": 1}');
    const query: QueryEventDto = {};

    await expect(service.findAll(query)).rejects.toThrow(
      'Events file must contain a JSON array',
    );
  });
});
