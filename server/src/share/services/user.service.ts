import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { MysqlBaseService } from './mysqlBase.service';

@Injectable()
export class UserService extends MysqlBaseService<User> {
  constructor(@InjectRepository(User) protected repository: Repository<User>) {
    super(repository);
  }
}
