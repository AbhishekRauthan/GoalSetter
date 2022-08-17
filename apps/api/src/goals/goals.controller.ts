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
  HttpException,
} from '@nestjs/common';
import { GoalsService } from './goals.service';

@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}
  @Get()
  async getGoals(@Res() res: Response) {
    const goal = await this.goalsService.getAllGoals();
    res.status(HttpStatus.OK).send(goal);
  }

  @Post()
  async createGoal(@Body() body, @Res() res: Response) {
    if (!body.text) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Title not provided',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const goal = await this.goalsService.create(body.text);

    res.status(HttpStatus.CREATED).send(goal);
  }

  @Put(':id')
  async putGoal(@Param('id') id: string, @Body() body, @Res() res: Response) {
    if (!body.text) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Body content not present',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    try {
      const goal = await this.goalsService.getGoalById(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Goal of id:${id} not found`,
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const updatedGoal = await this.goalsService.updateGoalById(id, body.text);
    res.status(HttpStatus.FOUND).send(updatedGoal);
  }

  @Delete(':id')
  async deleteGoal(@Param('id') id: string, @Res() res: Response) {
    try {
      const goal = await this.goalsService.getGoalById(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Goal of id:${id} not found`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
    await this.goalsService.deleteGoalById(id);
    res.status(HttpStatus.OK).send({ message: `Delete goals #${id}` });
  }
}
