import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PatchProductDto } from './dto/patch-product.dto';

@Injectable()
export class ProductsService {
  // Demo lưu data trong mảng; restart server thì dữ liệu tạo mới sẽ mất.
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

  // Trả về tất cả products hoặc lọc theo keyword nếu có.
  findAll(keyword?: string) {
    if (!keyword) {
      return this.products;
    }

    return this.products.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  // Tìm một product theo id.
  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  // Tạo product mới từ dữ liệu đã được validate trong DTO.
  create(createProductDto: CreateProductDto) {
    const newProduct = {
      id: this.products.length + 1,
      name: createProductDto.name,
      price: createProductDto.price,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  // Cập nhật toàn bộ name và price của product.
  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.name = updateProductDto.name;
    product.price = updateProductDto.price;

    return product;
  }

  // Cập nhật từng field nếu client có gửi lên.
  patch(id: number, patchProductDto: PatchProductDto) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (patchProductDto.name !== undefined) {
      product.name = patchProductDto.name;
    }

    if (patchProductDto.price !== undefined) {
      product.price = patchProductDto.price;
    }

    return product;
  }

  // Xóa product khỏi mảng theo id.
  remove(id: number) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }

    this.products.splice(productIndex, 1);

    return {
      message: 'Product deleted successfully',
      deletedId: id,
    };
  }
}
