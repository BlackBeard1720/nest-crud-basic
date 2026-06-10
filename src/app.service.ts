import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Trả về thông báo kiểm tra ứng dụng.
  getHello(): string {
    return 'NestJS First Steps đã xong!';
  }
}
