import { IsString, IsOptional, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateHouseDto {
  @IsString()
  name: string;
}
