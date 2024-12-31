import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 允许跨域
    cors: true,
  });
  // 让校验器可以注入依赖
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // 可以调用transform
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
