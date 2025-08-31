import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventResponseDto } from './dto/event-response.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<EventResponseDto> {
    const event = this.eventsRepository.create(createEventDto);
    await this.eventsRepository.save(event);
    return this.toResponseDto(event);
  }

  async findAll(): Promise<EventResponseDto[]> {
    const events = await this.eventsRepository.find({
      order: { eventDate: 'ASC' },
    });
    return events.map((event) => this.toResponseDto(event));
  }

  async findOne(id: number): Promise<EventResponseDto> {
    const event = await this.eventsRepository.findOne({ where: { id } });
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
