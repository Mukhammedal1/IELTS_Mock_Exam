import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Attempt } from '../../attempts/model/attempt.model';
import { Question } from '../../questions/model/question.model';

@Schema()
export class AttemptAnswer {
  @Prop({
    type: Types.ObjectId,
    ref: Attempt.name,
    required: true,
  })
  attemptId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Question.name,
    required: true,
  })
  questionId: Types.ObjectId;

  @Prop({
    type: Boolean,
    required: true,
  })
  choice: boolean;
}
export const AttemptAnswerSchema = SchemaFactory.createForClass(AttemptAnswer);
