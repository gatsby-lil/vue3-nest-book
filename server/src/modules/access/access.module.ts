import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { AccessEntity } from './entities/access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessEntity])],
  exports: [TypeOrmModule],
  providers: [AccessService],
  controllers: [AccessController]
})
export class AccessModule {}
