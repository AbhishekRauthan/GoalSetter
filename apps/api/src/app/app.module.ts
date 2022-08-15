import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalsModule } from '../goals/goals.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.RESTVIEW_DB_URI),
    ConfigModule.forRoot({
      envFilePath: '.local.env',
    }),
    GoalsModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
