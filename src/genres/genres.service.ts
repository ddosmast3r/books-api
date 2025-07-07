import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GenreEntity } from './genre.entity';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { CreateGenreDto } from './dto/create-genre.dto';
import { FilterGenresDto } from './dto/filter-genres.dto';
import { PaginatedGenresDto } from './dto/paginated-genres.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(GenreEntity)
    private genreRepository: Repository<GenreEntity>,
  ) {}

  async findAll(filterGenresDto: FilterGenresDto): Promise<PaginatedGenresDto> {
    const {
      search,
      slug,
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

    if (slug) {
      query.andWhere('genre.slug = :slug', { slug });
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
    let slug = createGenreDto.slug || this.generateSlug(createGenreDto.name);
    let name = createGenreDto.name;

    let counter = 1;
    while (await this.genreRepository.findOne({ where: { name } })) {
      name = `${createGenreDto.name} (${counter++})`;
      slug = this.generateSlug(name);
    }

    return this.genreRepository.save({ name, slug });
  }

  async update(
    id: number,
    updateGenreDto: UpdateGenreDto,
  ): Promise<GenreEntity> {
    const genre = await this.findOne(id);

    const dataToUpdate = {
      ...updateGenreDto,
      slug:
        updateGenreDto.name && updateGenreDto.slug
          ? this.generateSlug(updateGenreDto.name)
          : updateGenreDto.slug,
    };

    const updatedGenre = {
      ...genre,
      ...dataToUpdate,
    };

    return this.genreRepository.save(updatedGenre);
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

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .trim();
  }
}
