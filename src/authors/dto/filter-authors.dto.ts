import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class FilterAuthorsDto extends PaginationQueryDto {
  @ApiProperty({
    description: "Field to sort by (specific for authors: 'name' or 'createdAt')",
    required: false,
    enum: ['name', 'createdAt'],
    default: 'createdAt',
  })
  @IsOptional()
  @IsIn(['name', 'createdAt'])
  sortBy?: 'name' | 'createdAt' = 'createdAt';
}   