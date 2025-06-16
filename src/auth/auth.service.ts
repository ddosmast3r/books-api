import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto/register.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {

        const existingUser = await this.usersService.findByEmail(registerDto.email);
       
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await hash(registerDto.password, 10);

        const user = await this.usersService.createUser({
            ...registerDto,
            password: hashedPassword,
        });

        const token = this.jwtService.sign({ id: user.id, email: user.email });

        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    }

    async login(loginDto: LoginDto) {
        const user =  await this.usersService.findByEmail(loginDto.email);
        
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return {
        access_token: token,
        user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        }
    }
}

