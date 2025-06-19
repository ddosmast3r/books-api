import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Request, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookResponseDto } from './dto/book-response.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Request as ExpressRequest } from 'express';

@Controller('books')
@ApiTags('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new book' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The book has been successfully created', type: BookResponseDto })
    @ApiBody({ type: CreateBookDto })
    async create(@Body() createBookDto: CreateBookDto, @Request() req: ExpressRequest): Promise<BookResponseDto> {
        return this.booksService.create(createBookDto, req.user?.id || 1);
    }

    @Get()
    @ApiOperation({ summary: 'Get all books' })
    @ApiResponse({ status: 200, description: 'The books have been successfully retrieved', type: [BookResponseDto] })
    async findAll(@Request() req: ExpressRequest): Promise<BookResponseDto[]> {
        return this.booksService.findAll(req.user?.id || 1);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a book by id' })
    @ApiParam({ name: 'id', description: 'Book ID' })
    @ApiResponse({ status: 200, description: 'The book has been successfully retrieved', type: BookResponseDto })
    @ApiResponse({ status: 404, description: 'Book not found' })
    async findOne(@Param('id', ParseIntPipe) id: number, @Request() req: ExpressRequest): Promise<BookResponseDto> {
        return this.booksService.findOne(id, req.user?.id || 1);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a book' })
    @ApiParam({ name: 'id', description: 'Book ID' })
    @ApiBody({ type: UpdateBookDto })
    @ApiResponse({ status: 200, description: 'Book updated successfully', type: BookResponseDto })
    @ApiResponse({ status: 404, description: 'Book not found' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBookDto: UpdateBookDto,
        @Request() req: ExpressRequest
    ): Promise<BookResponseDto> {
        return this.booksService.update(id, updateBookDto, req.user?.id || 1 );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a book' })
    @ApiParam({ name: 'id', description: 'Book ID' })
    @ApiResponse({ status: 200, description: 'Book deleted successfully' })
    @ApiResponse({ status: 404, description: 'Book not found' })
    async remove(@Param('id', ParseIntPipe) id: number, @Request() req: ExpressRequest): Promise<void> {
        return this.booksService.remove(id, req.user?.id || 1);
    }
}
