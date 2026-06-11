import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { PatchProductDto } from './dto/patch-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(keyword?: string) {
    if (keyword) {
      return this.productRepository.find({
        where: {
          name: Like(`%${keyword}%`),
        },
      });
    }

    return this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);

    return this.productRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    product.name = updateProductDto.name;
    product.price = updateProductDto.price;

    return this.productRepository.save(product);
  }

  async patch(id: number, patchProductDto: PatchProductDto) {
    const product = await this.findOne(id);

    if (patchProductDto.name !== undefined) {
      product.name = patchProductDto.name;
    }

    if (patchProductDto.price !== undefined) {
      product.price = patchProductDto.price;
    }

    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);

    return {
      message: 'Product deleted successfully',
      deletedId: id,
    };
  }
}
