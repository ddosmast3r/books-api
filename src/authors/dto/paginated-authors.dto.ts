import { ApiProperty } from '@nestjs/swagger';
import { AuthorEntity } from '../author.entity';
import { BasePaginatedResponseDto } from '../../common/dto/base-paginated-response.dto';

export class PaginatedAuthorsDto extends BasePaginatedResponseDto {
  @ApiProperty({ type: () => [AuthorEntity] })
  data: AuthorEntity[];
}
