import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userSrv: UserService) {}

  @Get('/')
  async findAll(): Promise<User[]> {
    return this.userSrv.findAll();
  }
}
