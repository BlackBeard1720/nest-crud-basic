import {
  MiddlewareConsumer,
  NestModule,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';

// ProductsModule quản lý controller và service liên quan đến products.
@Module({
  // Controller nhận request HTTP cho resource products.
  controllers: [ProductsController],
  // Service chứa logic xử lý dữ liệu products.
  providers: [ProductsService],
})
export class ProductsModule implements NestModule {
  // Áp dụng middleware log cho request GET tới route products.
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'products',
      method: RequestMethod.GET,
    });
  }
}
