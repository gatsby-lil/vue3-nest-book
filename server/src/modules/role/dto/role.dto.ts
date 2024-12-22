import { PartialType } from '@nestjs/mapped-types';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  roleName: string;

  @Transform(({ value }: TransformFnParams) => (value ? value : 1))
  status: number;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
