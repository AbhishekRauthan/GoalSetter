import { InputType, Field } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString, IsEmail } from 'class-validator';

@InputType()
export class UserRegisterModel {
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String, { description: 'registration email' })
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'registration name' })
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'registration password' })
  password: string;
}
