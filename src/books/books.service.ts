import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { FilterBookDto } from './dto/filter-book.dto';
import { PaginatedBooksDto } from './dto/paginated-book.dto';
import { AuthorsService } from '../authors/authors.service';
import { GenresService } from '../genres/genres.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    private readonly authorService: AuthorsService,
    private readonly genreRepository: GenresService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookEntity> {
    const authors = await this.authorService.findAuthorsById(
      createBookDto.authorsIds,
    );
    const genres = await this.genreRepository.findGenresById(
      createBookDto.genreIds,
    );
    return this.bookRepository.save({
      title: createBookDto.title,
      description: createBookDto.description,
      publicationDate: createBookDto.publishedDate,
      language: createBookDto.language,
      pages: createBookDto.pages,
      authors,
      genres,
    });
  }

  async findAll(filterBookDto: FilterBookDto): Promise<PaginatedBooksDto> {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      order = 'DESC',
      authorIds,
      genreIds,
    } = filterBookDto;

    let query = this.bookRepository.createQueryBuilder('book');

    query.leftJoinAndSelect('book.authors', 'authors');

    if (authorIds) {
      query.where('authors.id IN (:...authorsIds)', { authorsIds: authorIds });
    }

    query.leftJoinAndSelect('book.genres', 'genres');

    if (genreIds) {
      query.where('genres.id IN (:...genreIds)', {
        genreIds: genreIds,
      });
    }

    if (search) {
      query.where('book.title ILIKE :search', { search: `%${search}%` });
    }

    if (sortBy === 'title') {
      query = query.orderBy(
        'book.title',
        order.toUpperCase() as 'ASC' | 'DESC',
      );
    } else if (sortBy === 'publicationDate') {
      query = query.orderBy(
        'book.publicationDate',
        order.toUpperCase() as 'ASC' | 'DESC',
      );
    } else {
      query = query.orderBy(
        'book.createdAt',
        order.toUpperCase() as 'ASC' | 'DESC',
      );
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
