import { ApiProperty } from '@nestjs/swagger';
import { BookEntity } from '../book.entity';
import { BasePaginatedResponseDto } from '../../common/dto/base-paginated-response.dto';

export class PaginatedBooksDto extends BasePaginatedResponseDto {
  @ApiProperty({ type: () => [BookEntity] })
  data: BookEntity[];
}
