import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} // 의존성 주입

  @Get()
  // 데코레이터는 함수나 클래스에 기능을 첨가한다. -> 재사용성 극대화, 반드시 붙여서 써야함
  getHello(): string {
    return this.appService.getHello();
  }
}
