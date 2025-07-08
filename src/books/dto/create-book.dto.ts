import { ApiProperty } from '@nestjs/swagger';
import { languageCodes } from '../../ISO639-1';

import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsInt,
  IsIn,
  Length,
  IsDate,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'Book title',
    example: 'Bible',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Author IDs',
    example: [1],
  })
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  authorsIds: number[];

  @ApiProperty({
    description: 'Author',
    example: 'God',
  })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({
    description: 'Book description',
    example:
      'The Bible is a collection of religious texts considered sacred in Christianity and Judaism',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Published date',
    example: '2024-12-25',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsDate({})
  publishedDate: Date;

  @ApiProperty({
    description: 'Language of the book',
    example: 'Russian',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsIn(languageCodes)
  @Length(2, 2)
  language: string;

  @ApiProperty({
    description: 'Number of pages in the book',
    example: '350',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  pages: number;

  @ApiProperty({
    description: 'Genre IDs',
    example: 1,
  })
  @IsArray()
  @IsInt({ each: true })
  genreIds: number[];

  @ApiProperty({
    description: 'Limit of pages in the book',
    example: '350',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  limit: number;
}
