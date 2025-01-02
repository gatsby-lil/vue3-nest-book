const path = require('path');
import { Module } from '@nestjs/common';
import { SharedModule } from './share/share.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AccessModule } from './modules/access/access.module';
import { BookModule } from './modules/book/book.module';
import { TagModule } from './modules/tag/tag.module';
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'file'), // 用户上传文件存放的地址
      serveRoot: '/file' // 客户端请求前缀
    }),
    SharedModule, 
    UserModule, 
    UploadModule, 
    RoleModule, 
    AccessModule, 
    BookModule, 
    TagModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
