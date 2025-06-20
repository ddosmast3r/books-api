import { IsString, IsOptional, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGenreDto {
  @ApiPropertyOptional({
    description: 'Genre name',
    example: 'Hard Science Fiction',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name?: string;

  @ApiPropertyOptional({
    description: 'URL-friendly genre name',
    example: 'hard-science-fiction',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'Slug must be a string' })
  @Length(2, 100, { message: 'Slug must be between 2 and 100 characters' })
  slug?: string;

  @ApiPropertyOptional({
    description: 'Genre description',
    example: 'Hard science fiction only',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
} 