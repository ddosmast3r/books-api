import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilterAuthorsDto } from './dto/filter-authors.dto';
import { Author } from './entities/author.entity';
import { PaginatedAuthorsDto } from './dto/paginated-authors.dto';

@Controller('authors')
@ApiTags('Authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Create a new author' })
  @ApiBody({ type: CreateAuthorDto, description: 'Author creation data' })
  @ApiResponse({ status: 201, description: 'The author has been successfully created.', type: Author })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Get a list of authors' })
  @ApiBody({ type: FilterAuthorsDto, description: 'Filter authors data' })
  @ApiResponse({ status: 200, description: 'List of authors with pagination.', type: PaginatedAuthorsDto })
  @Get()
  findAll(@Query() filterAuthorsDto: FilterAuthorsDto) {
    return this.authorsService.findAll(filterAuthorsDto);
  }

  @ApiOperation({ summary: 'Get a single author by ID' })
  @ApiBody({ type: FilterAuthorsDto, description: 'Filter authors data' })
  @ApiResponse({ status: 200, description: 'Author details.', type: Author })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an existing author' })
  @ApiBody({ type: UpdateAuthorDto, description: 'Author update data' })
  @ApiResponse({ status: 200, description: 'The author has been successfully updated.', type: Author })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @ApiOperation({ summary: 'Delete an author' })
  @ApiBody({ type: FilterAuthorsDto, description: 'Filter authors data' })
  @ApiResponse({ status: 200, description: 'The author has been successfully deleted.', type: Author })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorsService.remove(id);
  }
}
