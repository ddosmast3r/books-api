import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { BookEntity } from './book.entity';
import { FilterBookDto } from './dto/filter-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('books')
@ApiTags('books')
@UseInterceptors(CacheInterceptor)
@ApiBearerAuth('access-token')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Create a book' })
  @ApiBody({ type: CreateBookDto, description: 'Create a book' })
  @ApiResponse({
    status: 200,
    description: 'Successfully create a book',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid filter parameters',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiOperation({ summary: 'Get a list of all books' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved list of books',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid filter parameters',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @CacheKey('all-books')
  @CacheTTL(300)
  @Get()
  findAll(@Query() filterBookDto: FilterBookDto) {
    return this.booksService.findAll(filterBookDto);
  }

  @ApiOperation({ summary: 'Get book by id' })
  @ApiParam({
    name: 'id',
    description: 'Id of the book',
  })
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid filter parameters',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @CacheKey('book-details')
  @CacheTTL(600)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a book' })
  @ApiParam({
    name: 'id',
    description: 'Id of the book',
  })
  @ApiBody({ type: UpdateBookDto, description: 'Update a book' })
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({ status: 401, description: 'Something went wrong.' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @ApiOperation({ summary: 'Delete a book' })
  @ApiParam({
    name: 'id',
    description: 'Id of the book',
  })
  @ApiResponse({ status: 201, description: 'Delete a book' })
  @ApiResponse({ status: 401, description: 'Something went wrong.' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<BookEntity> {
    return this.booksService.remove(id);
  }
}
