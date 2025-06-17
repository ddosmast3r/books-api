import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto): Promise<{ user: Partial<User>; access_token: string; refresh_token: string }> {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
       
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await hash(registerDto.password, 10);

        const user = await this.usersService.createUser({
            ...registerDto,
            password: hashedPassword,
        });

        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                { sub: user.id, email: user.email },
                { 
                    expiresIn: '15m',
                    secret: process.env.JWT_ACCESS_SECRET 
                }
            ),
            this.jwtService.signAsync(
                { sub: user.id, email: user.email },
                { 
                    expiresIn: '7d',
                    secret: process.env.JWT_REFRESH_SECRET 
                }
            )
        ]);

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isActive: user.isActive
            },
            access_token,
            refresh_token
        };
    }

    async login(loginDto: LoginDto): Promise<{ user: Partial<User>; access_token: string; refresh_token: string }> {
        const user = await this.usersService.findByEmail(loginDto.email);
        
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                { sub: user.id, email: user.email },
                { 
                    expiresIn: '15m',
                    secret: process.env.JWT_ACCESS_SECRET 
                }
            ),
            this.jwtService.signAsync(
                { sub: user.id, email: user.email },
                { 
                    expiresIn: '7d',
                    secret: process.env.JWT_REFRESH_SECRET 
                }
            )
        ]);

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isActive: user.isActive
            },
            access_token,
            refresh_token
        };
    }
}
