import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';

export class PaginatedAuthorsDto {
  @ApiProperty({ type: () => [Author] })
  data: Author[];

  @ApiProperty({ example: 100, description: 'Total number of items' })
  total: number;

  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  limit: number;

  @ApiProperty({ example: 10, description: 'Total number of pages' })
  lastPage: number;
} 