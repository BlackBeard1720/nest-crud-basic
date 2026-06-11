import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// main.ts là nơi bootstrap, tức là khởi tạo ứng dụng NestJS.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ValidationPipe kiểm tra DTO trước khi request đi vào controller.
  app.useGlobalPipes(
    new ValidationPipe({
      // Tự loại bỏ field không được khai báo trong DTO.
      whitelist: true,
      // Trả lỗi 400 nếu body có field lạ ngoài DTO.
      forbidNonWhitelisted: true,
      // Tự chuyển kiểu dữ liệu khi có pipe hỗ trợ, ví dụ param id sang number.
      transform: true,
    }),
  );

  // App lắng nghe trên PORT từ môi trường, mặc định là 3000.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
