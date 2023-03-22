import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authSrv: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authSrv.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authSrv.login(body);
  }
}
