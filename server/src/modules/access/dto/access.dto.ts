import { IsOptional, IsString } from "class-validator";

export enum AccessType {
    MODULE = 'module', // 模块
    MENU = 'menu', // 菜单
    PAGE = 'page', // 页面
    BUTTON = 'button' // 按钮
}

export class CreateAccessDto {
    @IsString()
    accessName: string;

    @IsString()
    code: string;

    @IsString()
    @IsOptional()
    url: string;

    type: AccessType;

    parentId: number;

    description:string;

    status: number;

}