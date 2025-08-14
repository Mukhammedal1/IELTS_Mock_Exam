import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { AttemptsModule } from './attempts/attempts.module';
import { AttemptAnswerModule } from './attempt_answer/attempt_answer.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_URL ||
        'mongodb://localhost:27017/MockExam',
    ),
    QuestionsModule,
    AttemptsModule,
    AttemptAnswerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
