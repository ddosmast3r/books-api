import { ApiProperty } from '@nestjs/swagger';
import { ISO6391LanguageCodes } from '../../common/ISO639-1';

import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsIn,
  Length,
  IsDate,
  IsInt,
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
    description: 'Array of Author IDs',
    example: [1],
  })
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  authorIds: number[];

  @ApiProperty({
    description: 'Book description',
    example:
      'The Bible is a collection of religious texts considered sacred in Christianity and Judaism',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Published date "YYYY-MM-DD"',
    example: '2024-12-25',
  })
  @IsOptional()
  @IsDate()
  publishedDate: Date;

  @ApiProperty({
    description: 'Language of the book, only in iso 639-1 format',
    example: 'ru',
  })
  @IsOptional()
  @IsString()
  @IsIn(ISO6391LanguageCodes)
  @Length(2, 2)
  language: string;

  @ApiProperty({
    description: 'Number of pages in the book',
    example: '350',
  })
  @IsOptional()
  @IsNumber()
  pages: number;

  @ApiProperty({
    description: 'Array of Genre IDs',
    example: [1],
  })
  @IsArray()
  @IsInt({ each: true })
  genreIds: number[];

  @ApiProperty({
    description: 'Limit of pages in the book',
    example: '350',
  })
  @IsOptional()
  @IsNumber()
  limit: number;
}
