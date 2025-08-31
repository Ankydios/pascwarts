import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto): Promise<import("./dto/event-response.dto").EventResponseDto>;
    findAll(): Promise<import("./dto/event-response.dto").EventResponseDto[]>;
    findOne(id: string): Promise<import("./dto/event-response.dto").EventResponseDto>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<import("./dto/event-response.dto").EventResponseDto>;
    remove(id: string): Promise<void>;
    findByHouse(id: string): Promise<import("./dto/event-response.dto").EventResponseDto[]>;
    findByStudent(id: string): Promise<import("./dto/event-response.dto").EventResponseDto[]>;
    findBySchoolClass(id: string): Promise<import("./dto/event-response.dto").EventResponseDto[]>;
}
