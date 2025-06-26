import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { GenreEntity } from '../genres/genre.entity';
import { BaseEntity } from '../common/entities/base.entity';
import { AuthorEntity } from '../authors/author.entity';

@Entity('books')
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column()
  title: string;

  @ManyToMany(() => GenreEntity, (genre: GenreEntity): string => genre.name)
  @JoinTable()
  genres: GenreEntity[];

  @ManyToMany(
    () => AuthorEntity,
    (authors: AuthorEntity): string => authors.fullName,
  )
  @JoinTable()
  @Column()
  authors: AuthorEntity[];

  @Column()
  description: string;

  @Column()
  publicationDate: Date;

  @Column()
  language: string;

  @Column()
  pages: number;
}
