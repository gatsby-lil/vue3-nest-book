import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { UtilService } from 'src/share/services/util.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { RoleEntity } from '../role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly utilService: UtilService,
  ) {}
  
  /**
   * 1. 先生成实体, 获取到创建的用户ID
   * 2. 根据用户传递的roleIds, 去role实体中查找对应的数据, 若存在则进行赋值
   *  
   */
  async createUser(createUserData: CreateUserDto) {
    try {
      const { password, roleIds } = createUserData
      // 判断用户是否传递了角色
      if(!this.utilService.arrayIsNotEmpty(roleIds)) {
        return;
      }

      // 获取角色实体
      const roleEntities = await this.roleRepository.findBy({id: In(roleIds)})
      if(!this.utilService.arrayIsNotEmpty(roleEntities)) {
        return;
      }
      
      // 密码加密
      if (password) {
        createUserData.password = await this.utilService.createHashWord(
          password,
        );
      }

      // 创建User实体, 关联角色
      const userEntity = await this.userRepository.create({
        ...createUserData,
        roles: roleEntities
      })

      // 保存入库
      const result = await this.userRepository.save(userEntity);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  updateUser(uniqueValue, updateUserData: UpdateUserDto) {
    return this.userRepository.update(uniqueValue, updateUserData);
  }

  async getUserList(queryData) {
    const { searchWord, pageNumber, pageSize } = queryData;
    const whereCondition = searchWord
      ? [{ username: Like(`%${searchWord}%`) }]
      : {};
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    const [userList, total] = await this.userRepository.findAndCount({
      skip,
      take,
      where: whereCondition,
      order: {
        createdAt: 'DESC'
      }
    });
    return {
      userList,
      total,
    };
  }

  async getUser(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
