import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { SALT_OR_ROUNDS } from '../common/constant';

@Injectable()
export class BcryptService {
  async compare(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }

  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, SALT_OR_ROUNDS || 10);
  }
}
