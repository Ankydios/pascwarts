import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolClass } from './entities/school-class.entity';
import { CreateSchoolClassDto } from './dto/create-school-class.dto';
import { UpdateSchoolClassDto } from './dto/update-school-class.dto';
import { SchoolClassResponseDto } from './dto/school-class-repsonse.dto';

@Injectable()
export class SchoolClassesService {
  constructor(
    @InjectRepository(SchoolClass)
    private schoolClassesRepository: Repository<SchoolClass>,
  ) {}

  async create(
    createClassDto: CreateSchoolClassDto,
  ): Promise<SchoolClassResponseDto> {
    const schoolClass = this.schoolClassesRepository.create(createClassDto);
    await this.schoolClassesRepository.save(schoolClass);
    return this.toResponseDto(schoolClass);
  }

  async findAll(): Promise<SchoolClassResponseDto[]> {
    const schoolClasses = await this.schoolClassesRepository.find({
      relations: ['students'],
      order: { name: 'ASC' },
    });
    return schoolClasses.map((schoolClass) => this.toResponseDto(schoolClass));
  }

  async findOne(id: number): Promise<SchoolClassResponseDto> {
    const schoolClass = await this.schoolClassesRepository.findOne({
      where: { id },
      relations: ['students'],
    });

    if (!schoolClass) {
      throw new NotFoundException(`Classe avec l'ID ${id} non trouvée`);
    }

    return this.toResponseDto(schoolClass);
  }

  async update(
    id: number,
    updateSchoolClassDto: UpdateSchoolClassDto,
  ): Promise<SchoolClassResponseDto> {
    await this.schoolClassesRepository.update(id, updateSchoolClassDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.schoolClassesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Maison avec l'ID ${id} non trouvée`);
    }
  }

  private toResponseDto(schoolClass: SchoolClass): SchoolClassResponseDto {
    return {
      id: schoolClass.id,
      name: schoolClass.name,
      level: schoolClass.level,
      schoolYear: schoolClass.schoolYear,
      createdAt: schoolClass.createdAt,
      updatedAt: schoolClass.updatedAt,
    };
  }
}
