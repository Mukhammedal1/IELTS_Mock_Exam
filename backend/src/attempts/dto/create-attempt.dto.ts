import { IsEnum, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CreateAttemptDto {
  @IsEnum(['in_progress', 'finished'])
  status: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  score?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  total?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  percent?: number;
}
