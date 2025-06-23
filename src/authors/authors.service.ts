import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import slugify from 'slugify';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterAuthorsDto } from './dto/filter-authors.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { firstName, lastName, middleName, bio } = createAuthorDto;

    const fullName = this.generateFullName({ firstName, lastName, middleName });
    const slug = this.generateSlug(fullName);

    const author = this.authorRepository.create({
      ...createAuthorDto,
      fullName,
      slug,
    });

    return this.authorRepository.save(author);
  }

  async findAll(filterAuthorsDto: FilterAuthorsDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      order = 'desc',
    } = filterAuthorsDto;

    const queryBuilder = this.authorRepository.createQueryBuilder('author');

    if (search) {
      queryBuilder.where('author.fullName ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const sortField = sortBy === 'name' ? 'author.fullName' : `author.${sortBy}`;
    queryBuilder.orderBy(sortField, order.toUpperCase() as 'ASC' | 'DESC');

    queryBuilder.skip((page - 1) * limit);
    queryBuilder.take(limit);

    const [authors, total] = await queryBuilder.getManyAndCount();

    return {
      data: authors,
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const author = await this.authorRepository.findOne({ where: { id } });
   
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);


    Object.assign(author, updateAuthorDto);
    return this.authorRepository.save(author);
  }

  async remove(id: number): Promise<Author> {
    const author = await this.findOne(id);
    await this.authorRepository.remove(author);

    return author;
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