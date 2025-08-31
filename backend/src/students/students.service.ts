import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { House } from 'src/houses/entities/house.entity';
import { SchoolClass } from 'src/school-classes/entities/school-class.entity';
import { StudentResponseDto } from './dto/student-response-dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @InjectRepository(House)
    private houseRepository: Repository<House>,
    @InjectRepository(SchoolClass)
    private schoolClassRepository: Repository<SchoolClass>,
  ) {}

  async create(
    createStudentDto: CreateStudentDto,
  ): Promise<StudentResponseDto> {
    const student = this.studentsRepository.create(createStudentDto);
    let house: House | null = null;
    let schoolClass: SchoolClass | null = null;

    if (createStudentDto.houseId !== undefined) {
      house = await this.houseRepository.findOne({
        where: { id: createStudentDto.houseId },
      });
      if (!house) {
        throw new NotFoundException('House not found');
      }
      student.house = house;
    }

    if (createStudentDto.schoolClassId !== undefined) {
      schoolClass = await this.schoolClassRepository.findOne({
        where: { id: createStudentDto.schoolClassId },
      });
      if (!schoolClass) {
        throw new NotFoundException('SchoolClass not found');
      }
      student.schoolClass = schoolClass;
    }

    return this.toResponseDto(await this.studentsRepository.save(student));
  }

  async findAll(): Promise<StudentResponseDto[]> {
    const students = await this.studentsRepository.find({
      relations: ['schoolClass', 'house', 'events'],
      order: { lastName: 'ASC', firstName: 'ASC' },
    });
    return students.map((student) => this.toResponseDto(student));
  }

  async findOne(id: number): Promise<StudentResponseDto> {
    const student = await this.studentsRepository.findOne({
      where: { id },
      relations: ['schoolClass', 'house', 'events'],
    });

    if (!student) {
      throw new NotFoundException(`Élève avec l'ID ${id} non trouvé`);
    }

    return this.toResponseDto(student);
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentResponseDto> {
    await this.studentsRepository.update(id, updateStudentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.studentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Élève avec l'ID ${id} non trouvé`);
    }
  }

  async findByClass(schoolClassId: number): Promise<StudentResponseDto[]> {
    const students = await this.studentsRepository.find({
      where: { schoolClass: { id: schoolClassId } },
      relations: ['schoolClass', 'house'],
      order: { lastName: 'ASC', firstName: 'ASC' },
    });
    return students.map((student) => this.toResponseDto(student));
  }

  async findByHouse(houseId: number): Promise<StudentResponseDto[]> {
    const students = await this.studentsRepository.find({
      where: { house: { id: houseId } },
      relations: ['schoolClass', 'house'],
      order: { lastName: 'ASC', firstName: 'ASC' },
    });
    return students.map((student) => this.toResponseDto(student));
  }

  private toResponseDto(student: Student): StudentResponseDto {
    return {
      id: student.id,
      name: `${student.firstName} ${student.lastName}`,
      schoolClassId: student.schoolClass?.id,
      houseId: student.house?.id,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }
}
