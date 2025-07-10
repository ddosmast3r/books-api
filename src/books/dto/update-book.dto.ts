import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiPropertyOptional({
    description: 'Title of the book',
    name: 'title',
    example: 'The Book',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @Length(2, 100)
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the book',
    name: 'description',
    example: 'The Book about something',
    minLength: 2,
    maxLength: 500,
  })
  @IsString()
  @Length(2, 500)
  description: string;

  @ApiPropertyOptional({
    description: 'Language of the book (ISO 639-1)',
    example: 'en',
    minLength: 2,
    maxLength: 2,
  })
  @IsString()
  @Length(2, 2)
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
    description: 'Genres of the book',
    name: 'genres',
    example: [1],
    minLength: 2,
    maxLength: 50,
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  genreIds: number[];

  @ApiPropertyOptional({
    description: 'Author ID or authors of the book',
    name: 'authorIDs',
    example: [1],
    minLength: 2,
    maxLength: 150,
  })
  @IsArray()
  @IsInt({ each: true })
  authorIds: number[];

  @ApiPropertyOptional({
    description: 'Date of book',
    name: 'Date',
    example: '2002-09-11',
  })
  @IsDate()
  @IsOptional()
  publishedDate: Date;
}
