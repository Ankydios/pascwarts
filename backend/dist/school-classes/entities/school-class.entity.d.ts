import { Student } from '../../students/entities/student.entity';
export declare class SchoolClass {
    id: number;
    name: string;
    level: string;
    schoolYear: string;
    students: Student[];
    createdAt: Date;
    updatedAt: Date;
}
