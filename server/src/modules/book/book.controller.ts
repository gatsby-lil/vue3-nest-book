import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookDto } from './dto/book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post('/create')
  async createBook(@Body() creatBookInfo: CreateBookDto) {
    try {
      const result = await this.bookService.create(creatBookInfo);
      return result;
    } catch (error) {
      console.log(error, 'error');
    }
  }
  @Post('/list')
  // todo: 分页后续完成
  async getBookList() {
    try {
      const result = await this.bookService.getList()
      return result
    } catch (error) {
      console.log(error, 'error')
    }
  }
}
