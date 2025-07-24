import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { GenreEntity } from '../genres/genre.entity';
import { BaseEntity } from '../common/entities/base.entity';
import { AuthorEntity } from '../authors/author.entity';

@Entity('books')
export class BookEntity extends BaseEntity {
  @Column()
  title: string;

  @ManyToMany(() => GenreEntity, (genres: GenreEntity): number => genres.id)
  @JoinTable()
  genres: GenreEntity[];

  @ManyToMany(() => AuthorEntity, (authors: AuthorEntity): number => authors.id)
  @JoinTable()
  authors: AuthorEntity[];

  @Column()
  description: string;

  @Column()
  publicationDate: Date;

  @Column({ type: 'varchar', length: 2 })
  language: string;

  @Column()
  pages: number;

  @Column()
  slug: string;
}
