const path = require('path');
const fs = require('fs-extra');

import { Injectable } from '@nestjs/common';
import { CHUNK_SIZE } from 'src/const';

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

  private pipeStream(fs, ws) {
    return new Promise((resolve, reject) => {
      fs.pipe(ws).on('finish', resolve).on('error', reject);
    });
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
  async mergeChunk(fileName: string) {
    try {
      // 读取分片存放的临时目录
      const chunkDir = path.resolve(this.TEMP_DIR, fileName);
      // 读取目录中的文件
      const chunkFiles = await fs.readdir(chunkDir);
      // 合并后的文件存放的目录
      const mergedFilePath = path.resolve(this.PUBLIC_DIR, fileName);
      // 对分片按照索引进行排列, sort方法会改变原数组
      chunkFiles.sort(
        (c, n) => Number(c.split('-')[1]) - Number(n.split('-')[1]),
      );
      // 开始合并分片（并行）写入指定的文件夹
      const pipes = chunkFiles.map((chunkFile, index) => {
        return this.pipeStream(
          // 创建可读流, 读取分片内容写入
          fs.createReadStream(path.resolve(chunkDir, chunkFile), {
            autoClose: true,
          }),
          // 创建可写流, 按照分片编号写入指定位置
          fs.createWriteStream(mergedFilePath, {
            start: index * CHUNK_SIZE,
          }),
        );
      });

      await Promise.all(pipes);
      // 写入完成后, 删除分片的临时文件夹和分片
      fs.rm(chunkDir, { recursive: true });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
