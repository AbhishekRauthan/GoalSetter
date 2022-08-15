import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  @Post()
  registerUser(@Body() body, @Res() res: Response) {
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
