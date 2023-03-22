import { Exclude, Expose } from 'class-transformer';
import { CreatedAtColumn } from 'common/decorators/created-at.decorator';
import { UpdatedAtColumn } from 'common/decorators/updated-at.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'IN_ACTIVE',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Expose()
  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Expose()
  @ApiProperty()
  @Column({ name: 'first_name' })
  firstName: string;

  @Expose()
  @ApiProperty()
  @Column({ name: 'last_name' })
  lastName: string;

  @Expose()
  @ApiProperty()
  @Column({ name: 'username', unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Expose()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  phone?: string;

  @Expose()
  @ApiProperty()
  @Column({ type: 'datetime', name: 'signup_at', default: () => 'CURRENT_TIMESTAMP' })
  signupDate: Date;

  @Exclude()
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Active })
  status: UserStatus;

  @Exclude()
  @CreatedAtColumn({ select: false })
  createdAt: Date;

  @Exclude()
  @UpdatedAtColumn({ select: false })
  updatedAt: Date;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
