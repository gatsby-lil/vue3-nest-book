import { applyDecorators } from '@nestjs/common';
import {
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsUserNameUniqueConstraint } from '../validator/userValidator';

/**
 * 聚合字段的校验规则
 * 1. 数据类型校验
 * 2. 必填项
 * 3. 特殊校验
 * 4. 更修时候的可选参数
 */
function ValidatePassword() {
  return applyDecorators(IsString(), IsNotEmpty(), MinLength(6), MaxLength(18));
}

function ValidateMobile() {
  return applyDecorators(
    IsNotEmpty(),
    IsString(),
    IsMobilePhone('zh-CN'),
    Type(() => String),
  );
}

function ValidateRoleIds() {
  return applyDecorators(
    IsOptional(),
    IsArray(),
    ArrayNotEmpty(),
    IsInt({each: true})
  )
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsUserNameUniqueConstraint)
  username: string;

  @ValidatePassword()
  password: string;

  @ValidateMobile()
  mobile: string;

  @Transform(({ value }: TransformFnParams) => (value ? value : ''))
  @IsString()
  avatar: string;

  @Transform(({ value }: TransformFnParams) => (value ? value : 0))
  freezed: number;

  @Transform(({ value }: TransformFnParams) => (value ? value : ''))
  @IsString()
  slogan: string;

  @IsOptional()
  isSuper: boolean;

  @ValidateRoleIds()
  roleIds:number[]
}

export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
  'username',
]) {
  @IsInt()
  @IsPositive()
  id: number;
}

export class UserListDto {
  @IsOptional()
  @IsString()
  searchWord: string | null;
  @IsOptional()
  @IsNumber()
  pageSize: number;
  @IsOptional()
  @IsNumber()
  pageNumber: number;
}
