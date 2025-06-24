import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../genre.entity';
import { BasePaginatedResponseDto } from '../../common/dto/base-paginated-response.dto';

export class PaginatedGenresDto extends BasePaginatedResponseDto {
  @ApiProperty({
    description: 'Array of genres for the current page',
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
  genres: Genre[];
} 