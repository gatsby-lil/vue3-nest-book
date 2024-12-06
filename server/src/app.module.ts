import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { SharedModule } from './share/share.module';

@Module({
  imports: [SharedModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
