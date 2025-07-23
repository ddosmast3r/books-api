import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GenreEntity } from './genre.entity';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { CreateGenreDto } from './dto/create-genre.dto';
import { FilterGenresDto } from './dto/filter-genres.dto';
import { PaginatedGenresDto } from './dto/paginated-genres.dto';
import { generateUniqueSlug } from '../common/utilities/slug.generator';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(GenreEntity)
    private genreRepository: Repository<GenreEntity>,
  ) {}

  async findAll(filterGenresDto: FilterGenresDto): Promise<PaginatedGenresDto> {
    const {
      search,
      sortBy = 'createdAt',
      order = 'desc',
      limit = 10,
      page = 1,
    } = filterGenresDto;

    const offset = (page - 1) * limit;

    const query = this.genreRepository.createQueryBuilder('genre');

    if (search) {
      query.andWhere(
        '(genre.name ILIKE :search OR genre.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    query.orderBy(`genre.${sortBy}`, order.toUpperCase() as 'ASC' | 'DESC');

    query.take(limit).skip(offset);

    const [genres, total] = await query.getManyAndCount();
    const lastPage = Math.ceil(total / limit);

    return { genres, total, page, limit, lastPage };
  }

  async findOne(id: number): Promise<GenreEntity> {
    const genre = await this.genreRepository.findOne({ where: { id } });

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    return genre;
  }

  async create(createGenreDto: CreateGenreDto): Promise<GenreEntity> {
    const slugGenre = generateUniqueSlug(createGenreDto.name, {
      addRandom: false,
    });

    const existingSlug = await this.genreRepository.findOne({
      where: { slug: slugGenre },
    });

    if (existingSlug) {
      throw new ConflictException('Genre is already exists');
    }

    const genre = this.genreRepository.create({
      name: createGenreDto.name,
      description: createGenreDto.description,
      slug: slugGenre,
    });
    return this.genreRepository.save(genre);
  }

  async update(
    id: number,
    updateGenreDto: UpdateGenreDto,
  ): Promise<GenreEntity> {
    const genre = await this.findOne(id);

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    if (updateGenreDto.name && updateGenreDto.name !== genre.name) {
      const existingGenre = await this.genreRepository.findOne({
        where: { name: updateGenreDto.name },
      });
      if (existingGenre && existingGenre.id !== genre.id) {
        throw new ConflictException('Genre with this name already exists');
      }
      genre.name = updateGenreDto.name;
      genre.slug = generateUniqueSlug(updateGenreDto.name, {
        addRandom: false,
      });
    }

    if (updateGenreDto.description !== undefined) {
      genre.description = updateGenreDto.description;
    }

    return this.genreRepository.save(genre);
  }

  async remove(id: number): Promise<GenreEntity> {
    const genre = await this.findOne(id);

    await this.genreRepository.remove(genre);

    return genre;
  }

  async findGenresById(genresIDs: number[]): Promise<GenreEntity[]> {
    return this.genreRepository.find({
      where: { id: In(genresIDs) },
    });
  }
}
