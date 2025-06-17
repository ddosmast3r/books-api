import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/user.entity';
import { LoginResponseDto } from './login-response.dto';
import { RefreshTokenEntity } from './dto/refresh-token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(RefreshTokenEntity)
        private refreshTokenRepository: Repository<RefreshTokenEntity>,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}
    private async saveRefreshToken(userId: number, token: string): Promise<void> {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        const refreshToken = this.refreshTokenRepository.create({
            userId,
            token,
            expiresAt,
        });

        await this.refreshTokenRepository.save(refreshToken);
    }

    private async generateTokens(user: User): Promise<{ access_token: string; refresh_token: string }> {
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
        
        return { access_token, refresh_token };
    }

    async refreshToken(refreshToken: string): Promise<LoginResponseDto> {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const tokenEntity = await this.refreshTokenRepository.findOne({
                where: { token: refreshToken },
            });

            if (!tokenEntity || tokenEntity.expiresAt < new Date()) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const user = await this.usersService.findById(payload.sub);
            if (!user || !(user instanceof User)) {
                throw new UnauthorizedException('User not found');
            }

            const { access_token, refresh_token: new_refresh_token } = await this.generateTokens(user);
            await this.refreshTokenRepository.delete({ token: refreshToken });
            await this.saveRefreshToken(user.id, new_refresh_token);

            return {
                user,
                access_token,
                refresh_token: new_refresh_token
            };
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
    
    async register(registerDto: RegisterDto): Promise<LoginResponseDto> {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
       
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await hash(registerDto.password, 10);

        const user = await this.usersService.createUser({
            ...registerDto,
            password: hashedPassword,
        });

        if (!user || !(user instanceof User)) {
            throw new UnauthorizedException('Failed to create user');
        }

        const { access_token, refresh_token } = await this.generateTokens(user);
        await this.saveRefreshToken(user.id, refresh_token);

        return {
            user,
            access_token,
            refresh_token
        };
    }

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.usersService.findByEmail(loginDto.email);
        
        if (!user || !(user instanceof User)) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { access_token, refresh_token } = await this.generateTokens(user);
        await this.saveRefreshToken(user.id, refresh_token);

        return {
            user,
            access_token,
            refresh_token
        };
    }
}
