import { Module } from '@nestjs/common';
import { BookModule } from '../book/book.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';


@Module({
  imports: [BookModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
