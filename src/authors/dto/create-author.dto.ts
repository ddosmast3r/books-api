import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BeforeInsert, BeforeUpdate } from "typeorm";
import { slugify } from "slugify";

export class CreateAuthorDto {
  @ApiProperty({
    description: 'The first name of the author',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the author',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The middle name of the author',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  middleName?: string;
  
  @ApiProperty({
    description: 'The bio of the author',
    example: 'John Doe is a software engineer',
  })
  @IsString()
  @IsOptional()
  bio?: string;
  
}