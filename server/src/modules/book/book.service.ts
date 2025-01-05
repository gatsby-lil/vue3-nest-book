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
    const { fileList } = createBookInfo;
    // 批量创建实体
    const bookEntityList = await Promise.all(
      fileList.map(async (fileInfo) => {
        const tags = fileInfo.tags;
        let tagEntity = null;
        if (tags) {
          tagEntity = await this.tagEntity.find({
            where: {
              id: tags,
            },
          });
        }
        return await this.bookEntity.create({
          ...fileInfo,
          tags: tagEntity,
        });
      }),
    );
    return this.bookEntity.save(bookEntityList);
  }

  async getList() {
    const list = await this.bookEntity.find({ relations: ['tags'] });
    return list.map((item) => {
      return {
        ...item,
        tags: item.tags[0]?.tagName,
      };
    });
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
