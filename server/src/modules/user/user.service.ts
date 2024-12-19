import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MysqlBaseService } from 'src/share/services/mysqlBase.service';
import { UtilService } from 'src/share/services/util.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, UserListDto } from './dto/user.dto';


@Injectable()
export class UserService extends MysqlBaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected userRepository: Repository<UserEntity>,
    private readonly utilService: UtilService,
  ) {
    super(userRepository);
  }

  async createUser(createUserData: CreateUserDto) {
    try {
      if(createUserData.password) {
        createUserData.password = await this.utilService.createHashWord(createUserData.password);
      }
      const result = await this.create(createUserData);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteUser(id: number) {
    return this.delete(id);
  }

  updateUser(uniqueValue, updateUserData: UpdateUserDto) {
    return this.update(uniqueValue, updateUserData);
  }

  async getUserList(queryData) {
    const { searchWord, pageNumber, pageSize } = queryData;
    console.log(searchWord, pageNumber, pageSize)
    const whereCondition = searchWord ? [{username: Like(`%${searchWord}%`)}] : {}
    const skip = (pageNumber - 1) * pageSize
    const take = pageSize;
    const [userList,total] = await this.findAndCountByPage(skip, take, whereCondition);
    return {
      userList,
      total
    }
  }

  async getUser(id:number) {
    return this.findOne({where: {id}})
  }
}
