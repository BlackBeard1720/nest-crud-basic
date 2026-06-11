import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PatchProductDto } from './dto/patch-product.dto';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { RolesGuard } from './guards/roles/roles.guard';

// Controller chịu trách nhiệm nhận request HTTP và gọi service xử lý logic.
// @UseGuards(ApiKeyGuard) áp dụng kiểm tra API key cho tất cả route trong controller này.
@UseGuards(ApiKeyGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Lấy danh sách products, có thể lọc bằng query ?keyword=...
  @Get()
  findAll(@Query('keyword') keyword?: string) {
    return this.productsService.findAll(keyword);
  }

  // ParseIntPipe chuyển id từ URL sang number; nếu không phải số thì Nest trả 400.
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // @Body() lấy dữ liệu JSON gửi lên và map vào CreateProductDto.
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // PUT cập nhật toàn bộ product theo id.
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  // PATCH cập nhật một phần product theo id.
  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchProductDto: PatchProductDto,
  ) {
    return this.productsService.patch(id, patchProductDto);
  }

  // DELETE xóa product theo id.
  // RolesGuard chỉ áp dụng riêng cho route DELETE, yêu cầu role admin.
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
