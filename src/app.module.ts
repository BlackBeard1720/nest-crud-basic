import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

// AppModule là module gốc, nơi gom các module chính của ứng dụng.
@Module({
  // Import ProductsModule để app sử dụng được CRUD products.
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
