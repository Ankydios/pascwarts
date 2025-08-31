import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventResponseDto } from './dto/event-response.dto';
export declare class EventsService {
    private eventsRepository;
    constructor(eventsRepository: Repository<Event>);
    create(createEventDto: CreateEventDto): Promise<EventResponseDto>;
    findAll(): Promise<EventResponseDto[]>;
    findOne(id: number): Promise<EventResponseDto>;
    update(id: number, updateEventDto: UpdateEventDto): Promise<EventResponseDto>;
    remove(id: number): Promise<void>;
    private toResponseDto;
}
