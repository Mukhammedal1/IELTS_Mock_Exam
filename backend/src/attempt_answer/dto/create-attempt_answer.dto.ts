import { IsMongoId, IsNumber, Min, Max, IsBoolean } from 'class-validator';

export class CreateAttemptAnswerDto {
  @IsMongoId()
  attemptId: string;

  @IsMongoId()
  questionId: string;

  @IsBoolean()
  choice: boolean;
}
