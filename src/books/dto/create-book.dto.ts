import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'Book title',
    example: 'Bible',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

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
  @IsString()
  publishedDate: Date;

  @ApiProperty({
    description: 'Find books by published',
    example: 'The Book 30-06-2025',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    description: 'Number of pages in the book',
    example: '350',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  pages: number;

  @IsNumber()
  genres: string[];

  @ApiProperty({
    description: 'Limit of pages in the book',
    example: '350',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  limit: number;
}
