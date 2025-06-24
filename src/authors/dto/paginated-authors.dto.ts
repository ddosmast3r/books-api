import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';
import { PaginationMetaDto } from '../../common/dto/pagination-meta.dto';

export class PaginatedAuthorsDto extends PaginationMetaDto {
  @ApiProperty({ type: () => [Author] })
  data: Author[];
} 