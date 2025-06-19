import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateGenreDto {
  @IsOptional()
  @IsString({ message: 'Name должно быть строкой' })
  @Length(2, 100, { message: 'Name должно быть от 2 до 100 символов' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Slug должен быть строкой' })
  @Length(2, 100, { message: 'Slug должен быть от 2 до 100 символов' })
  slug?: string;

  @IsOptional()
  @IsString({ message: 'Description должно быть строкой' })
  description?: string;
} 