import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('genres')
export class GenreEntity extends BaseEntity {
  @ApiProperty({
    description: 'Genre name',
    example: 'Science Fiction',
    maxLength: 100,
  })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({
    description: 'URL-friendly genre name',
    example: 'science-fiction',
    maxLength: 100,
  })
  @Column({ length: 100, unique: true })
  slug: string;

  @ApiProperty({
    description: 'Genre description',
    example: 'Science fiction and fantasy literature',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description: string;
}
