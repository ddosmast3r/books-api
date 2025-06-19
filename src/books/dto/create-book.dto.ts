import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookDto {
    @ApiProperty({
        description: 'The title of the book',
        example: 'The Great Gatsby',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'The author of the book',
        example: 'F. Scott Fitzgerald',
    })
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty({
        description: 'The description of the book',
        example: 'A classic novel about the American Dream',
    })
    @IsString()
    @IsNotEmpty()
    description: string;
    
    
}