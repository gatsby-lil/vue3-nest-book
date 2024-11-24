import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private UploadService: UploadService) {}
  @Post('/fileChunkUpload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() fileParams) {
    console.log(file, 'file');
    console.log(fileParams, 'fileParams');
    return 'uploadFile';
  }
}
