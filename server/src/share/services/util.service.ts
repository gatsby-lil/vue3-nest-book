import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
@Injectable()
export class UtilService {
    async createHashWord(password:string) {
        // 生成盐值
        const salt = await bcrypt.genSalt();
        // 返回加密后的密码
        return bcrypt.hash(password, salt);
    }
}