import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookEntity } from './book.entity';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {
  }

  @ApiOperation({ summary: 'Create a book' })
  @ApiBody({ type: CreateBookDto, description: 'Create a book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
    type: BookEntity,
  })
  @ApiResponse({ status: 401, description: 'Something went wrong.' })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiOperation({ summary: 'Get a list of all books' })
  @ApiBody({})
  @ApiResponse({
    status: 201,
    description: 'Get a list of all books',
  })
  @ApiResponse({ status: 401, description: 'Something went wrong.' })
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @ApiOperation({ summary: 'Update a book' })
  @ApiBody({ type: UpdateBookDto, description: 'Update a book' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @ApiOperation({ summary: 'Delete a book' })
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return await this.booksService.deleteBook(id)
  }
}
