import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  // canActivate chạy trước controller để quyết định request có được đi tiếp không.
  canActivate(context: ExecutionContext): boolean {
    // ExecutionContext cho phép lấy thông tin request hiện tại.
    const request = context.switchToHttp().getRequest();

    // Đọc API key từ header x-api-key.
    const apiKey = request.headers['x-api-key'];

    // Nếu API key sai, Nest trả lỗi 401 Unauthorized.
    if (apiKey !== '123456') {
      throw new UnauthorizedException('Invalid API key');
    }

    // Trả true nghĩa là request được phép đi vào controller.
    return true;
  }
}
