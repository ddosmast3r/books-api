import { ApiProperty } from '@nestjs/swagger';
import { AuthTokensDto } from './dto/auth-tokens.dto';
import { UserDto } from '../users/dto/user.dto';

export class LoginResponseDto extends AuthTokensDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;
}
