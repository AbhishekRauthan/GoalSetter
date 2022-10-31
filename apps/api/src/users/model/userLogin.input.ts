import { Field, InputType } from "@nestjs/graphql";
import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class UserLoginModel {
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String, { description: 'registration email' })
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'registration password' })
  password: string;
}