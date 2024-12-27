import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
  Tree,
} from 'typeorm';
import { AccessType } from '../dto/access.dto';

@Entity('access')
@Tree('materialized-path')
export class AccessEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  accessName: string;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'enum', enum: AccessType })
  type: AccessType;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 200, nullable: true })
  description: string;

  // 当前权限的子权限
  @TreeChildren()
  children: AccessEntity[];

  // 当前权限的父权限
  @TreeParent()
  parent: AccessEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
