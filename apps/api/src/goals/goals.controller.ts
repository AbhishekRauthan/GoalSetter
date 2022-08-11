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
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Body content not present' });
    }
    const goal = await this.goalsService.create(body.text);

    res.status(HttpStatus.CREATED).send(goal);
  }

  @Put(':id')
  async putGoal(@Param('id') id: string, @Body() body, @Res() res: Response) {
    if (!body.text) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Body content not present' });
    }
    try {
      const goal = await this.goalsService.getGoalById(id);
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `Goal of id:${id} not found` });
    }

    const updatedGoal = await this.goalsService.updateGoalById(id, body.text);
    res.status(HttpStatus.FOUND).send(updatedGoal);
  }

  @Delete(':id')
  async deleteGoal(@Param('id') id: string, @Res() res: Response) {
    try {
      const goal = await this.goalsService.getGoalById(id);
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `Goal of id:${id} not found` });
    }
    await this.goalsService.deleteGoalById(id);
    res.status(HttpStatus.OK).send({ message: `Delete goals #${id}` });
  }
}
