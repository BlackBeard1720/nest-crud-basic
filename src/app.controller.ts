import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // Nhận AppService để dùng các logic xử lý.
  constructor(private readonly appService: AppService) {}

  // Trả về nội dung cho route hello.
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
