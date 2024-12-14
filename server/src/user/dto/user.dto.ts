import { applyDecorators } from '@nestjs/common';
import {
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';
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
}
