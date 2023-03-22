import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsString()
  emailOrUsername: string;

  @ApiProperty()
  @IsString()
  password: string;

  constructor(partial: Partial<LoginDto>) {
    Object.assign(this, partial);
  }
}
