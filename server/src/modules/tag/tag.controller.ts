import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
@UseInterceptors(ClassSerializerInterceptor)
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get('/list')
  async getTags() {
    const tagsList = await this.tagService.getTagsList();
    return tagsList;
  }
}
