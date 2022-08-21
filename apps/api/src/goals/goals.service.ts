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

  async create({ text, id }: { text: string; id: string }) {
    return this.goalModel.create({ text, user: id });
  }

  async updateGoalById(id: string, text: string) {
    return this.goalModel.findByIdAndUpdate(id, { text }, { new: true });
  }

  async deleteGoalById(id: string) {
    return this.goalModel.findByIdAndDelete(id);
  }

  async getGoalById(id: string) {
    return this.goalModel.findById(id);
  }
}
