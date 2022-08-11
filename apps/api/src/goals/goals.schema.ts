import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GoalDocument = Goals & Document;

@Schema({ timestamps: true })
export class Goals {
  @Prop({ required: true })
  text: string;
}

export const GoalSchema = SchemaFactory.createForClass(Goals);
