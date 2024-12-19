import { FindOneOptions, Repository } from 'typeorm';

export class MysqlBaseService<T> {
  constructor(protected readonly repositry: Repository<T>) {}
  protected findAll() {
    return this.repositry.find();
  }

  protected findOne(options: FindOneOptions<T>) {
    return this.repositry.findOne(options);
  }

  protected create(createDto) {
    return this.repositry.save(createDto);
  }

  protected delete(data) {
    return this.repositry.delete(data);
  }

  protected update(uniqueValue, data) {
    return this.repositry.update(uniqueValue, data);
  }

  protected findAndCountByPage(skip, take, whereCondition) {
    return this.repositry.findAndCount({
      where: whereCondition,
      skip: skip,
      take: take
    })
  }
}
