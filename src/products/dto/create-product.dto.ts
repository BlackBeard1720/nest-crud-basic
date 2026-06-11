import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// DTO mô tả dữ liệu body cần có khi tạo mới product.
export class CreateProductDto {
  // name phải là string và không được rỗng.
  @IsString()
  @IsNotEmpty()
  name!: string;

  // price phải là number.
  @IsNumber()
  price!: number;
}
