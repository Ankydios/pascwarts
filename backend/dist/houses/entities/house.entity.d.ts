import { Student } from '../../students/entities/student.entity';
export declare class House {
    id: number;
    name: string;
    students: Student[];
    createdAt: Date;
    updatedAt: Date;
}
