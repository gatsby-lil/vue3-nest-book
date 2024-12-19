import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserListDto } from './dto/user.dto';
import { UserService } from './user.service';

/**
 * entity: 实体, 操作数据库
 * DTO: 数据传输对象
 * VO: 服务端返回给客户端的数据
 */
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 新增用户
  @Post('/create')
  async createUser(@Body() createUserData: CreateUserDto) {
    const result = await this.userService.createUser(createUserData);
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
  // 修改用户
  @Put('/update')
  async updateUser(@Body() updateUserData: UpdateUserDto) {
    const result = await this.userService.updateUser(
      updateUserData.id,
      updateUserData,
    );
    return result;
  }
  // 根据id查询用户
  @Get('/getuser/:id')
  // ParseIntPipe 把id转换成数字
  async getUserById(@Param('id', ParseIntPipe) id) {
    console.log(id);
    const result = await this.userService.getUser(id)
    console.log(result, 'result')
    return result;
  }

  // 获取用户列表
  @Post('/list')
  async getUserList(@Body() userListData: UserListDto) {
    const result = await this.userService?.getUserList(userListData);
    return result;
  }
}
