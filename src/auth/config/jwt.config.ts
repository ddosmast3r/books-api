import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

const ACCESS_TOKEN_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private configService: ConfigService) {}

    get accessSecret(): string {
        const secret = this.configService.get<string>('JWT_ACCESS_SECRET');
        if (!secret) {
            throw new Error('JWT_ACCESS_SECRET is not defined');
        }
        return secret;
    }

    get refreshSecret(): string {
        const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
        if (!secret) {
            throw new Error('JWT_REFRESH_SECRET is not defined');
        }
        return secret;
    }

    get accessExpiresIn(): string {
        return ACCESS_TOKEN_EXPIRES_IN;
    }

    get refreshExpiresIn(): string {
        return REFRESH_TOKEN_EXPIRES_IN;
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.accessSecret,
            signOptions: { expiresIn: this.accessExpiresIn },
        };
    }
} 