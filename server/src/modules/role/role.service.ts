import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { MysqlBaseService } from 'src/share/services/mysqlBase.service';
import { CreateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService extends MysqlBaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity) roleEntity: Repository<RoleEntity>,
  ) {
    super(roleEntity);
  }
  createRole(createRoleData: CreateRoleDto) {
    return this.create(createRoleData);
  }
}
