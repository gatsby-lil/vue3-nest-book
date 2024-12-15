import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
@ValidatorConstraint({
  async: true,
})
export class IsUserNameUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}
  async validate(value: any) {
    try {
      const users = await this.repository.findOneBy({
        username: value,
      });
      return !users;
    } catch (error) {
      console.log(error, 'error');
    }
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    const { property, value } = validationArguments;
    return `${property} ${value} 已经存在`;
  }
}
