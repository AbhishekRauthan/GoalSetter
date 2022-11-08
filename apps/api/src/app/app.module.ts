import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { GoalsModule } from '../goals/goals.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.RESTVIEW_DB_URI),
    ConfigModule.forRoot({
      envFilePath: '.local.env',
    }),
    GoalsModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps', 'api', 'schema.gql'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
