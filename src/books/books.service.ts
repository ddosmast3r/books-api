import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { FilterBookDto } from './dto/filter-book.dto';
import { PaginatedBooksDto } from './dto/paginated-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookEntity> {
    return this.bookRepository.save({
      title: createBookDto.title,
      description: createBookDto.description,
      publicationDate: createBookDto.publishedDate,
      language: createBookDto.language,
      pages: createBookDto.pages,
    });
  }

  async findAll(filterBookDto: FilterBookDto): Promise<PaginatedBooksDto> {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      order = 'DESC',
    } = filterBookDto;

    let query = this.bookRepository.createQueryBuilder('book');

    query = query.leftJoinAndSelect('book.authors', 'authors');
    query = query.leftJoinAndSelect('book.genres', 'genres');

    if (search) {
      query.where('book.title ILIKE :search', { search: `%${search}%` });
    }

    if (sortBy === 'title') {
      query = query.orderBy('book.title', order.toUpperCase());
    } else if (sortBy === 'publicationDate') {
      query = query.orderBy('book.publicationDate', order.toUpperCase());
    } else {
      query = query.orderBy('book.createdAt', order.toUpperCase());
    }

    const skip = (page - 1) * limit;
    query = query.skip(skip).take(limit);

    const books = await query.getMany();
    const total = await query.getCount();

    return {
      data: books,
      total: total,
      page: page,
      limit: limit,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    const book = await this.bookRepository.preload({
      id,
      ...updateBookDto,
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return this.bookRepository.save(book);
  }

  async deleteBook(id: number): Promise<BookEntity> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await this.bookRepository.delete(id);

    return book;
  }
}
