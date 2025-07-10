import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { selectedFieldsEnum } from '../books.enum';
import { BasePaginateQueryDto } from '../../common/dto/base-paginate-query.dto';

export class FilterBookDto extends BasePaginateQueryDto {
  @ApiProperty({
    description:
      "Field to sort by (specific for books: 'title', 'publicationDate', 'createdAt')",
    required: false,
    example: selectedFieldsEnum.createdAt,
    enum: selectedFieldsEnum,
    default: 'createdAt',
  })
  @IsOptional()
  @IsEnum(selectedFieldsEnum)
  sortBy?: selectedFieldsEnum = selectedFieldsEnum.createdAt;

  @ApiProperty({
    description: 'Filter by language',
    example: 'ru',
    required: false,
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({
    description: 'Filter by publication date',
    example: '2025',
    required: false,
  })
  @IsOptional()
  @IsDate()
  publicationDate?: Date;

  @ApiProperty({
    description: 'Filter by array of author IDs',
    example: [1],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  authorIds?: number[];

  @ApiProperty({
    description: 'Filter by array of genres IDs',
    example: [1],
  })
  @IsArray()
  @IsInt({ each: true })
  genreIds?: number[];
}
