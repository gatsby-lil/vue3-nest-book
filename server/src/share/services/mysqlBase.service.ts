import { Repository } from 'typeorm';

export class MysqlBaseService<T> {
  constructor(protected readonly repositry: Repository<T>) {}
  async findAll() {
    return this.repositry.find();
  }
}
