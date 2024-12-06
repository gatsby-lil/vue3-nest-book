import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './share/services/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user')
  async getUser() {
    const users = await this.userService.findAll();
    console.log(users, 'users');
    return { users };
  }
}
