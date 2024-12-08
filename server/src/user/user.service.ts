import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MysqlBaseService } from 'src/share/services/mysqlBase.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService extends MysqlBaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async createUser(createUser: CreateUserDto) {
    try {
      const result = await this.create(createUser);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteUser() {}

  updateUser() {}

  findUser() {}
}
