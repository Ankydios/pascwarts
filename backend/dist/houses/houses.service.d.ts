import { Repository } from 'typeorm';
import { House } from './entities/house.entity';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { HouseResponseDto } from './dto/house-response.dto';
export declare class HousesService {
    private housesRepository;
    constructor(housesRepository: Repository<House>);
    create(createHouseDto: CreateHouseDto): Promise<HouseResponseDto>;
    findAll(): Promise<House[]>;
    findOne(id: number): Promise<HouseResponseDto>;
    update(id: number, updateHouseDto: UpdateHouseDto): Promise<HouseResponseDto>;
    remove(id: number): Promise<void>;
    private toResponseDto;
}
