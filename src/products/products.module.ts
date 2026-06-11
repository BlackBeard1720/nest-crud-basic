import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

// ProductsModule quản lý controller và service liên quan đến products.
@Module({
  // Controller nhận request HTTP cho resource products.
  controllers: [ProductsController],
  // Service chứa logic xử lý dữ liệu products.
  providers: [ProductsService],
})
export class ProductsModule {}
