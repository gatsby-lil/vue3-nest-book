import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { IsUserNameUniqueConstraint } from './validator/userValidator';
import { RoleModule } from '../role/role.module';



/**
 * * TypeOrmModule.forFeature([UserEntity]):注册实体
 * * exports: [UserService], 如果Uservice内部使用就无需导出
 */
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule],
  controllers: [UserController],
  providers: [UserService, IsUserNameUniqueConstraint],
})
export class UserModule {}
