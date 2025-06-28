import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";
import { BasePaginateQueryDto } from '../../common/dto/base-paginate-query.dto';

export class FilterBookDto extends BasePaginateQueryDto {
  @ApiProperty({
    description: "Field to sort by (specific for books: 'title', 'publicationDate', 'createdAt')",
    required: false,
    enum: ['title', 'publicationDate', 'createdAt'],
    default: 'createdAt',
  })
  @IsOptional()
  @IsIn(['title', 'publicationDate', 'createdAt'])
  sortBy?: 'title' | 'publicationDate' | 'createdAt' = 'createdAt';
}
