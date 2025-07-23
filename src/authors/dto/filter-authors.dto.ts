import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { BasePaginateQueryDto } from '../../common/dto/base-paginate-query.dto';
import { AuthorsSortByEnum } from '../authors.enum';

export class FilterAuthorsDto extends BasePaginateQueryDto {
  @ApiProperty({
    description:
      "Field to sort by (specific for authors: 'name' or 'createdAt')",
    required: false,
    enum: AuthorsSortByEnum,
    default: AuthorsSortByEnum.CreatedAt,
  })
  @IsOptional()
  @IsEnum(AuthorsSortByEnum)
  sortBy?: AuthorsSortByEnum = AuthorsSortByEnum.CreatedAt;
}
