import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { House } from '../../houses/entities/house.entity';
import { SchoolClass } from '../../school-classes/entities/school-class.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.students)
  schoolClass: SchoolClass;

  @ManyToOne(() => House, (house) => house.students)
  house: House;

  @OneToMany(() => Event, (event) => event.student, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
  })
  events: Event[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
