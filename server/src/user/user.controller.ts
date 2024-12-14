import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

/**
 * entity: 实体, 操作数据库
 * DTO: 数据传输对象
 * VO: 服务端返回给客户端的数据
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/create')
  async createUser(@Body() createUser: CreateUserDto) {
    const result = await this.userService.createUser(createUser);
    return { result };
  }
}
