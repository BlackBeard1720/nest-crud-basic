import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PatchProductDto } from './dto/patch-product.dto';

@Injectable()
export class ProductsService {
  // Lưu data trong mảng
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

  findAll(keyword?: string) {
    if (!keyword) {
      return this.products;
    }

    return this.products.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  findOne(id: string) {
    const product = this.products.find((product) => product.id === Number(id));

    if (!product) {
      return {
        message: 'Product not found',
      };
    }
    return product;
  }

  create(body: CreateProductDto) {
    const newProduct = {
      id: this.products.length + 1,
      name: body.name,
      price: body.price,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: string, body: UpdateProductDto) {
    const product = this.products.find((product) => product.id === Number(id));

    if (!product) {
      return {
        message: 'Product not found',
      };
    }

    product.name = body.name;
    product.price = body.price;

    return product;
  }

  patch(id: string, body: PatchProductDto) {
    const product = this.products.find((product) => product.id === Number(id));

    if (!product) {
      return {
        message: 'Product not found',
      };
    }

    if (body.name !== undefined) {
      product.name = body.name;
    }

    if (body.price !== undefined) {
      product.price = body.price;
    }

    return product;
  }

  remove(id: string) {
    const productIndex = this.products.findIndex(
      (product) => product.id === Number(id),
    );

    if (productIndex === -1) {
      return {
        message: 'Product not found',
      };
    }

    this.products.splice(productIndex, 1);

    return {
      message: 'Product deleted successfully',
      deletedId: Number(id),
    };
  }
}
