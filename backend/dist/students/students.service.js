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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("./entities/student.entity");
const house_entity_1 = require("../houses/entities/house.entity");
const school_class_entity_1 = require("../school-classes/entities/school-class.entity");
let StudentsService = class StudentsService {
    studentsRepository;
    houseRepository;
    schoolClassRepository;
    constructor(studentsRepository, houseRepository, schoolClassRepository) {
        this.studentsRepository = studentsRepository;
        this.houseRepository = houseRepository;
        this.schoolClassRepository = schoolClassRepository;
    }
    async create(createStudentDto) {
        const student = this.studentsRepository.create(createStudentDto);
        let house = null;
        let schoolClass = null;
        if (createStudentDto.houseId !== undefined) {
            house = await this.houseRepository.findOne({
                where: { id: createStudentDto.houseId },
            });
            if (!house) {
                throw new common_1.NotFoundException('House not found');
            }
            student.house = house;
        }
        if (createStudentDto.schoolClassId !== undefined) {
            schoolClass = await this.schoolClassRepository.findOne({
                where: { id: createStudentDto.schoolClassId },
            });
            if (!schoolClass) {
                throw new common_1.NotFoundException('SchoolClass not found');
            }
            student.schoolClass = schoolClass;
        }
        return this.toResponseDto(await this.studentsRepository.save(student));
    }
    async findAll() {
        const students = await this.studentsRepository.find({
            relations: ['schoolClass', 'house', 'events'],
            order: { lastName: 'ASC', firstName: 'ASC' },
        });
        return students.map((student) => this.toResponseDto(student));
    }
    async findOne(id) {
        const student = await this.studentsRepository.findOne({
            where: { id },
            relations: ['schoolClass', 'house', 'events'],
        });
        if (!student) {
            throw new common_1.NotFoundException(`Élève avec l'ID ${id} non trouvé`);
        }
        return this.toResponseDto(student);
    }
    async update(id, updateStudentDto) {
        await this.studentsRepository.update(id, updateStudentDto);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.studentsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Élève avec l'ID ${id} non trouvé`);
        }
    }
    async findByClass(schoolClassId) {
        const students = await this.studentsRepository.find({
            where: { schoolClass: { id: schoolClassId } },
            relations: ['schoolClass', 'house'],
            order: { lastName: 'ASC', firstName: 'ASC' },
        });
        return students.map((student) => this.toResponseDto(student));
    }
    async findByHouse(houseId) {
        const students = await this.studentsRepository.find({
            where: { house: { id: houseId } },
            relations: ['schoolClass', 'house'],
            order: { lastName: 'ASC', firstName: 'ASC' },
        });
        return students.map((student) => this.toResponseDto(student));
    }
    toResponseDto(student) {
        return {
            id: student.id,
            name: `${student.firstName} ${student.lastName}`,
            schoolClassId: student.schoolClass?.id,
            houseId: student.house?.id,
            createdAt: student.createdAt,
            updatedAt: student.updatedAt,
        };
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(house_entity_1.House)),
    __param(2, (0, typeorm_1.InjectRepository)(school_class_entity_1.SchoolClass)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StudentsService);
//# sourceMappingURL=students.service.js.map