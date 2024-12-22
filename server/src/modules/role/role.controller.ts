import { Body, Controller } from '@nestjs/common';
import { CreateRoleDto } from './dto/role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  async createRole(@Body() createRoleData: CreateRoleDto) {
    const result = await this.roleService.createRole(createRoleData);
    console.log(result);
    return result;
  }
}
