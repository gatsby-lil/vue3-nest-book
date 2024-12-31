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
  description: string;


  @IsEnum(AuditStatus)
  auditStatus: AuditStatus = AuditStatus.PENDING;

  @IsEnum(UploadStatus)
  uploadStatus: UploadStatus = UploadStatus.WAITING;

  // todo: 上传人
}

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsInt()
  @IsPositive()
  id: number;
}
