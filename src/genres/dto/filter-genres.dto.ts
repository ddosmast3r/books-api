import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsNumber, IsIn, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterGenresDto {
    @ApiPropertyOptional({
        description: 'Search by name and/or description (case-insensitive partial match)',
        required: false,
        example: 'fiction'
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Filter by exact slug match',
        required: false,
        example: 'science-fiction'
    })
    @IsOptional()
    @IsString()
    slug?: string;

    @ApiPropertyOptional({
        description: 'Sort by field',
        required: false,
        enum: ['name', 'createdAt', 'updatedAt'],
        default: 'createdAt'
    })
    @IsOptional()
    @IsIn(['name', 'createdAt', 'updatedAt'])
    sortBy?: string = 'createdAt';

    @ApiPropertyOptional({
        description: 'Sort order',
        required: false,
        enum: ['asc', 'desc'],
        default: 'desc'
    })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: string = 'desc';

    @ApiPropertyOptional({
        description: 'Number of records per page',
        required: false,
        minimum: 1,
        maximum: 100,
        default: 10
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @ApiPropertyOptional({
        description: 'Offset for pagination',
        required: false,
        minimum: 0,
        default: 0
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    offset?: number = 0;
}