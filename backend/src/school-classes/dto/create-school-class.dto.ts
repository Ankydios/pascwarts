import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateSchoolClassDto {
  @IsString()
  name: string;

  @IsString()
  level: string; // 6ème, 5ème, 4ème, 3ème

  @IsString()
  schoolYear: string; // 2023-2024
}
