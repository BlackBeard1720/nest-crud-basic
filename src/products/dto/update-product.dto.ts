import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// DTO mô tả dữ liệu body khi cập nhật toàn bộ product bằng PUT.
export class UpdateProductDto {
  // @IsString kiểm tra kiểu string, @IsNotEmpty không cho chuỗi rỗng.
  @IsString()
  @IsNotEmpty()
  name!: string;

  // @IsNumber kiểm tra giá trị gửi lên là number.
  @IsNumber()
  price!: number;
}
