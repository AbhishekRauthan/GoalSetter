import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { registerUserBody } from './types';
import { UsersService } from './users.service';
import { genSalt, hash, compare } from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async registerUser(@Body() body: registerUserBody, @Res() res: Response) {
    const { email, name, password } = body;
    if (!email || !name || !password) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fields missing from Body',
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const userExist = await this.usersService.getUser(email);

    if (userExist) {
      throw new HttpException(
        {
          status: HttpStatus.FOUND,
          error: 'User already exists',
        },
        HttpStatus.FOUND
      );
    }
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = await this.usersService.createUser(
      name,
      email,
      hashedPassword
    );
    if (user) {
      res.status(HttpStatus.OK).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user data',
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('login')
  async loginUser(@Body() body: registerUserBody, @Res() res: Response) {
    const { email, password } = body;

    const user = await this.usersService.getUser(email);

    if (user && (await compare(password, user.password))) {
      res.status(HttpStatus.OK).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid credentials',
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('me')
  getUserMe(@Body() body, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      message: 'POST /me WORKING',
    });
  }
}
