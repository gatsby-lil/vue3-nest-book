import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/role.dto';
import { RoleService } from './role.service';

@Controller('role')
@UseInterceptors(ClassSerializerInterceptor)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() createRoleData: CreateRoleDto) {
    const result = await this.roleService.createRole(createRoleData);
    return result;
  }

  @Post('/list')
  async getRoles() {
    const roles = await this.roleService.findRole();
    return roles;
  }
}
