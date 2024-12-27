import { Exclude } from 'class-transformer';
import { AccessEntity } from 'src/modules/access/entities/access.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 50, unique: true })
  roleName: string;

  /**
   * 1: 激活
   * 0: 未激活
   */
  @Column({ default: 1 })
  status: number;

  @ManyToMany(() => AccessEntity)
  @JoinTable()
  accesses: AccessEntity[]

  @Exclude()
  @CreateDateColumn()
  createAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
