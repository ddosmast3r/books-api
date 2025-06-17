import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({ example: 1, description: 'User ID' })
    id: number;

    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    email: string;

    @ApiProperty({ example: 'John', description: 'User first name' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'User last name' })
    lastName: string;

    @ApiProperty({ example: true, description: 'User active status' })
    isActive: boolean;
} 