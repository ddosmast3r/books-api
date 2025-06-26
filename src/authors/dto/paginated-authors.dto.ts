import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../author.entity';
import { BasePaginatedResponseDto } from '../../common/dto/base-paginated-response.dto';

export class PaginatedAuthorsDto extends BasePaginatedResponseDto {
  @ApiProperty({ type: () => [Author] })
  data: Author[];
}
