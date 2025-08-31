import { Repository } from 'typeorm';
import { SchoolClass } from './entities/school-class.entity';
import { CreateSchoolClassDto } from './dto/create-school-class.dto';
import { UpdateSchoolClassDto } from './dto/update-school-class.dto';
import { SchoolClassResponseDto } from './dto/school-class-repsonse.dto';
export declare class SchoolClassesService {
    private schoolClassesRepository;
    constructor(schoolClassesRepository: Repository<SchoolClass>);
    create(createClassDto: CreateSchoolClassDto): Promise<SchoolClassResponseDto>;
    findAll(): Promise<SchoolClassResponseDto[]>;
    findOne(id: number): Promise<SchoolClassResponseDto>;
    update(id: number, updateSchoolClassDto: UpdateSchoolClassDto): Promise<SchoolClassResponseDto>;
    remove(id: number): Promise<void>;
    getSchoolClassPoints(schoolClassId: number): Promise<number>;
    private toResponseDto;
}
