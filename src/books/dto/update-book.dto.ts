import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import {
  IsArray, IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { GenreEntity } from '../../genres/genre.entity';
import { AuthorEntity } from '../../authors/author.entity';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiPropertyOptional({
    description: 'Title of the book',
    name: 'title',
    example: 'The Book',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @Length(1, 100)
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the book',
    name: 'description',
    example: 'The Book about something',
    minLength: 2,
    maxLength: 500,
  })
  @IsString()
  @Length(1, 500)
  description: string;

  @ApiPropertyOptional({
    description: 'Language of the book',
    name: 'language',
    example: 'English',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @Length(1, 50)
  @IsOptional()
  language: string;

  @ApiPropertyOptional({
    description: 'Number of pages in the book',
    name: 'Pages',
    example: '256',
  })
  @IsNumber()
  pages: number;

  @ApiPropertyOptional({
    description: 'Genre of the book',
    name: 'genre',
    example: 'Sci-fi',
    minLength: 2,
    maxLength: 20,
  })
  @IsArray()
  @Length(2, 20)
  @IsOptional()
  genre: GenreEntity[];

  @ApiPropertyOptional({
    description: 'Author or authors of the book',
    name: 'authors',
    example: 'Bearer',
    minLength: 2,
    maxLength: 100,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  authors: AuthorEntity[];

  @ApiPropertyOptional({
    description: 'Date of book',
    name: 'Date',
    example: '2002-09-11',
  })
  @IsDate()
  @IsOptional()
  date: Date;
}
