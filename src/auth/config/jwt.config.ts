import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

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
        const expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRES_IN');
        
        if (!expiresIn) {
            throw new Error('JWT_ACCESS_EXPIRES_IN is not defined');
        }

        return expiresIn;
    }

    get refreshExpiresIn(): string {
        const expiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN');
        
        if (!expiresIn) {
            throw new Error('JWT_REFRESH_EXPIRES_IN is not defined');
        }
        
        return expiresIn;
    }

    createJwtOptions(): JwtModuleOptions {
        
        return {
            secret: this.accessSecret,
            signOptions: { expiresIn: this.accessExpiresIn },
        };
    }
} 