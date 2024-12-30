import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookDto } from './dto/book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post('/creat')
  createBook(@Body() creatBookInfo: CreateBookDto) {
    const { hashBookName, originBookName, auditStatus } = creatBookInfo;
    console.log(auditStatus, 'auditStatus');
  }
}
