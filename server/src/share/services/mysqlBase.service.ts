import { FindOneOptions, Repository } from 'typeorm';

export class MysqlBaseService<T> {
  constructor(protected readonly repositry: Repository<T>) {}
  findAll() {
    return this.repositry.find();
  }

  findOne(options: FindOneOptions<T>) {
    return this.repositry.findOne(options);
  }

  create(createDto) {
    return this.repositry.save(createDto);
  }

  delete(data) {
    return this.repositry.delete(data);
  }

  update(uniqueValue, data) {
    return this.repositry.update(uniqueValue, data);
  }
}
