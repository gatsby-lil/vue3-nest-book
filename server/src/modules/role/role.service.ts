import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService  {
  constructor(
    @InjectRepository(RoleEntity) private readonly roleEntity: Repository<RoleEntity>,
  ) {
   
  }
  createRole(createRoleData: CreateRoleDto) {
    
  }

  findRole(keyword?:string) {
    const whereCondition = keyword ? [{roleName: Like(`%${keyword}%`)}] : {}
    return this.roleEntity.find(whereCondition)
  }
}
