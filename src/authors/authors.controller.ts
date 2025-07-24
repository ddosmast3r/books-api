import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilterAuthorsDto } from './dto/filter-authors.dto';
import { AuthorEntity } from './author.entity';
import { PaginatedAuthorsDto } from './dto/paginated-authors.dto';

@Controller('authors')
@ApiTags('Authors')
@ApiBearerAuth('access-token')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Create a new author' })
  @ApiBody({ type: CreateAuthorDto, description: 'Author creation data' })
  @ApiResponse({
    status: 201,
    description: 'The author has been successfully created.',
    type: AuthorEntity,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Get a list of authors' })
  @ApiResponse({
    status: 200,
    description: 'List of authors with pagination.',
    type: PaginatedAuthorsDto,
  })
  @Get()
  findAll(@Query() filterAuthorsDto: FilterAuthorsDto) {
    return this.authorsService.findAll(filterAuthorsDto);
  }

  @ApiOperation({ summary: 'Get a single author by ID' })
  @ApiBody({ type: AuthorEntity, description: 'Filter one author' })
  @ApiResponse({
    status: 200,
    description: 'Author details.',
    type: AuthorEntity,
  })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<AuthorEntity> {
    return this.authorsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an existing author' })
  @ApiBody({ type: UpdateAuthorDto, description: 'Author update data' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully updated.',
    type: AuthorEntity,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorEntity> {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @ApiOperation({ summary: 'Delete an author' })
  @ApiBody({ type: FilterAuthorsDto, description: 'Filter authors data' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully deleted.',
    type: AuthorEntity,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<AuthorEntity> {
    return this.authorsService.remove(id);
  }
}
