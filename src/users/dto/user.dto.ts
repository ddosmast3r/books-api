import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsInt, IsString } from 'class-validator';

export class UserDto {
    @ApiProperty({ example: 1, description: 'User ID' })
    @IsInt()
    id: number;

    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'John', description: 'User first name' })
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'User last name' })
    @IsString()
    lastName: string;

    @ApiProperty({ example: true, description: 'User active status' })
    @IsBoolean()
    isActive: boolean;
} 
