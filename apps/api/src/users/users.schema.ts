import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = Users & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Users {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Prop({ required: [true, 'Please add a name'], type: String })
  @Field(() => String, { description: 'User name' })
  name: string;
  @Prop({ required: [true, 'Please add an email'], unique: true, type: String })
  @Field(() => String, { description: 'User email' })
  email: string;
  @Prop({ required: [true, 'Please add a password'], type: String })
  @Field(() => String, { description: 'User password' })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
