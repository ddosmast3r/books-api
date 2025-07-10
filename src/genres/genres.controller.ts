import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreEntity } from './genre.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilterGenresDto } from './dto/filter-genres.dto';
import { PaginatedGenresDto } from './dto/paginated-genres.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Genres')
@Controller('genres')
@ApiBearerAuth('access-token')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all genres',
    type: PaginatedGenresDto,
  })
  @Get()
  findAll(
    @Query() filterGenresDto: FilterGenresDto,
  ): Promise<PaginatedGenresDto> {
    return this.genresService.findAll(filterGenresDto);
  }

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
    type: GenreEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Genre not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<GenreEntity> {
    return this.genresService.findOne(id);
  }

  @ApiOperation({ summary: 'Create new genre' })
  @ApiBody({
    type: CreateGenreDto,
    description: 'Genre creation data',
    examples: {
      example1: {
        summary: 'Genre creation example',
        value: {
          name: 'Science Fiction',
          description: 'Science fiction and fantasy literature',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Genre successfully created',
    type: GenreEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createGenreDto: CreateGenreDto): Promise<GenreEntity> {
    return this.genresService.create(createGenreDto);
  }

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
    type: GenreEntity,
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
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ): Promise<GenreEntity> {
    return this.genresService.update(id, updateGenreDto);
  }

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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<GenreEntity> {
    return this.genresService.remove(id);
  }
}
