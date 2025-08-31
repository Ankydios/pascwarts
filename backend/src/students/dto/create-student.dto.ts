import {
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsNumber()
  schoolClassId?: number;

  @IsOptional()
  @IsNumber()
  houseId?: number;
}
