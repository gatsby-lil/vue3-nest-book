import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { AccessEntity } from './entities/access.entity';

@Injectable()
export class AccessService {
    constructor(@InjectRepository(AccessEntity) private readonly accessRespository: TreeRepository<AccessEntity>) {}
    async getTreeList() {
       return this.accessRespository.findTrees({relations: ['parent', 'children']})
    }
}
