import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Khởi tạo ứng dụng NestJS và lắng nghe cổng chạy.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
