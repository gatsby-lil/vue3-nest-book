import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { AuditStatus } from 'src/enums/Auditstatus.enum';
import { UploadStatus } from 'src/enums/uploadstauts.enum';

export class CreateBookDto {
  @IsString()
  bookName: string;

  @IsInt()
  @IsPositive()
  tags: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  url:string;


  @IsEnum(AuditStatus)
  auditStatus: AuditStatus = AuditStatus.PENDING;

  @IsEnum(UploadStatus)
  uploadStatus: UploadStatus = UploadStatus.WAITING;

  @IsString()
  size: string;

  // todo: 上传人
}

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsInt()
  @IsPositive()
  id: number;
}
