import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalsController } from './goals.controller';
import { GoalSchema, Goals } from './goals.schema';
import { GoalsService } from './goals.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Goals.name, schema: GoalSchema }]),
  ],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
