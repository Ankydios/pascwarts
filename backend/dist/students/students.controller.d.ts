import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(createStudentDto: CreateStudentDto): Promise<import("./dto/student-response-dto").StudentResponseDto>;
    findAll(): Promise<import("./dto/student-response-dto").StudentResponseDto[]>;
    findOne(id: number): Promise<import("./dto/student-response-dto").StudentResponseDto>;
    update(id: number, updateStudentDto: UpdateStudentDto): Promise<import("./dto/student-response-dto").StudentResponseDto>;
    remove(id: number): Promise<void>;
    findByClass(schoolClassId: number): Promise<import("./dto/student-response-dto").StudentResponseDto[]>;
    findByHouse(houseId: number): Promise<import("./dto/student-response-dto").StudentResponseDto[]>;
}
