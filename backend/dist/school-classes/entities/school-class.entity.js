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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolClass = void 0;
const typeorm_1 = require("typeorm");
const student_entity_1 = require("../../students/entities/student.entity");
let SchoolClass = class SchoolClass {
    id;
    name;
    level;
    schoolYear;
    students;
    createdAt;
    updatedAt;
};
exports.SchoolClass = SchoolClass;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SchoolClass.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], SchoolClass.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SchoolClass.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SchoolClass.prototype, "schoolYear", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_entity_1.Student, (student) => student.schoolClass),
    __metadata("design:type", Array)
], SchoolClass.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SchoolClass.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SchoolClass.prototype, "updatedAt", void 0);
exports.SchoolClass = SchoolClass = __decorate([
    (0, typeorm_1.Entity)('classes')
], SchoolClass);
//# sourceMappingURL=school-class.entity.js.map