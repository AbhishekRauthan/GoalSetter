import { Request, Response } from 'express';
import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  Res,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('goals')
export class GoalsController {
  @Get()
  getGoals(@Res() res: Response) {
    res.status(HttpStatus.OK).send({ message: 'Get goals' });
  }

  @Post()
  createGoal(@Body() body, @Res() res: Response) {
    if (!body.text) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Body content not present' });
    }

    res.status(HttpStatus.CREATED).send({ message: 'POST goals' });
  }

  @Put(':id')
  putGoal(@Param('id') id: number, @Body() body, @Res() res: Response) {
    if (!body.text) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Body content not present' });
    }
    res.status(HttpStatus.OK).send({ message: `Put goals #${id}` });
  }

  @Delete(':id')
  deleteGoal(@Param('id') id: number, @Res() res: Response) {
    res.status(HttpStatus.OK).send({ message: `Delete goals #${id}` });
  }
}
