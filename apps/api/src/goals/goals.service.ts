import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Goals, GoalDocument } from './goals.schema';

@Injectable()
export class GoalsService {
  constructor(
    @InjectModel(Goals.name) private goalModel: Model<GoalDocument>
  ) {}

  async getAllGoals() {
    return this.goalModel.find({});
  }

  async create(text: string) {
    return this.goalModel.create({ text });
  }

  async updateGoalById(id: string, text: string) {
    return this.goalModel.findByIdAndUpdate(id, { text });
  }

  async deleteGoalById(id: string) {
    return this.goalModel.findByIdAndDelete(id);
  }

  async getGoalById(id: string) {
    return this.goalModel.findById(id);
  }
}
