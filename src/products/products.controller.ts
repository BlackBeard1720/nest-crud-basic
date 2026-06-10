import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  findAll() {
    return [
      {
        id: 1,
        name: 'Laptop',
        price: 1000,
      },
    ];
  }
}
