import { SchoolClassesService } from './school-classes.service';
import { CreateSchoolClassDto } from './dto/create-school-class.dto';
import { UpdateSchoolClassDto } from './dto/update-school-class.dto';
export declare class SchoolClassesController {
    private readonly classesService;
    constructor(classesService: SchoolClassesService);
    create(createClassDto: CreateSchoolClassDto): Promise<import("./dto/school-class-repsonse.dto").SchoolClassResponseDto>;
    findAll(): Promise<import("./dto/school-class-repsonse.dto").SchoolClassResponseDto[]>;
    findOne(id: string): Promise<import("./dto/school-class-repsonse.dto").SchoolClassResponseDto>;
    update(id: string, updateClassDto: UpdateSchoolClassDto): Promise<import("./dto/school-class-repsonse.dto").SchoolClassResponseDto>;
    remove(id: string): Promise<void>;
}
