import { BcryptService } from 'auth/bcrypt.service';
import { User } from 'user/user.entity';
import { UserService } from 'user/user.service';
import { JwtService } from '@nestjs/jwt';

import { BadRequestException, Injectable } from '@nestjs/common';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
var jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptSrv: BcryptService,
    private readonly userSrv: UserService,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterDto) {
    const { email, username } = body;
    let user = await this.userSrv.findOneBy({ email });
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    user = await this.userSrv.findOneBy({ username });
    if (user) {
      throw new BadRequestException('Username already exists');
    }
    const hashedPassword = await this.bcryptSrv.hash(body.password);
    return this.userSrv.create(new User({ ...body, password: hashedPassword }));
  }

  async login(body: LoginDto) {
    const { emailOrUsername, password } = body;
    let user = await this.userSrv.findOne({
      where: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) {
      throw new BadRequestException('User not found!');
    }
    let passwordIsValid = await this.bcryptSrv.compare(password, user.password);
    if (!passwordIsValid) {
      throw new BadRequestException('Invalid password');
    }
    return {
      user,
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
