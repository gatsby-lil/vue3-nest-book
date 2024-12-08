import { CreateUserDto } from 'src/user/dto/user.dto';
import { FindOneOptions, Repository } from 'typeorm';

export class MysqlBaseService<T> {
  constructor(protected readonly repositry: Repository<T>) {}
  async findAll() {
    return this.repositry.find();
  }

  async findOne(options: FindOneOptions<T>) {
    return this.repositry.findOne(options);
  }

  async create(createDto) {
    console.log(111);
    return this.repositry.save(createDto);
  }
}
