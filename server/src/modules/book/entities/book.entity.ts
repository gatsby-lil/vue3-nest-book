import { AuditStatus } from 'src/enums/Auditstatus.enum';
import { UploadStatus } from 'src/enums/uploadstauts.enum';
import { TagEntity } from 'src/modules/tag/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 20 })
  bookName: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  // 文件存放的地址
  @Column({ type: 'varchar', length: 200, nullable: true })
  url: string;

  @Column({ type: 'enum', enum: AuditStatus })
  auditStatus: AuditStatus;

  @Column({ type: 'enum', enum: UploadStatus })
  uploadStatus: UploadStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @JoinTable()
  @ManyToMany(() => TagEntity)
  tags: TagEntity;

  // todo: 上传人
}
