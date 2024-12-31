import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform, TransformFnParams, Type } from "class-transformer";

export class CreatTagDto {
    @IsString()
    @IsNotEmpty()
    tagName:string;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @Transform(({value}: TransformFnParams) => value ? value : 1)
    status: number;
}