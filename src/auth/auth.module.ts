import { UserModule } from 'user/user.module';

import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from './bcrypt.service';

@Module({
  imports: [UserModule],
  providers: [AuthService, BcryptService],
  controllers: [AuthController]
})
export class AuthModule {}
