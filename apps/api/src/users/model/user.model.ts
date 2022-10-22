import { ObjectType, Field } from '@nestjs/graphql';
import { Schema } from 'mongoose';

@ObjectType()
export class UserModel {
  @Field(() => String, { description: 'user id' })
  _id: Schema.Types.ObjectId;
  @Field(() => String, { description: 'user email' })
  email: string;
  @Field(() => String, { description: 'user name' })
  name: string;
  @Field(() => String, { description: 'generated user token' })
  token: string;
}
