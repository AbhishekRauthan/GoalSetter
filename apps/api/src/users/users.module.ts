import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from './users.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.stratergy';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [UsersService, JwtStrategy,UsersResolver],
})
export class UsersModule {}
