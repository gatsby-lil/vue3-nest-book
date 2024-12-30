import { Module } from '@nestjs/common';
import { SharedModule } from './share/share.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AccessModule } from './modules/access/access.module';
import { BookModule } from './modules/book/book.module';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [SharedModule, UserModule, UploadModule, RoleModule, AccessModule, BookModule, TagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
