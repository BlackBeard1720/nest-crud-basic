import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

// DTO mô tả dữ liệu body khi cập nhật một phần product bằng PATCH.
export class PatchProductDto {
  // @IsOptional cho phép không gửi field này; nếu gửi thì vẫn phải validate.
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  // price là optional, nhưng nếu có thì phải là number.
  @IsOptional()
  @IsNumber()
  price?: number;
}
