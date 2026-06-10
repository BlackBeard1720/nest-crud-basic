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

  create(createProductDto: CreateProductDto) {
    const newProduct = {
      id: this.products.length + 1,
      name: createProductDto.name,
      price: createProductDto.price,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const product = this.products.find((product) => product.id === Number(id));

    if (!product) {
      return {
        message: 'Product not found',
      };
    }

    product.name = updateProductDto.name;
    product.price = updateProductDto.price;

    return product;
  }

  patch(id: string, patchProductDto: PatchProductDto) {
    const product = this.products.find((product) => product.id === Number(id));

    if (!product) {
      return {
        message: 'Product not found',
      };
    }

    if (patchProductDto.name !== undefined) {
      product.name = patchProductDto.name;
    }

    if (patchProductDto.price !== undefined) {
      product.price = patchProductDto.price;
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
