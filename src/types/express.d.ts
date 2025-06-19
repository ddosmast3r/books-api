import { CurrentUser } from '@rolfcorp/nestjs-auth';
import { UserDto } from '../users/dto/user.dto';

declare global {
  namespace Express {
    export interface Request {
      userInfo?: CurrentUser;
      user?: UserDto;
    }
  }
}

export {};