import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  // Guard này kiểm tra quyền trước khi cho phép xóa product.
  canActivate(context: ExecutionContext): boolean {
    // Lấy request HTTP hiện tại từ ExecutionContext.
    const request = context.switchToHttp().getRequest();

    // Đọc role từ header x-role.
    const role = request.headers['x-role'];

    // Nếu không phải admin, Nest trả lỗi 403 Forbidden.
    if (role !== 'admin') {
      throw new ForbiddenException('Only admin can delete product');
    }

    // Role hợp lệ thì cho request đi tiếp.
    return true;
  }
}
