import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { BasePaginateQueryDto } from '../../common/dto/base-paginate-query.dto';

export class FilterAuthorsDto extends BasePaginateQueryDto {
  @ApiProperty({
    description:
      "Field to sort by (specific for authors: 'name' or 'createdAt')",
    required: false,
    enum: ['name', 'createdAt'],
    default: 'createdAt',
  })
  @IsOptional()
  @IsIn(['name', 'createdAt'])
  sortBy?: 'name' | 'createdAt' = 'createdAt';
}
