import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // 비즈니스 로직 실행
    return 'Hello World!';
  }
}
