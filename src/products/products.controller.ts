import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  // Lưu danh sách sản phẩm mẫu trong bộ nhớ.
  private products = [
    {
      id: 1,
      name: 'Laptop',
      price: 1000,
    },
    {
      id: 2,
      name: 'Mouse',
      price: 20,
    },
    {
      id: 3,
      name: 'PC',
      price: 5000,
    },
    {
      id: 4,
      name: 'Phone',
      price: 400,
    },
    {
      id: 5,
      name: 'Keyboard',
      price: 50,
    },
  ];

  // Trả về tất cả sản phẩm hoặc lọc theo từ khóa.
  @Get()
  findAll(@Query('keyword') keyword?: string) {
    if (!keyword) {
      return this.products;
    }

    return this.products.filter((product) =>
      product.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()),
    );
  }

  // Tìm một sản phẩm theo id.
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.products.find((product) => product.id === Number(id));
  }

  // Tạo sản phẩm mới từ dữ liệu gửi lên.
  @Post()
  create(@Body() body: { name: string; price: number }) {
    const newProduct = {
      id: this.products.length + 1,
      name: body.name,
      price: body.price,
    };

    this.products.push(newProduct);

    return newProduct;
  }
}
