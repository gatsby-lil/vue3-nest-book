import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import { UpdateBookDto } from './dto/book.dto';
import { TagEntity } from '../tag/entities/tag.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookEntity: Repository<BookEntity>,
    @InjectRepository(TagEntity)
    private readonly tagEntity: Repository<TagEntity>,
  ) {}

  async create(createBookInfo) {
    // 获取标签的实体
    const tags = createBookInfo.tags;
    let tagEntity = null;
    if (tags) {
      tagEntity = await this.tagEntity.find({
        where: {
          id: tags,
        },
      });
    }
    const bookEntity = await this.bookEntity.create({
      ...createBookInfo,
      tags: tagEntity,
    });
    return this.bookEntity.save(bookEntity);
  }

  getList() {
    return this.bookEntity.find();
  }

  async update(updateBookInfo: UpdateBookDto) {
    const { id } = updateBookInfo;
    const book = await this.bookEntity.findOne({
      where: { id },
    });
    if (!book) {
      return;
    }
    Object.assign(book, updateBookInfo);
    return this.bookEntity.save(book);
  }
}
