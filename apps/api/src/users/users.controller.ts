import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { registerUserBody } from './types';

@Controller('users')
export class UsersController {
  @Post()
  registerUser(@Body() body: registerUserBody, @Res() res: Response) {
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
    res.status(HttpStatus.OK).json({
      message: 'POST / WORKING',
    });
  }

  @Post('login')
  loginUser(@Body() body, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      message: 'POST /login WORKING',
    });
  }

  @Post('me')
  getUserMe(@Body() body, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      message: 'POST /me WORKING',
    });
  }
}
