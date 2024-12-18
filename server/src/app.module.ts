import { Module } from '@nestjs/common';
import { SharedModule } from './share/share.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [SharedModule, UserModule, UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
