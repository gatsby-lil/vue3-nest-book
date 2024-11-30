const path = require('path');
const fs = require('fs-extra');

import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  private PUBLIC_DIR: string;
  private TEMP_DIR: string;
  constructor() {
    // 初始化文件存放的目录
    this.initFileDir();
  }
  private initFileDir() {
    const rootPath = process.cwd();
    this.PUBLIC_DIR = path.resolve(rootPath, 'file/book');
    this.TEMP_DIR = path.resolve(rootPath, 'temp');
    // 存放上传合并好的文件
    fs.ensureDirSync(this.PUBLIC_DIR);
    // 存放分片的文件
    fs.ensureDirSync(this.TEMP_DIR);
  }

  async handleChunk(fileName: string, chunkName: string, chunk: Buffer) {
    try {
      // 创建用户保存此分片的文件目录
      const chunkDir = path.resolve(this.TEMP_DIR, fileName);
      // 写入的分片路径
      const chunkPath = path.resolve(chunkDir, chunkName);
      // 确保文件夹创建
      await fs.ensureDirSync(chunkDir);
      // 写入分片到指定的文件夹
      await fs.writeFile(chunkPath, chunk);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  mergeChunk() {}
}
