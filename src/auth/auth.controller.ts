import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
   
    @Post('register')
    @ApiBody({ type: RegisterDto, description: 'User registration data' })
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post("login")
    @ApiBody({ type: LoginDto, description: 'User login data' })    
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 201, description: 'User logged in successfully' })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}