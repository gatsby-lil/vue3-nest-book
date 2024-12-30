import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookEntity: Repository<BookEntity>,
  ) {}
  create(createBookInfo) {
    return this.bookEntity.save(createBookInfo);
  }
}
