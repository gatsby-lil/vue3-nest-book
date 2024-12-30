import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
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
  originBookName: string;

  @IsString()
  hashBookName:string;

  @IsEnum(AuditStatus)
  auditStatus: AuditStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  description: string;

  @IsEnum(UploadStatus)
  status: UploadStatus;

  // todo: 上传人
}

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsInt()
  @IsPositive()
  id: number;
}
