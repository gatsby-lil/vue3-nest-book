import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  logger() {
    console.log('LoggerUploader');
  }
}
