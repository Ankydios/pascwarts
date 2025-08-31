"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("./entities/event.entity");
let EventsService = class EventsService {
    eventsRepository;
    constructor(eventsRepository) {
        this.eventsRepository = eventsRepository;
    }
    async create(createEventDto) {
        const event = this.eventsRepository.create(createEventDto);
        await this.eventsRepository.save(event);
        return this.toResponseDto(event);
    }
    async findAll() {
        const events = await this.eventsRepository.find({
            order: { eventDate: 'ASC' },
        });
        return events.map((event) => this.toResponseDto(event));
    }
    async findOne(id) {
        const event = await this.eventsRepository.findOne({ where: { id } });
        if (!event) {
            throw new common_1.NotFoundException(`Événement avec l'ID ${id} non trouvé`);
        }
        return this.toResponseDto(event);
    }
    async update(id, updateEventDto) {
        await this.eventsRepository.update(id, updateEventDto);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.eventsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Événement avec l'ID ${id} non trouvé`);
        }
    }
    toResponseDto(event) {
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
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map