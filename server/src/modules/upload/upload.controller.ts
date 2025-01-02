import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadStatus } from 'src/enums/uploadstauts.enum';
import { UploadService } from './upload.service';
import { BookService } from '../book/book.service';


@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly bookService: BookService,
  ) {}

  // 上传文件分片的接口
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

  // 合并文件分片接口
  @Get('/file/merge/:fileName/:id')
  async fileMerge(
    @Param('fileName') fileName: string,
    @Param('id', ParseIntPipe) id: number,
    @Res() response,
  ) {
    const result = await this.uploadService.mergeChunk(fileName);
    console.log(fileName, 'fileName')
    if (result) {
      // 根据id更新Book表的上传状态和url
      await this.bookService.update({
        id,
        uploadStatus: UploadStatus.SUCCESS,
        url: `/file/${fileName}`
      });
      response.json({
        success: true,
      });
    }
  }

  @Get('/file/verity/:fileName')
  async vertifyExistFileChunks(
    @Param('fileName') fileName: string,
    @Res() response,
  ) {
    const verityFileObj =
      await this.uploadService.vertifyUploadedChunks(fileName);
    response.json(verityFileObj);
  }
}
