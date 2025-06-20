import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { id } });
    
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    
    return genre;
  }

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genreData = { ...createGenreDto };
    
    if (!genreData.slug) {
      genreData.slug = this.generateSlug(genreData.name);
    }
    
    const genre = this.genreRepository.create(genreData);
    
    return this.genreRepository.save(genre);
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const genre = await this.findOne(id);

    const dataToUpdate = { ...updateGenreDto };

    if (dataToUpdate.name && !dataToUpdate.slug) {
      dataToUpdate.slug = this.generateSlug(dataToUpdate.name);
    }

    const updatedGenre = {
      ...genre,
      ...dataToUpdate,
    };

    return this.genreRepository.save(updatedGenre);
  }

  async remove(id: number): Promise<void> {
    const genre = await this.findOne(id);
    
    await this.genreRepository.remove(genre);
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