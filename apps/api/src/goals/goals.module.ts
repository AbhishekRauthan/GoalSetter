import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { GoalSchema, Goals } from './goals.schema';
import { GoalsService } from './goals.service';
import { GoalsResolver } from './goals.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Goals.name, schema: GoalSchema }]),
    UsersModule,
  ],
  providers: [GoalsService, GoalsResolver],
})
export class GoalsModule {}
