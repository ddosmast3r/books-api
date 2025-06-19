import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateBookDto {
    @ApiProperty({ example: 'War and Peace', description: 'Book title', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ example: 'Leo Tolstoy', description: 'Book author', required: false })
    @IsString()
    @IsOptional()
    author?: string;

    @ApiProperty({ 
        example: 'Epic novel describing Russian society during the Napoleonic Wars', 
        description: 'Book description',
        required: false 
    })
    @IsString()
    @IsOptional()
    description?: string;
}