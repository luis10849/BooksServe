import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { BookEntity } from './models/book.entity';

@Controller('books')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll(): Observable<BookEntity[]> {
    return this.appService.findAllBooks();
  }

  @Get('id')
  getBook(@Param('id') id: number): Observable<BookEntity> {
    return this.appService.findBook(id);
  }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  createReview(@Body() review: CreateReviewDto) {
    return this.appService.createReview(review);
  }

  
  @Get('filter')
  @HttpCode(HttpStatus.OK)
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
