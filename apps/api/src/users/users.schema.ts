import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Users & Document;

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: [true, 'Please add a name'], type: String })
  name: string;
  @Prop({ required: [true, 'Please add an email'], unique: true, type: String })
  email: string;
  @Prop({ required: [true, 'Please add a password'], type: String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
