import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventResponseDto } from './dto/event-response.dto';
import { Student } from 'src/students/entities/student.entity';
export declare class EventsService {
    private eventsRepository;
    private studentsRepository;
    constructor(eventsRepository: Repository<Event>, studentsRepository: Repository<Student>);
    create(createEventDto: CreateEventDto): Promise<EventResponseDto>;
    findAll(): Promise<EventResponseDto[]>;
    findOne(id: number): Promise<EventResponseDto>;
    update(id: number, updateEventDto: UpdateEventDto): Promise<EventResponseDto>;
    remove(id: number): Promise<void>;
    findByHouse(id: number): Promise<EventResponseDto[]>;
    findByStudent(id: number): Promise<EventResponseDto[]>;
    findBySchoolClass(id: number): Promise<EventResponseDto[]>;
    private toResponseDto;
}
