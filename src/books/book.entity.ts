import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { Genre } from '../genres/genre.entity';
import { BaseEntity } from '../common/entities/base.entity';
import { Author } from '../authors/author.entity';

@Entity('books')
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column()
  title: string;

  @ManyToMany(() => Genre, (genre: Genre): string => genre.name)
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => Author, (author: Author): string => author.fullName)
  @JoinTable()
  @Column()
  author: Author;

  @Column()
  year: number;
  @CreateDateColumn()
  @Column()
  description: string;

  @Column()
  publicationDate: Date;

  @Column()
  language: string;

  @Column()
  pages: number;
}
