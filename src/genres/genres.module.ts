import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { GenreEntity } from './genre.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity])],
  controllers: [GenresController],
  providers: [GenresService, JwtAuthGuard],
  exports: [GenresService],
})
export class GenresModule {}
