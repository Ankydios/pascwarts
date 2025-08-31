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
exports.SchoolClassesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const school_class_entity_1 = require("./entities/school-class.entity");
let SchoolClassesService = class SchoolClassesService {
    schoolClassesRepository;
    constructor(schoolClassesRepository) {
        this.schoolClassesRepository = schoolClassesRepository;
    }
    async create(createClassDto) {
        const schoolClass = this.schoolClassesRepository.create(createClassDto);
        await this.schoolClassesRepository.save(schoolClass);
        return this.toResponseDto(schoolClass);
    }
    async findAll() {
        const schoolClasses = await this.schoolClassesRepository.find({
            relations: ['students'],
            order: { name: 'ASC' },
        });
        return Promise.all(schoolClasses.map((schoolClass) => this.toResponseDto(schoolClass)));
    }
    async findOne(id) {
        const schoolClass = await this.schoolClassesRepository.findOne({
            where: { id },
            relations: ['students'],
        });
        if (!schoolClass) {
            throw new common_1.NotFoundException(`Classe avec l'ID ${id} non trouvée`);
        }
        return this.toResponseDto(schoolClass);
    }
    async update(id, updateSchoolClassDto) {
        await this.schoolClassesRepository.update(id, updateSchoolClassDto);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.schoolClassesRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Maison avec l'ID ${id} non trouvée`);
        }
    }
    async getSchoolClassPoints(schoolClassId) {
        const result = await this.schoolClassesRepository
            .createQueryBuilder('schoolClass')
            .leftJoin('schoolClass.students', 'student')
            .leftJoin('student.events', 'event')
            .where('schoolClass.id = :schoolClassId', { schoolClassId })
            .select('COALESCE(SUM(event.points), 0)', 'totalPoints')
            .getRawOne();
        return Number(result.totalPoints);
    }
    async toResponseDto(schoolClass) {
        return {
            id: schoolClass.id,
            name: schoolClass.name,
            level: schoolClass.level,
            schoolYear: schoolClass.schoolYear,
            points: await this.getSchoolClassPoints(schoolClass.id),
            createdAt: schoolClass.createdAt,
            updatedAt: schoolClass.updatedAt,
        };
    }
};
exports.SchoolClassesService = SchoolClassesService;
exports.SchoolClassesService = SchoolClassesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(school_class_entity_1.SchoolClass)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SchoolClassesService);
//# sourceMappingURL=school-classes.service.js.map