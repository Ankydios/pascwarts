import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
export declare class HousesController {
    private readonly housesService;
    constructor(housesService: HousesService);
    create(createHouseDto: CreateHouseDto): Promise<import("./dto/house-response.dto").HouseResponseDto>;
    findAll(): Promise<import("./dto/house-response.dto").HouseResponseDto[]>;
    findOne(id: number): Promise<import("./dto/house-response.dto").HouseResponseDto>;
    update(id: number, updateHouseDto: UpdateHouseDto): Promise<import("./dto/house-response.dto").HouseResponseDto>;
    remove(id: number): Promise<void>;
}
