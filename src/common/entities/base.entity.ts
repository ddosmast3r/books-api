import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiProperty({
    description: 'Entity ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Creation date',
    example: '2025-06-19T14:46:44.802Z',
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2025-06-19T14:51:18.378Z',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
} 