import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { House } from 'src/houses/entities/house.entity';
import { SchoolClass } from 'src/school-classes/entities/school-class.entity';
import { StudentResponseDto } from './dto/student-response-dto';
export declare class StudentsService {
    private studentsRepository;
    private houseRepository;
    private schoolClassRepository;
    constructor(studentsRepository: Repository<Student>, houseRepository: Repository<House>, schoolClassRepository: Repository<SchoolClass>);
    create(createStudentDto: CreateStudentDto): Promise<StudentResponseDto>;
    findAll(): Promise<StudentResponseDto[]>;
    findOne(id: number): Promise<StudentResponseDto>;
    update(id: number, updateStudentDto: UpdateStudentDto): Promise<StudentResponseDto>;
    remove(id: number): Promise<void>;
    findByClass(schoolClassId: number): Promise<StudentResponseDto[]>;
    findByHouse(houseId: number): Promise<StudentResponseDto[]>;
    private toResponseDto;
}
