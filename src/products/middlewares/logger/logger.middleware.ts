import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // Ghi log method và URL của mỗi request.
  use(req: any, res: any, next: () => void) {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
  }
}
