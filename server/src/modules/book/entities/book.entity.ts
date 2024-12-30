import { AuditStatus } from 'src/enums/Auditstatus.enum';
import { UploadStatus } from 'src/enums/uploadstauts.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 20 })
  originBookName: string;

  // 前端传递的根据文件内容hash的文件名
  @Column({ type: 'varchar', length: 200, nullable: true })
  hashBookName: string;

  @Column({ type: 'enum', enum: AuditStatus })
  auditStatus: AuditStatus;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  // 文件存放的地址
  @Column({ type: 'varchar', length: 200, nullable: true })
  url: string;

  @Column({ type: 'enum', enum: UploadStatus })
  uploadStatus: UploadStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // todo: 文件的标签
}
