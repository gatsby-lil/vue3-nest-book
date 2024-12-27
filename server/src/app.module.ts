import { Module } from '@nestjs/common';
import { SharedModule } from './share/share.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AccessModule } from './modules/access/access.module';
@Module({
  imports: [SharedModule, UserModule, UploadModule, RoleModule, AccessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
