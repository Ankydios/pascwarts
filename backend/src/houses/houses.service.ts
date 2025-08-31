import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from './entities/house.entity';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { HouseResponseDto } from './dto/house-response.dto';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House)
    private housesRepository: Repository<House>,
  ) {}

  async create(createHouseDto: CreateHouseDto): Promise<HouseResponseDto> {
    const house = this.housesRepository.create(createHouseDto);
    await this.housesRepository.save(house);
    return this.toResponseDto(house);
  }

  async findAll(): Promise<HouseResponseDto[]> {
    const houses = await this.housesRepository.find({
      relations: ['students'],
      order: { name: 'ASC' },
    });
    return Promise.all(houses.map((house) => this.toResponseDto(house)));
  }

  async findOne(id: number): Promise<HouseResponseDto> {
    const house = await this.housesRepository.findOne({
      where: { id },
      relations: ['students'],
    });

    if (!house) {
      throw new NotFoundException(`Maison avec l'ID ${id} non trouvée`);
    }

    return this.toResponseDto(house);
  }

  async update(
    id: number,
    updateHouseDto: UpdateHouseDto,
  ): Promise<HouseResponseDto> {
    await this.housesRepository.update(id, updateHouseDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.housesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Maison avec l'ID ${id} non trouvée`);
    }
  }

  async getPointsOfHouse(houseId: number): Promise<number> {
    const result = await this.housesRepository
      .createQueryBuilder('house')
      .leftJoin('house.students', 'student')
      .leftJoin('student.events', 'event')
      .where('house.id = :houseId', { houseId })
      .select('COALESCE(SUM(event.points), 0)', 'totalPoints')
      .getRawOne();

    return Number(result.totalPoints);
  }

  private async toResponseDto(house: House): Promise<HouseResponseDto> {
    return {
      id: house.id,
      name: house.name,
      createdAt: house.createdAt,
      updatedAt: house.updatedAt,
      points: await this.getPointsOfHouse(house.id),
    };
  }
}
