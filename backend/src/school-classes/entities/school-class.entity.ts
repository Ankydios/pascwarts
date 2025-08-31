import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';

@Entity('classes')
export class SchoolClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  level: string; // 6ème, 5ème, 4ème, 3ème

  @Column()
  schoolYear: string; // 2023-2024

  @OneToMany(() => Student, (student) => student.schoolClass)
  students: Student[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
