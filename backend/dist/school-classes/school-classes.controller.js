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
exports.SchoolClassesController = void 0;
const common_1 = require("@nestjs/common");
const school_classes_service_1 = require("./school-classes.service");
const create_school_class_dto_1 = require("./dto/create-school-class.dto");
const update_school_class_dto_1 = require("./dto/update-school-class.dto");
let SchoolClassesController = class SchoolClassesController {
    classesService;
    constructor(classesService) {
        this.classesService = classesService;
    }
    create(createClassDto) {
        return this.classesService.create(createClassDto);
    }
    findAll() {
        return this.classesService.findAll();
    }
    findOne(id) {
        return this.classesService.findOne(+id);
    }
    update(id, updateClassDto) {
        return this.classesService.update(+id, updateClassDto);
    }
    remove(id) {
        return this.classesService.remove(+id);
    }
};
exports.SchoolClassesController = SchoolClassesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_school_class_dto_1.CreateSchoolClassDto]),
    __metadata("design:returntype", void 0)
], SchoolClassesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SchoolClassesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolClassesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_school_class_dto_1.UpdateSchoolClassDto]),
    __metadata("design:returntype", void 0)
], SchoolClassesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolClassesController.prototype, "remove", null);
exports.SchoolClassesController = SchoolClassesController = __decorate([
    (0, common_1.Controller)('api/school-classes/'),
    __metadata("design:paramtypes", [school_classes_service_1.SchoolClassesService])
], SchoolClassesController);
//# sourceMappingURL=school-classes.controller.js.map