import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../book.entity';

export class BookResponseDto {
    @ApiProperty({ example: 1, description: 'Unique book identifier' })
    id: number;

    @ApiProperty({ example: 'War and Peace', description: 'Book title' })
    title: string;

    @ApiProperty({ example: 'Leo Tolstoy', description: 'Book author' })
    author: string;

    @ApiProperty({ 
        example: 'Epic novel describing Russian society during the Napoleonic Wars', 
        description: 'Book description',
        required: false 
    })
    description: string;

    @ApiProperty({ example: 1, description: 'ID of the user who owns the book' })
    userId: number;

    @ApiProperty({ example: '2024-03-20T12:00:00Z', description: 'Record creation date' })
    createdAt: Date;

    @ApiProperty({ example: '2024-03-20T12:00:00Z', description: 'Record last update date' })
    updatedAt: Date;
}