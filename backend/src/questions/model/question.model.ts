import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Choice {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, default: false })
  isCorrect: boolean;
}

export const ChoiceSchema = SchemaFactory.createForClass(Choice);

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true })
  text: string;

  @Prop({ type: [ChoiceSchema], required: true })
  choices: Choice[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
