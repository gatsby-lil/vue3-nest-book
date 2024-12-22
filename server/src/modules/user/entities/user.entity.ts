import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';
import { RoleEntity } from 'src/modules/role/entities/role.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' }) // 自增的主键列
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, comment: '用户名' })
  username: string;

  @Column({ type: 'varchar', comment: '用户名密码' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 20, comment: '用户手机号' })
  @Transform(({ value }) =>
    value ? value.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3') : value,
  )
  mobile: string;

  @Column({ type: 'varchar', comment: '用户头像' })
  avatar: string;

  @Column({ type: 'int', comment: '是否冻结用户 0 不冻结 1 冻结', default: 0 })
  freezed: number;

  @Column({ type: 'bool', default: false })
  isSuper: boolean;

  @Column({ type: 'varchar', comment: '用户个性签名', default: '' })
  slogan: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose()
  get concat() {
    return `邮箱: xxxxxx@163.com`;
  }
  /**
   * 在多对多的关系中, 至少一侧需要使用@JoinTable
   * 这个装饰器表示这个实体是关系的所有者, 并且会在数据库中创建一个联结表
   * 用于保存关联关系
   */
  @JoinTable()
  @ManyToMany(() => RoleEntity)
  roles: RoleEntity[];
}
