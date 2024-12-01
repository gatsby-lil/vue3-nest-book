import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import type { Response } from 'express';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Post('/fileChunkUpload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('chunk'))
  async uploadFile(
    @UploadedFile() chunkFile: Express.Multer.File,
    @Body() fileParams,
    @Res() response: Response,
  ) {
    const { fileName, chunkName } = fileParams;
    const result = await this.uploadService.handleChunk(
      fileName,
      chunkName,
      chunkFile.buffer,
    );
    if (result === true) {
      response.json({
        success: true,
      });
    }
  }

  @Get('/file/merge/:fileName')
  async fileMerge(@Param('fileName') fileName: string, @Res() response) {
    console.log(fileName);
    const result = await this.uploadService.mergeChunk(fileName);
    if (result) {
      response.json({
        success: true,
      });
    }
  }
}
