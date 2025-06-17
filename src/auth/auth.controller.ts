import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './login-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
   
    @Post('register')
    @ApiBody({ type: RegisterDto, description: 'User registration data' })
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully', type: LoginResponseDto })
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post("login")
    @ApiBody({ type: LoginDto, description: 'User login data' })    
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 201, description: 'User logged in successfully', type: LoginResponseDto })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    @ApiBody({ type: RefreshTokenDto, description: 'Refresh token data' })
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 201, description: 'Access token refreshed successfully', type: LoginResponseDto })
    @ApiResponse({ status: 401, description: 'Invalid refresh token' }) 
    async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto.refresh_token);
    }
}