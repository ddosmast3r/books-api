import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { IsDate, IsInt, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity()
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  token: string;

  @Column()
  @Transform(({ value }) => new Date (value))
  @IsDate()
  expiresAt: Date;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column()
  @IsInt()
  userId: number;
}
