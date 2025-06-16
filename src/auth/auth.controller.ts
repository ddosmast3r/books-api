import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @ApiOperation({ summary: 'Register a new user' })
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {

        return this.authService.register(registerDto);
    }
    
    @ApiOperation({ summary: 'Login a user' })
    @Post("login")
    async login(@Body() loginDto: LoginDto) {

        return this.authService.login(loginDto);
    }
}