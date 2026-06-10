import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  private products = [
    {
      id: 1,
      name: 'Laptop',
      price: 1000,
    },
    {
      id: 2,
      name: 'Mouse',
      price: 500,
    },
    {
      id: 3,
      name: 'PC',
      price: 2000,
    },
    {
      id: 4,
      name: 'Phone',
      price: 400,
    },
  ];
  @Get()
  findAll() {
    return this.products;
  }
  //route find product by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.products.find((product) => product.id === Number(id));
  }
}
