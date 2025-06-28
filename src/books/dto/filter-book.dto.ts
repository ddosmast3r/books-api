import { IsNumber, IsOptional, IsString } from 'class-validator';
import { AuthorEntity } from '../../authors/author.entity';

export class FilterBookDto {
  @IsOptional()
  @IsString()
  title: string;
  authors: AuthorEntity[];

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsNumber()
  min_year: number;

  @IsOptional()
  @IsNumber()
  max_year: number;
}
