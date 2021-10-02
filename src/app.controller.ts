import { Controller, Get, HttpCode, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { BookEntity } from './models/book.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('books')
  findAll(): Observable<BookEntity[]> {
    return this.appService.findAllBooks();
  }

  
  @Get('books/filter')
  findSearchBooks(@Query() filterQuery): Observable<BookEntity[]> {
    const {search} = filterQuery;
    console.log(search)
    return this.appService.findSearchBooks(search)
  }

  @Get('generate')
  @HttpCode(HttpStatus.OK)
  generateData() {
    return this.appService.generateData();
  }
}
