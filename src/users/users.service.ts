import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    ) {}

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async create(registerDto: RegisterDto): Promise<UserEntity> {
        const existingUser = await this.findByEmail(registerDto.email);
        
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const newUser = this.usersRepository.create({
            ...registerDto,
            password: hashedPassword,
        });

        return this.usersRepository.save(newUser);
    }

    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    async findById(id: number): Promise<UserEntity | null> {
        return this.usersRepository.findOne({ where: { id } });
    }
}
