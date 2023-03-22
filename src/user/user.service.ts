import { FindOneOptions, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }

  async findOneBy(where: FindOptionsWhere<User>): Promise<User | null> {
    return this.userRepo.findOneBy(where);
  }

  async findOne(options: FindOneOptions<User>): Promise<User | null> {
    return this.userRepo.findOne(options);
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userRepo.save(user);
  }

  async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    return this.userRepo.find(options);
  }
}
