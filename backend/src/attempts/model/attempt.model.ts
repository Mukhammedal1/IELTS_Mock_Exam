import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Attempt {
  @Prop({ enum: ['in_progress', 'finished'], default: 'in_progress' })
  status: string;

  @Prop()
  score: number;

  @Prop()
  total: number;

  @Prop()
  percent: number;
}
export const AttemptSchema = SchemaFactory.createForClass(Attempt);
