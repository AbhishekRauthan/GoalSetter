import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Document } from 'mongoose';
import { Users } from '../users/users.schema';

export type GoalDocument = Goals & Document;

@Schema({ timestamps: true })
export class Goals {
  @Prop({ required: true, type: String })
  text: string;
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  user: Users;
}

export const GoalSchema = SchemaFactory.createForClass(Goals);
