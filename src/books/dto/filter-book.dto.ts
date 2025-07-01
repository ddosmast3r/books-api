import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { BasePaginateQueryDto } from '../../common/dto/base-paginate-query.dto';

export class FilterBookDto extends BasePaginateQueryDto {
  @ApiProperty({
    description:
      "Field to sort by (specific for books: 'title', 'publicationDate', 'createdAt')",
    required: false,
    enum: ['title', 'publicationDate', 'createdAt'],
    default: 'createdAt',
  })
  @IsOptional()
  @IsIn(['title', 'publicationDate', 'createdAt'])
  sortBy?: 'title' | 'publicationDate' | 'createdAt' = 'createdAt';

  @ApiProperty({
    description: 'Filter by genre',
    example: "'sci-fi'",
    required: false,
  })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiProperty({
    description: 'Filter by language',
    example: "'russian'",
    required: false,
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({
    description: 'Filter by publication date',
    example: "'2025'",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  publicationDate?: number;
}
