import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { RefreshTokenEntity } from './dto/refresh-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfigService } from './config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}


