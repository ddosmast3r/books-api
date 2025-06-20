import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './genre.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all genres',
    type: [Genre],
  })
  findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get genre by ID' })
  @ApiParam({
    name: 'id',
    description: 'Genre ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Genre found',
    type: Genre,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Genre not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Genre> {
    return this.genresService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new genre' })
  @ApiBody({
    type: CreateGenreDto,
    description: 'Genre creation data',
    examples: {
      example1: {
        summary: 'Genre creation example',
        value: {
          name: 'Science Fiction',
          slug: 'science-fiction',
          description: 'Science fiction and fantasy literature',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Genre successfully created',
    type: Genre,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - User role required',
  })
  create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genresService.create(createGenreDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update genre' })
  @ApiParam({
    name: 'id',
    description: 'Genre ID',
    type: 'number',
    example: 1,
  })
  @ApiBody({
    type: UpdateGenreDto,
    description: 'Genre update data',
    examples: {
      example1: {
        summary: 'Genre update example',
        value: {
          name: 'Hard Science Fiction',
          description: 'Hard science fiction only',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Genre successfully updated',
    type: Genre,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Genre not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Admin role required',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ): Promise<Genre> {
    return this.genresService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete genre' })
  @ApiParam({
    name: 'id',
    description: 'Genre ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Genre successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Genre not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Admin role required',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.genresService.remove(id);
  }
} 