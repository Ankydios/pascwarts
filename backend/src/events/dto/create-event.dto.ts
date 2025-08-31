import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  points: number;

  @IsOptional()
  @IsDateString()
  eventDate?: Date;

  @IsNotEmpty()
  @IsInt()
  studentId: number;
}
