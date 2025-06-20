import { IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({
    description: 'Genre name',
    example: 'Science Fiction',
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: 'Name must be a string' })
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name: string;

  @ApiProperty({
    description: 'URL-friendly genre name',
    example: 'science-fiction',
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: 'Slug must be a string' })
  @Length(2, 100, { message: 'Slug must be between 2 and 100 characters' })
  slug: string;

  @ApiProperty({
    description: 'Genre description',
    example: 'Science fiction and fantasy literature',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
} 