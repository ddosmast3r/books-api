import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../genre.entity';

export class PaginatedGenresDto {
  @ApiProperty({
    description: 'Array of genres',
    type: [Genre],
    example: [
      {
        id: 1,
        name: 'Science Fiction',
        slug: 'science-fiction',
        description: 'Science fiction and fantasy literature',
        createdAt: '2025-06-19T14:46:44.802Z',
        updatedAt: '2025-06-19T14:46:44.802Z'
      }
    ]
  })
  items: Genre[];

  @ApiProperty({
    description: 'Total number of genres matching the filter',
    type: 'number',
    example: 10
  })
  total: number;
} 