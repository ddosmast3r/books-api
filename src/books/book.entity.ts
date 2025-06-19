import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('books')
export class Book {
    @ApiProperty({
        description: 'The unique identifier for the book',
        example: 1,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'The title of the book',
        example: 'The Great Gatsby',
    })
    @Column()
    title: string;

    @ApiProperty({
        description: 'The author of the book',
        example: 'F. Scott Fitzgerald',
    })
    @Column()
    author: string;

    @ApiProperty({
        description: 'The description of the book',
        example: 'A classic novel about the American Dream',
    })
    @Column()
    description: string;

    @ApiProperty({
        description: 'The user ID of the book',
        example: 1,
    })
    @Column()
    userId: number;

    @ApiProperty({
        description: 'Record creation date',
        example: '2024-03-20T12:00:00Z',
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({
        description: 'Record last update date',
        example: '2024-03-20T12:00:00Z',
    })
    @UpdateDateColumn()
    updatedAt: Date;
}