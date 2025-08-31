import { Student } from '../../students/entities/student.entity';
export declare enum EventType {
    BEHAVIOR = "behavior",
    ACADEMIC = "academic",
    PARTICIPATION = "participation",
    HOMEWORK = "homework",
    OTHER = "other"
}
export declare class Event {
    id: number;
    title: string;
    description: string;
    type: EventType;
    points: number;
    eventDate: Date;
    student: Student;
    createdAt: Date;
    updatedAt: Date;
}
