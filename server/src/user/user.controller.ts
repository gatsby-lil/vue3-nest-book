import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
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
  // 新增用户
  @Post('/create')
  async createUser(@Body() createUser: CreateUserDto) {
    const result = await this.userService.createUser(createUser);
    return { result };
  }
  // 删除用户
  @Delete('/delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    if (!id) return;
    const result = await this.userService.deleteUser(id);
    if (result?.affected) {
      console.log('删除成功');
      return;
    }
    console.log('删除失败');
  }
}
