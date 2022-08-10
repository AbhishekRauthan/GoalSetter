import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalsController } from '../goals/goals.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.RESTVIEW_DB_URI),
    ConfigModule.forRoot({
      envFilePath: '.local.env',
    }),
  ],
  controllers: [GoalsController],
  providers: [],
})
export class AppModule {}
