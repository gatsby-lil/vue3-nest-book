import { Controller, Get, Query } from '@nestjs/common';
import { AccessService } from './access.service';

@Controller('access')
export class AccessController {
    constructor(private readonly accessService: AccessService) {}
    @Get('/treelist')
    async getTreeList(@Query('search') search?: string | null) {
        console.log(search)
        const treeList = await this.accessService.getTreeList();
        return treeList; 
    }
}
