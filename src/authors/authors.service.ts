import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import slugify from 'slugify';

@Injectable()
export class AuthorsService {
  create(createAuthorDto: CreateAuthorDto) {
    return 'This action adds a new author';
  }

  findAll() {
    return `This action returns all authors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }

  private generateFullName(authorData: {
    firstName: string;
    lastName: string;
    middleName?: string;
  }): string {
    return `${authorData.firstName} ${
      authorData.middleName ? authorData.middleName + ' ' : ''
    }${authorData.lastName}`;
  }

  private generateSlug(fullName: string): string {
    return slugify(fullName, { lower: true });
  }
}
