import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  points: number; // Positif = gagné, négatif = perdu

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  eventDate: Date;

  @ManyToOne(() => Student, (student) => student.events, {
    onDelete: 'CASCADE',
  })
  student: Student;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
