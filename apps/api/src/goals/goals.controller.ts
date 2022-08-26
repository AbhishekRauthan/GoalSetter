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
  UseGuards,
  Req,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { JwtAuthGuard } from '../users/jwt/jwt.gaurd';
import { UserObject } from '@full-stack/types';

@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getGoals(@Res() res: Response) {
    const goal = await this.goalsService.getAllGoals();
    res.status(HttpStatus.OK).send(goal);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createGoal(@Body() body, @Req() req: UserObject, @Res() res: Response) {
    if (!body.text) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Title not provided',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    if (!req.user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: `User not found`,
        },
        HttpStatus.UNAUTHORIZED
      );
    }
    let goal;
    try {
      goal = await this.goalsService.create({
        id: req.user.id,
        text: body.text,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: `User not found 2`,
        },
        HttpStatus.UNAUTHORIZED
      );
    }

    res.status(HttpStatus.CREATED).send(goal);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async putGoal(
    @Param('id') id: string,
    @Body() body,
    @Req() req: UserObject,
    @Res() res: Response
  ) {
    if (!body.text) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Body content not present',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    if (!req.user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: `User not found`,
        },
        HttpStatus.UNAUTHORIZED
      );
    }
    const goal = await this.goalsService.getGoalById(id);
    if (!goal) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Goal of id:${id} not found`,
        },
        HttpStatus.BAD_REQUEST
      );
    }

    if (goal.user.toString() !== req.user.id) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: `Not Authorized`,
        },
        HttpStatus.UNAUTHORIZED
      );
    }

    const updatedGoal = await this.goalsService.updateGoalById(id, body.text);
    res.status(HttpStatus.OK).send(updatedGoal);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteGoal(
    @Param('id') id: string,
    @Req() req: UserObject,
    @Res() res: Response
  ) {
    let goal;
    try {
      goal = await this.goalsService.getGoalById(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Goal of id:${id} not found`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
    if (goal.user.toString() !== req.user.id) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: `Not Authorized`,
        },
        HttpStatus.UNAUTHORIZED
      );
    }
    try {
      await this.goalsService.deleteGoalById(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.EXPECTATION_FAILED,
          error: `Error! Unable to delete`,
        },
        HttpStatus.EXPECTATION_FAILED
      );
    }
    res.status(HttpStatus.OK).send({ id });
  }
}
