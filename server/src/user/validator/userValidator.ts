import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IsUserNameUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}
  async validate(value: any) {
    const users = await this.repository.findOneBy({
      username: value,
    });
    return !users;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    const { property, value } = validationArguments;
    return `${property} ${value} 已经存在`;
  }
}
