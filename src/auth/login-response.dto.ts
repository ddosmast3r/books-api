import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";
import { AuthTokensDto } from "./dto/auth-tokens.dto";

export class LoginResponseDto extends AuthTokensDto {
    @ApiProperty({ type: 'object', properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        isActive: { type: 'boolean' },
    }})
    user: User;
}