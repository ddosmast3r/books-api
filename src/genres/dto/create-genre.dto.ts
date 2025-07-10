import { IsString, IsOptional, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({
    description: 'Genre name',
    example: 'Science Fiction',
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string' })
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name: string;

  @ApiPropertyOptional({
    description: 'Genre description',
    example: 'Science fiction and fantasy literature',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
