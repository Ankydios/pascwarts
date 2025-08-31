import { House } from '../../houses/entities/house.entity';
import { SchoolClass } from '../../school-classes/entities/school-class.entity';
import { Event } from '../../events/entities/event.entity';
export declare class Student {
    id: number;
    firstName: string;
    lastName: string;
    schoolClass: SchoolClass;
    house: House;
    events: Event[];
    createdAt: Date;
    updatedAt: Date;
}
