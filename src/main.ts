import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * NestFactory 는 create 메서드를 사용해 인스턴스를 생성한다. AppModule 을 인자로 받아, 애플리케이션의 모든 모듈, 컨트롤러, 서비스 등을 초기화하고 HTTP 서버를 설정
   * NestFactory 는 NestJS 애플리케이션의 생명주기를 관리하는 핵심 클래스로, 애플리케이션의 생성, 설정 및 실행을 책임진다.
   * create<T extends INestApplication = INestApplication>(module: any, options?: NestApplicationOptions): Promise<T>;
   * create<T extends INestApplication = INestApplication>(module: any, httpAdapter: AbstractHttpAdapter, options?: NestApplicationOptions): Promise<T>;
   * createMicroservice<T extends object>(moduleCls: any, options?: NestMicroserviceOptions & T): Promise<INestMicroservice>;
   */
  await app.listen(3000);
}
bootstrap();
