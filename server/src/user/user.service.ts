import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MysqlBaseService } from 'src/share/services/mysqlBase.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, UserListDto } from './dto/user.dto';

@Injectable()
export class UserService extends MysqlBaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async createUser(createUserData: CreateUserDto) {
    try {
      const result = await this.create(createUserData);
      return result;
    } catch (error) {
      // console.log(error);
    }
  }

  deleteUser(id: number) {
    return this.delete(id);
  }

  updateUser(uniqueValue, updateUserData: UpdateUserDto) {
    return this.update(uniqueValue, updateUserData);
  }

  async getUserList(whereCondition) {
    const { searchWord, pageNumber, pageSize } = whereCondition;
    const userList = await this.findAll(whereCondition);
    console.log(userList, 'uuu');
    return userList;
  }
}
