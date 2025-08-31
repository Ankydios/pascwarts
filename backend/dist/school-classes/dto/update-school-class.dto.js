"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSchoolClassDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_school_class_dto_1 = require("./create-school-class.dto");
class UpdateSchoolClassDto extends (0, mapped_types_1.PartialType)(create_school_class_dto_1.CreateSchoolClassDto) {
}
exports.UpdateSchoolClassDto = UpdateSchoolClassDto;
//# sourceMappingURL=update-school-class.dto.js.map