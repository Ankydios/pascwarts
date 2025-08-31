"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HousesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const house_entity_1 = require("./entities/house.entity");
const houses_service_1 = require("./houses.service");
const houses_controller_1 = require("./houses.controller");
let HousesModule = class HousesModule {
};
exports.HousesModule = HousesModule;
exports.HousesModule = HousesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([house_entity_1.House])],
        controllers: [houses_controller_1.HousesController],
        providers: [houses_service_1.HousesService],
        exports: [houses_service_1.HousesService],
    })
], HousesModule);
//# sourceMappingURL=houses.module.js.map