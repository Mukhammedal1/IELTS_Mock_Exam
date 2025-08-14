import { Module } from '@nestjs/common';
import { AttemptAnswerService } from './attempt_answer.service';
import { AttemptAnswerController } from './attempt_answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AttemptAnswer,
  AttemptAnswerSchema,
} from './model/attempt_answer.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AttemptAnswer.name,
        schema: AttemptAnswerSchema,
      },
    ]),
  ],
  controllers: [AttemptAnswerController],
  providers: [AttemptAnswerService],
})
export class AttemptAnswerModule {}
