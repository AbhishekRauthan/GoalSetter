import {
  ConflictException,
  NotFoundException,
  NotImplementedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { UserModel } from './model/user.model';
import { UserRegisterModel } from './model/userRegister.input';
import { Users } from './users.schema';
import { UsersService } from './users.service';
import { UserLoginModel } from './model/userLogin.input';
import { JwtAuthGuard } from './jwt/jwt.gaurd';
import { CurrentUser } from './jwt/current-user.decorator';

@Resolver(() => Users)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @Mutation((returns) => UserModel)
  async registerUser(
    @Args('userRegister')
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
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: this.jwtService.sign({ id: user.id }),
    };
  }

  @Query((returns) => UserModel)
  async loginUser(
    @Args('userLogin')
    userRegister: UserLoginModel
  ) {
    const { email, password } = userRegister;

    const user = await this.usersService.getUser(email);
    if (user && (await compare(password, user.password))) {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: this.jwtService.sign({ id: user.id }),
      };
    } else {
      throw new NotFoundException(`User with email:'${email}' not found.`);
    }
  }

  @Query((returns) => UserModel)
  @UseGuards(JwtAuthGuard)
  getUser(@CurrentUser() user:any) {
    return user;
  }
}
