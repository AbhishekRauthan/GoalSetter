import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, Users } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>
  ) {}

  async getUser(email: string) {
    return await this.userModel.findOne({ email });
  }

  async createUser(name: string, email: string, password: string) {
    return await this.userModel.create({ email, name, password });
  }
}
