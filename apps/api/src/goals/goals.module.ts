import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { GoalsController } from './goals.controller';
import { GoalSchema, Goals } from './goals.schema';
import { GoalsService } from './goals.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Goals.name, schema: GoalSchema }]),
    UsersModule
  ],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
