import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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
  

  
  
}