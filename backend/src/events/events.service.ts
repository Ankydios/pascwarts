import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventResponseDto } from './dto/event-response.dto';
import { Student } from 'src/students/entities/student.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<EventResponseDto> {
    const event = this.eventsRepository.create(createEventDto);
    const student = await this.studentsRepository.findOne({
      where: { id: createEventDto.studentId },
    });
    if (!student) {
      throw new NotFoundException(
        `Étudiant avec l'ID ${createEventDto.studentId} non trouvé`,
      );
    }

    event.student = student;

    return this.toResponseDto(await this.eventsRepository.save(event));
  }

  async findAll(): Promise<EventResponseDto[]> {
    const events = await this.eventsRepository.find({
      order: { eventDate: 'ASC' },
      relations: ['student'],
    });
    return events.map((event) => this.toResponseDto(event));
  }

  async findOne(id: number): Promise<EventResponseDto> {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: ['student'],
    });
    if (!event) {
      throw new NotFoundException(`Événement avec l'ID ${id} non trouvé`);
    }
    return this.toResponseDto(event);
  }

  async update(
    id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    await this.eventsRepository.update(id, updateEventDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Événement avec l'ID ${id} non trouvé`);
    }
  }

  async findByHouse(id: number): Promise<EventResponseDto[]> {
    const events = await this.eventsRepository.find({
      where: { student: { house: { id } } },
      order: { eventDate: 'ASC' },
      relations: ['student', 'student.house'],
    });
    return events.map((event) => this.toResponseDto(event));
  }

  async findByStudent(id: number): Promise<EventResponseDto[]> {
    const events = await this.eventsRepository.find({
      where: { student: { id } },
      order: { eventDate: 'ASC' },
      relations: ['student'],
    });
    return events.map((event) => this.toResponseDto(event));
  }

  async findBySchoolClass(id: number): Promise<EventResponseDto[]> {
    const events = await this.eventsRepository.find({
      where: { student: { schoolClass: { id } } },
      order: { eventDate: 'ASC' },
      relations: ['student', 'student.schoolClass'],
    });
    return events.map((event) => this.toResponseDto(event));
  }

  private toResponseDto(event: Event): EventResponseDto {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      points: event.points,
      eventDate: event.eventDate,
      studentId: event.student.id,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }
}
