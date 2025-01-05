import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
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
  url: string;

  @IsEnum(AuditStatus)
  auditStatus: AuditStatus = AuditStatus.PENDING;

  @IsEnum(UploadStatus)
  uploadStatus: UploadStatus = UploadStatus.WAITING;

  @IsString()
  size: string;
}

export class CreateBookListDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateBookDto)
  fileList: CreateBookDto[];
}

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsInt()
  @IsPositive()
  id: number;
}
