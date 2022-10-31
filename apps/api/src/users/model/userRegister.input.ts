import { InputType, Field } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { UserLoginModel } from './userLogin.input';

@InputType()
export class UserRegisterModel extends UserLoginModel {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'registration name' })
  name: string;
}
