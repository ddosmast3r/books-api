import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from 'src/users/user.entity';
import { LoginResponseDto } from './login-response.dto';
import { RefreshTokenEntity } from './dto/refresh-token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private refreshTokenRepository: Repository<RefreshTokenEntity>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async saveRefreshToken(userId: number, token: string): Promise<void> {
    const decodedRefreshToken: { exp: number } = this.jwtService.decode(token);
    const expiresAt = new Date(decodedRefreshToken.exp * 1000);

    const refreshToken = this.refreshTokenRepository.create({
      userId,
      token,
      expiresAt,
    });

    await this.refreshTokenRepository.save(refreshToken);
  }

  async generateTokens(user: UserEntity) {
    const payload = {
      userId: user.id,
    };

    const [access_token, refresh_token] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.getOrThrow<string>('JWT_ACCESS_EXPIRES'),
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
      }),
      await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES'),
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      }),
    ]);

    await this.saveRefreshToken(user.id, refresh_token);

    return { access_token, refresh_token };
  }

  async refreshToken(refreshToken: string): Promise<LoginResponseDto> {
    const refreshSecret =
      this.configService.getOrThrow<string>('JWT_REFRESH_SECRET');
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: refreshSecret,
    });

    const tokenEntity = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
    });

    if (!tokenEntity) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const tokens = await this.generateTokens(user);
    await this.refreshTokenRepository.remove(tokenEntity);
    await this.saveRefreshToken(user.id, tokens.refresh_token);

    return { ...tokens, user };
  }

  catch(error) {
    throw new UnauthorizedException('Invalid refresh token');
  }

  async register(registerDto: RegisterDto): Promise<LoginResponseDto> {
    const user = await this.usersService.create(registerDto);
    const tokens = await this.generateTokens(user);

    await this.saveRefreshToken(user.id, tokens.refresh_token);

    return { ...tokens, user };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user);

    await this.saveRefreshToken(user.id, tokens.refresh_token);

    return { ...tokens, user };
  }
}
