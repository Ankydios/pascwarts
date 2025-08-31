import { Student } from '../../students/entities/student.entity';
export declare class Event {
    id: number;
    title: string;
    description: string;
    points: number;
    eventDate: Date;
    student: Student;
    createdAt: Date;
    updatedAt: Date;
}
