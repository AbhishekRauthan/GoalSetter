import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { registerUserBody, reqUser } from '../types';
import { UsersService } from './users.service';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt/jwt.gaurd';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

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
        token: this.jwtService.sign({ id: user.id }),
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
        token: this.jwtService.sign({ id: user.id }),
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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUserMe(@Req() req: reqUser, @Res() res: Response) {
    res.status(HttpStatus.OK).json(req.user);
  }
}
