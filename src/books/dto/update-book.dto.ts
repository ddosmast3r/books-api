import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({ description: 'Title', example: '1' })
  title?: string;

  @ApiProperty({
    description: 'Author',
  })
  author: string;

  @ApiPropertyOptional({
    description: 'Date of book',
  })
  publicationDate?: number;
}
