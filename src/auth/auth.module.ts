import { UserModule } from 'user/user.module';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from './bcrypt.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '15d' },
    }),
  ],
  providers: [AuthService, BcryptService],
  controllers: [AuthController],
})
export class AuthModule {}
