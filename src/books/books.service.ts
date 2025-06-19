import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookResponseDto } from './dto/book-response.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>
    ) {}

    async create(createBookDto: CreateBookDto, userId: number): Promise<BookResponseDto> {
        const book = this.booksRepository.create({
            ...createBookDto,
            userId
        });
        const savedBook = await this.booksRepository.save(book);
        return this.mapToResponseDto(savedBook);
    }

    async findAll(userId: number): Promise<BookResponseDto[]> {
        const books = await this.booksRepository.find({
            where: { userId }
        });
        return books.map(book => this.mapToResponseDto(book));
    }

    async findOne(id: number, userId: number): Promise<BookResponseDto> {
        const book = await this.booksRepository.findOne({
            where: { id }
        });

        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        if (book.userId !== userId) {
            throw new ForbiddenException('You do not have access to this book');
        }

        return this.mapToResponseDto(book);
    }

    async update(id: number, updateBookDto: UpdateBookDto, userId: number): Promise<BookResponseDto> {
        const book = await this.booksRepository.findOne({
            where: { id }
        });

        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        if (book.userId !== userId) {
            throw new ForbiddenException('You do not have access to this book');
        }

        await this.booksRepository.update(id, updateBookDto);
        const updatedBook = await this.booksRepository.findOne({
            where: { id }
        });
        
        if (!updatedBook) {
            throw new NotFoundException(`Book with ID ${id} not found after update`);
        }
        
        return this.mapToResponseDto(updatedBook);
    }

    async remove(id: number, userId: number): Promise<void> {
        const book = await this.booksRepository.findOne({
            where: { id }
        });

        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        if (book.userId !== userId) {
            throw new ForbiddenException('You do not have access to this book');
        }

        await this.booksRepository.remove(book);
    }

    private mapToResponseDto(book: Book): BookResponseDto {
        const { id, title, author, description, userId, createdAt, updatedAt } = book;
        return {
            id,
            title,
            author,
            description,
            userId,
            createdAt,
            updatedAt
        };
    }
}