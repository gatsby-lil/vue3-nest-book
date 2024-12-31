import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn({ type: 'int'})
    id: number;

    @Column({ type: 'varchar', length: 20})
    tagName:string;

    @Column({ default: 1 })
    @Exclude()
    status: number;

    @Column()
    @Exclude()
    sort: number;

    @CreateDateColumn()
    @Exclude()
    createdAt: Date;
  
    @UpdateDateColumn()
    @Exclude()
    updatedAt: Date;
}