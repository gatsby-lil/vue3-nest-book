import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// 实体拿来映射数据库中的一张表
export class User {
  // 主键
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50, unique: true })
  username: string;
  @Column({ length: 15, nullable: true })
  mobile: string;
  @Column({ default: 1 }) // 0代表无效, 1代表有效
  status: number;
  @Column({ default: false })
  isSuper: Boolean;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
