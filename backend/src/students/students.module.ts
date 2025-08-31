import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity';
import { SchoolClass } from 'src/school-classes/entities/school-class.entity';
import { House } from 'src/houses/entities/house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, House, SchoolClass])],

  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
