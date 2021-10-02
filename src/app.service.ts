import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Like, Repository } from 'typeorm';
import { BookEntity } from './models/book.entity';
import { AuthorEntity } from './models/author.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './models/review.entity';
import { UserEntity } from './models/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly BookRepository: Repository<BookEntity>,
    @InjectRepository(AuthorEntity)
    private readonly AuthorRepository: Repository<AuthorEntity>,
    @InjectRepository(ReviewEntity)
    private readonly ReviewRepository: Repository<ReviewEntity>,
    @InjectRepository(ReviewEntity)
    private readonly UserRepository: Repository<UserEntity>,
    private httpService: HttpService,
  ) {}

  findAllBooks(): Observable<BookEntity[]> {
    return from(
      this.BookRepository.find({
        relations: ['author', 'reviews'],
      }),
    );
  }

  findBook(id: number): Observable<BookEntity> {
    return from(
      this.BookRepository.findOne(
        {
          id,
        },
        { relations: ['author', 'reviews'] },
      ),
    );
  }

  async createReview(review: CreateReviewDto) {
    console.log(review);

    const newReview = this.ReviewRepository.create({
      book: {
        id: review.bookId,
      },
      calification: review.calification,
      comment: review.comment,
      user: {
        id: review.userId,
      },
    });

    await this.ReviewRepository.save(newReview);
    return from(
      this.BookRepository.findOne(
        {
          id: review.bookId,
        },
        { relations: ['author', 'reviews'] },
      ),
    );
  }

  findSearchBooks(search): Observable<BookEntity[]> {
    return from(
      this.BookRepository.find({
        where: [
          { title: Like(`%${search}%`) },
          {
            author: {
              name: Like(`%${search}%`),
            },
          },
        ],
        relations: ['author', 'reviews'],
      }),
    );
  }

  async generateData() {
    const response = this.httpService.get(
      'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=yOBedQIsPTMHX6GBi6EZM3Kl8k1f0UCe',
    );

    let message = 'data not created';

    const books = await this.BookRepository.find();
    if (books.length == 0) {
      response.subscribe(async (response) => {
        const data = response.data;
        console.log(data['results']['books'][0]);
        const books = data['results']['books'];
        for (let i = 0; i < books.length; i++) {
          const bookApi = books[i];
          const author = this.AuthorRepository.create({
            name: bookApi.author,
          });
          await this.AuthorRepository.save(author);
          const book = this.BookRepository.create({
            title: bookApi.title,
            isbn: bookApi.isbns[0].isbn10,
            url: bookApi.book_image,
            author,
            description: bookApi.description,
          });
          console.log(book);
          console.log(author);

          await this.BookRepository.save(book);
        }
      });
      message = 'data created';
    }

    return message;
  }
}
