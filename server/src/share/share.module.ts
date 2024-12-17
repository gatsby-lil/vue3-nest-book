import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationService } from './services/configuration.service';
import { UtilService } from './services/util.service';

// 设置为全局, 否则TypeOrmModule无法使用依赖
@Global()
@Module({
  // 从根目录加载env文件
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: (configurationService: ConfigurationService) => {
        return {
          type: 'mysql',
          autoLoadEntities: true, // 自动加载所有的实体
          synchronize: true, // 保持代码和数据库的一致
          logging: false, // 输出内部真正执行的sql语句
          ...configurationService.mysqlConfig,
        };
      },
    }),
  ],
  providers: [ConfigurationService, UtilService],
  exports: [ConfigurationService, UtilService],
})
export class SharedModule {
  constructor() {}
}
