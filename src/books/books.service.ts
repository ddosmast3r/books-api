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
import { generateUniqueSlug } from '../common/utilities/slug.generator';

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
      createBookDto.authorIds,
    );

    if (!authors.length) {
      throw new NotFoundException('Authors not found');
    }
    const genres = await this.genreRepository.findGenresById(
      createBookDto.genreIds,
    );

    if (!genres.length) {
      throw new NotFoundException('Genre not found');
    }

    const slug = generateUniqueSlug(createBookDto.title);

    return this.bookRepository.save({
      title: createBookDto.title,
      description: createBookDto.description,
      publicationDate: createBookDto.publishedDate,
      language: createBookDto.language,
      pages: createBookDto.pages,
      authors,
      genres,
      slug,
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
      query.andWhere('genres.id IN (:...genreIds)', {
        genreIds: genreIds,
      });
    }

    if (search) {
      query.andWhere('book.title ILIKE :search', { search: `%${search}%` });
    }
    const sortOrder = order.toUpperCase() as 'ASC' | 'DESC';

    if ((sortBy as string) === 'title') {
      query = query.orderBy('book.title', sortOrder);
    } else if ((sortBy as string) === 'publicationDate') {
      query = query.orderBy('book.publicationDate', sortOrder);
    } else {
      query = query.orderBy('book.createdAt', sortOrder);
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

    const authors = await this.authorService.findAuthorsById(
      updateBookDto.authorIds,
    );

    if (!authors) {
      throw new NotFoundException('Authors not found');
    }

    const genres = await this.genreRepository.findGenresById(
      updateBookDto.genreIds,
    );

    if (!genres.length) {
      throw new NotFoundException('Genres not found');
    }

    const slug = generateUniqueSlug(updateBookDto.title);

    return this.bookRepository.save({
      title: updateBookDto.title,
      description: updateBookDto.description,
      publicationDate: updateBookDto.publishedDate,
      language: updateBookDto.language,
      pages: updateBookDto.pages,
      authors,
      genres,
      slug,
    });
  }

  async remove(id: number): Promise<BookEntity> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }
    await this.bookRepository.remove(book);
    return book;
  }
}
