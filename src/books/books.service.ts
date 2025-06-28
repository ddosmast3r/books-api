import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookEntity[]> {
    const book: BookEntity & BookEntity[] = this.bookRepository.create({
      title: createBookDto.title,
      author: createBookDto.author,
      description: createBookDto.description,
      publicationDate: createBookDto.publishedDate,
      language: createBookDto.language,
      pages: createBookDto.pages,
      genres: createBookDto.genres,
    });

    return this.bookRepository.save(book);
  }

  findAll() {
    return this.bookRepository.find();
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({
      id,
      ...updateBookDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
