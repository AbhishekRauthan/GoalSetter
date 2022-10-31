import {
  BadRequestException,
  ConflictException,
  NotImplementedException,
  UsePipes,
} from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash } from 'bcryptjs';
import { UserModel } from './model/user.model';
import { UserRegisterModel } from './model/userRegister.input';
import { Users } from './users.schema';
import { UsersService } from './users.service';
import { ValidationPipe } from '../pipe/validation.pipe';

@Resolver(() => Users)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @Mutation((returns) => UserModel)
  @UsePipes(new ValidationPipe())
  async registerUser(
    @Args('userRegisterModel')
    userRegisterModel: UserRegisterModel
  ) {
    const { email, name, password } = userRegisterModel;

    const userExist = await this.usersService.getUser(email);

    if (userExist) {
      throw new ConflictException('User already exists');
    }

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = await this.usersService
      .createUser(name, email, hashedPassword)
      .catch(() => {
        throw new NotImplementedException('Unable to create user');
      });
    return user;
  }
}
